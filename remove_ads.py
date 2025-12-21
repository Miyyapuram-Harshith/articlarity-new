import os
import re

def remove_ads(directory):
    # Regex for the CSS block
    # Matches /* Ad Placeholder Styles */ ... }
    # DOTALL is needed to match across lines
    css_pattern = re.compile(r'/\* Ad Placeholder Styles \*/\s*\.ad-placeholder\s*\{[^}]+\}', re.DOTALL)
    
    # Regex for the HTML blocks
    # content inside div might check for "Advertisement Space" to be safe
    # <div class="ad-placeholder ..."> ... </div>
    # match minimal content inside
    html_pattern = re.compile(r'<div class="ad-placeholder[^"]*"[^>]*>\s*<span>Advertisement Space \(.*?\)</span>\s*</div>', re.DOTALL)

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = css_pattern.sub('', content)
                    new_content = html_pattern.sub('', new_content)

                    if content != new_content:
                        print(f"Updating {path}")
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                except Exception as e:
                    print(f"Error processing {path}: {e}")

if __name__ == "__main__":
    target_dir = "/Users/harshith/Desktop/Articlarity.com"
    remove_ads(target_dir)
