"""
Static WebP Converter
Converts any image to a high-quality static WebP file with transparency support.
Output is saved to the same directory as this script.
"""

import sys
import os
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow kurulu degil. Kuruluyor...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image


def convert_to_webp(input_path: str) -> None:
    input_path = Path(input_path.strip().strip('"').strip("'"))

    if not input_path.exists():
        print(f"HATA: Dosya bulunamadi: {input_path}")
        sys.exit(1)

    if not input_path.is_file():
        print(f"HATA: Gecerli bir dosya degil: {input_path}")
        sys.exit(1)

    script_dir = Path(__file__).resolve().parent
    output_name = input_path.stem + ".webp"
    output_path = script_dir / output_name

    # Ayni isimde dosya varsa uzerine yazmayi onle
    counter = 1
    while output_path.exists():
        output_name = f"{input_path.stem}_{counter}.webp"
        output_path = script_dir / output_name
        counter += 1

    try:
        img = Image.open(input_path)
    except Exception as exc:
        print(f"HATA: Gorsel acilamadi: {exc}")
        sys.exit(1)

    # Saydamlik destegi: RGBA moduna cevir (alpha kanali yoksa bile sorunsuz calisir)
    if img.mode in ("RGBA", "LA", "PA"):
        pass  # Zaten alpha kanali var
    elif img.mode == "P":
        # Palette modunda transparency bilgisi olabilir
        if "transparency" in img.info:
            img = img.convert("RGBA")
        else:
            img = img.convert("RGBA")
    else:
        img = img.convert("RGBA")

    img.save(
        output_path,
        format="WEBP",
        quality=100,
        method=6,
        lossless=False,
        exact=False,
    )

    file_size_kb = output_path.stat().st_size / 1024
    print(f"Basarili: {output_path}")
    print(f"Boyut: {file_size_kb:.1f} KB")
    print(f"Cozunurluk: {img.width}x{img.height}")


def main() -> None:
    if len(sys.argv) > 1:
        input_path = sys.argv[1]
    else:
        input_path = input("Gorsel dosya yolunu girin: ")

    convert_to_webp(input_path)


if __name__ == "__main__":
    main()
