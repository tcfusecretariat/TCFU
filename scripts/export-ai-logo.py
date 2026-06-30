#!/usr/bin/env python3
"""Export vector SVG from Adobe Illustrator (.ai) PDF-compatible source via PyMuPDF."""
from __future__ import annotations

import argparse
import sys
from pathlib import Path


def export_svg(source: Path, destination: Path, scale: float = 1.0) -> None:
    try:
        import fitz
    except ImportError as exc:  # pragma: no cover
        raise SystemExit(
            "PyMuPDF is required. Run: python3 -m venv .venv-logo && "
            ".venv-logo/bin/pip install pymupdf"
        ) from exc

    doc = fitz.open(str(source))
    if doc.page_count < 1:
        raise SystemExit(f"No pages found in {source}")

    page = doc[0]
    matrix = fitz.Matrix(scale, scale)
    svg = page.get_svg_image(matrix=matrix)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(svg, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="Path to .ai or PDF logo source")
    parser.add_argument("destination", type=Path, help="Output SVG path")
    parser.add_argument(
        "--scale",
        type=float,
        default=1.0,
        help="Export scale factor (default: 1.0, artboard-native size)",
    )
    args = parser.parse_args()

    if not args.source.is_file():
        raise SystemExit(f"Source file not found: {args.source}")

    export_svg(args.source, args.destination, args.scale)
    print(f"Exported {args.destination} from {args.source}")


if __name__ == "__main__":
    main()
