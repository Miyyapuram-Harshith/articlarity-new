const appRoot = document.getElementById('app-root');
let geminiApiKey = localStorage.getItem('articlarity_api_key') || '';
// Globals
let PDFLib = null;
let jsPDF = null;

// Initialization
// Initialization
function initApp() {
    try {
        if (window.PDFLib) PDFLib = window.PDFLib;
        if (window.jspdf) jsPDF = window.jspdf.jsPDF;
        if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
    } catch (e) {
        console.error("Lib Init Error:", e);
    }
    render();
}
// ===== Google Analytics (GA4) =====
(function () {
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-Z4GEB7P85V';
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', 'G-Z4GEB7P85V', {
    send_page_view: false
  });
})();


// --- TEMPLATES ---

// 1. DASHBOARD (Home) - UPDATED 
const dashboardPage = `
    <div class="max-w-6xl mx-auto space-y-16">
        
        <!-- Hero Section -->
        <div class="text-center py-16 px-4">
            <h1 class="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Smart tools for every mind — <br class="hidden md:block">
                <span class="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">from students to creators</span>
            </h1>
            <p class="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
                A complete suite of free, privacy-focused tools. Process files locally on your device—no uploads, no waiting.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button onclick="document.getElementById('tools-section').scrollIntoView({behavior: 'smooth'})" 
                    class="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all hover:scale-105">
                    🚀 Explore Tools
                </button>
            </div>

            <!-- Popular Tools Links -->
            <p class="text-sm text-slate-500 mt-8 animate-fade-in delay-100">
                <span class="font-semibold text-slate-700">Popular Tools:</span> 
                <a href="/file-merger" class="text-blue-600 hover:underline hover:text-blue-700 transition-colors mx-1">File Merger</a>, 
                <a href="/img-to-pdf" class="text-blue-600 hover:underline hover:text-blue-700 transition-colors mx-1">Image to PDF</a>, 
                <a href="/pdf-compressor" class="text-blue-600 hover:underline hover:text-blue-700 transition-colors mx-1">Compress PDF</a>
            </p>
        </div>
        
        <!-- Tools Grid -->
        <div id="tools-section" class="scroll-mt-24 space-y-12">
            
            <!-- Category: PDF Tools -->
            <div>
                <h3 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span class="bg-red-100 text-red-600 p-2 rounded-lg text-xl">📄</span> PDF Tools
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${createToolCard('Universal Merger', 'Combine PDF, Images, Text, and more.', '/file-merger', '🧩', 'bg-red-50 text-red-600', 'border-red-100 hover:border-red-300')}
                    ${createToolCard('PDF Splitter', 'Extract pages or split into custom ranges.', '/pdf-splitter', '✂️', 'bg-red-50 text-red-600', 'border-red-100 hover:border-red-300')}
                    ${createToolCard('Img to PDF', 'Convert JPG, PNG, etc., to a single PDF.', '/img-to-pdf', '📸', 'bg-red-50 text-red-600', 'border-red-100 hover:border-red-300')}
                    ${createToolCard('PDF Compressor', 'Shrink PDF file size instantly.', '/pdf-compressor', '🗜️', 'bg-red-50 text-red-600', 'border-red-100 hover:border-red-300')}
                    ${createToolCard('PDF Arranger', 'Reorder or delete pages visually.', '/pdf-arranger', '📑', 'bg-red-50 text-red-600', 'border-red-100 hover:border-red-300')}
                    ${createToolCard('Watermark PDF', 'Add customized text watermarks.', '/pdf-watermark', '✒️', 'bg-red-50 text-red-600', 'border-red-100 hover:border-red-300')}
                    ${createToolCard('Page Numberer', 'Add page numbers to PDF documents.', '/page-numberer', '🔢', 'bg-red-50 text-red-600', 'border-red-100 hover:border-red-300')}
                </div>
            </div>

            <!-- Category: Image & Video -->
            <div>
                <h3 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span class="bg-green-100 text-green-600 p-2 rounded-lg text-xl">🖼️</span> Image & Video
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${createToolCard('Smart Img Compressor', 'Compress to specific size (<100KB).', '/image-compressor-100kb', '📉', 'bg-green-50 text-green-600', 'border-green-100 hover:border-green-300')}
                    ${createToolCard('MP4 to MP3', 'Extract audio from video files locally.', '/mp4-to-mp3', '🎵', 'bg-green-50 text-green-600', 'border-green-100 hover:border-green-300')}
                    ${createToolCard('QR Generator', 'Create custom QR codes.', '/qr-generator', '📱', 'bg-green-50 text-green-600', 'border-green-100 hover:border-green-300')}
                </div>
            </div>

            <!-- Category: AI & Text -->
            <div>
                <h3 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span class="bg-purple-100 text-purple-600 p-2 rounded-lg text-xl">🤖</span> AI & Text Tools
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${createToolCard('AI Humanizer', 'Rewrite AI text to sound natural.', '/ai-humanizer', '📝', 'bg-purple-50 text-purple-600', 'border-purple-100 hover:border-purple-300')}
                    ${createToolCard('Case Converter', 'UPPER, lower, Title Case transformations.', '/case-converter', 'Aa', 'bg-purple-50 text-purple-600', 'border-purple-100 hover:border-purple-300')}
                    ${createToolCard('Word Counter Pro', 'Count words, chars, and paragraphs.', '/word-counter', '📊', 'bg-purple-50 text-purple-600', 'border-purple-100 hover:border-purple-300')}
                </div>
            </div>

            <!-- Category: Student Utilities -->
            <div>
                <h3 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span class="bg-yellow-100 text-yellow-600 p-2 rounded-lg text-xl">🎓</span> Utilities
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${createToolCard('Attendance Calc', 'Check if you can skip or need to attend.', '/attendance-calculator', '📅', 'bg-yellow-50 text-yellow-600', 'border-yellow-100 hover:border-yellow-300')}
                </div>
            </div>

        </div>

        <!-- Features / Why Us Section -->
        <section class="grid md:grid-cols-3 gap-8 py-12 border-t border-slate-200">
            <div class="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-4">🔒</div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">Maximum Privacy</h3>
                <p class="text-slate-600">Your files never leave your device. All processing (compression, merging, splitting) happens locally in your browser using WebAssembly.</p>
            </div>
            <div class="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl mb-4">⚡</div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">Lightning Fast</h3>
                <p class="text-slate-600">No upload or download wait times. Because files process on your machine, operations are near-instantaneous even for large documents.</p>
            </div>
            <div class="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl mb-4">💎</div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">Free Forever</h3>
                <p class="text-slate-600">Access premium-grade PDF and Image tools without subscriptions, watermarks, or hidden paywalls. A truly free resource for everyone.</p>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="max-w-3xl mx-auto py-8">
            <h2 class="text-3xl font-bold text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
            
            <div class="space-y-6">
                <div>
                    <h4 class="text-lg font-bold text-slate-900 mb-2">Is Articlarity really free?</h4>
                    <p class="text-slate-600">Yes, Articlarity is 100% free to use. We support the platform through unintrusive advertisements, allowing us to keep these tools accessible to students and creators worldwide.</p>
                </div>
                <div>
                    <h4 class="text-lg font-bold text-slate-900 mb-2">Are my files secure?</h4>
                    <p class="text-slate-600">Absolutely. Unlike other online converters, we do not upload your files to a cloud server. Everything is processed directly on your computer, tablet, or phone. This means your sensitive documents remain private.</p>
                </div>
                <div>
                    <h4 class="text-lg font-bold text-slate-900 mb-2">Do I need an account?</h4>
                    <p class="text-slate-600">No account or login is required. You can start using any tool instantly.</p>
                </div>
                <div>
                    <h4 class="text-lg font-bold text-slate-900 mb-2">What is the AI Humanizer?</h4>
                    <p class="text-slate-600">The AI Humanizer uses advanced language models to rewrite AI-generated text (from ChatGPT, Claude, etc.) into more natural, human-sounding language. It requires your own API key to function securely locally.</p>
                </div>
            </div>
        </section>

    </div>
`;

function createToolCard(title, desc, link, icon, iconBg = 'bg-blue-50 text-blue-600', borderClass = 'border-gray-200') {
    return `
    <a href="${link}" class="tool-card block bg-white p-6 rounded-xl border ${borderClass} shadow-sm hover:shadow-md transition-all group">
        <div class="w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">${icon}</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">${title}</h3>
        <p class="text-gray-500 text-sm leading-relaxed">${desc}</p>
    </a>`;
}

// 2. UNIVERSAL MERGER (UPDATED TEMPLATE)
const universalMergerPage = `
    <div class="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <!-- Tool Interface -->
        <div class="mb-16">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">Universal Visual Merger</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-3xl">
                The ultimate file combiner. Merge PDF files, Images (JPG, PNG), and Text documents into a single, organized PDF file. 
                <span class="text-blue-600 font-bold">Drag and drop</span> to reorder pages visually before merging.
            </p>
            
            <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div class="flex gap-4 mb-8">
                    <label class="flex-1 cursor-pointer bg-white border-2 border-dashed border-blue-400 hover:bg-blue-50 rounded-xl flex flex-col items-center justify-center p-8 transition-all group shadow-sm hover:shadow-md h-64">
                        <span class="text-5xl mb-4 group-hover:scale-110 transition-transform">📂</span>
                        <span class="font-bold text-xl text-slate-700 group-hover:text-blue-700">Click to Select Files</span>
                        <span class="text-sm text-slate-500 mt-2">PDF, JPG, PNG, TXT supported</span>
                        <input type="file" id="universal-merger-input" accept=".pdf, image/*, text/plain" multiple class="hidden">
                    </label>
                </div>

                <div id="merger-status" class="hidden p-4 mb-6 bg-blue-100 text-blue-800 rounded-lg font-bold text-center animate-pulse border border-blue-200">
                    Processing files...
                </div>

                <div id="merger-ui" class="hidden">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="font-bold text-gray-700 text-lg">Pages Ready to Merge (<span id="merger-page-count" class="text-blue-600">0</span>)</h3>
                        <button onclick="document.getElementById('universal-merger-input').click()" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-bold shadow-sm transition-colors text-sm">
                            + Add More Files
                        </button>
                    </div>
                    
                    <div id="merger-grid" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                        <!-- Thumbnails -->
                    </div>

                    <button id="btn-universal-merge" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-xl hover:shadow-lg transition-all hover:scale-[1.01] shadow-blue-500/30">
                        Merge & Download PDF 🚀
                    </button>
                </div>
                
                <a id="merger-download-link" class="hidden block w-full bg-green-500 text-white text-center py-4 rounded-xl font-bold text-xl hover:bg-green-600 mt-6 shadow-lg shadow-green-500/30 transition-all" href="#" download="merged_articlarity.pdf">
                    Download Ready! 🎉
                </a>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Why is this Unique?</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Cross-Format:</strong> Most mergers only do PDF+PDF. We allow PDF+Image+Text mixing.</li>
                <li><strong>Control:</strong> Visual sorting allows you to arrange the final document order perfectly.</li>
                <li><strong>Privacy:</strong> All merging happens in your browser memory.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">How it works</h3>
            <ol class="list-decimal pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Select Files:</strong> Pick any combination of PDFs, Photos, or Notes.</li>
                <li><strong>Rearrange:</strong> Drag files to set the order.</li>
                <li><strong>Merge:</strong> Click button to generate the unified PDF.</li>
            </ol>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Can I merge a JPG with a PDF?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    Yes! The tool automatically converts the image to a PDF page and stitches it into the final document.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

// 3. IMAGE TO PDF CONVERTER
const imgToPdfPage = `
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">Image to PDF Converter</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                Convert your photos (JPG, PNG, GIF, BMP, WebP) into a high-quality PDF document. 
                Great for creating portfolios, sharing photo albums, or submitting scanned assignments.
            </p>
            
            <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <div class="flex gap-4 mb-6">
                    <label class="flex-1 cursor-pointer bg-white border-2 border-dashed border-blue-400 hover:bg-blue-50 rounded-xl flex flex-col items-center justify-center p-8 transition-all shadow-sm hover:shadow-md h-48">
                        <span class="text-4xl mb-4 group-hover:scale-110 transition-transform">📸</span>
                        <span class="font-bold text-blue-700 text-lg">Add Images</span>
                        <span class="text-sm text-blue-400 mt-1">JPG, PNG, GIF, WEBP</span>
                        <input type="file" id="img-to-pdf-input" accept="image/*" multiple class="hidden">
                    </label>
                </div>

                <div id="img-to-pdf-ui" class="hidden">
                    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 gap-4">
                         <div class="flex items-center gap-4">
                            <span class="font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">Images: <span id="img-count" class="text-blue-600">0</span></span>
                            <select id="pdf-size" class="border-gray-200 bg-gray-50 border p-2 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="a4">PDF Format: A4</option>
                                <option value="letter">PDF Format: US Letter</option>
                                <option value="fit">Fit to Image Size</option>
                            </select>
                         </div>
                         <button onclick="document.getElementById('img-to-pdf-input').click()" class="text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-200 transition-colors">
                            + Add More
                         </button>
                    </div>

                    <div id="img-grid" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <!-- Thumbnails -->
                    </div>
                    
                    <button id="btn-convert-to-pdf" class="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20">
                        Convert to PDF & Download
                    </button>
                </div>
                
                <div id="img-to-pdf-status" class="hidden mt-4 text-center font-bold text-gray-600 p-3 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Features</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Multiple Files:</strong> Select 100+ images at once.</li>
                <li><strong>Auto-Fit:</strong> Automatically adjusts image to fit A4 page size nicely.</li>
                <li><strong>Visual Order:</strong> Images are added in the order you select them.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">Supported Formats</h3>
             <div class="flex gap-2 flex-wrap mb-8">
                <span class="bg-gray-100 px-3 py-1 rounded text-sm font-bold text-gray-600">JPG</span>
                <span class="bg-gray-100 px-3 py-1 rounded text-sm font-bold text-gray-600">PNG</span>
                <span class="bg-gray-100 px-3 py-1 rounded text-sm font-bold text-gray-600">WEBP</span>
                <span class="bg-gray-100 px-3 py-1 rounded text-sm font-bold text-gray-600">GIF</span>
            </div>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Does it compress files?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    The tool maintains high quality by default. If you need smaller size, use our "PDF Compressor" tool after converting.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

// 4. PDF SPLITTER
const pdfSplitterPage = `
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">PDF Splitter</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                Split a large PDF document into separate pages or extract specific page ranges (e.g., Pages 1-5). 
                Save only what you need and discard the rest.
            </p>
            
            <div class="bg-red-50 p-6 rounded-2xl border border-red-100">
                <input type="file" id="split-input" accept=".pdf" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-red-700 hover:file:bg-red-100 mb-6 cursor-pointer shadow-sm">
                
                <div class="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm">
                    <div>
                        <label class="font-bold flex items-center gap-2 mb-2">
                            <input type="radio" name="split-mode" value="all" checked class="accent-red-600 w-5 h-5"> 
                            Extract All Pages
                        </label>
                        <p class="text-xs text-gray-500 ml-7">Creates a ZIP file containing every single page as a separate PDF.</p>
                    </div>
                    <div>
                        <label class="font-bold flex items-center gap-2 mb-2">
                            <input type="radio" name="split-mode" value="range" class="accent-red-600 w-5 h-5"> 
                            Extract Range
                        </label>
                        <input id="split-range" placeholder="e.g. 1-5, 8, 10-12" class="w-full border-2 border-gray-200 p-2 rounded-lg ml-7 mt-1 focus:border-red-500 outline-none" disabled>
                    </div>
                </div>

                <div id="split-status" class="hidden mt-4 text-center font-bold text-red-600 animate-pulse">Processing split...</div>

                <button id="btn-split" class="w-full mt-6 bg-red-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all hover:scale-[1.01]">
                    Split PDF ✂️
                </button>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Use Cases</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Legal:</strong> Extract specific contract pages.</li>
                <li><strong>Books:</strong> Split a large ebook into chapters.</li>
                <li><strong>Invoices:</strong> Separate bulk invoices into individual files.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">Methods</h3>
             <div class="grid md:grid-cols-2 gap-4 mb-8">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-bold text-red-700">Explode</h4>
                    <p class="text-sm">Turn a 10-page PDF into 10 separate files instantly.</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-bold text-red-700">Custom Extract</h4>
                    <p class="text-sm">Pick specific pages like "1,3,5" to create a new summarized PDF.</p>
                </div>
            </div>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Is it secure?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    Yes. Unlike server-side splitters, we don't upload your document. It is cut locally.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;
// ... (Attendance, Compressor, PDF Compressor, Humanizer, Password, etc. pages are unchanged) ...
const attendancePage = `
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">Attendance Calculator</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                Attendance Calc is a smart, browser-based attendance calculator that helps students check whether they need to attend or can safely skip classes. 
                Just enter your attended classes and total classes, and the tool instantly tells you your percentage.
            </p>
            
            <div class="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 max-w-lg mx-auto">
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Total Classes Conducted</label>
                        <input type="number" id="att-total" class="w-full border-2 border-gray-200 p-4 rounded-xl text-xl font-bold focus:border-yellow-500 outline-none" placeholder="e.g. 50">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Classes Attended</label>
                        <input type="number" id="att-present" class="w-full border-2 border-gray-200 p-4 rounded-xl text-xl font-bold focus:border-yellow-500 outline-none" placeholder="e.g. 40">
                    </div>
                    <div>
                         <label class="block text-sm font-bold text-gray-700 mb-2">Target Percentage</label>
                        <input type="number" id="att-target" class="w-full border-2 border-gray-200 p-4 rounded-xl text-xl font-bold focus:border-yellow-500 outline-none" value="75">
                    </div>
                </div>

                <div class="mt-8 space-y-4">
                    <button id="btn-calc-attendance" class="w-full bg-yellow-500 text-white py-4 rounded-xl font-bold text-xl hover:bg-yellow-600 shadow-lg shadow-yellow-500/20 transition-all hover:scale-[1.01]">
                        Calculate Status 📊
                    </button>
                    <div id="att-result" class="hidden p-6 bg-white rounded-xl border border-yellow-200 text-center shadow-sm">
                         <p class="text-sm text-gray-500 uppercase tracking-wide font-semibold">Current Attendance</p>
                         <h3 id="att-percentage" class="text-4xl font-extrabold text-blue-600 my-2">0%</h3>
                        <div id="att-message" class="text-lg font-medium mt-4 p-3 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Why use Attendance Calculator?</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-6">
                <li><strong>Avoid Shortages:</strong> Avoid attendance shortages and detentions.</li>
                <li><strong>Plan Leaves:</strong> Plan whether you can miss tomorrow’s class safely.</li>
                <li><strong>Meet Criteria:</strong> Helps maintain above 75% attendance rule mandated by most universities.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">Key Features</h3>
            <div class="grid md:grid-cols-3 gap-4 mb-8">
                 <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h4 class="font-bold text-slate-800">Instant</h4>
                    <p class="text-sm text-slate-600">Calculates percentage instantly.</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h4 class="font-bold text-slate-800">Predictive</h4>
                    <p class="text-sm text-slate-600">tells you how many classes to attend.</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h4 class="font-bold text-slate-800">Private</h4>
                    <p class="text-sm text-slate-600">No login required, works offline.</p>
                </div>
            </div>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer mb-2">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Is this accurate for universities?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    Yes. It works with any attendance rule: 75%, 80%, etc. Just adjust the target percentage.
                </div>
            </details>
            <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Does it work offline?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    Yes — all calculation happens in your browser.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;
const compressorPage = `
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">Smart Image Compressor</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                Smart Image Compressor reduces image file size to a specific target — including under 100KB — while preserving clarity. 
                Perfect for uploading documents, college forms, job portals, and online submissions.
            </p>
            
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                <div id="drop-zone" class="bg-white border-2 border-dashed border-green-400 rounded-xl p-10 text-center cursor-pointer hover:bg-green-50 transition-colors shadow-sm">
                    <span class="text-5xl block mb-2">📉</span>
                    <p class="text-xl font-bold text-green-700">Click or Drag Image</p>
                    <p class="text-sm text-green-500 mt-1">JPG, PNG, WEBP supported</p>
                    <input type="file" id="img-input" class="hidden" accept="image/*">
                </div>

                <div id="img-controls" class="hidden mt-8 space-y-6 bg-white p-6 rounded-xl shadow-sm">
                    <div class="flex gap-2 p-1 bg-gray-100 rounded-lg">
                        <button id="mode-manual" class="flex-1 py-2 rounded-md bg-white shadow-sm text-sm font-bold text-gray-800 transition-all">Manual Control</button>
                        <button id="mode-auto" class="flex-1 py-2 rounded-md text-gray-500 text-sm font-bold hover:bg-gray-200 transition-all">Target Size (KB)</button>
                    </div>

                    <!-- Manual UI -->
                    <div id="manual-ui">
                        <div class="flex justify-between mb-2">
                            <label class="font-bold text-gray-700">Quality Level</label>
                            <span class="font-mono bg-blue-100 text-blue-800 px-2 rounded"><span id="qual-val">80</span>%</span>
                        </div>
                        <input type="range" id="qual-slider" min="1" max="100" value="80" class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600">
                        <p class="text-xs text-gray-400 mt-2 text-right">Lower % = Smaller Size</p>
                    </div>

                    <!-- Auto UI -->
                    <div id="auto-ui" class="hidden">
                        <label class="block text-sm font-bold text-gray-700 mb-2">Target File Size (KB)</label>
                        <div class="flex gap-2">
                            <input type="number" id="target-kb" value="100" class="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-green-500 outline-none" placeholder="e.g. 50">
                            <button id="btn-auto-compress" class="bg-green-600 text-white px-6 rounded-lg font-bold hover:bg-green-700">Go</button>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">We will try to reduce quality until it fits this size.</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4 text-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div>
                            <p class="text-xs text-gray-500 uppercase font-bold tracking-wider">Original</p>
                            <p id="orig-size" class="text-lg font-bold text-slate-700">0 KB</p>
                        </div>
                        <div class="border-l border-slate-200">
                            <p class="text-xs text-gray-500 uppercase font-bold tracking-wider">Compressed</p>
                            <p id="new-size" class="text-lg font-bold text-green-600">0 KB</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row gap-4">
                        <a id="dl-img-btn" class="flex-1 block bg-green-600 text-white text-center py-4 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-600/20 transition-transform hover:scale-[1.02] cursor-pointer">
                            Download Image 💾
                        </a>
                        <button id="preview-img-btn" class="flex-1 bg-gray-800 text-white text-center py-4 rounded-xl font-bold hover:bg-gray-900 shadow-lg transition-transform hover:scale-[1.02]">
                            Compare Preview 👁️
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
             <h3 class="text-2xl font-bold text-slate-900 mb-4">Why is this useful?</h3>
             <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-6">
                <li><strong>Portals:</strong> Many portals demand under 100KB photos.</li>
                <li><strong>Speed:</strong> Faster uploads on slow networks.</li>
                <li><strong>Storage:</strong> Save space on your device.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">Key Features</h3>
            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div class="flex gap-4">
                    <span class="text-2xl">🎯</span>
                    <div>
                        <h4 class="font-bold text-slate-800">Target Size Mode</h4>
                        <p class="text-sm text-slate-600">Compress specific KB size (e.g. 50KB) magically.</p>
                    </div>
                </div>
                <div class="flex gap-4">
                     <span class="text-2xl">⚡</span>
                    <div>
                        <h4 class="font-bold text-slate-800">Instant Preview</h4>
                        <p class="text-sm text-slate-600">Compare before and after side-by-side.</p>
                    </div>
                </div>
            </div>
            
            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Does quality drop?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    Minimal — the tool balances sharpness and size.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;
const pdfPage = `
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">PDF Compressor</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                PDF Compressor reduces the size of heavy PDF documents without ruining text clarity or image quality. 
                Perfect for job portals, online submissions, academic work, and email attachments that demand specific size limits.
            </p>
            
            <div class="bg-red-50 p-6 rounded-2xl border border-red-100">
                <input type="file" id="pdf-input" accept=".pdf" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-red-700 hover:file:bg-red-100 mb-6 cursor-pointer">
                
                <div id="pdf-status" class="hidden">
                    <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div id="pdf-progress" class="bg-red-600 h-2.5 rounded-full" style="width: 0%"></div>
                    </div>
                    <p id="pdf-status-text" class="text-sm text-center text-gray-600">Processing...</p>
                </div>

                <!-- Quality Slider -->
                <div class="mb-6 mt-4 p-4 bg-white rounded-xl border border-red-100">
                    <label class="block text-sm font-bold text-gray-700 mb-2">
                        Compression Aggressiveness: <span id="pdf-qual-val" class="text-red-600">70</span>%
                    </label>
                    <input type="range" id="pdf-qual-slider" min="10" max="100" value="70" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600">
                    <p class="text-xs text-gray-500 mt-2">Lower % = Smaller File Size. 70% is recommended for balanced quality.</p>
                </div>

                <!-- Size Comparison UI -->
                <div class="grid grid-cols-2 gap-4 text-center bg-white p-4 rounded-lg mt-4 mb-4 border border-red-100">
                    <div><p class="text-xs text-gray-500 uppercase tracking-widest">Original Size</p><p id="pdf-orig-size" class="font-bold text-gray-800">0 KB</p></div>
                    <div class="border-l border-red-100"><p class="text-xs text-green-600 uppercase tracking-widest">Compressed</p><p id="pdf-new-size" class="font-bold text-green-600">0 KB</p></div>
                </div>

                <div id="pdf-actions" class="hidden flex flex-col sm:flex-row gap-4 mt-6">
                    <a id="dl-pdf-btn" class="flex-1 block bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-4 rounded-xl font-bold shadow-lg shadow-red-600/30 hover:scale-[1.01] transition-all cursor-pointer" download>Download PDF 💾</a>
                    <button id="preview-pdf-btn" class="flex-1 bg-gray-800 text-white text-center py-4 rounded-xl font-bold hover:bg-gray-900 shadow-lg">Preview 👀</button>
                </div>
                
                <div id="pdf-computing" class="hidden text-center mt-4">
                    <p class="text-sm font-semibold text-red-600 animate-pulse">Calculating Size...</p>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Advantages</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Resolution:</strong> Keeps resolution readable while discarding unused data.</li>
                <li><strong>Privacy:</strong> Works offline inside browser.</li>
                <li><strong>Engine:</strong> Fast compression engine suitable for large multi-page documents.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">How to Operate</h3>
            <ol class="list-decimal pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Upload PDF:</strong> Select your file.</li>
                <li><strong>Select Level:</strong> Use the slider to choose how much to compress.</li>
                <li><strong>Save:</strong> Download the compressed file instantly.</li>
            </ol>
            
            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Is quality compromised?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    Only minimal — the tool balances size and clarity intelligently. You can use the slider to control this balance.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;
const humanizerPage = `
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">AI Text Humanizer</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                AI Humanizer rewrites AI-generated text into natural, human-sounding language. 
                Whether you use ChatGPT, Gemini, Claude or Copilot, this tool removes robotic tone and fixes repetition.
            </p>
            
            <div class="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                <div class="mb-6">
                    <label class="block text-sm font-bold text-gray-700 mb-2">Enter your Gemini API Key <span class="text-gray-400 font-normal">(stored locally in browser)</span></label>
                    <div class="flex gap-2">
                         <input type="password" id="api-key" class="flex-1 border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 outline-none" placeholder="AIzaSy...">
                         <button onclick="saveKey()" class="bg-gray-800 text-white px-6 rounded-xl font-bold hover:bg-gray-900">Save</button>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Input AI Text</label>
                        <textarea id="human-input" class="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none resize-none transition-all" placeholder="Paste ChatGPT text here..."></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Humanized Result</label>
                        <div id="human-result" class="w-full h-64 p-4 bg-white border border-gray-200 rounded-xl overflow-y-auto text-gray-600 italic whitespace-pre-wrap">Result will appear here...</div>
                    </div>
                </div>

                <button id="btn-humanize" class="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-xl hover:shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.01]">
                    ✨ Humanize Text
                </button>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Why use AI Humanizer?</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Natural Flow:</strong> Makes AI text look written by a real person.</li>
                <li><strong>Emotion:</strong> Improves emotion, flow & sentence structure.</li>
                <li><strong>Anti-Detection:</strong> Avoid robotic rhythm & repetitive vocab to protect against AI plagiarism checks.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">Who is this for?</h3>
            <div class="grid md:grid-cols-2 gap-4 mb-8">
                <div class="bg-white border rounded-lg p-4">
                    <span class="font-bold text-purple-700">Students</span>
                    <p class="text-sm">For assignments and reports.</p>
                </div>
                <div class="bg-white border rounded-lg p-4">
                    <span class="font-bold text-purple-700">Creators</span>
                    <p class="text-sm">For captions and scripts.</p>
                </div>
            </div>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Will this pass university AI checks?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    It improves originality significantly. However, users must always verify before submission.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

const pdfArrangerPage = `
    <div class="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">PDF Arranger</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                PDF Arranger allows users to reorder, rotate, or delete specific PDF pages using a visual interface. 
                Perfect for restructuring scanned documents, preparing exam notes, or adjusting PDF layouts before printing.
            </p>
            
            <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <input type="file" id="arranger-input" accept=".pdf" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-blue-700 hover:file:bg-blue-100 mb-6 cursor-pointer shadow-sm">
        
                <div id="arranger-status" class="hidden text-center text-blue-600 font-bold mb-4 animate-pulse">Loading pages...</div>
        
                <div id="arranger-ui" class="hidden">
                    <div class="flex justify-between items-center mb-4">
                        <p class="text-sm font-bold text-slate-500">Drag to reorder • Click 'X' to delete</p>
                        <button id="btn-save-arranger" class="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all">Save & Download PDF</button>
                    </div>
                    <div id="arranger-grid" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6 min-h-[200px] border-2 border-dashed border-gray-300 rounded-xl p-4 bg-white/50">
                        <!-- Thumbnails go here -->
                    </div>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Benefits</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Drag & Drop:</strong> Simple visual reordering.</li>
                <li><strong>Preview:</strong> See exactly what you are changing in real-time.</li>
                <li><strong>Secure:</strong> Offline secure editing on your device.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">Steps</h3>
             <ol class="list-decimal pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Upload PDF:</strong> Select your file.</li>
                <li><strong>Organize:</strong> Drag pages into new order or delete unwanted ones.</li>
                <li><strong>Save:</strong> Download the rearranged file.</li>
            </ol>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Does rearranging reduce quality?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    No — the original PDF quality is preserved.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

const watermarkPage = `
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">Add Watermark to PDF</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                Watermark PDF helps you add custom text watermarks to documents. 
                Ideal for branding, copyright protection, draft labels, and secure sharing.
            </p>
            
            <div class="grid md:grid-cols-2 gap-8 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <div>
                     <input type="file" id="watermark-input" accept=".pdf" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-blue-700 hover:file:bg-blue-100 mb-6 cursor-pointer shadow-sm">
                     
                     <div class="space-y-4 bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                        <div>
                            <label class="block font-bold mb-1 text-gray-700 text-sm">Watermark Text</label>
                            <input id="wm-text" type="text" value="CONFIDENTIAL" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:border-blue-500 outline-none">
                        </div>
                        <div class="flex gap-4">
                            <div class="flex-1">
                                <label class="block font-bold mb-1 text-gray-700 text-sm">Size</label>
                                <input id="wm-size" type="number" value="50" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:border-blue-500 outline-none">
                            </div>
                            <div class="flex-1">
                                <label class="block font-bold mb-1 text-gray-700 text-sm">Opacity (0-1)</label>
                                <input id="wm-opacity" type="number" value="0.5" step="0.1" max="1" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:border-blue-500 outline-none">
                            </div>
                        </div>
                        <div>
                             <label class="block font-bold mb-1 text-gray-700 text-sm">Rotation: <span id="wm-rot-val">45 deg</span></label>
                             <input id="wm-rotation" type="range" min="0" max="360" value="45" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600">
                        </div>
                        <div>
                            <label class="block font-bold mb-1 text-gray-700 text-sm">Color</label>
                            <input id="wm-color" type="color" value="#ff0000" class="w-full border p-1 rounded h-10 cursor-pointer">
                        </div>
                     </div>

                     <button id="btn-apply-watermark" class="w-full bg-blue-600 text-white py-4 rounded-xl font-bold mt-6 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.01]">Apply Watermark</button>
                </div>
                
                <div class="flex flex-col gap-4">
                    <div class="bg-gray-200 rounded-xl flex items-center justify-center p-4 relative overflow-hidden h-[400px] border-2 border-dashed border-gray-300">
                         <div id="wm-placeholder" class="text-gray-400 text-center absolute z-0">
                            <div class="text-4xl mb-2">👁️</div>
                            <p class="font-bold">Preview Area</p>
                         </div>
                         <canvas id="wm-preview-canvas" class="border shadow-lg relative z-10 hidden max-h-full max-w-full bg-white"></canvas>
                         <div id="wm-status" class="hidden absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">Processing...</div>
                    </div>
                    
                    <div id="wm-result-actions" class="hidden w-full flex gap-4">
                        <button id="btn-wm-preview" class="flex-1 bg-gray-700 text-white py-3 rounded-lg font-bold hover:bg-gray-800 shadow">Full Screen</button>
                        <a id="btn-wm-download" class="flex-1 block bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-3 rounded-lg font-bold hover:shadow-lg transition-all" download>Download PDF</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Main Highlights</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Custom:</strong> Custom input, font size, and color.</li>
                <li><strong>Privacy:</strong> Offline processing means no one sees your confidential files.</li>
                <li><strong>Free:</strong> Unlimited document usage.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">How to Apply</h3>
             <ol class="list-decimal pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Load PDF:</strong> Upload the document securely.</li>
                <li><strong>Customize:</strong> Type your text (e.g. DRAFT), choose opacity and rotation.</li>
                <li><strong>Download:</strong> Get your protected file instantly.</li>
            </ol>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Can I place watermark diagonally?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    Yes — just use the rotation slider to set it to 45 degrees or any other angle.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

const mp4ToMp3Page = `
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">MP4 to MP3 Audio Extractor</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                This converter extracts clear MP3 audio from MP4 videos — perfect for lectures, background audio, music clips, and voice recordings.
                Works entirely in your browser using secure WebAssembly technology.
            </p>
            
            <div class="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
                <div id="mp3-drop-zone" class="bg-white border-2 border-dashed border-indigo-300 rounded-xl p-12 text-center cursor-pointer hover:bg-indigo-50 transition-colors shadow-sm">
                    <p class="text-5xl mb-4">🎵</p>
                    <p class="text-xl font-bold text-indigo-700 mb-1">Click or Drag MP4 Video</p>
                    <p class="text-sm text-indigo-400">Supports .mp4 files up to 2GB (Browser Limit)</p>
                    <input type="file" id="mp4-input" class="hidden" accept=".mp4">
                </div>

                <div id="mp3-status" class="hidden mt-8">
                    <div class="flex justify-between text-sm font-bold text-indigo-800 mb-1">
                        <span>Processing Audio...</span>
                        <span id="mp3-percent">0%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div id="mp3-progress" class="bg-indigo-600 h-3 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                    <p id="mp3-status-text" class="text-xs text-center text-gray-500 mt-2">Initializing FFmpeg Engine (this may take a moment first time)...</p>
                </div>

                <div id="mp3-result" class="hidden mt-8 text-center space-y-6 bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div class="text-green-500 text-5xl mb-2">✓</div>
                    <h3 class="text-xl font-bold text-gray-800">Conversion Complete!</h3>
                    
                    <audio id="mp3-player" controls class="w-full outline-none"></audio>
                    
                    <a id="mp3-download" class="inline-block w-full sm:w-auto bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-600/20 transition-transform hover:scale-105 cursor-pointer">
                        Download MP3 Audio
                    </a>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Key Advantages</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Fast Extraction:</strong> Get audio in seconds without uploading.</li>
                <li><strong>Quality:</strong> Keeps original sound quality intact (no re-encoding loss).</li>
                <li><strong>Secure:</strong> No watermarks, no ads, no server uploads.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">How to Convert MP4 to MP3</h3>
            <ol class="list-decimal pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Upload MP4:</strong> Select your video file.</li>
                <li><strong>Convert:</strong> The tool automatically processes the audio track.</li>
                <li><strong>Save:</strong> Click download to save the .mp3 file to your device.</li>
            </ol>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Does conversion change pitch?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    No. The audio remains exactly as it was in the original video.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

const qrGeneratorPage = `
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">QR Code Generator</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                Create instant QR codes for URLs, text, Wi-Fi passwords, or emails. 
                Customizable, fast, and secure. Download in high resolution.
            </p>
            
            <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center">
                 <input id="qr-in" class="w-full border-2 border-gray-200 p-4 rounded-xl mb-6 outline-none focus:border-green-500 text-lg" placeholder="Enter link or text here (e.g. https://google.com)">
                
                <button onclick="genQR()" class="w-full sm:w-auto bg-green-600 text-white px-10 py-3 rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all hover:scale-[1.05]">
                    Generate QR Code 📱
                </button>

                <div id="qr-out" class="mt-8 flex justify-center min-h-[200px] items-center">
                    <p class="text-gray-400 italic">QR Code will appear here...</p>
                </div>
                
                <a id="qr-download" class="hidden inline-block mt-6 text-green-600 font-bold border-2 border-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors cursor-pointer" download="qrcode.png">
                    Download PNG ⬇️
                </a>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Uses</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Business:</strong> Website links on business cards.</li>
                <li><strong>Wi-Fi:</strong> Share network login easily.</li>
                <li><strong>Events:</strong> Ticket scanning or info sheets.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Does it expire?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    No. These are static QR codes. They work forever as long as the link works.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

const pageNumberPage = `
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">Add Page Numbers to PDF</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                Insert page numbers into your PDF document instantly. 
                Choose position, style, and font size. Essential for legal bundles and thesis submissions.
            </p>
            
            <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <input type="file" id="pagenum-input" accept=".pdf" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-blue-700 hover:file:bg-blue-100 mb-6 cursor-pointer shadow-sm">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm border border-blue-100 mb-6">
                    <div>
                        <label class="block font-bold mb-2 text-sm text-gray-700">Position</label>
                        <select id="pg-pos" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:border-blue-500 outline-none">
                            <option value="bottom-center">Bottom Center</option>
                            <option value="bottom-right">Bottom Right</option>
                            <option value="bottom-left">Bottom Left</option>
                            <option value="top-center">Top Center</option>
                            <option value="top-right">Top Right</option>
                            <option value="top-left">Top Left</option>
                        </select>
                    </div>
                    <div>
                        <label class="block font-bold mb-2 text-sm text-gray-700">Format</label>
                        <select id="pg-fmt" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:border-blue-500 outline-none">
                            <option value="nb">1</option>
                            <option value="pg_nb">Page 1</option>
                            <option value="nb_of_total">1 of n</option>
                            <option value="pg_nb_of_total">Page 1 of n</option>
                        </select>
                    </div>
                     <div>
                        <label class="block font-bold mb-2 text-sm text-gray-700">Font Size</label>
                        <input type="number" id="pg-size" value="12" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:border-blue-500 outline-none">
                    </div>
                    <div>
                         <label class="block font-bold mb-2 text-sm text-gray-700">Start Number</label>
                        <input type="number" id="pg-start" value="1" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:border-blue-500 outline-none">
                    </div>
                </div>
        
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                         <button id="btn-add-pagenums" class="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 mb-4 shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.01]">
                            Insert Numbers 🔢
                         </button>
                         <div id="pg-result-actions" class="hidden flex gap-4">
                             <a id="btn-pg-download" class="flex-1 block bg-green-600 text-white text-center py-3 rounded-xl font-bold hover:bg-green-700 shadow cursor-pointer" download>Download PDF</a>
                             <button id="btn-pg-preview" class="flex-1 bg-gray-700 text-white text-center py-3 rounded-xl font-bold hover:bg-gray-800 shadow">Preview</button>
                        </div>
                    </div>
                    <div class="bg-gray-200 rounded-xl flex items-center justify-center p-4 h-[250px] relative border-2 border-dashed border-gray-300">
                        <div id="pg-placeholder" class="text-gray-400 text-center absolute z-0 flex flex-col items-center">
                            <span class="text-4xl mb-2">👁️</span>
                            <span>Preview</span>
                        </div>
                        <canvas id="pg-preview-canvas" class="border shadow-lg hidden max-h-full max-w-full relative z-10 bg-white"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Features</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Customizable:</strong> Choose font size and starting number.</li>
                <li><strong>Flexible:</strong> Formats like "Page 1 of 50" supported.</li>
                <li><strong>Secure:</strong> Does not upload your document anywhere.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Does it overwrite existing numbers?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    It simply adds text on top. If your document already has conflicting numbers, try cropping them first (feature coming soon!).
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

const caseConverterPage = `
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">Case Converter</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                Convert text between Uppercase, Lowercase, Title Case, Sentence Case, and more instantly. 
                Perfect for fixing accidentally capslocked text or formatting titles for blogs.
            </p>
            
            <div class="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                <textarea id="case-input" class="w-full h-48 p-4 border-2 border-purple-200 rounded-xl focus:border-purple-500 outline-none mb-4 text-lg" placeholder="Type or paste your text here to convert..."></textarea>
                
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    <button onclick="convertCase('upper')" class="bg-white border border-purple-200 text-purple-700 font-bold py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all">UPPERCASE</button>
                    <button onclick="convertCase('lower')" class="bg-white border border-purple-200 text-purple-700 font-bold py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all">lowercase</button>
                    <button onclick="convertCase('title')" class="bg-white border border-purple-200 text-purple-700 font-bold py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all">Title Case</button>
                    <button onclick="convertCase('sentence')" class="bg-white border border-purple-200 text-purple-700 font-bold py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all">Sentence case</button>
                    <button onclick="convertCase('alternating')" class="bg-white border border-purple-200 text-purple-700 font-bold py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all">aLtErNaTiNg</button>
                    <button onclick="convertCase('inverse')" class="bg-white border border-purple-200 text-purple-700 font-bold py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all">iNVERSE</button>
                     <button onclick="copyCase()" class="col-span-2 sm:col-span-1 md:col-span-2 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 shadow-md">Copy Result 📋</button>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Available Modes</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>UPPERCASE:</strong> Converts all letters to capitals.</li>
                <li><strong>lowercase:</strong> Converts all letters to small case.</li>
                <li><strong>Title Case:</strong> Capitalizes The First Letter Of Each Word.</li>
                <li><strong>Sentence case:</strong> Capitalizes only the first letter of sentences.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">Why use this?</h3>
            <p class="text-slate-700 mb-6">
                Developers use it to format constants. Writers use it for headlines. Students use it to fix essays typed with Caps Lock on.
            </p>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Does it keep my formatting?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    It affects letters only. Numbers, punctuation and spacing remain exactly as they were.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

const wordCounterPage = `
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">Word Counter Pro</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                Count words, characters (with and without spaces), sentences, and paragraphs in real-time. 
                Essential for essays, blog posts, and social media captions (X/Twitter, Instagram).
            </p>
            
            <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <textarea id="wc-input" class="w-full h-64 p-4 border-2 border-blue-200 rounded-xl focus:border-blue-500 outline-none mb-6 text-lg" placeholder="Start typing or paste your document here..."></textarea>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-white p-4 rounded-xl shadow-sm md:col-span-1 border border-blue-100 text-center">
                        <span id="wc-words" class="block text-4xl font-extrabold text-blue-600">0</span>
                        <span class="text-xs text-gray-400 font-bold uppercase tracking-wider">Words</span>
                    </div>
                    <div class="bg-white p-4 rounded-xl shadow-sm md:col-span-1 border border-blue-100 text-center">
                        <span id="wc-chars" class="block text-4xl font-extrabold text-blue-600">0</span>
                        <span class="text-xs text-gray-400 font-bold uppercase tracking-wider">Characters</span>
                    </div>
                     <div class="bg-white p-4 rounded-xl shadow-sm md:col-span-2 border border-blue-100 flex justify-around items-center">
                        <div class="text-center">
                            <span id="wc-sentences" class="block text-2xl font-bold text-gray-700">0</span>
                            <span class="text-xs text-gray-400">Sentences</span>
                        </div>
                        <div class="text-center">
                            <span id="wc-paragraphs" class="block text-2xl font-bold text-gray-700">0</span>
                            <span class="text-xs text-gray-400">Paragraphs</span>
                        </div>
                         <div class="text-center">
                            <span id="wc-spaces" class="block text-2xl font-bold text-gray-700">0</span>
                            <span class="text-xs text-gray-400">No Spaces</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Real-Time Stats</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 mb-8">
                <li><strong>Words:</strong> Updates instantly as you type.</li>
                <li><strong>Characters:</strong> Tracks specific limits for platforms.</li>
                <li><strong>Privacy:</strong> We don't save your text. It vanishes when you close the tab.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">Platform Limits</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                 <div class="bg-gray-100 p-2 rounded text-center text-sm">
                    <strong>Twitter/X</strong><br>280 chars
                </div>
                <div class="bg-gray-100 p-2 rounded text-center text-sm">
                    <strong>LinkedIn</strong><br>3000 chars
                </div>
                 <div class="bg-gray-100 p-2 rounded text-center text-sm">
                    <strong>Google Meta</strong><br>160 chars
                </div>
                 <div class="bg-gray-100 p-2 rounded text-center text-sm">
                    <strong>Instagram</strong><br>2200 chars
                </div>
            </div>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Does it exclude spaces?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    We show both. Look for the "No Spaces" stat to see the count without whitespace.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

const privacyModePage = `
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 border-b pb-4">Maximum Privacy Mode</h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl">
                Articlarity is designed with a "Privacy First" architecture. 
                Learn how we process files securely without ever uploading them to a cloud server.
            </p>
            
            <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-8">
                 <div class="flex items-start gap-4">
                    <span class="text-4xl">🛡️</span>
                    <div>
                        <h3 class="text-xl font-bold text-blue-900 mb-2">Offline Processing</h3>
                         <p class="text-blue-800 leading-relaxed">
                            Unlike most online tools, we do not have a backend server that sees your files. 
                            When you select a PDF or Image, it stays in your browser's memory (RAM). 
                            Our algorithms (WebAssembly) run directly on your device to process the data.
                        </p>
                    </div>
                </div>
            </div>

             <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                    <div class="text-3xl mb-3">⚡</div>
                    <h4 class="font-bold text-gray-800 mb-2">Zero Latency</h4>
                    <p class="text-sm text-gray-600">Since there is no upload, there is no waiting time. Processing is instant.</p>
                </div>
                 <div class="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                    <div class="text-3xl mb-3">🔐</div>
                    <h4 class="font-bold text-gray-800 mb-2">GDPR Compliant</h4>
                    <p class="text-sm text-gray-600">Your data never leaves your control, making it inherently compliant with data privacy laws.</p>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Technical Details</h3>
            <p class="text-slate-700 mb-6">
                We utilize technologies like <strong>WebAssembly (WASM)</strong>, <strong>FFmpeg.wasm</strong>, and <strong>PDF.js</strong> to bring desktop-class performance to the web.
            </p>

            <h3 class="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
             <details class="group bg-white border border-slate-200 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 p-4 list-none flex justify-between items-center group-open:bg-slate-50">
                    Does it work without internet?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 border-t border-slate-200">
                    Yes! Once the page loads, you can disconnect from WiFi and still use all tools fully.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

const routes = {
    '/': dashboardPage,
    '/attendance-calculator': attendancePage,
    '/ai-humanizer': humanizerPage,
    '/image-compressor-100kb': compressorPage,
    '/file-merger': universalMergerPage,
    '/pdf-splitter': pdfSplitterPage,
    '/img-to-pdf': imgToPdfPage,
    '/pdf-compressor': pdfPage,
    '/qr-generator': qrGeneratorPage,
    '/pdf-arranger': pdfArrangerPage,
    '/pdf-watermark': watermarkPage,
    '/mp4-to-mp3': mp4ToMp3Page,
    '/page-numberer': pageNumberPage,
    '/case-converter': caseConverterPage,
    '/word-counter': wordCounterPage,
    '/privacy-mode': privacyModePage,
};

function render(pathOverride) {
    const path = pathOverride || window.location.pathname;
    // Strip trailing slash if not root
    let cleanPath = (path.length > 1 && path.endsWith('/')) ? path.slice(0, -1) : path;

    // Handle local file testing (e.g. .../index.html or .../attendance/index.html)
    if (window.location.protocol === 'file:' || cleanPath.endsWith('index.html')) {
        // If it ends with index.html, remove it
        if (cleanPath.endsWith('index.html')) cleanPath = cleanPath.replace('/index.html', '');
        // If it's effectively root (empty or ends with /, handled above), set to /
        if (cleanPath === '' || cleanPath.endsWith('/')) cleanPath = '/';

        // Ensure known routes match even if path has prefix
        // e.g. /Users/foo/bar/attendance -> /attendance
        const knownRoutes = Object.keys(routes);
        for (const route of knownRoutes) {
            if (cleanPath.endsWith(route) && route !== '/') {
                cleanPath = route;
                break;
            }
        }
        // Fallback for root
        if (!routes[cleanPath]) cleanPath = '/';
    }

    // Normalized path
    const content = routes[cleanPath] || routes['/'];
    if (!routes[cleanPath] && cleanPath !== '/') {
        // 404 Handler
        appRoot.innerHTML = `
            <div class="text-center py-20">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">404</h2>
                <p class="text-gray-600 mb-6">Tool not found or page missing.</p>
                <p class="text-sm text-gray-400 mb-8 font-mono bg-gray-100 inline-block px-3 py-1 rounded">Path: ${cleanPath}</p>
                <div>
                     <a href="/" class="text-blue-600 font-bold hover:underline">Go Home</a>
                </div>
            </div>
        `;
        return;
    }

    appRoot.innerHTML = content;
    window.scrollTo(0, 0);

    // ===== GA4 SPA PAGE VIEW TRACKING =====
if (window.gtag) {
  gtag('event', 'page_view', {
    page_path: cleanPath,
    page_title: document.title
  });
}
    
    // Show/Hide Back Button
    const backBtn = document.getElementById('back-to-tools');
    if (backBtn) {
        if (cleanPath === '/') {
            backBtn.classList.add('hidden');
        } else {
            backBtn.classList.remove('hidden');
            // ensure back button works
            backBtn.onclick = (e) => {
                e.preventDefault();
                navigateTo('/');
            };
        }
    }

    if (cleanPath === '/attendance-calculator') initAttendance();
    if (cleanPath === '/image-compressor-100kb') initCompressor();
    if (cleanPath === '/pdf-compressor') initPDF();
    if (cleanPath === '/file-merger') initUniversalMerger();
    if (cleanPath === '/pdf-splitter') initPdfSplitter();
    if (cleanPath === '/img-to-pdf') initImgToPdf();
    if (cleanPath === '/ai-humanizer') initHumanizer();
    if (cleanPath === '/pdf-arranger') initPdfArranger();
    if (cleanPath === '/pdf-watermark') initWatermark();
    if (cleanPath === '/mp4-to-mp3') initMp4ToMp3();
    if (cleanPath === '/page-numberer') initPageNumber();
}

function navigateTo(url) {
    if (window.location.protocol === 'file:') {
        render(url);
        try { history.pushState(null, null, url); } catch (e) { }
    } else {
        history.pushState(null, null, url);
        render();
    }
}

// Intercept clicks for SPA navigation
document.addEventListener('click', (e) => {
    // Find closest anchor tag
    const link = e.target.closest('a');
    if (link) {
        let href = link.getAttribute('href');
        const isFileProtocol = window.location.protocol === 'file:';

        // Fix for local file system navigation
        // Fix for local file system navigation
        // We defer to standard SPA navigation (below) to avoid ERR_FILE_NOT_FOUND
        // when prerendered folders are missing.
        /* 
        if (isFileProtocol && href && href.startsWith('/') && !href.startsWith('//')) {
             // ... Code removed to enable SPA mode ...
        } 
        */

        // Standard SPA Navigation (Server / Cloudflare)
        if (href && href.startsWith('/') && !href.startsWith('//')) {
            e.preventDefault();
            navigateTo(href);
        }
    }
});

// Handle Back/Forward buttons
window.addEventListener('popstate', render);

if (document.readyState === 'complete') {
    initApp();
} else {
    window.addEventListener('load', initApp);
}

function showPreview(url) {
    const modal = document.getElementById('preview-modal');
    const frame = document.getElementById('preview-frame');
    frame.src = url;
    modal.classList.remove('hidden');

    // Reset Zoom
    currentZoom = 1.0;
    applyZoom();
}

// --- ZOOM LOGIC ---
let currentZoom = 1.0;

window.zoomIn = function () {
    currentZoom += 0.25;
    applyZoom();
};

window.zoomOut = function () {
    if (currentZoom > 0.25) {
        currentZoom -= 0.25;
        applyZoom();
    }
};

window.closePreview = function () {
    const modal = document.getElementById('preview-modal');
    const frame = document.getElementById('preview-frame');
    modal.classList.add('hidden');
    frame.src = '';
};

function applyZoom() {
    const frame = document.getElementById('preview-frame');
    const label = document.getElementById('zoom-level');

    // For iframe, scaling might affect scroll functionality. 
    // Best approach for generic iframe (often PDF viewer or image):
    frame.style.transform = `scale(${currentZoom})`;
    frame.style.transformOrigin = 'top center';

    // If it's a PDF.js viewer inside (which handles its own zoom), this CSS transform might conflict or degrade quality.
    // However, since we are using `src=blobUrl`, browser's native PDF viewer usually loads.
    // Browser native viewers often consume key events for zoom, but CSS transform is a "brute force" UI way to do it.

    if (label) label.innerText = Math.round(currentZoom * 100) + '%';
}

// --- ENGAGEMENT / SUCCESS MODAL LOGIC ---
window.closeSuccessModal = function () {
    const modal = document.getElementById('success-modal');
    const content = document.getElementById('success-modal-content');
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 500);
};

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    const content = document.getElementById('success-modal-content');
    modal.classList.remove('hidden');
    // Small delay to allow display:block to apply before opacity transition
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.classList.add('opacity-100');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);
}

// --- UNIVERSAL MERGER HELPER FUNCTIONS ---

/**
 * Converts a text file to a PDF ArrayBuffer using jspdf.
 * @param {File} file - The text file object.
 * @returns {Promise<ArrayBuffer>} The PDF content as an ArrayBuffer.
 */
async function convertTxtToPdf(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const text = e.target.result;
                const doc = new jsPDF('p', 'mm', 'a4');
                doc.setFontSize(10);

                // jspdf's text function handles wrapping (splitTextToSize) automatically
                const textLines = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 20); // 10mm margins
                let y = 10;

                doc.text(textLines, 10, y);

                // Output the PDF as ArrayBuffer
                resolve(doc.output('arraybuffer'));
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

/**
 * Converts an image file to a PDF ArrayBuffer using jspdf.
 * @param {File} file - The image file object.
 * @returns {Promise<ArrayBuffer>} The PDF content as an ArrayBuffer.
 */
async function convertImgToPdfBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const img = new Image();
                img.onload = function () {
                    const doc = new jsPDF('p', 'mm', 'a4');
                    const imgDataUrl = e.target.result;
                    const imgProps = doc.getImageProperties(imgDataUrl);

                    // Standard page size in mm
                    const pdfW = doc.internal.pageSize.getWidth();
                    const pdfH = doc.internal.pageSize.getHeight();

                    // Calculate image scaling to fit page while maintaining aspect ratio
                    const ratio = Math.min(pdfW / imgProps.width, pdfH / imgProps.height);
                    const pageW = imgProps.width * ratio;
                    const pageH = imgProps.height * ratio;

                    // Center the image on the page
                    const x = (pdfW - pageW) / 2;
                    const y = (pdfH - pageH) / 2;

                    doc.addImage(imgDataUrl, imgProps.fileType, x, y, pageW, pageH);
                    resolve(doc.output('arraybuffer'));
                };
                img.src = e.target.result;
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}


// --- LOGIC: UNIVERSAL MERGER (UPDATED LOGIC) ---
/**
 * Initializes the Universal Visual Merger.
 * Combines functionality of PDF Arranger with Multi-File Upload.
 */
function initUniversalMerger() {
    const input = document.getElementById('universal-merger-input');
    const status = document.getElementById('merger-status');
    const ui = document.getElementById('merger-ui');
    const grid = document.getElementById('merger-grid');
    const mergeBtn = document.getElementById('btn-universal-merge');
    const downloadLink = document.getElementById('merger-download-link');
    const countLabel = document.getElementById('merger-page-count');

    let pageItems = []; // { id, file, type, pageIndex (pdf only), thumbData }
    let pdfCache = new Map(); // File -> Loaded PDFJS Document

    input.addEventListener('change', async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        status.textContent = `Processing ${files.length} files...`;
        status.classList.remove('hidden');
        ui.classList.add('hidden');

        try {
            for (const file of files) {
                if (file.type === 'application/pdf') {
                    // Load PDF, get pages
                    const arrayBuffer = await file.arrayBuffer();
                    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
                    pdfCache.set(file, pdf); // Cache for rendering if needed

                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const viewport = page.getViewport({ scale: 0.3 });
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;
                        await page.render({ canvasContext: ctx, viewport: viewport }).promise;

                        pageItems.push({
                            id: Date.now() + Math.random(),
                            type: 'pdf',
                            file: file,
                            pageIndex: i - 1, // 0-based for lib
                            thumbData: canvas.toDataURL()
                        });
                    }
                } else if (file.type.startsWith('image/')) {
                    // Image
                    const reader = new FileReader();
                    const dataUrl = await new Promise(resolve => {
                        reader.onload = e => resolve(e.target.result);
                        reader.readAsDataURL(file);
                    });

                    pageItems.push({
                        id: Date.now() + Math.random(),
                        type: 'image',
                        file: file,
                        thumbData: dataUrl
                    });
                } else if (file.type === 'text/plain') {
                    pageItems.push({
                        id: Date.now() + Math.random(),
                        type: 'text',
                        file: file,
                        thumbData: null // TODO: Icon
                    });
                }
            }
            renderGrid();
            status.classList.add('hidden');
            ui.classList.remove('hidden');
        } catch (err) {
            console.error(err);
            status.textContent = "Error processing files: " + err.message;
        }

        // Reset input to allow adding same files again if needed
        input.value = '';
    });

    function renderGrid() {
        grid.innerHTML = '';
        countLabel.textContent = pageItems.length;

        pageItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = "relative bg-white p-2 border rounded-xl shadow-sm hover:shadow-md transition-all group";

            let content;
            if (item.type === 'text') {
                content = `<div class="aspect-[3/4] flex items-center justify-center bg-gray-50 border rounded text-gray-500 font-mono text-xs p-2 overflow-hidden text-center">${item.file.name}</div>`;
            } else {
                content = `<img src="${item.thumbData}" class="w-full aspect-[3/4] object-contain border rounded bg-gray-100 mb-2">`;
            }

            card.innerHTML = content + `
                <div class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm hover:bg-red-600" onclick="window.deletePageItem(${index})">&times;</button>
                </div>
                <div class="flex justify-between items-center text-xs text-gray-400 mt-1">
                    <span>${index + 1}</span>
                    <div class="flex gap-1">
                        <button class="hover:text-blue-600" onclick="window.movePageItem(${index}, -1)" ${index === 0 ? 'disabled' : ''}>&larr;</button>
                        <button class="hover:text-blue-600" onclick="window.movePageItem(${index}, 1)" ${index === pageItems.length - 1 ? 'disabled' : ''}>&rarr;</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Expose helpers globally for inline onclicks
    window.deletePageItem = (index) => {
        pageItems.splice(index, 1);
        renderGrid();
    };
    window.movePageItem = (index, dir) => {
        if (dir === -1 && index > 0) {
            [pageItems[index], pageItems[index - 1]] = [pageItems[index - 1], pageItems[index]];
        } else if (dir === 1 && index < pageItems.length - 1) {
            [pageItems[index], pageItems[index + 1]] = [pageItems[index + 1], pageItems[index]];
        }
        renderGrid();
    };

    mergeBtn.addEventListener('click', async () => {
        if (pageItems.length === 0) return alert("Add some files first!");

        mergeBtn.innerText = "Generating PDF...";
        mergeBtn.disabled = true;

        try {
            const mergedPdf = await PDFLib.PDFDocument.create();

            // Optimization: we could group by file, but standard loop is fine for client-side
            for (const item of pageItems) {
                if (item.type === 'pdf') {
                    // We need to load the PDFLib document. 
                    // Optimization: Cache PDFLib docs?
                    const arrayBuffer = await item.file.arrayBuffer();
                    const srcDoc = await PDFLib.PDFDocument.load(arrayBuffer);
                    const [copiedPage] = await mergedPdf.copyPages(srcDoc, [item.pageIndex]);
                    mergedPdf.addPage(copiedPage);
                } else if (item.type === 'image') {
                    const arrayBuffer = await item.file.arrayBuffer();
                    let img;
                    if (item.file.type === 'image/jpeg') img = await mergedPdf.embedJpg(arrayBuffer);
                    else img = await mergedPdf.embedPng(arrayBuffer); // Assume PNG fallback

                    const page = mergedPdf.addPage([img.width, img.height]);
                    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });

                    // Auto scale to A4? The user didn't ask, but we should probably keep original size for best quality
                } else if (item.type === 'text') {
                    // Simple text render
                    const text = await item.file.text();
                    const page = mergedPdf.addPage(PDFLib.PageSizes.A4);
                    const font = await mergedPdf.embedFont(PDFLib.StandardFonts.Helvetica);
                    const fontSize = 12;
                    const { height } = page.getSize();

                    page.drawText(text.substring(0, 2000), { // Limit text to fitting on one page roughly
                        x: 50,
                        y: height - 50,
                        size: fontSize,
                        font: font,
                        maxWidth: page.getWidth() - 100,
                        lineHeight: 14
                    });
                }
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            downloadLink.href = url;
            downloadLink.classList.remove('hidden');

            // Also enable preview
            showPreview(url);

            mergeBtn.innerText = "Merge Again";

            // Trigger Success Modal
            setTimeout(showSuccessModal, 1500);

        } catch (e) {
            console.error(e);
            alert("Error merging: " + e.message);
        } finally {
            mergeBtn.disabled = false;
        }
    });

}


// --- LOGIC: IMAGE TO PDF CONVERTER (UPDATED VISUAL) ---
/**
 * Initializes the Image to PDF Converter functionality.
 */
function initImgToPdf() {
    const input = document.getElementById('img-to-pdf-input');
    const ui = document.getElementById('img-to-pdf-ui');
    const grid = document.getElementById('img-grid');
    const convertBtn = document.getElementById('btn-convert-to-pdf');
    const statusDiv = document.getElementById('img-to-pdf-status');
    const imgCountEl = document.getElementById('img-count');
    const pdfSizeEl = document.getElementById('pdf-size');

    let allImages = []; // { id, file, thumbData }

    // Utility to load an image
    function loadImage(file) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }

    input.addEventListener('change', async (e) => {
        const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
        if (files.length === 0) return;

        statusDiv.textContent = "Loading thumbnails...";
        statusDiv.classList.remove('hidden');

        for (const file of files) {
            const thumbData = await loadImage(file);
            allImages.push({
                id: Date.now() + Math.random(),
                file: file,
                thumbData: thumbData
            });
        }

        renderGrid();
        statusDiv.classList.add('hidden');
        ui.classList.remove('hidden');

        // Reset input
        input.value = '';
    });

    function renderGrid() {
        grid.innerHTML = '';
        imgCountEl.textContent = allImages.length;

        allImages.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = "relative bg-gray-100 border rounded-xl overflow-hidden group aspect-square flex items-center justify-center";

            card.innerHTML = `
                <img src="${item.thumbData}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                    <div class="flex justify-end">
                         <button class="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600 shadow" onclick="window.delImg(${index})">&times;</button>
                    </div>
                    <div class="flex justify-between items-center text-white text-xs font-bold">
                        <button class="bg-white/20 hover:bg-white/40 p-1 rounded" onclick="window.moveImg(${index}, -1)" ${index === 0 ? 'disabled' : ''}>&larr;</button>
                        <span>${index + 1}</span>
                        <button class="bg-white/20 hover:bg-white/40 p-1 rounded" onclick="window.moveImg(${index}, 1)" ${index === allImages.length - 1 ? 'disabled' : ''}>&rarr;</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Window helpers for inline onclicks
    window.delImg = (index) => {
        allImages.splice(index, 1);
        renderGrid();
    };
    window.moveImg = (index, dir) => {
        if (dir === -1 && index > 0) {
            [allImages[index], allImages[index - 1]] = [allImages[index - 1], allImages[index]];
        } else if (dir === 1 && index < allImages.length - 1) {
            [allImages[index], allImages[index + 1]] = [allImages[index + 1], allImages[index]];
        }
        renderGrid();
    };

    convertBtn.addEventListener('click', async () => {
        if (allImages.length === 0) return alert("Add some images first!");

        convertBtn.disabled = true;
        convertBtn.innerText = "Generating PDF...";
        statusDiv.textContent = `Processing ${allImages.length} images...`;
        statusDiv.classList.remove('hidden');

        const pdfSize = pdfSizeEl.value;
        // Check if jsPDF exists
        if (!window.jspdf) return alert("jsPDF library missing.");

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', pdfSize !== 'fit' ? pdfSize : 'a4');
        pdf.deletePage(1); // Start blank

        try {
            for (let i = 0; i < allImages.length; i++) {
                const imgDataUrl = allImages[i].thumbData;
                const imgProps = pdf.getImageProperties(imgDataUrl);

                let pdfW, pdfH, pageW, pageH;

                if (pdfSize !== 'fit') {
                    // Standard sizes
                    pdfW = pdf.internal.pageSize.getWidth();
                    pdfH = pdf.internal.pageSize.getHeight();
                    pdf.addPage();

                    const ratio = Math.min(pdfW / imgProps.width, pdfH / imgProps.height);
                    pageW = imgProps.width * ratio;
                    pageH = imgProps.height * ratio;
                } else {
                    // Fit to Image
                    const k = 0.264583; // px to mm 
                    // Or keep logic simple: make page width A4, height dynamic
                    pdfW = 210;
                    pdfH = (imgProps.height * pdfW) / imgProps.width;
                    pdf.addPage([pdfW, pdfH], 'p');
                    pageW = pdfW;
                    pageH = pdfH;
                }

                // Center
                const x = (pdfW - pageW) / 2;
                const y = (pdfH - pageH) / 2;
                pdf.addImage(imgDataUrl, 'JPEG', x, y, pageW, pageH);
            }

            const pdfBlob = pdf.output('blob');
            const url = URL.createObjectURL(pdfBlob);

            // Allow download
            const a = document.createElement('a');
            a.href = url;
            a.download = `images_combined_${Date.now()}.pdf`;
            a.click();

            // Show preview
            showPreview(url);

            // Trigger Success Modal
            setTimeout(showSuccessModal, 1500);

            convertBtn.innerText = "Done! Download started.";
            setTimeout(() => convertBtn.innerText = "Convert to PDF & Download", 3000);

        } catch (e) {
            console.error(e);
            alert("Error converting images.");
        } finally {
            convertBtn.disabled = false;
            statusDiv.classList.add('hidden');
        }
    });
}

// --- LOGIC: PDF SPLITTER (OLD) ---
/**
 * Initializes the PDF Splitter functionality.
 * Note: Requires pdf-lib.min.js loaded via CDN.
 */
function initPdfSplitter() {
    const input = document.getElementById('pdf-splitter-input');
    const controls = document.getElementById('splitter-controls');
    const totalPagesEl = document.getElementById('total-pages');
    const rangesInput = document.getElementById('split-ranges');
    const splitBtn = document.getElementById('btn-split-pdfs');
    const statusDiv = document.getElementById('splitter-status');
    const rangeError = document.getElementById('range-error');

    let pdfFile = null;
    let sourcePdfDoc = null;
    let totalPages = 0;

    // --- Utility Function: Parsing Ranges ---
    /**
     * Parses the range string (e.g., "1-5, 8, 10") into an array of page index arrays.
     * @returns {Array<Array<number>>} An array of page index arrays (0-based), or null on error.
     */
    function parseRanges(rangeStr, maxPages) {
        const parts = rangeStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
        const result = [];
        const regex = /^(\d+)(-(\d+|END))?$/i; // Matches X, X-Y, X-END

        for (const part of parts) {
            const match = part.match(regex);
            if (!match) return null; // Format error

            let start = parseInt(match[1]);
            let end = maxPages;

            // Check single page (e.g., "8") or start of range (e.g., "1-")
            if (match[3]) {
                // Range specified (e.g., "1-5" or "10-END")
                if (match[3].toUpperCase() !== 'END') {
                    end = parseInt(match[3]);
                }
            } else {
                // Single page specified, end = start
                end = start;
            }

            // Page numbers must be greater than 0
            if (start < 1 || end < 1) return null;

            // Adjust to 0-based indexing and check boundaries
            const startIdx = start - 1;
            const endIdx = end - 1;

            if (startIdx >= maxPages || endIdx >= maxPages || startIdx > endIdx) return null;

            // Push the 0-based index range
            for (let i = startIdx; i <= endIdx; i++) {
                result.push(i);
            }
        }

        // Remove duplicates and sort (needed if user enters 1-5, 3)
        const uniqueIndices = [...new Set(result)].sort((a, b) => a - b);

        // Group the indices back into ranges for splitting logic (this logic is simplified for speed)
        // We will just process the entire unique set of indices in one go for the single output PDF.
        // For a tool that outputs multiple files, the logic would be much more complex here.

        if (uniqueIndices.length === 0) return null;

        // Return 0-based indices to extract
        return uniqueIndices;
    }

    // --- Event Handlers ---

    // 1. File Upload Handler
    input.addEventListener('change', async (e) => {
        pdfFile = e.target.files[0];
        if (!pdfFile || pdfFile.type !== 'application/pdf') {
            controls.classList.add('hidden');
            return;
        }

        statusDiv.textContent = 'Loading PDF...';
        statusDiv.classList.remove('hidden');
        controls.classList.add('hidden');
        splitBtn.disabled = true;
        rangeError.classList.add('hidden');

        try {
            const arrayBuffer = await pdfFile.arrayBuffer();
            sourcePdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            totalPages = sourcePdfDoc.getPageCount();

            totalPagesEl.textContent = totalPages;
            controls.classList.remove('hidden');
            statusDiv.classList.add('hidden');
            splitBtn.disabled = false;

        } catch (error) {
            console.error('PDF Load Error:', error);
            statusDiv.textContent = 'Error loading PDF. File may be corrupted or encrypted.';
            statusDiv.classList.remove('hidden');
            controls.classList.add('hidden');
        }
    });

    // 2. Range Input Validation
    rangesInput.addEventListener('input', () => {
        splitBtn.disabled = true;
        rangeError.classList.add('hidden');

        if (totalPages === 0) return;

        const validIndices = parseRanges(rangesInput.value, totalPages);

        if (validIndices === null) {
            rangeError.textContent = 'Invalid range format (e.g., 1-5, 8, 10-END) or page number exceeds total.';
            rangeError.classList.remove('hidden');
        } else if (validIndices.length === 0) {
            rangeError.textContent = 'No pages selected.';
            rangeError.classList.remove('hidden');
        } else {
            splitBtn.disabled = false;
        }
    });

    // 3. Split Button Handler
    splitBtn.addEventListener('click', async () => {
        if (!sourcePdfDoc || totalPages === 0 || splitBtn.disabled) return;

        const indicesToExtract = parseRanges(rangesInput.value, totalPages);

        if (!indicesToExtract || indicesToExtract.length === 0) {
            alert('Please check your page ranges.');
            return;
        }

        splitBtn.disabled = true;
        statusDiv.textContent = `Splitting and extracting ${indicesToExtract.length} pages...`;
        statusDiv.classList.remove('hidden', 'bg-red-100', 'text-red-800');
        statusDiv.classList.add('bg-gray-100', 'text-gray-700');

        try {
            // Create the new PDF to contain the extracted pages
            const newPdfDoc = await PDFLib.PDFDocument.create();

            // Extract the desired pages (0-based indices)
            const copiedPages = await newPdfDoc.copyPages(sourcePdfDoc, indicesToExtract);

            // Add the copied pages to the new document
            copiedPages.forEach(page => newPdfDoc.addPage(page));

            // Serialize and download
            const pdfBytes = await newPdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });

            // Create a download link and trigger download (like your other tools)
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `split_${indicesToExtract[0] + 1}_to_${indicesToExtract[indicesToExtract.length - 1] + 1}_${pdfFile.name}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Trigger Success Modal
            setTimeout(showSuccessModal, 1500);

            statusDiv.textContent = `Success! ${indicesToExtract.length} pages extracted and downloaded.`;
            statusDiv.classList.remove('bg-gray-100', 'text-gray-700');
            statusDiv.classList.add('bg-green-100', 'text-green-800');


        } catch (error) {
            console.error('PDF Split Error:', error);
            statusDiv.textContent = 'Failed to split PDF.';
            statusDiv.classList.remove('bg-gray-100', 'text-gray-700');
            statusDiv.classList.add('bg-red-100', 'text-red-800');
        } finally {
            splitBtn.disabled = false;
        }
    });
}
// ... (All other init functions remain the same) ...
function initAttendance() {
    document.getElementById('btn-calc-attendance').addEventListener('click', () => {
        const total = parseFloat(document.getElementById('att-total').value);
        const present = parseFloat(document.getElementById('att-present').value);
        const target = parseFloat(document.getElementById('att-target').value);
        const resultDiv = document.getElementById('att-result');
        const pctDisplay = document.getElementById('att-percentage');
        const msgDisplay = document.getElementById('att-message');

        // Validation
        if (isNaN(total) || isNaN(present) || isNaN(target) || total <= 0) {
            alert("Please enter valid numbers. Total classes must be greater than 0.");
            return;
        }
        if (present > total) {
            alert("Classes attended cannot be greater than classes held!");
            return;
        }

        const currentPct = (present / total) * 100;
        pctDisplay.innerText = currentPct.toFixed(2) + "%";
        resultDiv.classList.remove('hidden');

        // Logic: Need to attend more?
        if (currentPct < target) {
            const needed = Math.ceil((target * total - 100 * present) / (100 - target));

            if (needed <= 0) {
                // This handles edge cases where rounding might be tricky close to the target
                msgDisplay.className = "bg-green-100 text-green-800 p-3 rounded-lg";
                msgDisplay.innerHTML = `You are practically at the target! Just attend the next class to be safe.`;
            } else {
                msgDisplay.className = "bg-red-100 text-red-800 p-3 rounded-lg";
                msgDisplay.innerHTML = `⚠️ You are Short!<br>You need to attend <strong>${needed}</strong> more classes consecutively to reach ${target}%.`;
            }
        }
        // Logic: Can skip?
        else {
            // Calculate how many can be bunked: (Present / (Total + Bunk)) >= Target/100
            const bunkable = Math.floor((100 * present - target * total) / target);

            if (bunkable > 0) {
                msgDisplay.className = "bg-green-100 text-green-800 p-3 rounded-lg";
                msgDisplay.innerHTML = `✅ Safe Zone!<br>You can bunk <strong>${bunkable}</strong> classes and still stay above ${target}%.`;
            } else {
                msgDisplay.className = "bg-yellow-100 text-yellow-800 p-3 rounded-lg";
                msgDisplay.innerHTML = `✅ You are on target, but don't bunk any classes right now!`;
            }

            // Trigger Engagement
            setTimeout(showSuccessModal, 3000);
        }
    });
}
function initCompressor() {
    const input = document.getElementById('img-input');
    const drop = document.getElementById('drop-zone');
    const slider = document.getElementById('qual-slider');
    let currentFile = null;

    drop.addEventListener('click', () => input.click());
    input.addEventListener('change', (e) => {
        currentFile = e.target.files[0];
        if (currentFile) setupCompressor();
    });

    function setupCompressor() {
        document.getElementById('drop-zone').classList.add('hidden');
        document.getElementById('img-controls').classList.remove('hidden');
        document.getElementById('orig-size').innerText = (currentFile.size / 1024).toFixed(1) + ' KB';

        slider.addEventListener('input', () => {
            document.getElementById('qual-val').innerText = slider.value;
            runCompression(slider.value / 100);
        });

        document.getElementById('btn-auto-compress').addEventListener('click', async () => {
            const targetKB = parseInt(document.getElementById('target-kb').value);
            let quality = 1.0;
            let blob = null;
            document.getElementById('btn-auto-compress').innerText = "Compressing...";
            while (quality > 0.1) {
                blob = await getCompressedBlob(currentFile, quality);
                if ((blob.size / 1024) < targetKB) break;
                quality -= 0.1;
            }
            updateResultUI(blob);
            document.getElementById('btn-auto-compress').innerText = "Go";
        });

        runCompression(0.8);
    }

    async function runCompression(quality) {
        const blob = await getCompressedBlob(currentFile, quality);
        updateResultUI(blob);
    }

    function getCompressedBlob(file, quality) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob(resolve, 'image/jpeg', quality);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    function updateResultUI(blob) {
        const url = URL.createObjectURL(blob);
        document.getElementById('new-size').innerText = (blob.size / 1024).toFixed(1) + ' KB';
        const dlBtn = document.getElementById('dl-img-btn');
        const prevBtn = document.getElementById('preview-img-btn');

        dlBtn.href = url;
        dlBtn.download = `compressed_${currentFile.name}`; // Re-added download attribute
        prevBtn.onclick = () => showPreview(url);

        // Trigger Success Modal
        dlBtn.onclick = () => setTimeout(showSuccessModal, 1000);
    }

    document.getElementById('mode-manual').onclick = () => {
        document.getElementById('manual-ui').classList.remove('hidden');
        document.getElementById('auto-ui').classList.add('hidden');
    };
    document.getElementById('mode-auto').onclick = () => {
        document.getElementById('manual-ui').classList.add('hidden');
        document.getElementById('auto-ui').classList.remove('hidden');
    };
}
function initPDF() {
    const input = document.getElementById('pdf-input');
    const status = document.getElementById('pdf-status');
    const progress = document.getElementById('pdf-progress');
    const statusText = document.getElementById('pdf-status-text');
    const slider = document.getElementById('pdf-qual-slider');
    const qualVal = document.getElementById('pdf-qual-val');
    const actions = document.getElementById('pdf-actions');
    const computing = document.getElementById('pdf-computing');
    const origSizeEl = document.getElementById('pdf-orig-size');
    const newSizeEl = document.getElementById('pdf-new-size');
    const dlBtn = document.getElementById('dl-pdf-btn');
    const prevBtn = document.getElementById('preview-pdf-btn');

    let currentFile = null;
    let debounceTimer = null;

    if (slider && qualVal) {
        slider.addEventListener('input', () => {
            qualVal.innerText = slider.value;
            if (currentFile) {
                // Debounce simple size calculation/compression logic
                clearTimeout(debounceTimer);
                actions.classList.add('hidden');
                computing.classList.remove('hidden');
                newSizeEl.innerText = "...";

                debounceTimer = setTimeout(() => {
                    compressPDF(currentFile, parseInt(slider.value) / 100);
                }, 600); // 600ms debounce
            }
        });
    }

    input.addEventListener('change', () => {
        if (input.files.length > 0) {
            currentFile = input.files[0];
            origSizeEl.innerText = formatSize(currentFile.size);
            newSizeEl.innerText = "...";

            // Initial run
            compressPDF(currentFile, parseInt(slider.value) / 100);
        }
    });

    function formatSize(bytes) {
        return (bytes / 1024).toFixed(1) + ' KB';
    }

    async function compressPDF(file, quality) {
        // Show status
        status.classList.remove('hidden');
        actions.classList.add('hidden');
        computing.classList.add('hidden');
        progress.style.width = '0%';
        statusText.innerText = "Initializing...";

        try {
            const fileReader = new FileReader();
            fileReader.onload = async function () {
                const typedarray = new Uint8Array(this.result);
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                const newPdf = new jspdf.jsPDF();
                const totalPages = pdf.numPages;

                for (let i = 1; i <= totalPages; i++) {
                    statusText.innerText = `Processing page ${i} of ${totalPages}...`;
                    progress.style.width = `${(i / totalPages) * 100}%`;

                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale: 1.0 });
                    const canvas = document.createElement('canvas'); // Off-screen canvas
                    const ctx = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    await page.render({ canvasContext: ctx, viewport: viewport }).promise;

                    // Compress image
                    const imgData = canvas.toDataURL('image/jpeg', quality);

                    if (i > 1) newPdf.addPage();
                    newPdf.setPage(i);
                    const imgProps = newPdf.getImageProperties(imgData);
                    const pdfWidth = newPdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    newPdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                }

                // Finish
                const pdfBlob = newPdf.output('blob');
                const url = URL.createObjectURL(pdfBlob);

                // Update UI
                newSizeEl.innerText = formatSize(pdfBlob.size);

                dlBtn.href = url;
                dlBtn.download = `compressed_${file.name}`;
                prevBtn.onclick = () => showPreview(url);
                dlBtn.onclick = () => setTimeout(showSuccessModal, 1000);

                status.classList.add('hidden');
                actions.classList.remove('hidden');
            };
            fileReader.readAsArrayBuffer(file);
        } catch (e) {
            console.error(e);
            statusText.innerText = "Error: " + e.message;
        }
    }
}
function initHumanizer() {
    document.getElementById('btn-humanize').addEventListener('click', async () => {
        const text = document.getElementById('human-input').value;
        if (!geminiApiKey) return alert('Please set API Key in menu first!');

        const resDiv = document.getElementById('human-result');
        resDiv.innerText = "Humanizing...";

        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: "Rewrite this to sound 100% human, vary sentence length, use casual tone: " + text }] }] })
            });
            const data = await res.json();
            resDiv.innerText = data.candidates[0].content.parts[0].text;

            // Trigger Engagement 
            setTimeout(showSuccessModal, 3000);
        } catch (e) {
            resDiv.innerText = "Error: " + e.message;
        }
    });
}
window.toCase = function (type) {
    const el = document.getElementById('case-in');
    if (type === 'upper') el.value = el.value.toUpperCase();
    if (type === 'lower') el.value = el.value.toLowerCase();
    if (type === 'title') el.value = el.value.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
};
window.countWords = function () {
    const val = document.getElementById('count-in').value;
    document.getElementById('w-count').innerText = val.trim() === '' ? 0 : val.trim().split(/\s+/).length;
    document.getElementById('c-count').innerText = val.length;
}
window.genQR = function () {
    const txt = document.getElementById('qr-in').value;
    const div = document.getElementById('qr-out');
    const dlBtn = document.getElementById('qr-download');

    // Trigger success on download
    dlBtn.onclick = () => setTimeout(showSuccessModal, 1000);

    if (!txt) return alert("Please enter some text!");

    div.innerHTML = '';
    dlBtn.classList.add('hidden'); // Hide until ready

    const performGen = () => {
        new QRCode(div, {
            text: txt,
            width: 200,
            height: 200,
            correctLevel: QRCode.CorrectLevel.H
        });

        // Wait for canvas/img to be generated
        setTimeout(() => {
            const img = div.querySelector('img');
            if (img && img.src) {
                dlBtn.href = img.src;
                dlBtn.classList.remove('hidden');
            } else {
                // Fallback if it renders as canvas (rare in this lib but possible)
                const canvas = div.querySelector('canvas');
                if (canvas) {
                    dlBtn.href = canvas.toDataURL("image/png");
                    dlBtn.classList.remove('hidden');
                }
            }
        }, 100);
    };

    if (window.QRCode) {
        performGen();
    } else {
        const sc = document.createElement('script');
        sc.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
        sc.onload = performGen;
        document.body.appendChild(sc);
    }
};

const saveBtn = document.getElementById('save-api-key');
if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        const key = document.getElementById('global-api-key').value.trim();
        if (key) {
            localStorage.setItem('articlarity_api_key', key);
            geminiApiKey = key;
            document.getElementById('api-modal').classList.add('hidden');
            alert("Key Saved!");
        }
    });
}

// --- NEW TOOLS LOGIC ---

function initPdfArranger() {
    const input = document.getElementById('arranger-input');
    const grid = document.getElementById('arranger-grid');
    const ui = document.getElementById('arranger-ui');
    const status = document.getElementById('arranger-status');
    const saveBtn = document.getElementById('btn-save-arranger');

    let currentFile = null;
    let pageOrder = []; // Array of { originalIndex: number, thumbnail: string }
    let pdfDoc = null;

    input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file || file.type !== 'application/pdf') return;
        currentFile = file;

        ui.classList.add('hidden');
        status.textContent = 'Loading and rendering pages... this may take a moment.';
        status.classList.remove('hidden');
        grid.innerHTML = '';
        pageOrder = [];

        try {
            const arrayBuffer = await file.arrayBuffer();
            pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;
            const numPages = pdfDoc.numPages;

            for (let i = 1; i <= numPages; i++) {
                const page = await pdfDoc.getPage(i);
                const viewport = page.getViewport({ scale: 0.3 }); // Small thumbnail
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({ canvasContext: ctx, viewport: viewport }).promise;

                pageOrder.push({
                    originalIndex: i - 1, // 0-based for pdf-lib
                    displayNum: i,
                    thumbData: canvas.toDataURL()
                });
            }
            renderGrid();
            status.classList.add('hidden');
            ui.classList.remove('hidden');

        } catch (err) {
            console.error(err);
            status.textContent = "Error loading PDF.";
        }
    });

    function renderGrid() {
        grid.innerHTML = '';
        pageOrder.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = "relative bg-white p-2 border rounded shadow group hover:shadow-md transition-shadow";

            // Image
            const img = document.createElement('img');
            img.src = item.thumbData;
            img.className = "w-full border mb-2";

            // Page Number Label
            const pgNum = document.createElement('div');
            pgNum.textContent = `Page ${item.displayNum}`;
            pgNum.className = "text-xs text-center font-bold text-gray-500 mb-2";

            // Controls
            const controls = document.createElement('div');
            controls.className = "flex justify-between items-center bg-gray-100 rounded p-1";

            // Left Btn
            const leftBtn = document.createElement('button');
            leftBtn.innerHTML = "&larr;";
            leftBtn.className = "px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded disabled:opacity-30";
            leftBtn.disabled = index === 0;
            leftBtn.onclick = () => movePage(index, -1);

            // Right Btn
            const rightBtn = document.createElement('button');
            rightBtn.innerHTML = "&rarr;";
            rightBtn.className = "px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded disabled:opacity-30";
            rightBtn.disabled = index === pageOrder.length - 1;
            rightBtn.onclick = () => movePage(index, 1);

            // Delete Btn
            const delBtn = document.createElement('button');
            delBtn.innerHTML = "&times;";
            delBtn.className = "px-2 py-1 text-red-500 hover:bg-red-100 rounded font-bold";
            delBtn.onclick = () => deletePage(index);

            controls.appendChild(leftBtn);
            controls.appendChild(delBtn);
            controls.appendChild(rightBtn);

            card.appendChild(img);
            card.appendChild(pgNum);
            card.appendChild(controls);
            grid.appendChild(card);
        });
    }

    function movePage(index, direction) {
        if (direction === -1 && index > 0) {
            [pageOrder[index], pageOrder[index - 1]] = [pageOrder[index - 1], pageOrder[index]];
        } else if (direction === 1 && index < pageOrder.length - 1) {
            [pageOrder[index], pageOrder[index + 1]] = [pageOrder[index + 1], pageOrder[index]];
        }
        renderGrid();
    }

    function deletePage(index) {
        if (confirm(`Remove Page ${pageOrder[index].displayNum}?`)) {
            pageOrder.splice(index, 1);
            renderGrid();
        }
    }

    saveBtn.addEventListener('click', async () => {
        if (pageOrder.length === 0) return alert("All pages removed!");

        saveBtn.innerText = "Saving...";
        try {
            const arrayBuffer = await currentFile.arrayBuffer();
            const srcDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            const newDoc = await PDFLib.PDFDocument.create();

            const indicesToCopy = pageOrder.map(p => p.originalIndex);
            const copiedPages = await newDoc.copyPages(srcDoc, indicesToCopy);

            copiedPages.forEach(p => newDoc.addPage(p));

            const pdfBytes = await newDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = "arranged_" + currentFile.name;
            a.click();

        } catch (e) {
            console.error(e);
            alert("Error saving PDF.");
        }
        saveBtn.innerText = "Save & Download PDF";

        // Trigger Success Modal
        setTimeout(showSuccessModal, 1500);
    });
}

function initWatermark() {
    const input = document.getElementById('watermark-input');
    const rotIn = document.getElementById('wm-rotation');
    const rotVal = document.getElementById('wm-rot-val');
    const btnApply = document.getElementById('btn-apply-watermark');
    const canvas = document.getElementById('wm-preview-canvas');
    const placeholder = document.getElementById('wm-placeholder');
    const status = document.getElementById('wm-status');

    // Inputs for live preview
    const inputs = [
        document.getElementById('wm-text'),
        document.getElementById('wm-size'),
        document.getElementById('wm-opacity'),
        rotIn,
        document.getElementById('wm-color')
    ];

    rotIn.oninput = () => {
        rotVal.innerText = rotIn.value + ' deg';
        updatePreview();
    };

    inputs.forEach(el => el.addEventListener('input', debounce(updatePreview, 500)));

    let currentFile = null;
    let pdfDoc = null; // Loaded PDFLib document

    input.addEventListener('change', async (e) => {
        currentFile = e.target.files[0];
        if (currentFile) {
            const arrayBuffer = await currentFile.arrayBuffer();
            pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            updatePreview();
        }
    });

    let debounceTimer;
    function debounce(func, wait) {
        return function (...args) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), wait);
        };
    }

    async function updatePreview() {
        if (!currentFile || !pdfDoc) return;

        status.classList.remove('hidden');

        try {
            // Clone the first page to a temporary document
            const singlePageDoc = await PDFLib.PDFDocument.create();
            const [copiedPage] = await singlePageDoc.copyPages(pdfDoc, [0]);
            singlePageDoc.addPage(copiedPage);

            // Apply Watermark to this single page
            const text = document.getElementById('wm-text').value;
            const size = parseInt(document.getElementById('wm-size').value) || 50;
            const opacity = parseFloat(document.getElementById('wm-opacity').value) || 0.5;
            // ... (rest of watermark logic implied, tool edit point is safe)

            const rotation = parseInt(rotIn.value) || 0;
            const colorHex = document.getElementById('wm-color').value;

            const r = parseInt(colorHex.substr(1, 2), 16) / 255;
            const g = parseInt(colorHex.substr(3, 2), 16) / 255;
            const b = parseInt(colorHex.substr(5, 2), 16) / 255;

            const font = await singlePageDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
            const page = singlePageDoc.getPages()[0];
            const { width, height } = page.getSize();

            page.drawText(text, {
                x: width / 2 - (text.length * size * 0.25),
                y: height / 2,
                size: size,
                font: font,
                color: PDFLib.rgb(r, g, b),
                opacity: opacity,
                rotate: PDFLib.degrees(rotation)
            });

            // Save and render to canvas
            const pdfBytes = await singlePageDoc.save();
            const loadingTask = pdfjsLib.getDocument(pdfBytes);
            const pdf = await loadingTask.promise;
            const pdfPage = await pdf.getPage(1);

            const viewport = pdfPage.getViewport({ scale: 0.6 }); // Scale for preview
            const ctx = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await pdfPage.render({ canvasContext: ctx, viewport: viewport }).promise;

            canvas.classList.remove('hidden');
            placeholder.classList.add('hidden');
        } catch (e) {
            console.error(e);
        } finally {
            status.classList.add('hidden');
        }
    }

    btnApply.addEventListener('click', async () => {
        if (!currentFile) return alert("Upload a PDF first.");

        const text = document.getElementById('wm-text').value;
        const size = parseInt(document.getElementById('wm-size').value);
        const opacity = parseFloat(document.getElementById('wm-opacity').value);
        const rotation = parseInt(rotIn.value);
        const colorHex = document.getElementById('wm-color').value;
        const r = parseInt(colorHex.substr(1, 2), 16) / 255;
        const g = parseInt(colorHex.substr(3, 2), 16) / 255;
        const b = parseInt(colorHex.substr(5, 2), 16) / 255;

        try {
            document.getElementById('wm-status').classList.remove('hidden');
            // Reload original to apply to ALL pages
            const arrayBuffer = await currentFile.arrayBuffer();
            const docToSave = await PDFLib.PDFDocument.load(arrayBuffer);
            const font = await docToSave.embedFont(PDFLib.StandardFonts.HelveticaBold);
            const pages = docToSave.getPages();

            pages.forEach(page => {
                const { width, height } = page.getSize();
                page.drawText(text, {
                    x: width / 2 - (text.length * size * 0.25),
                    y: height / 2,
                    size, font, opacity,
                    color: PDFLib.rgb(r, g, b),
                    rotate: PDFLib.degrees(rotation)
                });
            });

            const pdfBytes = await docToSave.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            document.getElementById('wm-status').classList.add('hidden');
            document.getElementById('wm-result-actions').classList.remove('hidden');

            const dlBtn = document.getElementById('btn-wm-download');
            dlBtn.href = url;
            dlBtn.download = "watermarked_" + currentFile.name;

            document.getElementById('btn-wm-preview').onclick = () => showPreview(url);
            document.getElementById('btn-wm-download').onclick = () => setTimeout(showSuccessModal, 1000);

        } catch (e) {
            console.error(e);
            alert("Error applying watermark.");
            document.getElementById('wm-status').classList.add('hidden');
        }
    });
}

function initPageNumber() {
    const input = document.getElementById('pagenum-input');
    const btn = document.getElementById('btn-add-pagenums');
    const canvas = document.getElementById('pg-preview-canvas');
    const placeholder = document.getElementById('pg-placeholder');

    let currentFile = null;
    let pdfDoc = null;

    // Inputs
    const inputs = [
        document.getElementById('pg-pos'),
        document.getElementById('pg-fmt'),
        document.getElementById('pg-size'),
        document.getElementById('pg-start')
    ];
    inputs.forEach(el => el.addEventListener('input', debounce(updatePreview, 500)));


    input.addEventListener('change', async (e) => {
        currentFile = e.target.files[0];
        if (currentFile) {
            const arrayBuffer = await currentFile.arrayBuffer();
            pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            updatePreview();
        }
    });

    let debounceTimer;
    function debounce(func, wait) {
        return function (...args) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), wait);
        };
    }

    async function updatePreview() {
        if (!currentFile || !pdfDoc) return;

        try {
            // Clone first page
            const singlePageDoc = await PDFLib.PDFDocument.create();
            const [copiedPage] = await singlePageDoc.copyPages(pdfDoc, [0]);
            singlePageDoc.addPage(copiedPage);

            const pos = document.getElementById('pg-pos').value;
            const fmt = document.getElementById('pg-fmt').value;
            const fontSize = parseInt(document.getElementById('pg-size').value) || 12;
            const startNum = parseInt(document.getElementById('pg-start').value) || 1;

            const font = await singlePageDoc.embedFont(PDFLib.StandardFonts.Helvetica);
            const page = singlePageDoc.getPages()[0];
            const { width, height } = page.getSize();
            const total = pdfDoc.getPageCount();

            // Calculate Text
            let text = "";
            const num = startNum; // Page 1 + offset
            if (fmt === 'nb') text = `${num}`;
            if (fmt === 'pg_nb') text = `Page ${num}`;
            if (fmt === 'nb_of_total') text = `${num} of ${total}`;
            if (fmt === 'pg_nb_of_total') text = `Page ${num} of ${total}`;

            const textWidth = font.widthOfTextAtSize(text, fontSize);
            let x = 0, y = 0;
            const margin = 20;

            if (pos.includes('top')) y = height - margin - fontSize;
            else y = margin;
            if (pos.includes('left')) x = margin;
            else if (pos.includes('center')) x = (width - textWidth) / 2;
            else x = width - margin - textWidth;

            page.drawText(text, { x, y, size: fontSize, font, color: PDFLib.rgb(0, 0, 0) });

            // Render
            const pdfBytes = await singlePageDoc.save();
            const loadingTask = pdfjsLib.getDocument(pdfBytes);
            const pdf = await loadingTask.promise;
            const pdfPage = await pdf.getPage(1);

            const viewport = pdfPage.getViewport({ scale: 0.6 });
            const ctx = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await pdfPage.render({ canvasContext: ctx, viewport: viewport }).promise;

            canvas.classList.remove('hidden');
            placeholder.classList.add('hidden');
        } catch (e) { console.error("Preview Error", e); }
    }


    btn.addEventListener('click', async () => {
        if (!currentFile) return alert("Please select a PDF file.");

        btn.innerText = "Processing...";
        btn.disabled = true;

        try {
            const pos = document.getElementById('pg-pos').value;
            const fmt = document.getElementById('pg-fmt').value;
            const fontSize = parseInt(document.getElementById('pg-size').value);
            const startNum = parseInt(document.getElementById('pg-start').value);

            const arrayBuffer = await currentFile.arrayBuffer();
            const docToSave = await PDFLib.PDFDocument.load(arrayBuffer);
            const font = await docToSave.embedFont(PDFLib.StandardFonts.Helvetica);
            const pages = docToSave.getPages();
            const total = pages.length;

            pages.forEach((page, idx) => {
                const num = startNum + idx;
                let text = "";
                if (fmt === 'nb') text = `${num}`;
                if (fmt === 'pg_nb') text = `Page ${num}`;
                if (fmt === 'nb_of_total') text = `${num} of ${total}`;
                if (fmt === 'pg_nb_of_total') text = `Page ${num} of ${total}`;

                const textWidth = font.widthOfTextAtSize(text, fontSize);
                const { width, height } = page.getSize();

                let x = 0, y = 0;
                const margin = 20;

                // Y Position
                if (pos.includes('top')) y = height - margin - fontSize;
                else y = margin; // Bottom

                // X Position
                if (pos.includes('left')) x = margin;
                else if (pos.includes('center')) x = (width - textWidth) / 2;
                else x = width - margin - textWidth; // Right

                page.drawText(text, { x, y, size: fontSize, font, color: PDFLib.rgb(0, 0, 0) });
            });

            const pdfBytes = await docToSave.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            document.getElementById('pg-result-actions').classList.remove('hidden');

            const dl = document.getElementById('btn-pg-download');
            dl.href = url;
            dl.download = "numbered_" + currentFile.name;

            const prev = document.getElementById('btn-pg-preview');
            prev.onclick = () => showPreview(url);
            dl.onclick = () => setTimeout(showSuccessModal, 1000);

            btn.innerText = "Page Numbers Added!";

        } catch (e) {
            console.error(e);
            alert("Error adding page numbers.");
        } finally {
            btn.disabled = false;
        }
    });
}

// Global routing logic

// --- LOGIC: MP4 TO MP3 CONVERTER (CLIENT-SIDE) ---
async function initMp4ToMp3() {
    const input = document.getElementById('mp4-input');
    const drop = document.getElementById('mp3-drop-zone');
    const statusDiv = document.getElementById('mp3-status');
    const statusText = document.getElementById('mp3-status-text');
    const progressBar = document.getElementById('mp3-progress');
    const resultDiv = document.getElementById('mp3-result');
    const dlBtn = document.getElementById('mp3-download');
    const player = document.getElementById('mp3-player');

    // Trigger file input
    drop.addEventListener('click', () => input.click());

    input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Reset UI
        drop.classList.add('hidden');
        statusDiv.classList.remove('hidden');
        resultDiv.classList.add('hidden');
        statusText.innerText = "Loading FFmpeg engine (~25MB)...";
        progressBar.style.width = '10%';

        if (!window.FFmpegWASM) {
            statusText.innerText = "Error: FFmpeg library not loaded. Check connection.";
            return;
        }

        const { FFmpeg } = window.FFmpegWASM;

        // const { fetchFile, toBlobURL } = window.FFmpegUtil; // UMD broken for util
        let ffmpeg = null;

        // --- Helper Functions (Manual Implementation to avoid Util UMD issues) ---
        const toBlobURL = async (url, mimeType) => {
            const resp = await fetch(url);
            const blob = await resp.blob();
            return URL.createObjectURL(new Blob([blob], { type: mimeType }));
        };

        const fetchFile = async (file) => {
            return new Uint8Array(await file.arrayBuffer());
        };

        try {
            ffmpeg = new FFmpeg();

            // Log progress
            ffmpeg.on('progress', ({ progress, time }) => {
                const pct = Math.round(progress * 100);
                progressBar.style.width = pct + '%';
                statusText.innerText = `Converting... ${pct}%`;
            });

            // Load FFmpeg (Single Threaded for compatibility)
            const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd';
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });

            statusText.innerText = "Engine Loaded. Transcoding...";

            // Write file to memory
            await ffmpeg.writeFile('input.mp4', await fetchFile(file));

            // Exec conversion
            await ffmpeg.exec(['-i', 'input.mp4', 'output.mp3']);

            // Read output
            const data = await ffmpeg.readFile('output.mp3');

            // Create URL
            const url = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' }));

            // Update UI
            statusDiv.classList.add('hidden');
            resultDiv.classList.remove('hidden');

            dlBtn.href = url;
            dlBtn.download = file.name.replace(/\.[^/.]+$/, "") + ".mp3";

            player.src = url;

            // Trigger Success Modal
            setTimeout(showSuccessModal, 1500);

        } catch (err) {
            console.error(err);
            const msg = err.message || "Unknown Error";
            statusDiv.classList.remove('hidden');
            statusText.innerText = "Error: " + msg;
            statusText.classList.add('text-red-500');
            progressBar.parentElement.classList.add('hidden');
            alert("FFmpeg Initialization Failed:\n" + msg + "\n\nPlease check console for details.");
        }
    });
}
