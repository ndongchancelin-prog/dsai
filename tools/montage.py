# Montage vertical « actu GTA 6 » piloté par les horodatages mot à mot de la voix.
# Usage : python3 tools/montage.py  (depuis la racine du projet)
import json, subprocess, os, re, math, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H, FPS = 1080, 1920, 30
JX = "J-6"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
FONT = "/usr/share/fonts/opentype/montserrat/Montserrat-ExtraBold.otf"
FONT_BLACK = "/usr/share/fonts/opentype/montserrat/Montserrat-Black.otf"
YELLOW = (255, 210, 30)

words = json.load(open(os.environ.get("MOTS","work/words.json")))  # [[mot, debut, fin], ...]
VOICE_DUR = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                           "-of", "csv=p=0", os.environ.get("VOIX","voix/voix.mp3")]).decode())
TOTAL = round(VOICE_DUR + 0.7, 2)
NF = int(TOTAL * FPS)

def norm(w): return re.sub(r"[^\wà-ÿ-]", "", w.lower())

# ---------- séquences (ancre = mot recherché, recul = nb de mots à reculer) ----------
SEQ = [  # (ancre, recul, plans de fond [clip, vitesse, zoom])
    (None, 0, [("r02_voiture_palmiers", 1.0, 1.0), ("r01_van", 0.55, 1.08), ("r03_ville_nuit", 0.6, 1.0)]),
    ("dabord", 0, [("r04_piscine_aerienne", 0.8, 1.0), ("r03_ville_nuit", 0.55, 1.12), ("r02_voiture_palmiers", 0.85, 1.15)]),
    ("cent", 2, [("r07_motocross", 0.75, 1.0), ("r10_hydroglisseur", 0.7, 1.0), ("r09_sousmarin", 0.6, 1.0)]),
    ("mer", 1, [("r11_sousmarin2", 0.3, 1.05), ("r09_sousmarin", 0.6, 1.12), ("r10_hydroglisseur", 0.65, 1.1)]),
    ("terre", 1, [("r14_course", 0.9, 1.0), ("r07_motocross", 0.8, 1.12), ("r02_voiture_palmiers", 0.9, 1.05)]),
    ("détente", 1, [("r12_minigolf", 0.3, 1.05), ("r04_piscine_aerienne", 0.8, 1.12), ("r13_muscu", 0.3, 1.0)]),
    ("jason", 0, [("r05_lucia", 0.65, 1.0), ("r06_jason", 0.7, 1.0), ("r05_lucia", 0.6, 1.15)]),
    ("météo", 1, [("r03_ville_nuit", 0.5, 1.0), ("r04_piscine_aerienne", 0.75, 1.15)]),
    ("attention", 1, [("r14_course", 0.8, 1.12), ("r01_van", 0.5, 1.0)]),
    ("sortie", 0, [("r02_voiture_palmiers", 0.9, 1.1), ("r04_piscine_aerienne", 0.8, 1.05)]),
    ("toi", 1, [("r06_jason", 0.7, 1.08), ("r05_lucia", 0.7, 1.05), ("r03_ville_nuit", 0.55, 1.05), ("r06_jason", 0.6, 1.2)]),
]
nw = [norm(w[0]) for w in words]
starts, cur = [], 0
for anc, back, _ in SEQ:
    if anc is None:
        starts.append(0); continue
    idx = next(i for i in range(cur, len(nw)) if nw[i].startswith(norm(anc)))
    starts.append(idx - back); cur = idx + 1
seq_t = [0.0] + [words[i][1] - 0.05 for i in starts[1:]] + [TOTAL]

# ---------- plans (coupes sèches toutes les ~2,2 s) ----------
def dur(f): return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                                 "-of", "csv=p=0", f]).decode())
shots = []
for k, (_, _, plans) in enumerate(SEQ):
    a, b = seq_t[k], seq_t[k + 1]
    n = max(1, round((b - a) / 2.3))
    edges = [a + (b - a) * j / n for j in range(n + 1)]
    for j in range(n):
        clip, sp, zm = plans[j % len(plans)]
        shots.append((edges[j], edges[j + 1], clip, sp, zm, k))

os.makedirs("work/shots", exist_ok=True)
lst = []
for i, (a, b, clip, sp, zm, k) in enumerate(shots):
    d = b - a
    src = f"clips/ref/{clip}.mp4"
    cd = dur(src)
    sp = min(sp, cd / d) if cd / d < sp else sp
    if cd < d * sp:  # pas assez de matière : on ralentit encore
        sp = cd / d * 0.98
    if clip[:3] in ("r01","r02","r03","r04","r05","r06"):
        zm = 1.0; zoom_end = 1.0  # plans nettoyés : pas de zoom pour garder la bande floutée sous les sous-titres
    else:
        zoom_end = zm + 0.06
    # léger zoom progressif (Ken Burns) + ralenti
    vf = (f"setpts=PTS/{sp:.4f},fps={FPS},"
          f"scale=w='iw*({zm}+({zoom_end}-{zm})*t/{d:.3f})':h=-2:eval=frame,"
          f"crop={W}:{H}:(iw-{W})/2:(ih-{H})/2,setsar=1")
    out = f"work/shots/s{i:03d}.mp4"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-vf", vf, "-t", f"{d:.4f}", "-an",
                    "-c:v", "libx264", "-crf", "16", "-preset", "veryfast", "-pix_fmt", "yuv420p", out], check=True)
    lst.append(out)
open("work/shots/list.txt", "w").write("".join(f"file '{os.path.basename(x)}'\n" for x in lst))
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", "work/shots/list.txt",
                "-c", "copy", "work/fond.mp4"], check=True)

# ---------- éléments graphiques ----------
def font(sz, black=False): return ImageFont.truetype(FONT_BLACK if black else FONT, sz)

def text_stroke(d, xy, txt, f, fill, sw=6, sc=(10, 10, 10)):
    d.text(xy, txt, font=f, fill=fill, stroke_width=sw, stroke_fill=sc)

def badge():
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    f = font(34); txt = f"{JX} avant GTA 6"
    tw = d.textlength(txt, font=f)
    x0, y0 = 30, 178
    bw = max(tw + 48, 400)
    d.rounded_rectangle([x0, y0, x0 + bw, y0 + 80], radius=22, fill=(15, 15, 15, 215))
    d.text((x0 + (bw - tw) / 2, y0 + 20), txt, font=f, fill="white")
    return im

def title_card():
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    lines = [(JX, "white", 150), ("CE QUE TU VAS FAIRE", "white", 76), ("DANS GTA 6", YELLOW, 118)]
    y = 470
    for txt, col, sz in lines:
        f = font(sz, True); tw = d.textlength(txt, font=f)
        text_stroke(d, ((W - tw) / 2, y), txt, f, col, sw=8)
        y += sz + 22
    f = font(30); src = "SOURCE : ROCKSTAR GAMES - GAME INFORMER"
    tw = d.textlength(src, font=f)
    text_stroke(d, ((W - tw) / 2, 1150), src, f, "white", sw=4)
    sh = im.filter(ImageFilter.GaussianBlur(10)); a = np.array(sh); a[..., :3] = 0; a[..., 3] = (a[..., 3] * 0.6).astype(np.uint8)
    return Image.alpha_composite(Image.fromarray(a), im)

def rounded_mask(w, h, r):
    m = Image.new("L", (w, h), 0); ImageDraw.Draw(m).rounded_rectangle([0, 0, w - 1, h - 1], radius=r, fill=255); return m

PIP_W, PIP_H, PIP_Y, BORDER = 880, 495, 290, 9
def pip_image(name):
    src = Image.open(f"images/{name}.png").convert("RGB")
    s = max(PIP_W / src.width, PIP_H / src.height)
    src = src.resize((math.ceil(src.width * s), math.ceil(src.height * s)), Image.LANCZOS)
    x = (src.width - PIP_W) // 2; y = (src.height - PIP_H) // 2
    src = src.crop((x, y, x + PIP_W, y + PIP_H))
    fw, fh = PIP_W + 2 * BORDER, PIP_H + 2 * BORDER
    fr = Image.new("RGBA", (fw, fh), (0, 0, 0, 0))
    fr.paste(Image.new("RGBA", (fw, fh), YELLOW + (255,)), (0, 0), rounded_mask(fw, fh, 30))
    fr.paste(src, (BORDER, BORDER), rounded_mask(PIP_W, PIP_H, 22))
    return fr

PIPS = [("animaux", "zoo"), ("baleines", "baleine"), ("plongée", "plongee"), ("hydroglisseur", "hydroglisseur"),
        ("courses", "course"), ("mini-golf", "minigolf"), ("billard", "billard"), ("muscu", "muscu"),
        ("base", "basejump")]
pip_ev, cur = [], 0
for key, img in PIPS:
    idx = next((i for i in range(cur, len(nw)) if norm(key) in nw[i]), None)
    if idx is None:
        idx = next((i for i in range(len(nw)) if norm(key) in nw[i]), None)
    if idx is None: print("PiP introuvable :", key); continue
    pip_ev.append([words[idx][1] - 0.08, None, img]); cur = idx + 1
pip_ev.sort()
for i, e in enumerate(pip_ev):
    nxt = pip_ev[i + 1][0] if i + 1 < len(pip_ev) else TOTAL
    e[1] = min(e[0] + 2.0, nxt - 0.02)
pip_cache = {img: pip_image(img) for _, _, img in pip_ev}

# ---------- sous-titres karaoké (2 à 4 mots) ----------
TITLE_END = 2.9
groups, g = [], []
for i, (w, a, b) in enumerate(words):
    g.append(i)
    punct = re.search(r"[.,!?:;…]$", w)
    if len(g) >= 3 or (punct and len(g) >= 2) or (punct and w.endswith(("!", "?", "."))):
        groups.append(g); g = []
if g: groups.append(g)
# fusionne les groupes d'un seul mot avec le suivant quand possible
merged = []
for gr in groups:
    if merged and len(merged[-1]) == 1 and len(merged[-1]) + len(gr) <= 4:
        merged[-1] += gr
    else:
        merged.append(gr)
groups = merged
SUB_F = font(66)
SUB_Y = 900

def sub_layer(gr, active):
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    toks = [words[i][0] for i in gr]
    sp = d.textlength(" ", font=SUB_F)
    widths = [d.textlength(t, font=SUB_F) for t in toks]
    lines, line, lw = [], [], 0
    for k, wd in enumerate(widths):
        if line and lw + sp + wd > 940:
            lines.append(line); line, lw = [], 0
        lw = lw + (sp if line else 0) + wd; line.append(k)
    lines.append(line)
    lh = 86
    y = SUB_Y - (len(lines) * lh) / 2 + 10
    for ln in lines:
        tot = sum(widths[k] for k in ln) + sp * (len(ln) - 1)
        x = (W - tot) / 2
        for k in ln:
            if gr[k] == active:
                d.rounded_rectangle([x - 12, y - 4, x + widths[k] + 12, y + 78], radius=14, fill=YELLOW + (255,))
                d.text((x, y), toks[k], font=SUB_F, fill=(15, 15, 15))
            else:
                text_stroke(d, (x, y), toks[k], SUB_F, "white", sw=7)
            x += widths[k] + sp
        y += lh
    return im

sub_cache = {}
def subs_at(t):
    if t < TITLE_END: return None
    for gi, gr in enumerate(groups):
        a = words[gr[0]][1]
        b = words[groups[gi + 1][0]][1] if gi + 1 < len(groups) else words[gr[-1]][2] + 0.4
        if words[gr[-1]][2] + 0.6 < b: b = words[gr[-1]][2] + 0.6
        if a - 0.05 <= t < b:
            act = gr[0]
            for i in gr:
                if t >= words[i][1] - 0.05: act = i
            key = (gi, act)
            if key not in sub_cache: sub_cache[key] = sub_layer(gr, act)
            return sub_cache[key]
    return None

BADGE = badge(); TITLE = title_card()
def strip():  # bande sombre douce derrière les sous-titres (masque aussi l'ancien texte flouté)
    a = np.zeros((H, W, 4), np.uint8)
    ys = np.arange(H)
    al = np.clip(1 - np.abs(ys - 935) / 150, 0, 1) ** 0.6 * 150
    a[..., 3] = al[:, None].astype(np.uint8)
    return Image.fromarray(a)
STRIP = strip()

# ---------- rendu image par image ----------
dec = subprocess.Popen(["ffmpeg", "-v", "error", "-i", "work/fond.mp4", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                       stdout=subprocess.PIPE)
enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                        "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-crf", "17", "-preset", "medium",
                        "-pix_fmt", "yuv420p", "work/video_muette.mp4"], stdin=subprocess.PIPE)
last = None
for fi in range(NF):
    t = fi / FPS
    raw = dec.stdout.read(W * H * 3)
    if len(raw) < W * H * 3:
        raw = last
    last = raw
    fr = Image.frombuffer("RGB", (W, H), raw).convert("RGBA")
    for a, b, img in pip_ev:
        if a <= t < b:
            p = pip_cache[img]
            k = min(1.0, (t - a) / 0.15); s = 0.86 + 0.14 * k
            pw, ph = int(p.width * s), int(p.height * s)
            ps = p.resize((pw, ph), Image.BILINEAR) if s < 1 else p
            fr.alpha_composite(ps, ((W - pw) // 2, PIP_Y - BORDER + (p.height - ph) // 2))
    fr.alpha_composite(STRIP)
    fr.alpha_composite(BADGE)
    if t < TITLE_END:
        fr.alpha_composite(TITLE)
    sl = subs_at(t)
    if sl is not None: fr.alpha_composite(sl)
    enc.stdin.write(fr.convert("RGB").tobytes())
enc.stdin.close(); enc.wait(); dec.wait()

# ---------- mixage + export ----------
os.makedirs("sortie", exist_ok=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "work/video_muette.mp4", "-i", os.environ.get("VOIX","voix/voix.mp3"), "-i", "work/musique.wav",
                "-filter_complex",
                f"[1:a]aresample=48000,apad=whole_dur={TOTAL}[v];[2:a]aresample=48000,volume=-20dB,atrim=0:{TOTAL}[m];"
                "[v][m]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]",
                "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
                "-movflags", "+faststart", "-t", str(TOTAL), os.environ.get("SORTIE","sortie/video-finale.mp4")], check=True)

json.dump({"total": TOTAL, "seq_t": seq_t, "shots": [(round(a, 2), round(b, 2), c, round(s, 2)) for a, b, c, s, z, k in shots],
           "pips": [(round(a, 2), round(b, 2), i) for a, b, i in pip_ev]},
          open("work/timeline.json", "w"), ensure_ascii=False, indent=1)
print("OK", TOTAL, "s,", len(shots), "plans,", len(pip_ev), "incrustations")
