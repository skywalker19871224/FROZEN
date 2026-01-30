import os
from PIL import Image, ImageDraw, ImageFont

# Settings
input_image = "/Users/M1/AIProjects/FROZEN/Frozen-site/しゃがみ.jpg"
output_image = "/Users/M1/AIProjects/FROZEN/Frozen-site/public/ogp.png"
font_path = "/System/Library/Fonts/Hiragino Sans GB.ttc" # Standard Mac Kaku Gothic

target_w, target_h = 800, 800
gold_color = "#E0CA82"
red_color = "#FF3B30" # iOS Vivid Red

def create_ogp():
    if not os.path.exists(input_image):
        print(f"Error: {input_image} not found")
        return

    # Load and crop/resize to 1.91:1
    img = Image.open(input_image)
    img_w, img_h = img.size
    
    # Crop to center
    target_ratio = target_w / target_h
    current_ratio = img_w / img_h
    
    if current_ratio > target_ratio:
        # Too wide, crop sides
        new_w = int(img_h * target_ratio)
        left = (img_w - new_w) / 2
        img = img.crop((left, 0, left + new_w, img_h))
    else:
        # Too tall, crop top/bottom
        new_h = int(img_w / target_ratio)
        top = (img_h - new_h) / 2
        img = img.crop((0, top, img_w, top + new_h))
    
    img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # 1. Overlay (Semi-transparent black)
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 160)) # ~60% transparency
    img = img.convert('RGBA')
    img = Image.alpha_composite(img, overlay)

    # 2. Draw Text
    draw = ImageDraw.Draw(img)
    
    try:
        # Title Font
        font_title = ImageFont.truetype(font_path, 32)
        # Red Text Font
        font_red = ImageFont.truetype(font_path, 84)
    except Exception as e:
        print(f"Font error: {e}")
        font_title = ImageFont.load_default()
        font_red = ImageFont.load_default()

    text1 = "アルバムコンプリートおめでとうございます。"
    text2 = "無修正版購入可能のご案内"
    text3 = "今夜0時解禁"

    # Get text positions
    def get_center_pos(text, font, y):
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        return (target_w - w) / 2, y

    draw.text(get_center_pos(text1, font_title, 240), text1, font=font_title, fill=gold_color)
    draw.text(get_center_pos(text2, font_title, 290), text2, font=font_title, fill=gold_color)
    draw.text(get_center_pos(text3, font_red, 400), text3, font=font_red, fill=red_color)

    # Save
    if not os.path.exists(os.path.dirname(output_image)):
        os.makedirs(os.path.dirname(output_image))
    
    img.convert('RGB').save(output_image, "PNG")
    print(f"Successfully created OGP at {output_image}")

if __name__ == "__main__":
    create_ogp()
