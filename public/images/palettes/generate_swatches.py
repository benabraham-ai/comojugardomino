#!/usr/bin/env python3
"""Generate color palette swatches for DominoLive"""

from PIL import Image, ImageDraw, ImageFont
import os

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

PALETTES = {
    "palette-1-caribbean": {
        "name": "Caribbean Heat",
        "bg": "#0d1b2a",
        "primary": "#ff4500",
        "secondary": "#ffaa00",
        "text": "#ffffff",
        "success": "#00e676",
        "description": "Tropical · Saturated · Sunset Energy"
    },
    "palette-2-neon": {
        "name": "Neon Nights",
        "bg": "#0a0a0f",
        "primary": "#ff00ff",
        "secondary": "#00ffff",
        "text": "#ffffff",
        "success": "#39ff14",
        "description": "Gaming · Electric · High Contrast"
    },
    "palette-3-golden": {
        "name": "Golden Hour",
        "bg": "#1a1000",
        "primary": "#ffb300",
        "secondary": "#ff6f00",
        "text": "#fff8e1",
        "success": "#76ff03",
        "description": "Premium · Warm · Sophisticated"
    },
    "palette-4-venezuelan": {
        "name": "Venezuelan Flag",
        "bg": "#0a0a1a",
        "primary": "#cf142b",
        "secondary": "#00247d",
        "text": "#ffffff",
        "success": "#ffd700",
        "description": "Cultural Pride · Bold · Patriotic"
    }
}

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def luminance(r, g, b):
    def c(x):
        x /= 255.0
        return x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4
    return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b)

def contrast_ratio(c1, c2):
    l1 = luminance(*c1)
    l2 = luminance(*c2)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

def darken(hex_color, factor=0.6):
    r, g, b = hex_to_rgb(hex_color)
    return (int(r * factor), int(g * factor), int(b * factor))

def add_glow(draw, x, y, w, h, color, radius=8):
    """Add a simple glow effect by drawing progressively larger, more transparent rectangles"""
    r, g, b = hex_to_rgb(color) if isinstance(color, str) else color
    for i in range(radius, 0, -1):
        alpha = int(80 * (1 - i / radius))
        draw.rounded_rectangle(
            [x - i, y - i, x + w + i, y + h + i],
            radius=12 + i,
            outline=(r, g, b, alpha),
            width=2
        )

def generate_swatch(key, palette):
    W, H = 900, 560
    img = Image.new("RGBA", (W, H), hex_to_rgb(palette["bg"]) + (255,))
    draw = ImageDraw.Draw(img, "RGBA")

    bg_rgb = hex_to_rgb(palette["bg"])
    primary_rgb = hex_to_rgb(palette["primary"])
    secondary_rgb = hex_to_rgb(palette["secondary"])
    text_rgb = hex_to_rgb(palette["text"])
    success_rgb = hex_to_rgb(palette["success"])

    # --- Subtle grid background ---
    grid_color = tuple(min(255, c + 20) for c in bg_rgb) + (30,)
    for x in range(0, W, 40):
        draw.line([(x, 0), (x, H)], fill=grid_color, width=1)
    for y in range(0, H, 40):
        draw.line([(0, y), (W, y)], fill=grid_color, width=1)

    # --- Fonts ---
    try:
        font_big = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 32)
        font_med = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 20)
        font_sm = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 15)
        font_xs = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 13)
        font_name = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 26)
    except:
        font_big = ImageFont.load_default()
        font_med = font_sm = font_xs = font_name = font_big

    # ─── HEADER ─────────────────────────────────────────────────────
    # Accent bar at top
    draw.rectangle([0, 0, W, 6], fill=primary_rgb)

    draw.text((30, 24), palette["name"], font=font_big, fill=text_rgb)
    draw.text((30, 62), palette["description"], font=font_sm, fill=(*text_rgb, 180))
    
    # Label: DominoLive Palette
    draw.text((W - 30, 24), "DominoLive Palette", font=font_xs, fill=(*text_rgb, 120), anchor="ra")

    # ─── COLOR SWATCHES ROW ─────────────────────────────────────────
    swatch_y = 105
    swatch_h = 70
    labels = [
        ("Background", palette["bg"], bg_rgb),
        ("Primary CTA", palette["primary"], primary_rgb),
        ("Secondary", palette["secondary"], secondary_rgb),
        ("Text", palette["text"], text_rgb),
        ("Success/Win", palette["success"], success_rgb),
    ]
    swatch_w = (W - 60 - 16 * 4) // 5

    for i, (label, hex_val, rgb_val) in enumerate(labels):
        x = 30 + i * (swatch_w + 16)
        # Swatch block
        draw.rounded_rectangle([x, swatch_y, x + swatch_w, swatch_y + swatch_h], radius=10, fill=rgb_val)
        # Border if too dark
        if luminance(*rgb_val) < 0.05:
            draw.rounded_rectangle([x, swatch_y, x + swatch_w, swatch_y + swatch_h], radius=10, outline=(*text_rgb, 60), width=1)
        # Label
        draw.text((x + swatch_w // 2, swatch_y + swatch_h + 8), label, font=font_xs, fill=(*text_rgb, 200), anchor="mt")
        draw.text((x + swatch_w // 2, swatch_y + swatch_h + 24), hex_val, font=font_xs, fill=primary_rgb, anchor="mt")

    # ─── MOCKUP AREA ────────────────────────────────────────────────
    mock_y = 230

    # --- Card mockup ---
    card_x, card_w, card_h = 30, 340, 280
    card_bg = tuple(min(255, c + 18) for c in bg_rgb)
    draw.rounded_rectangle([card_x, mock_y, card_x + card_w, mock_y + card_h], radius=16, fill=card_bg)
    # Card accent strip
    draw.rounded_rectangle([card_x, mock_y, card_x + card_w, mock_y + 5], radius=4, fill=primary_rgb)
    # Domino icon placeholder
    tile_x, tile_y = card_x + 20, mock_y + 22
    draw.rounded_rectangle([tile_x, tile_y, tile_x + 44, tile_y + 72], radius=6, fill=(*text_rgb, 20), outline=primary_rgb, width=2)
    draw.line([(tile_x, tile_y + 36), (tile_x + 44, tile_y + 36)], fill=primary_rgb, width=2)
    # Domino dots (just decorative)
    for dot in [(tile_x+12, tile_y+15), (tile_x+32, tile_y+15), (tile_x+22, tile_y+55)]:
        draw.ellipse([dot[0]-4, dot[1]-4, dot[0]+4, dot[1]+4], fill=primary_rgb)

    draw.text((tile_x + 60, mock_y + 24), "Juego en Vivo", font=font_med, fill=text_rgb)
    draw.text((tile_x + 60, mock_y + 50), "Mesa #7 · 4 jugadores", font=font_sm, fill=(*text_rgb, 160))

    # Score bar
    score_y = mock_y + 90
    draw.text((card_x + 20, score_y), "Puntuación", font=font_sm, fill=(*text_rgb, 150))
    draw.rounded_rectangle([card_x + 20, score_y + 22, card_x + card_w - 20, score_y + 38], radius=8, fill=(*text_rgb, 20))
    bar_fill = int((card_w - 40) * 0.72)
    draw.rounded_rectangle([card_x + 20, score_y + 22, card_x + 20 + bar_fill, score_y + 38], radius=8, fill=primary_rgb)
    draw.text((card_x + card_w - 20, score_y + 22), "72 pts", font=font_sm, fill=primary_rgb, anchor="ra")

    # Winner badge
    win_y = score_y + 58
    draw.rounded_rectangle([card_x + 20, win_y, card_x + 120, win_y + 28], radius=14, fill=success_rgb)
    win_text_rgb = (0, 0, 0) if luminance(*success_rgb) > 0.4 else (255, 255, 255)
    draw.text((card_x + 70, win_y + 14), "¡GANADOR!", font=font_sm, fill=win_text_rgb, anchor="mm")

    # Stat chips
    chip_y = win_y + 44
    for ci, (stat, val) in enumerate([("Fichas", "14"), ("Turnos", "8"), ("Capicúa", "2")]):
        cx = card_x + 20 + ci * 100
        chip_bg = tuple(min(255, c + 30) for c in bg_rgb)
        draw.rounded_rectangle([cx, chip_y, cx + 88, chip_y + 42], radius=10, fill=chip_bg, outline=(*secondary_rgb, 80), width=1)
        draw.text((cx + 44, chip_y + 10), val, font=font_med, fill=secondary_rgb, anchor="mt")
        draw.text((cx + 44, chip_y + 30), stat, font=font_xs, fill=(*text_rgb, 140), anchor="mt")

    # --- Buttons panel ---
    btn_panel_x = 30 + card_w + 20
    btn_panel_w = W - btn_panel_x - 30

    draw.text((btn_panel_x, mock_y), "Componentes UI", font=font_sm, fill=(*text_rgb, 150))

    # Primary CTA button
    btn1_y = mock_y + 24
    draw.rounded_rectangle([btn_panel_x, btn1_y, btn_panel_x + btn_panel_w, btn1_y + 48], radius=12, fill=primary_rgb)
    btn1_text_rgb = (0, 0, 0) if luminance(*primary_rgb) > 0.4 else (255, 255, 255)
    draw.text((btn_panel_x + btn_panel_w // 2, btn1_y + 24), "▶  JUGAR AHORA", font=font_med, fill=btn1_text_rgb, anchor="mm")

    # Secondary button
    btn2_y = btn1_y + 62
    draw.rounded_rectangle([btn_panel_x, btn2_y, btn_panel_x + btn_panel_w, btn2_y + 48], radius=12, fill=(*secondary_rgb, 0), outline=secondary_rgb, width=2)
    draw.text((btn_panel_x + btn_panel_w // 2, btn2_y + 24), "Ver Torneos", font=font_med, fill=secondary_rgb, anchor="mm")

    # Ghost / text button
    btn3_y = btn2_y + 62
    draw.text((btn_panel_x + btn_panel_w // 2, btn3_y + 16), "Cómo Jugar →", font=font_sm, fill=(*primary_rgb, 200), anchor="mm")

    # Divider
    div_y = btn3_y + 44
    draw.line([(btn_panel_x, div_y), (btn_panel_x + btn_panel_w, div_y)], fill=(*text_rgb, 30), width=1)

    # Tag pills
    pill_y = div_y + 16
    tags = [("EN VIVO", primary_rgb), ("TORNEO", secondary_rgb), ("GRATIS", success_rgb)]
    px = btn_panel_x
    for tag, tag_rgb in tags:
        tw = draw.textlength(tag, font=font_xs)
        pill_w = int(tw) + 24
        dark_rgb = darken(tag_rgb if isinstance(tag_rgb, str) else "#{:02x}{:02x}{:02x}".format(*tag_rgb), 0.25)
        draw.rounded_rectangle([px, pill_y, px + pill_w, pill_y + 24], radius=12, fill=(*tag_rgb, 30), outline=(*tag_rgb, 180), width=1)
        pill_text_rgb = (0, 0, 0) if luminance(*tag_rgb) > 0.45 else tuple(tag_rgb)
        # Use tag_rgb directly since it's already bright
        draw.text((px + pill_w // 2, pill_y + 12), tag, font=font_xs, fill=tag_rgb, anchor="mm")
        px += pill_w + 10

    # Input field
    input_y = pill_y + 40
    draw.rounded_rectangle([btn_panel_x, input_y, btn_panel_x + btn_panel_w, input_y + 40], radius=10, fill=(*text_rgb, 10), outline=(*primary_rgb, 100), width=1)
    draw.text((btn_panel_x + 14, input_y + 20), "Buscar partida...", font=font_sm, fill=(*text_rgb, 60), anchor="lm")
    # Cursor blink
    cursor_x = btn_panel_x + 14 + int(draw.textlength("Buscar partida...", font=font_sm)) + 4
    draw.line([(cursor_x, input_y + 10), (cursor_x, input_y + 30)], fill=primary_rgb, width=2)

    # --- Footer bar ---
    footer_y = H - 32
    draw.rectangle([0, footer_y, W, H], fill=(*bg_rgb, 200))
    draw.line([(0, footer_y), (W, footer_y)], fill=primary_rgb, width=2)
    draw.text((30, footer_y + 14), f"DominoLive · {palette['name']} Palette", font=font_xs, fill=(*text_rgb, 120), anchor="lm")
    
    # Contrast ratio info
    cr_bg_primary = contrast_ratio(bg_rgb, primary_rgb)
    cr_bg_text = contrast_ratio(bg_rgb, text_rgb)
    draw.text((W - 30, footer_y + 14),
              f"Contrast BG/Primary: {cr_bg_primary:.1f}:1  ·  BG/Text: {cr_bg_text:.1f}:1",
              font=font_xs, fill=(*text_rgb, 100), anchor="rm")

    # Save
    out_path = os.path.join(OUTPUT_DIR, f"{key}.png")
    img.convert("RGB").save(out_path, "PNG", quality=95)
    print(f"✅ Saved: {out_path}")

def main():
    print("Generating DominoLive palette swatches...\n")
    for key, palette in PALETTES.items():
        generate_swatch(key, palette)
    print("\n🎨 All 4 swatches generated!")

if __name__ == "__main__":
    main()
