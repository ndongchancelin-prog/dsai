export default function WellbeingDisclaimer({ text }: { text: string }) {
  return (
    <p className="border-l border-or/30 pl-4 text-sm text-papyrus-doux italic font-corps">
      {text}
    </p>
  );
}
