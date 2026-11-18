from html.parser import HTMLParser
from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]


class PortfolioParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.local_refs = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if values.get("id"):
            self.ids.append(values["id"])
        for name in ("href", "src"):
            value = values.get(name)
            if value and not value.startswith(("http:", "https:", "mailto:", "#")):
                self.local_refs.append(value.split("?", 1)[0])


def main():
    index_path = ROOT / "index.html"
    parser = PortfolioParser()
    parser.feed(index_path.read_text(encoding="utf-8"))

    errors = []
    duplicate_ids = sorted({value for value in parser.ids if parser.ids.count(value) > 1})
    if duplicate_ids:
        errors.append("Duplicate IDs: " + ", ".join(duplicate_ids))

    for ref in sorted(set(parser.local_refs)):
        if not (ROOT / ref).exists():
            errors.append("Missing local file: " + ref)

    required_files = ("index.html", "style.css", "script.js", "vercel.json")
    for name in required_files:
        if not (ROOT / name).is_file():
            errors.append("Missing required file: " + name)

    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1

    print(
        f"Validation passed: {len(parser.ids)} IDs, "
        f"{len(set(parser.local_refs))} local references"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
