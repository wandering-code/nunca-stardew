"""Genera los iconos PNG y el favicon SVG a partir de la estrella pixel de js/icons.js."""
import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STAR = """
.....k.....
....kYk....
....kYk....
kkkkYYYkkkk
kyYYYYYYYyk
.kyYYYYYyk.
..kYYYYYk..
..kYYyYYk..
.kYykkkyYk.
.kkk...kkk.
""".strip().split("\n")
COLORS = {"k": (43, 22, 8), "y": (240, 168, 28), "Y": (255, 216, 74)}
BG = (122, 63, 18)
FRAME = (232, 160, 74)


def pixel(x, y, size):
    edge = max(1, size // 24)
    if x < edge or y < edge or x >= size - edge or y >= size - edge:
        return (43, 22, 8)
    if x < 2 * edge or y < 2 * edge or x >= size - 2 * edge or y >= size - 2 * edge:
        return FRAME
    cell = size // 15
    ox = (size - cell * 11) // 2
    oy = (size - cell * 10) // 2
    cx, cy = (x - ox) // cell, (y - oy) // cell
    if 0 <= cy < 10 and 0 <= cx < 11 and x >= ox and y >= oy:
        return COLORS.get(STAR[cy][cx], BG)
    return BG


def png(size):
    raw = b"".join(b"\x00" + bytes(c for x in range(size) for c in pixel(x, y, size)) for y in range(size))

    def chunk(tag, data):
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    return (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0))
            + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b""))


def svg():
    rects = "".join(
        f'<rect x="{x + 2}" y="{y + 2.5}" width="1" height="1" fill="#{"%02x%02x%02x" % COLORS[ch]}"/>'
        for y, row in enumerate(STAR) for x, ch in enumerate(row) if ch in COLORS)
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" shape-rendering="crispEdges">'
            '<rect width="15" height="15" fill="#2b1608"/><rect x="1" y="1" width="13" height="13" fill="#7a3f12"/>'
            f"{rects}</svg>\n")


for s in (180, 192, 512):
    (ROOT / "img" / f"icon-{s}.png").write_bytes(png(s))
(ROOT / "img" / "icon.svg").write_text(svg(), encoding="utf-8", newline="\n")
