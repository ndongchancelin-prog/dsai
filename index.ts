import { config as loadEnv } from 'dotenv';
import { createHiggsfieldClient, TimeoutError } from '@higgsfield/client/v2';

// Load HF_CREDENTIALS from .env.local (git-ignored). The value is never logged.
loadEnv({ path: '.env.local', quiet: true });

const MODEL = 'bytedance/seedance-2.5/text-to-video';

async function main(): Promise<number> {
  const credentials = process.env.HF_CREDENTIALS?.trim();
  if (!credentials || !credentials.includes(':')) {
    console.error('HF_CREDENTIALS is missing or not in key-id:key-secret format. Set it in .env.local.');
    return 1;
  }

  const client = createHiggsfieldClient({
    credentials,
    // Video generation can take longer than the SDK's 5-minute default.
    maxPollTime: 20 * 60 * 1000,
  });

  console.log(`Submitting ${MODEL} request...`);
  const result = await client.subscribe(MODEL, {
    input: {
      prompt: 'A cinematic scene at sunset',
      duration: 5,
      resolution: '720p',
      aspect_ratio: '16:9',
    },
    withPolling: true,
  });

  // The API may also report statuses not yet in the SDK's type union (e.g. "canceled").
  const status = result.status as string;
  console.log(`Request ${result.request_id} finished with status: ${status}`);

  switch (status) {
    case 'completed': {
      const url = result.video?.url;
      if (!url) {
        console.error('Request completed but no video URL was returned.');
        return 1;
      }
      console.log(`Video URL: ${url}`);
      return 0;
    }
    case 'nsfw':
      console.error('Generation was rejected by content moderation (credits refunded).');
      return 1;
    case 'failed':
      console.error('Generation failed (credits refunded).');
      return 1;
    case 'canceled':
    case 'cancelled':
      console.error('Generation was canceled.');
      return 1;
    default:
      console.error(`Generation did not complete (status: ${status}).`);
      return 1;
  }
}

main()
  .then((code) => process.exit(code))
  .catch((err: unknown) => {
    if (err instanceof TimeoutError) {
      console.error('Timed out waiting for the generation to finish.');
    } else {
      // Print only the error name/message; never dump request config (it carries the auth header).
      const e = err as { name?: string; message?: string };
      console.error(`Request failed: ${e?.name ?? 'Error'}: ${e?.message ?? String(err)}`);
    }
    process.exit(1);
  });
