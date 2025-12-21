import os

# Files to update
root_files = [
    '/Users/harshith/Desktop/Articlarity.com/contact.html',
    '/Users/harshith/Desktop/Articlarity.com/disclaimer.html',
    '/Users/harshith/Desktop/Articlarity.com/privacy.html',
    # index.html and terms.html are already done
]

subdir_files = [
    '/Users/harshith/Desktop/Articlarity.com/watermark/index.html',
    '/Users/harshith/Desktop/Articlarity.com/humanizer/index.html',
    '/Users/harshith/Desktop/Articlarity.com/qr/index.html',
    '/Users/harshith/Desktop/Articlarity.com/pdf-tools/index.html',
    '/Users/harshith/Desktop/Articlarity.com/case/index.html',
    '/Users/harshith/Desktop/Articlarity.com/img-to-pdf/index.html',
    '/Users/harshith/Desktop/Articlarity.com/universal-merger/index.html',
    '/Users/harshith/Desktop/Articlarity.com/counter/index.html',
    '/Users/harshith/Desktop/Articlarity.com/arranger/index.html',
    '/Users/harshith/Desktop/Articlarity.com/attendance/index.html',
    '/Users/harshith/Desktop/Articlarity.com/pdf-splitter/index.html',
    '/Users/harshith/Desktop/Articlarity.com/pagenumber/index.html',
    '/Users/harshith/Desktop/Articlarity.com/mp4-to-mp3/index.html',
    '/Users/harshith/Desktop/Articlarity.com/compressor/index.html'
]

# Pattern 1: Icon + Text (Standard)
target_block_std = """            <a href="/" class="flex items-center gap-2 group">
                <div
                    class="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
                    A</div>
                <span class="text-xl font-extrabold tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors">Articlarity</span>
            </a>"""

# Pattern 1b: Icon + Text (Standard but with span on new line as seen in watermark)
target_block_std_b = """            <a href="/" class="flex items-center gap-2 group">
                <div
                    class="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
                    A</div>
                <span
                    class="text-xl font-extrabold tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors">Articlarity</span>
            </a>"""

# Pattern 2: Text Only (Simple)
target_block_simple = """            <a href="index.html" class="text-2xl font-bold text-gray-800">Articlarity</a>"""

# Replacement templates
replacement_tmpl = """            <a href="/" class="flex items-center gap-2 group">
                <img src="{path}" alt="Articlarity" class="h-10 w-auto group-hover:scale-105 transition-transform duration-200">
            </a>"""

def update_file(filepath, is_root):
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} (not found)")
        return

    with open(filepath, 'r') as f:
        content = f.read()

    logo_path = "assets/logo.png" if is_root else "../assets/logo.png"
    replacement = replacement_tmpl.format(path=logo_path)
    
    # Try replacing standard block
    new_content = content.replace(target_block_std, replacement)
    
    # Try replacing standard block variant b
    if new_content == content:
        new_content = content.replace(target_block_std_b, replacement)

    # Try replacing simple block (only for root files usually, check first)
    # Note: simple block href often points to index.html, not /
    # For subdirs, the link should probably go to ../index.html or /
    # The simple block usually has href="index.html"
    
    simple_replacement = replacement.replace('href="/"', 'href="index.html"')
    # Check if we need to replace simple block
    if new_content == content:
        new_content = content.replace(target_block_simple, simple_replacement)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"No match found in {filepath}")

print("Starting updates...")
for f in root_files:
    update_file(f, True)
    
for f in subdir_files:
    update_file(f, False)
print("Done.")
