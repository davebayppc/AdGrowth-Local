import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove Home link
    content = re.sub(r'^\s*<li><a href="/AdGrowth-Local/">Home</a></li>\n', '', content, flags=re.MULTILINE)

    # 2. Remove Contact link
    content = re.sub(r'^\s*<li><a href="/AdGrowth-Local/contact/"[^>]*>Contact</a></li>\n', '', content, flags=re.MULTILINE)

    # 3. Add margin to Call Now to separate groups
    content = re.sub(r'<li>(<a href="tel:555-0199")', r'<li style="margin-left: 24px;">\1', content)

    # 4. Flexbox adjustments for layout
    content = content.replace('<nav>', '<nav style="flex-grow: 1;">')
    content = content.replace('<ul class="nav-links">', '<ul class="nav-links" style="justify-content: flex-end;">')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    base_dir = r"c:\Users\David M Bayas\OneDrive\Documents\DAVID DOCS\ANTIGRAVITY\ONLINE ADS TEST SITE"
    for root, dirs, files in os.walk(base_dir):
        if '.git' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
