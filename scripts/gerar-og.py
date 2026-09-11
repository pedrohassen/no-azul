"""
Gera a imagem de Open Graph (1200x630) em public/og.png.

Uso: python scripts/gerar-og.py
Requisitos: Pillow. Usa fontes do Windows (Segoe UI) — ajuste os caminhos em
FONTS se rodar em outro SO.

Rode de novo só se mudar o nome/tagline/URL abaixo. Paleta = tokens escuros de
`src/styles/theme.css` (o app é funcional/tipo-app, não editorial como o
portfólio — por isso sans-serif em vez de serifada, e fundo escuro tipo "app
de banco" em vez do papel claro).
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

NOME = "No Azul"
TAGLINE = "Controle pessoal de receitas e despesas"
URL = "no-azul-mu.vercel.app"

W, H = 1200, 630
PAPER = (15, 20, 32)  # --paper (dark)
INK = (232, 235, 241)  # --ink (dark)
MUTED = (139, 147, 163)  # --muted (dark)
LINE = (100, 112, 137)  # --line (dark)
AZUL = (29, 78, 216)  # --azul (light — cor de marca fixa, igual favicon/manifest)
CONTRASTE = (255, 255, 255)

FONTS = "C:/Windows/Fonts/"
sans_bold = ImageFont.truetype(FONTS + "segoeuib.ttf", 96)
sans = ImageFont.truetype(FONTS + "segoeui.ttf", 32)
sans_small = ImageFont.truetype(FONTS + "segoeui.ttf", 25)
mark_font = ImageFont.truetype(FONTS + "segoeuib.ttf", 30)

img = Image.new("RGB", (W, H), PAPER)
d = ImageDraw.Draw(img)

d.rectangle([24, 24, W - 25, H - 25], outline=LINE, width=2)

x = 90

bw, bh = 84, 62
box = [W - 90 - bw, 74, W - 90, 74 + bh]
d.rounded_rectangle(box, radius=14, fill=AZUL)
d.text(
    ((box[0] + box[2]) / 2, (box[1] + box[3]) / 2 - 1),
    "NA",
    font=mark_font,
    fill=CONTRASTE,
    anchor="mm",
)

d.text((x, 246), NOME, font=sans_bold, fill=INK)
d.rectangle([x + 3, 378, x + 91, 382], fill=AZUL)
d.text((x, 412), TAGLINE, font=sans, fill=MUTED)
d.text((x, H - 88), URL, font=sans_small, fill=MUTED)

out = Path(__file__).resolve().parent.parent / "public" / "og.png"
img.save(out, "PNG", optimize=True)
print("salvo:", out, img.size)
