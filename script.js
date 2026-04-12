

// handle redirect param (optional)
const params = new URLSearchParams(window.location.search);
const redirectPath = params.get("redirect");

if (redirectPath) {
    history.replaceState(null, "", redirectPath);
}
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


// --- TEMPLATES ---

// 1. DASHBOARD (Home) - UPDATED 
const dashboardPage = `
    <div class="max-w-6xl mx-auto space-y-16">
        
        <!-- Hero Section -->
        <div class="text-center py-16 px-4">
            <h1 class="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                Smart tools for every mind — <br class="hidden md:block">
                <span class="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">from students to creators</span>
            </h1>
            <p class="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
                A complete suite of free, privacy-focused tools. Process files locally on your device—no uploads, no waiting.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button onclick="document.getElementById('tools-section').scrollIntoView({behavior: 'smooth'})" 
                    class="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all hover:scale-105">
                    🚀 Explore Tools
                </button>
            </div>

            <!-- Popular Tools Links -->
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-8 animate-fade-in delay-100">
                <span class="font-semibold text-slate-700 dark:text-slate-300">Popular Tools:</span> 
                <a href="/file-merger" class="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mx-1">File Merger</a>, 
                <a href="/img-to-pdf" class="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mx-1">Image to PDF</a>, 
                <a href="/pdf-tools" class="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mx-1">Compress PDF</a>
                <a href="/ipynb-to-pdf" class="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mx-1">IPYNB to PDF</a>
            </p>
        </div>
        
        <!-- Tools Grid -->
        <div id="tools-section" class="scroll-mt-24 space-y-12">
            
            <!-- Category: PDF Tools -->
            <div>
                <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                    <span class="bg-red-100 text-red-600 dark:text-red-400 p-2 rounded-lg text-xl">📄</span> PDF Tools
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${createToolCard('Universal Merger', 'Combine PDF, Images, Text, and more.', '/file-merger', '🧩', 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400', 'border-red-100 hover:border-red-300')}
                    ${createToolCard('PDF Splitter', 'Extract pages or split into custom ranges.', '/pdf-splitter', '✂️', 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400', 'border-red-100 hover:border-red-300')}
                    ${createToolCard('Img to PDF', 'Convert JPG, PNG, etc., to a single PDF.', '/img-to-pdf', '📸', 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400', 'border-red-100 hover:border-red-300')}
                    ${createToolCard('PDF Compressor', 'Shrink PDF file size instantly.', '/pdf-tools', '🗜️', 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400', 'border-red-100 hover:border-red-300')}
                    ${createToolCard('PDF Arranger', 'Reorder or delete pages visually.', '/pdf-arranger', '📑', 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400', 'border-red-100 hover:border-red-300')}
                    ${createToolCard('Watermark PDF', 'Add customized text watermarks.', '/watermark', '✒️', 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400', 'border-red-100 hover:border-red-300')}
                    ${createToolCard('Page Numberer', 'Add page numbers to PDF documents.', '/pagenumber', '🔢', 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400', 'border-red-100 hover:border-red-300')}
                    ${createToolCard('IPYNB to PDF', 'Convert Jupyter Notebooks to polished PDFs.', '/ipynb-to-pdf', '📓', 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400', 'border-orange-100 hover:border-orange-300')}
                </div>
            </div>

            <!-- Category: Image & Video -->
            <div>
                <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                    <span class="bg-green-100 text-green-600 dark:text-green-400 p-2 rounded-lg text-xl">🖼️</span> Image & Video
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${createToolCard('Smart Img Compressor', 'Compress to specific size (<100KB).', '/compressor', '📉', 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400', 'border-green-100 hover:border-green-300')}
                   
                    ${createToolCard('QR Generator', 'Create custom QR codes.', '/qr', '📱', 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400', 'border-green-100 hover:border-green-300')}
                </div>
            </div>

            <!-- Category: AI & Text -->
            <div>
                <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                    <span class="bg-purple-100 text-purple-600 dark:text-purple-400 p-2 rounded-lg text-xl">🤖</span> AI & Text Tools
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${createToolCard('AI Humanizer', 'Rewrite AI text to sound natural.', '/humanizer', '📝', 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400', 'border-purple-100 hover:border-purple-300')}
                    ${createToolCard('Case Converter', 'UPPER, lower, Title Case transformations.', '/case', 'Aa', 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400', 'border-purple-100 hover:border-purple-300')}
                    ${createToolCard('Word Counter Pro', 'Count words, chars, and paragraphs.', '/counter', '📊', 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400', 'border-purple-100 hover:border-purple-300')}
                </div>
            </div>

            <!-- Category: Student Utilities -->
            <div>
                <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                    <span class="bg-yellow-100 text-yellow-600 dark:text-yellow-400 p-2 rounded-lg text-xl">🎓</span> Utilities
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${createToolCard('Attendance Calc', 'Check if you can skip or need to attend.', '/attendance', '📅', 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400', 'border-yellow-100 hover:border-yellow-300')}
                </div>
            </div>

        </div>

        <!-- Features / Why Us Section -->
        <section class="grid md:grid-cols-3 gap-8 py-12 border-t border-slate-200 dark:border-slate-700">
            <div class="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-4">🔒</div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Maximum Privacy</h3>
                <p class="text-slate-600 dark:text-slate-400">Your files never leave your device. All processing (compression, merging, splitting) happens locally in your browser using WebAssembly.</p>
            </div>
            <div class="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl mb-4">⚡</div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Lightning Fast</h3>
                <p class="text-slate-600 dark:text-slate-400">No upload or download wait times. Because files process on your machine, operations are near-instantaneous even for large documents.</p>
            </div>
            <div class="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl mb-4">💎</div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Free Forever</h3>
                <p class="text-slate-600 dark:text-slate-400">Access premium-grade PDF and Image tools without subscriptions, watermarks, or hidden paywalls. A truly free resource for everyone.</p>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="max-w-3xl mx-auto py-8">
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">Frequently Asked Questions</h2>
            
            <div class="space-y-6">
                <div>
                    <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Is Articlarity really free?</h4>
                    <p class="text-slate-600 dark:text-slate-400">Yes, Articlarity is 100% free to use. We support the platform through unintrusive advertisements, allowing us to keep these tools accessible to students and creators worldwide.</p>
                </div>
                <div>
                    <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Are my files secure?</h4>
                    <p class="text-slate-600 dark:text-slate-400">Absolutely. Unlike other online converters, we do not upload your files to a cloud server. Everything is processed directly on your computer, tablet, or phone. This means your sensitive documents remain private.</p>
                </div>
                <div>
                    <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Do I need an account?</h4>
                    <p class="text-slate-600 dark:text-slate-400">No account or login is required. You can start using any tool instantly.</p>
                </div>
                <div>
                    <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-2">What is the AI Humanizer?</h4>
                    <p class="text-slate-600 dark:text-slate-400">The AI Humanizer uses advanced language models to rewrite AI-generated text (from ChatGPT, Claude, etc.) into more natural, human-sounding language. It requires your own API key to function securely locally.</p>
                </div>
            </div>
        </section>

    </div>
`;

function createToolCard(title, desc, link, icon, iconBg = 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400', borderClass = 'border-gray-200 dark:border-slate-700') {
    return `
    <a href="${link}" class="tool-card block bg-white dark:bg-slate-800 p-6 rounded-xl border ${borderClass} shadow-sm hover:shadow-md transition-all group">
        <div class="w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">${icon}</div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:text-blue-400 transition-colors">${title}</h3>
        <p class="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">${desc}</p>
    </a>`;
}

// 2. UNIVERSAL MERGER (UPDATED TEMPLATE)
const universalMergerPage = `
    <div class="max-w-6xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        
        <!-- Tool Interface -->
        <div class="mb-16">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-4">Universal Visual Merger</h1>
            <p class="text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-3xl">
                The ultimate file combiner. Merge PDF files, Images (JPG, PNG), and Text documents into a single, organized PDF file. 
                <span class="text-blue-600 dark:text-blue-400 font-bold">Drag and drop</span> to reorder pages visually before merging.
            </p>
            
            <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <div class="flex gap-4 mb-8">
                    <label class="flex-1 cursor-pointer bg-white dark:bg-slate-800 border-2 border-dashed border-blue-400 hover:bg-blue-50 dark:bg-blue-900/20 rounded-xl flex flex-col items-center justify-center p-8 transition-all group shadow-sm hover:shadow-md h-64">
                        <span class="text-5xl mb-4 group-hover:scale-110 transition-transform">📂</span>
                        <span class="font-bold text-xl text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:text-blue-300">Click to Select Files</span>
                        <span class="text-sm text-slate-500 dark:text-slate-400 mt-2">PDF, JPG, PNG, TXT supported</span>
                        <input type="file" id="universal-merger-input" accept=".pdf, image/*, text/plain" multiple class="hidden">
                    </label>
                </div>

                <div id="merger-status" class="hidden p-4 mb-6 bg-blue-100 text-blue-800 dark:text-blue-200 rounded-lg font-bold text-center animate-pulse border border-blue-200">
                    Processing files...
                </div>

                <div id="merger-ui" class="hidden">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="font-bold text-gray-700 dark:text-slate-200 text-lg">Pages Ready to Merge (<span id="merger-page-count" class="text-blue-600 dark:text-blue-400">0</span>)</h3>
                        <button onclick="document.getElementById('universal-merger-input').click()" class="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:bg-slate-900 px-4 py-2 rounded-lg font-bold shadow-sm transition-colors text-sm">
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
                
                <a id="merger-download-link" class="hidden block w-full bg-green-50 dark:bg-green-900/200 text-white text-center py-4 rounded-xl font-bold text-xl hover:bg-green-600 mt-6 shadow-lg shadow-green-500/30 transition-all" href="#" download="merged_articlarity.pdf">
                    Download Ready! 🎉
                </a>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why is this Unique?</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Cross-Format:</strong> Most mergers only do PDF+PDF. We allow PDF+Image+Text mixing.</li>
                <li><strong>Control:</strong> Visual sorting allows you to arrange the final document order perfectly.</li>
                <li><strong>Privacy:</strong> All merging happens in your browser memory.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">How it works</h3>
            <ol class="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Select Files:</strong> Pick any combination of PDFs, Photos, or Notes.</li>
                <li><strong>Rearrange:</strong> Drag files to set the order.</li>
                <li><strong>Merge:</strong> Click button to generate the unified PDF.</li>
            </ol>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h3>
            <div class="space-y-4">
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I combine images and PDFs?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes! You can mix PDF files, images (JPG, PNG), and text files. The tool automatically converts everything into a single seamless PDF document.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Is there a file size limit?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Since processing happens locally on your device, the limit depends on your available RAM. Generally, you can merge hundreds of pages or up to 500MB comfortably.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I reorder pages?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Absolutely. After selecting files, you can drag and drop the thumbnails to arrange them in your desired order before merging.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Are my files safe?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. We use WebAssembly technology to process files entirely in your browser. No documents are ever uploaded to a server.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Does it preserve quality?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes, the tool maintains the original resolution of your PDFs and images during the merge process.
        </div>
    </details>
            </div>
            <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

// 3. IMAGE TO PDF CONVERTER
const imgToPdfPage = `
    <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-4">Image to PDF Converter</h1>
            <p class="text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-2xl">
                Convert your photos (JPG, PNG, GIF, BMP, WebP) into a high-quality PDF document. 
                Great for creating portfolios, sharing photo albums, or submitting scanned assignments.
            </p>
            
            <div class="bg-gray-50 dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-700">
                <div class="flex gap-4 mb-6">
                    <label class="flex-1 cursor-pointer bg-white dark:bg-slate-800 border-2 border-dashed border-blue-400 hover:bg-blue-50 dark:bg-blue-900/20 rounded-xl flex flex-col items-center justify-center p-8 transition-all shadow-sm hover:shadow-md h-48">
                        <span class="text-4xl mb-4 group-hover:scale-110 transition-transform">📸</span>
                        <span class="font-bold text-blue-700 dark:text-blue-300 text-lg">Add Images</span>
                        <span class="text-sm text-blue-400 mt-1">JPG, PNG, GIF, WEBP</span>
                        <input type="file" id="img-to-pdf-input" accept="image/*" multiple class="hidden">
                    </label>
                </div>

                <div id="img-to-pdf-ui" class="hidden">
                    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 gap-4">
                         <div class="flex items-center gap-4">
                            <span class="font-bold text-gray-700 dark:text-slate-200 bg-gray-100 px-3 py-1 rounded-full text-sm">Images: <span id="img-count" class="text-blue-600 dark:text-blue-400">0</span></span>
                            <select id="pdf-size" class="border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 border p-2 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="a4">PDF Format: A4</option>
                                <option value="letter">PDF Format: US Letter</option>
                                <option value="fit">Fit to Image Size</option>
                            </select>
                         </div>
                         <button onclick="document.getElementById('img-to-pdf-input').click()" class="text-sm bg-blue-100 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-200 transition-colors">
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
                
                <div id="img-to-pdf-status" class="hidden mt-4 text-center font-bold text-gray-600 dark:text-slate-300 p-3 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Features</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Multiple Files:</strong> Select 100+ images at once.</li>
                <li><strong>Auto-Fit:</strong> Automatically adjusts image to fit A4 page size nicely.</li>
                <li><strong>Visual Order:</strong> Images are added in the order you select them.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Supported Formats</h3>
             <div class="flex gap-2 flex-wrap mb-8">
                <span class="bg-gray-100 px-3 py-1 rounded text-sm font-bold text-gray-600 dark:text-slate-300">JPG</span>
                <span class="bg-gray-100 px-3 py-1 rounded text-sm font-bold text-gray-600 dark:text-slate-300">PNG</span>
                <span class="bg-gray-100 px-3 py-1 rounded text-sm font-bold text-gray-600 dark:text-slate-300">WEBP</span>
                <span class="bg-gray-100 px-3 py-1 rounded text-sm font-bold text-gray-600 dark:text-slate-300">GIF</span>
            </div>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h3>
            <div class="space-y-4">
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Does it reduce image quality?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            No by default. It embeds images at their original quality. If you need a smaller file, you can use our PDF Compressor tool afterward.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            What image formats are supported?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            We support all common formats including JPG, PNG, WEBP, GIF, and BMP.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I combine multiple images?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. You can select or drag-and-drop hundreds of images at once and convert them into a single scrolled PDF.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            How do I rearrange the images?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Simply drag the image thumbnails into your preferred sequence before clicking 'Convert'.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Does it work offline?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. Once the page is loaded, you can disconnect from the internet and convert files securely.
        </div>
    </details>
            </div>
            <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

// 4. PDF SPLITTER
const pdfSplitterPage = `
    <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-4">PDF Splitter</h1>
            <p class="text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-2xl">
                Split a large PDF document into separate pages or extract specific page ranges (e.g., Pages 1-5). 
                Save only what you need and discard the rest.
            </p>
            
            <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100">
                <input type="file" id="split-input" accept=".pdf" class="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white dark:bg-slate-800 file:text-red-700 hover:file:bg-red-100 mb-6 cursor-pointer shadow-sm">
                
                <div class="grid md:grid-cols-2 gap-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                    <div>
                        <label class="font-bold flex items-center gap-2 mb-2">
                            <input type="radio" name="split-mode" value="all" checked class="accent-red-600 w-5 h-5"> 
                            Extract All Pages
                        </label>
                        <p class="text-xs text-gray-500 dark:text-slate-400 ml-7">Creates a ZIP file containing every single page as a separate PDF.</p>
                    </div>
                    <div>
                        <label class="font-bold flex items-center gap-2 mb-2">
                            <input type="radio" name="split-mode" value="range" class="accent-red-600 w-5 h-5"> 
                            Extract Range
                        </label>
                        <input id="split-range" placeholder="e.g. 1-5, 8, 10-12" class="w-full border-2 border-gray-200 dark:border-slate-700 p-2 rounded-lg ml-7 mt-1 focus:border-red-500 outline-none" disabled>
                    </div>
                </div>

                <div id="split-status" class="hidden mt-4 text-center font-bold text-red-600 dark:text-red-400 animate-pulse">Processing split...</div>

                <button id="btn-split" class="w-full mt-6 bg-red-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all hover:scale-[1.01]">
                    Split PDF ✂️
                </button>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Use Cases</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Legal:</strong> Extract specific contract pages.</li>
                <li><strong>Books:</strong> Split a large ebook into chapters.</li>
                <li><strong>Invoices:</strong> Separate bulk invoices into individual files.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Methods</h3>
             <div class="grid md:grid-cols-2 gap-4 mb-8">
                <div class="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
                    <h4 class="font-bold text-red-700">Explode</h4>
                    <p class="text-sm">Turn a 10-page PDF into 10 separate files instantly.</p>
                </div>
                <div class="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
                    <h4 class="font-bold text-red-700">Custom Extract</h4>
                    <p class="text-sm">Pick specific pages like "1,3,5" to create a new summarized PDF.</p>
                </div>
            </div>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h3>
            <div class="space-y-4">
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I extract a single page?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. Choose 'Extract Range' and simply type the page number (e.g., '5') to save just that page.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            How do I split every page into a separate file?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Select the 'Extract All Pages' option. This will save every page of your PDF as an individual file (downloaded as a ZIP).
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I extract multiple ranges?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. Ranges like '1-3, 5, 8-10' are supported to create a custom PDF from selected parts.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Is the metadata preserved?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes, the title and author properties of the original PDF are generally preserved in the extracted files.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Is it fast for large files?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Extremely fast. It cuts the PDF structurally without re-rendering, so even large books split in seconds.
        </div>
    </details>
            </div>
            <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;
// ... (Attendance, Compressor, PDF Compressor, Humanizer, Password, etc. pages are unchanged) ...
const attendancePage = `
    <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-4">Attendance Calculator</h1>
            <p class="text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-2xl">
                Attendance Calc is a smart, browser-based attendance calculator that helps students check whether they need to attend or can safely skip classes. 
                Just enter your attended classes and total classes, and the tool instantly tells you your percentage.
            </p>
            
            <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-2xl border border-yellow-100 max-w-lg mx-auto">
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-slate-200 mb-2">Total Classes Conducted</label>
                        <input type="number" id="att-total" class="w-full bg-white dark:bg-slate-900 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-slate-700 p-4 rounded-xl text-xl font-bold focus:border-yellow-500 outline-none" placeholder="e.g. 50">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-slate-200 mb-2">Classes Attended</label>
                        <input type="number" id="att-present" class="w-full bg-white dark:bg-slate-900 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-slate-700 p-4 rounded-xl text-xl font-bold focus:border-yellow-500 outline-none" placeholder="e.g. 40">
                    </div>
                    <div>
                         <label class="block text-sm font-bold text-gray-700 dark:text-slate-200 mb-2">Target Percentage</label>
                        <input type="number" id="att-target" class="w-full bg-white dark:bg-slate-900 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-slate-700 p-4 rounded-xl text-xl font-bold focus:border-yellow-500 outline-none" value="75">
                    </div>
                </div>

                <div class="mt-8 space-y-4">
                    <button id="btn-calc-attendance" class="w-full bg-yellow-50 dark:bg-yellow-900/200 text-white py-4 rounded-xl font-bold text-xl hover:bg-yellow-600 shadow-lg shadow-yellow-500/20 transition-all hover:scale-[1.01]">
                        Calculate Status 📊
                    </button>
                    <div id="att-result" class="hidden p-6 bg-white dark:bg-slate-800 rounded-xl border border-yellow-200 text-center shadow-sm">
                         <p class="text-sm text-gray-500 dark:text-slate-400 uppercase tracking-wide font-semibold">Current Attendance</p>
                         <h3 id="att-percentage" class="text-4xl font-extrabold text-blue-600 dark:text-blue-400 my-2">0%</h3>
                        <div id="att-message" class="text-lg font-medium mt-4 p-3 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why use Attendance Calculator?</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                <li><strong>Avoid Shortages:</strong> Avoid attendance shortages and detentions.</li>
                <li><strong>Plan Leaves:</strong> Plan whether you can miss tomorrow’s class safely.</li>
                <li><strong>Meet Criteria:</strong> Helps maintain above 75% attendance rule mandated by most universities.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Key Features</h3>
            <div class="grid md:grid-cols-3 gap-4 mb-8">
                 <div class="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg border border-gray-100 dark:border-slate-800">
                    <h4 class="font-bold text-slate-800 dark:text-slate-100">Instant</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Calculates percentage instantly.</p>
                </div>
                <div class="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg border border-gray-100 dark:border-slate-800">
                    <h4 class="font-bold text-slate-800 dark:text-slate-100">Predictive</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400">tells you how many classes to attend.</p>
                </div>
                <div class="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg border border-gray-100 dark:border-slate-800">
                    <h4 class="font-bold text-slate-800 dark:text-slate-100">Private</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400">No login required, works offline.</p>
                </div>
            </div>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h3>
            <div class="space-y-4">
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Is this calculation accurate?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes, it uses the standard formula: (Presented / Total) * 100. It works for all universities and schools.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Does it save my data?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Your data is stored locally in your browser so you don't have to re-enter it next time. It is never sent to us.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            What if my target is 80%?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            You can adjust the 'Target Percentage' field to any number (e.g., 60, 75, 80, 85) to see how many classes you need.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Does it account for future classes?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            The 'Predictive' mode tells you exactly how many upcoming classes you must attend to hit your target.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Do I need to sign up?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            No account is required. The tool is free and open for everyone.
        </div>
    </details>
            </div>
            <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;
const compressorPage = `
    <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-4">Smart Image Compressor</h1>
            <p class="text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-2xl">
                Smart Image Compressor reduces image file size to a specific target — including under 100KB — while preserving clarity. 
                Perfect for uploading documents, college forms, job portals, and online submissions.
            </p>
            
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                <div id="drop-zone" class="bg-white dark:bg-slate-800 border-2 border-dashed border-green-400 rounded-xl p-10 text-center cursor-pointer hover:bg-green-50 dark:bg-green-900/20 transition-colors shadow-sm">
                    <span class="text-5xl block mb-2">📉</span>
                    <p class="text-xl font-bold text-green-700">Click or Drag Image</p>
                    <p class="text-sm text-green-500 mt-1">JPG, PNG, WEBP supported</p>
                    <input type="file" id="img-input" class="hidden" accept="image/*">
                </div>

                <div id="img-controls" class="hidden mt-8 space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                    <div class="flex gap-2 p-1 bg-gray-100 rounded-lg">
                        <button id="mode-manual" class="flex-1 py-2 rounded-md bg-white dark:bg-slate-800 shadow-sm text-sm font-bold text-gray-800 dark:text-slate-100 transition-all">Manual Control</button>
                        <button id="mode-auto" class="flex-1 py-2 rounded-md text-gray-500 dark:text-slate-400 text-sm font-bold hover:bg-gray-200 transition-all">Target Size (KB)</button>
                    </div>

                    <!-- Manual UI -->
                    <div id="manual-ui">
                        <div class="flex justify-between mb-2">
                            <label class="font-bold text-gray-700 dark:text-slate-200">Quality Level</label>
                            <span class="font-mono bg-blue-100 text-blue-800 dark:text-blue-200 px-2 rounded"><span id="qual-val">80</span>%</span>
                        </div>
                        <input type="range" id="qual-slider" min="1" max="100" value="80" class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600">
                        <p class="text-xs text-gray-400 mt-2 text-right">Lower % = Smaller Size</p>
                    </div>

                    <!-- Auto UI -->
                    <div id="auto-ui" class="hidden">
                        <label class="block text-sm font-bold text-gray-700 dark:text-slate-200 mb-2">Target File Size (KB)</label>
                        <div class="flex gap-2">
                            <input type="number" id="target-kb" value="100" class="w-full border-2 border-gray-200 dark:border-slate-700 p-3 rounded-lg focus:border-green-500 outline-none" placeholder="e.g. 50">
                            <button id="btn-auto-compress" class="bg-green-600 text-white px-6 rounded-lg font-bold hover:bg-green-700">Go</button>
                        </div>
                        <p class="text-xs text-gray-500 dark:text-slate-400 mt-2">We will try to reduce quality until it fits this size.</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4 text-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div>
                            <p class="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold tracking-wider">Original</p>
                            <p id="orig-size" class="text-lg font-bold text-slate-700 dark:text-slate-300">0 KB</p>
                        </div>
                        <div class="border-l border-slate-200 dark:border-slate-700">
                            <p class="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold tracking-wider">Compressed</p>
                            <p id="new-size" class="text-lg font-bold text-green-600 dark:text-green-400">0 KB</p>
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
             <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why is this useful?</h3>
             <ul class="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                <li><strong>Portals:</strong> Many portals demand under 100KB photos.</li>
                <li><strong>Speed:</strong> Faster uploads on slow networks.</li>
                <li><strong>Storage:</strong> Save space on your device.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Key Features</h3>
            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div class="flex gap-4">
                    <span class="text-2xl">🎯</span>
                    <div>
                        <h4 class="font-bold text-slate-800 dark:text-slate-100">Target Size Mode</h4>
                        <p class="text-sm text-slate-600 dark:text-slate-400">Compress specific KB size (e.g. 50KB) magically.</p>
                    </div>
                </div>
                <div class="flex gap-4">
                     <span class="text-2xl">⚡</span>
                    <div>
                        <h4 class="font-bold text-slate-800 dark:text-slate-100">Instant Preview</h4>
                        <p class="text-sm text-slate-600 dark:text-slate-400">Compare before and after side-by-side.</p>
                    </div>
                </div>
            </div>
            
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h3>
            <div class="space-y-4">
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Does it overwrite my original image?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            No. The compressed image is saved as a new file, leaving your original photo untouched.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I specify an exact file size?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. Use the 'Target Size' mode to request a specific limit, like 50KB or 100KB, and we will adjust quality to fit.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Which formats can be compressed?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            It works best with JPG, PNG, and WEBP files.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Is the compression lossy?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes, it intelligently reduces data while maintaining visual clarity. You can control the aggressiveness using the slider.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Is it safe for personal photos?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. Processing is local. Your photos never leave your device.
        </div>
    </details>
            </div>
            <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;
const pdfPage = `
    <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-4">PDF Compressor</h1>
            <p class="text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-2xl">
                PDF Compressor reduces the size of heavy PDF documents without ruining text clarity or image quality. 
                Perfect for job portals, online submissions, academic work, and email attachments that demand specific size limits.
            </p>
            
            <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100">
                <input type="file" id="pdf-input" accept=".pdf" class="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white dark:bg-slate-800 file:text-red-700 hover:file:bg-red-100 mb-6 cursor-pointer">
                
                <div id="pdf-status" class="hidden">
                    <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div id="pdf-progress" class="bg-red-600 h-2.5 rounded-full" style="width: 0%"></div>
                    </div>
                    <p id="pdf-status-text" class="text-sm text-center text-gray-600 dark:text-slate-300">Processing...</p>
                </div>

                <!-- Quality Slider -->
                <div class="mb-6 mt-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-red-100">
                    <label class="block text-sm font-bold text-gray-700 dark:text-slate-200 mb-2">
                        Compression Aggressiveness: <span id="pdf-qual-val" class="text-red-600 dark:text-red-400">70</span>%
                    </label>
                    <input type="range" id="pdf-qual-slider" min="10" max="100" value="70" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600">
                    <p class="text-xs text-gray-500 dark:text-slate-400 mt-2">Lower % = Smaller File Size. 70% is recommended for balanced quality.</p>
                </div>

                <!-- Size Comparison UI -->
                <div class="grid grid-cols-2 gap-4 text-center bg-white dark:bg-slate-800 p-4 rounded-lg mt-4 mb-4 border border-red-100">
                    <div><p class="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-widest">Original Size</p><p id="pdf-orig-size" class="font-bold text-gray-800 dark:text-slate-100">0 KB</p></div>
                    <div class="border-l border-red-100"><p class="text-xs text-green-600 dark:text-green-400 uppercase tracking-widest">Compressed</p><p id="pdf-new-size" class="font-bold text-green-600 dark:text-green-400">0 KB</p></div>
                </div>

                <div id="pdf-actions" class="hidden flex flex-col sm:flex-row gap-4 mt-6">
                    <a id="dl-pdf-btn" class="flex-1 block bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-4 rounded-xl font-bold shadow-lg shadow-red-600/30 hover:scale-[1.01] transition-all cursor-pointer" download>Download PDF 💾</a>
                    <button id="preview-pdf-btn" class="flex-1 bg-gray-800 text-white text-center py-4 rounded-xl font-bold hover:bg-gray-900 shadow-lg">Preview 👀</button>
                </div>
                
                <div id="pdf-computing" class="hidden text-center mt-4">
                    <p class="text-sm font-semibold text-red-600 dark:text-red-400 animate-pulse">Calculating Size...</p>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Advantages</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Resolution:</strong> Keeps resolution readable while discarding unused data.</li>
                <li><strong>Privacy:</strong> Works offline inside browser.</li>
                <li><strong>Engine:</strong> Fast compression engine suitable for large multi-page documents.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">How to Operate</h3>
            <ol class="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Upload PDF:</strong> Select your file.</li>
                <li><strong>Select Level:</strong> Use the slider to choose how much to compress.</li>
                <li><strong>Save:</strong> Download the compressed file instantly.</li>
            </ol>
            
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h3>
            <div class="space-y-4">
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            How much can it reduce file size?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Typically 40-90%, depending on the content. Scanned documents with images compress the best.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Does it make text blurry?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            We use smart vector compression which keeps text sharp while optimizing images. Readability is preserved.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Does it work on scanned PDFs?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. It is highly effective at shrinking scanned documents by optimizing the embedded page images.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Is there a page limit?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            There is no hard limit, but very large files (e.g., 200MB+) might require a device with more RAM.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I use this for official uploads?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. It creates standard compatible PDFs perfect for portals like government sites or job applications.
        </div>
    </details>
            </div>
            <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;
const humanizerPage = `
    <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-4">AI Text Humanizer</h1>
            <p class="text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-2xl">
                AI Humanizer rewrites AI-generated text into natural, human-sounding language. 
                Whether you use ChatGPT, Gemini, Claude or Copilot, this tool removes robotic tone and fixes repetition.
            </p>
            
            <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100">
                <div class="mb-6">
                    <label class="block text-sm font-bold text-gray-700 dark:text-slate-200 mb-2">Enter your Gemini API Key <span class="text-gray-400 font-normal">(stored locally in browser)</span></label>
                    <div class="flex gap-2">
                         <input type="password" id="api-key" class="flex-1 border-2 border-gray-200 dark:border-slate-700 p-3 rounded-xl focus:border-purple-500 outline-none" placeholder="AIzaSy...">
                         <button onclick="saveKey()" class="bg-gray-800 text-white px-6 rounded-xl font-bold hover:bg-gray-900">Save</button>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-slate-200 mb-2">Input AI Text</label>
                        <textarea id="human-input" class="w-full h-64 p-4 border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none resize-none transition-all" placeholder="Paste ChatGPT text here..."></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-slate-200 mb-2">Humanized Result</label>
                        <div id="human-result" class="w-full h-64 p-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-y-auto text-gray-600 dark:text-slate-300 italic whitespace-pre-wrap">Result will appear here...</div>
                    </div>
                </div>

                <button id="btn-humanize" class="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-xl hover:shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.01]">
                    ✨ Humanize Text
                </button>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why use AI Humanizer?</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Natural Flow:</strong> Makes AI text look written by a real person.</li>
                <li><strong>Emotion:</strong> Improves emotion, flow & sentence structure.</li>
                <li><strong>Anti-Detection:</strong> Avoid robotic rhythm & repetitive vocab to protect against AI plagiarism checks.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Who is this for?</h3>
            <div class="grid md:grid-cols-2 gap-4 mb-8">
                <div class="bg-white dark:bg-slate-800 border rounded-lg p-4">
                    <span class="font-bold text-purple-700 dark:text-purple-300">Students</span>
                    <p class="text-sm">For assignments and reports.</p>
                </div>
                <div class="bg-white dark:bg-slate-800 border rounded-lg p-4">
                    <span class="font-bold text-purple-700 dark:text-purple-300">Creators</span>
                    <p class="text-sm">For captions and scripts.</p>
                </div>
            </div>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h3>
            <div class="space-y-4">
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can this bypass AI detection?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            It significantly alters the structure and vocabulary to sound more natural, which often reduces AI detection scores. However, always review the output.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Is my API key safe?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. Your Gemini API Key is stored in your browser's LocalStorage and sent directly to Google's servers. We never see or store it.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Is it free?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            The tool interface is free. You use your own API key, which usually has a generous free tier from Google.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Does it change the meaning?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            It aims to preserve the original meaning while improving flow, but you should always proofread the result.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            What languages are supported?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            It is optimized for English but works well with most major languages supported by the AI model.
        </div>
    </details>
            </div>
            <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

const pdfArrangerPage = `
    <div class="max-w-6xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-4">PDF Arranger</h1>
            <p class="text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-2xl">
                PDF Arranger allows users to reorder, rotate, or delete specific PDF pages using a visual interface. 
                Perfect for restructuring scanned documents, preparing exam notes, or adjusting PDF layouts before printing.
            </p>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100">
                <input type="file" id="arranger-input" accept=".pdf" class="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white dark:bg-slate-800 file:text-blue-700 dark:text-blue-300 hover:file:bg-blue-100 mb-6 cursor-pointer shadow-sm">
        
                <div id="arranger-status" class="hidden text-center text-blue-600 dark:text-blue-400 font-bold mb-4 animate-pulse">Loading pages...</div>
        
                <div id="arranger-ui" class="hidden">
                    <div class="flex justify-between items-center mb-4">
                        <p class="text-sm font-bold text-slate-500 dark:text-slate-400">Drag to reorder • Click 'X' to delete</p>
                        <button id="btn-save-arranger" class="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all">Save & Download PDF</button>
                    </div>
                    <div id="arranger-grid" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6 min-h-[200px] border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-4 bg-white dark:bg-slate-800/50">
                        <!-- Thumbnails go here -->
                    </div>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Benefits</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Drag & Drop:</strong> Simple visual reordering.</li>
                <li><strong>Preview:</strong> See exactly what you are changing in real-time.</li>
                <li><strong>Secure:</strong> Offline secure editing on your device.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Steps</h3>
             <ol class="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Upload PDF:</strong> Select your file.</li>
                <li><strong>Organize:</strong> Drag pages into new order or delete unwanted ones.</li>
                <li><strong>Save:</strong> Download the rearranged file.</li>
            </ol>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h3>
            <div class="space-y-4">
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I rotate pages?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. You can rotate individual pages 90, 180, or 270 degrees.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I delete pages?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. Simply click the 'X' on any page thumbnail to remove it from the final PDF.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Does it allow undo?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Currently, the best way to undo is to reload the document, but we are working on an undo button.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Do I need Adobe Acrobat?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            No. This tool provides pro-level rearranging features directly in your browser for free.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Is it secure?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes, file manipulation happens locally in memory.
        </div>
    </details>
            </div>
            <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

const watermarkPage = `
    <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-4">Add Watermark to PDF</h1>
            <p class="text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-2xl">
                Watermark PDF helps you add custom text watermarks to documents. 
                Ideal for branding, copyright protection, draft labels, and secure sharing.
            </p>
            
            <div class="grid md:grid-cols-2 gap-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100">
                <div>
                     <input type="file" id="watermark-input" accept=".pdf" class="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white dark:bg-slate-800 file:text-blue-700 dark:text-blue-300 hover:file:bg-blue-100 mb-6 cursor-pointer shadow-sm">
                     
                     <div class="space-y-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-blue-100">
                        <div>
                            <label class="block font-bold mb-1 text-gray-700 dark:text-slate-200 text-sm">Watermark Text</label>
                            <input id="wm-text" type="text" value="CONFIDENTIAL" class="w-full border-2 border-gray-200 dark:border-slate-700 p-2 rounded-lg focus:border-blue-500 outline-none">
                        </div>
                        <div class="flex gap-4">
                            <div class="flex-1">
                                <label class="block font-bold mb-1 text-gray-700 dark:text-slate-200 text-sm">Size</label>
                                <input id="wm-size" type="number" value="50" class="w-full border-2 border-gray-200 dark:border-slate-700 p-2 rounded-lg focus:border-blue-500 outline-none">
                            </div>
                            <div class="flex-1">
                                <label class="block font-bold mb-1 text-gray-700 dark:text-slate-200 text-sm">Opacity (0-1)</label>
                                <input id="wm-opacity" type="number" value="0.5" step="0.1" max="1" class="w-full border-2 border-gray-200 dark:border-slate-700 p-2 rounded-lg focus:border-blue-500 outline-none">
                            </div>
                        </div>
                        <div>
                             <label class="block font-bold mb-1 text-gray-700 dark:text-slate-200 text-sm">Rotation: <span id="wm-rot-val">45 deg</span></label>
                             <input id="wm-rotation" type="range" min="0" max="360" value="45" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600">
                        </div>
                        <div>
                            <label class="block font-bold mb-1 text-gray-700 dark:text-slate-200 text-sm">Color</label>
                            <input id="wm-color" type="color" value="#ff0000" class="w-full border p-1 rounded h-10 cursor-pointer">
                        </div>
                     </div>

                     <button id="btn-apply-watermark" class="w-full bg-blue-600 text-white py-4 rounded-xl font-bold mt-6 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.01]">Apply Watermark</button>
                </div>
                
                <div class="flex flex-col gap-4">
                    <div class="bg-gray-200 rounded-xl flex items-center justify-center p-4 relative overflow-hidden h-[400px] border-2 border-dashed border-gray-300 dark:border-slate-600">
                         <div id="wm-placeholder" class="text-gray-400 text-center absolute z-0">
                            <div class="text-4xl mb-2">👁️</div>
                            <p class="font-bold">Preview Area</p>
                         </div>
                         <canvas id="wm-preview-canvas" class="border shadow-lg relative z-10 hidden max-h-full max-w-full bg-white dark:bg-slate-800"></canvas>
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
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Main Highlights</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Custom:</strong> Custom input, font size, and color.</li>
                <li><strong>Privacy:</strong> Offline processing means no one sees your confidential files.</li>
                <li><strong>Free:</strong> Unlimited document usage.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">How to Apply</h3>
             <ol class="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Load PDF:</strong> Upload the document securely.</li>
                <li><strong>Customize:</strong> Type your text (e.g. DRAFT), choose opacity and rotation.</li>
                <li><strong>Download:</strong> Get your protected file instantly.</li>
            </ol>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h3>
            <div class="space-y-4">
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I change the watermark angle?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. Use the rotation slider to place text diagonally (45°), vertically (90°), or horizontally.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Is the watermark permanent?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. Once applied and downloaded, the watermark becomes a permanent part of the PDF page content.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I adjust transparency?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. You can control the opacity (0.0 to 1.0) to make the watermark subtle or bold.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I use an image as a watermark?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Currently this tool supports Text watermarks only. Image watermarking is coming soon.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Does it cover all pages?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes, the watermark is applied to every page of the document automatically.
        </div>
    </details>
            </div>
            <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;



const qrGeneratorPage = `
    <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-4">QR Code Generator</h1>
            <p class="text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-2xl">
                Create instant QR codes for URLs, text, Wi-Fi passwords, or emails. 
                Customizable, fast, and secure. Download in high resolution.
            </p>
            
            <div class="bg-gray-50 dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 text-center">
                 <input id="qr-in" class="w-full border-2 border-gray-200 dark:border-slate-700 p-4 rounded-xl mb-6 outline-none focus:border-green-500 text-lg" placeholder="Enter link or text here (e.g. https://google.com)">
                
                <button onclick="genQR()" class="w-full sm:w-auto bg-green-600 text-white px-10 py-3 rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all hover:scale-[1.05]">
                    Generate QR Code 📱
                </button>

                <div id="qr-out" class="mt-8 flex justify-center min-h-[200px] items-center">
                    <p class="text-gray-400 italic">QR Code will appear here...</p>
                </div>
                
                <a id="qr-download" class="hidden inline-block mt-6 text-green-600 dark:text-green-400 font-bold border-2 border-green-600 px-6 py-2 rounded-lg hover:bg-green-50 dark:bg-green-900/20 transition-colors cursor-pointer" download="qrcode.png">
                    Download PNG ⬇️
                </a>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Uses</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Business:</strong> Website links on business cards.</li>
                <li><strong>Wi-Fi:</strong> Share network login easily.</li>
                <li><strong>Events:</strong> Ticket scanning or info sheets.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h3>
            <div class="space-y-4">
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Do these QR codes expire?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            No. They are static QR codes containing the text/link directly. They work forever.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I generate WiFi codes?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. Format your text like <code>WIFI:S:MyNetwork;T:WPA;P:MyPassword;;</code> and it will work.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            What format is the download?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            We provide high-quality PNG images compatible with all design software.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I change the color?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Currently we output standard high-contrast black and white for maximum scan reliability.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Is there a scan limit?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            No. Since it's a direct static code, you can scan it a billion times.
        </div>
    </details>
            </div>
            <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

const pageNumberPage = `
    <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-4">Add Page Numbers to PDF</h1>
            <p class="text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-2xl">
                Insert page numbers into your PDF document instantly. 
                Choose position, style, and font size. Essential for legal bundles and thesis submissions.
            </p>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100">
                <input type="file" id="pagenum-input" accept=".pdf" class="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white dark:bg-slate-800 file:text-blue-700 dark:text-blue-300 hover:file:bg-blue-100 mb-6 cursor-pointer shadow-sm">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-blue-100 mb-6">
                    <div>
                        <label class="block font-bold mb-2 text-sm text-gray-700 dark:text-slate-200">Position</label>
                        <select id="pg-pos" class="w-full border-2 border-gray-200 dark:border-slate-700 p-2 rounded-lg focus:border-blue-500 outline-none">
                            <option value="bottom-center">Bottom Center</option>
                            <option value="bottom-right">Bottom Right</option>
                            <option value="bottom-left">Bottom Left</option>
                            <option value="top-center">Top Center</option>
                            <option value="top-right">Top Right</option>
                            <option value="top-left">Top Left</option>
                        </select>
                    </div>
                    <div>
                        <label class="block font-bold mb-2 text-sm text-gray-700 dark:text-slate-200">Format</label>
                        <select id="pg-fmt" class="w-full border-2 border-gray-200 dark:border-slate-700 p-2 rounded-lg focus:border-blue-500 outline-none">
                            <option value="nb">1</option>
                            <option value="pg_nb">Page 1</option>
                            <option value="nb_of_total">1 of n</option>
                            <option value="pg_nb_of_total">Page 1 of n</option>
                        </select>
                    </div>
                     <div>
                        <label class="block font-bold mb-2 text-sm text-gray-700 dark:text-slate-200">Font Size</label>
                        <input type="number" id="pg-size" value="12" class="w-full border-2 border-gray-200 dark:border-slate-700 p-2 rounded-lg focus:border-blue-500 outline-none">
                    </div>
                    <div>
                         <label class="block font-bold mb-2 text-sm text-gray-700 dark:text-slate-200">Start Number</label>
                        <input type="number" id="pg-start" value="1" class="w-full border-2 border-gray-200 dark:border-slate-700 p-2 rounded-lg focus:border-blue-500 outline-none">
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
                    <div class="bg-gray-200 rounded-xl flex items-center justify-center p-4 h-[250px] relative border-2 border-dashed border-gray-300 dark:border-slate-600">
                        <div id="pg-placeholder" class="text-gray-400 text-center absolute z-0 flex flex-col items-center">
                            <span class="text-4xl mb-2">👁️</span>
                            <span>Preview</span>
                        </div>
                        <canvas id="pg-preview-canvas" class="border shadow-lg hidden max-h-full max-w-full relative z-10 bg-white dark:bg-slate-800"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Features</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Customizable:</strong> Choose font size and starting number.</li>
                <li><strong>Flexible:</strong> Formats like "Page 1 of 50" supported.</li>
                <li><strong>Secure:</strong> Does not upload your document anywhere.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h3>
            <div class="space-y-4">
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I start numbering from page 5?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Yes. Set the 'Start Number' to 5 (or any number) to customize the sequence.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I skip the first page?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Currently it applies to all pages, but you can remove the first page using our Splitter tool first if needed.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            What format should I use?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            'Page 1 of N' is best for formal documents, while simple numbers work for drafts.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Can I change the font?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            It uses a standard Helvetica/Arial font for maximum compatibility.
        </div>
    </details>
            
    <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
        <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
            Does it cover text?
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            It places the number in the margin. If your text has no margins, it might overlap.
        </div>
    </details>
            </div>
            <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

const caseConverterPage = `
<div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">

    <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-4">
        Case Converter
    </h1>

    <p class="text-lg text-gray-600 dark:text-slate-300 mb-6">
        Convert text between Uppercase, Lowercase, Title Case, Sentence Case and more instantly.
    </p>

    <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800">

        <textarea id="case-input"
            class="w-full h-48 p-4 border-2 border-purple-200 dark:border-purple-800 rounded-xl focus:border-purple-500 outline-none mb-4 text-lg bg-white dark:bg-slate-800 dark:text-white"
            placeholder="Type or paste your text here..."></textarea>

        <div class="flex justify-between text-sm mb-4 text-slate-600 dark:text-slate-300">
            <span>Characters: <strong id="char-count">0</strong></span>
            <span>Words: <strong id="word-count">0</strong></span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <button onclick="convertCase('upper')" class="btn-case">UPPERCASE</button>
            <button onclick="convertCase('lower')" class="btn-case">lowercase</button>
            <button onclick="convertCase('title')" class="btn-case">Title Case</button>
            <button onclick="convertCase('sentence')" class="btn-case">Sentence case</button>
            <button onclick="convertCase('alternating')" class="btn-case">aLtErNaTiNg</button>
            <button onclick="convertCase('inverse')" class="btn-case">iNVERSE</button>
            <button onclick="copyCase()" class="col-span-2 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">
                Copy Result 📋
            </button>
        </div>
    </div>
</div>
`;
const wordCounterPage = `
<div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">

    <div class="mb-12">
        <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-4">
            Word Counter Pro
        </h1>

        <p class="text-lg text-gray-600 dark:text-slate-300 mb-8">
            Count words, characters (with and without spaces), sentences, and paragraphs in real-time.
            Perfect for essays, assignments, blog posts, LinkedIn captions, and social media writing.
        </p>

        <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100">

            <textarea 
                id="wc-input"
                class="w-full h-64 p-4 border-2 border-blue-200 rounded-xl 
                       focus:border-blue-500 outline-none mb-6 text-lg 
                       bg-white dark:bg-slate-900 
                       text-slate-900 dark:text-white"
                placeholder="Start typing or paste your document here..."
            ></textarea>

            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">

                <div class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm text-center">
                    <span id="wc-words" class="block text-3xl font-bold text-blue-600 dark:text-blue-400">0</span>
                    <span class="text-xs text-gray-400 uppercase">Words</span>
                </div>

                <div class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm text-center">
                    <span id="wc-chars" class="block text-3xl font-bold text-blue-600 dark:text-blue-400">0</span>
                    <span class="text-xs text-gray-400 uppercase">Characters</span>
                </div>

                <div class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm text-center">
                    <span id="wc-spaces" class="block text-2xl font-bold text-gray-700 dark:text-slate-200">0</span>
                    <span class="text-xs text-gray-400">No Spaces</span>
                </div>

                <div class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm text-center">
                    <span id="wc-sentences" class="block text-2xl font-bold text-gray-700 dark:text-slate-200">0</span>
                    <span class="text-xs text-gray-400">Sentences</span>
                </div>

                <div class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm text-center">
                    <span id="wc-paragraphs" class="block text-2xl font-bold text-gray-700 dark:text-slate-200">0</span>
                    <span class="text-xs text-gray-400">Paragraphs</span>
                </div>

            </div>
        </div>
    </div>

    <article class="mt-12 space-y-8">

        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
            About This Word Counter Tool
        </h2>

        <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
            This online Word Counter tool provides instant word count, character count, sentence detection,
            and paragraph tracking directly inside your browser. It is designed for students,
            content creators, bloggers, marketers, and professionals who need accurate writing metrics
            in real-time without installing any software.
        </p>

        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
            How to Use
        </h2>

        <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
            Simply type or paste your content into the text area above. The tool automatically updates
            all statistics including total words, characters (with and without spaces), sentences,
            and paragraphs as you type.
        </p>

        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
            Key Benefits
        </h2>

        <ul class="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Real-time word tracking</li>
            <li>Counts characters with and without spaces</li>
            <li>Automatic sentence detection</li>
            <li>Paragraph identification</li>
            <li>No registration required</li>
            <li>100% privacy – text never leaves your device</li>
        </ul>

    </article>

</div>
`;
const privacyModePage = `
    <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        
        <div class="mb-12">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-4">Maximum Privacy Mode</h1>
            <p class="text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-2xl">
                Articlarity is designed with a "Privacy First" architecture. 
                Learn how we process files securely without ever uploading them to a cloud server.
            </p>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 mb-8">
                 <div class="flex items-start gap-4">
                    <span class="text-4xl">🛡️</span>
                    <div>
                        <h3 class="text-xl font-bold text-blue-900 mb-2">Offline Processing</h3>
                         <p class="text-blue-800 dark:text-blue-200 leading-relaxed">
                            Unlike most online tools, we do not have a backend server that sees your files. 
                            When you select a PDF or Image, it stays in your browser's memory (RAM). 
                            Our algorithms (WebAssembly) run directly on your device to process the data.
                        </p>
                    </div>
                </div>
            </div>

             <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-6 rounded-xl shadow-sm">
                    <div class="text-3xl mb-3">⚡</div>
                    <h4 class="font-bold text-gray-800 dark:text-slate-100 mb-2">Zero Latency</h4>
                    <p class="text-sm text-gray-600 dark:text-slate-300">Since there is no upload, there is no waiting time. Processing is instant.</p>
                </div>
                 <div class="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-6 rounded-xl shadow-sm">
                    <div class="text-3xl mb-3">🔐</div>
                    <h4 class="font-bold text-gray-800 dark:text-slate-100 mb-2">GDPR Compliant</h4>
                    <p class="text-sm text-gray-600 dark:text-slate-300">Your data never leaves your control, making it inherently compliant with data privacy laws.</p>
                </div>
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Technical Details</h3>
            <p class="text-slate-700 dark:text-slate-300 mb-6">
                We utilize technologies like <strong>WebAssembly (WASM)</strong> and <strong>PDF.js</strong> to bring desktop-class performance to the web.
            </p>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h3>
             <details class="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
                <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-slate-800">
                    Does it work without internet?
                    <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
                    Yes! Once the page loads, you can disconnect from WiFi and still use all tools fully.
                </div>
            </details>
            
            <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                <p>This tool is optimized for students, teachers, professionals, and daily computer users. It works on laptops, mobile browsers, and tablets without installation. All processing happens inside your browser for maximum speed and privacy.</p>
            </div>
        </article>
    </div>
`;

const ipynbToPdfPage = `
    <style>
        /* Jupyter Notebook Styling Mimicry */
        .notebook-container {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
        }

        .cell {
            margin-bottom: 2rem;
            page-break-inside: avoid;
            overflow-wrap: break-word;
        }

        pre {
            overflow-wrap: break-word;
            word-wrap: break-word;
            white-space: pre-wrap;
        }

        .input-area {
            display: flex;
            flex-direction: column;
            margin-bottom: 0.5rem;
            background: #f7f7f7;
            border: 1px solid #cfcfcf;
            border-radius: 4px;
            overflow: hidden;
        }

        .dark .input-area {
            background: #1e293b;
            border-color: #334155;
        }

        .prompt {
            font-family: monospace;
            font-size: 12px;
            color: #303f9f;
            padding: 0.5rem;
            background: #e0e0e0;
            border-bottom: 1px solid #cfcfcf;
            user-select: none;
        }

        .dark .prompt {
            color: #93c5fd;
            background: #334155;
            border-color: #475569;
        }

        .input_area_code {
            padding: 0.5rem;
            font-family: monospace;
            overflow-x: auto;
        }

        .output_wrapper {
            margin-top: 0.5rem;
            padding-left: 0.5rem;
        }

        .output_subarea {
            padding: 0.5rem;
        }

        .output_text pre {
            margin: 0;
            white-space: pre-wrap;
            font-family: monospace;
            font-size: 13px;
        }

        .output_png img {
            max-width: 100%;
            height: auto;
            display: block;
        }

        /* Markdown Styles within Notebook */
        .markdown-cell {
            padding: 0.5rem 1rem;
            margin-bottom: 1rem;
        }

        .markdown-cell h1 {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 0.5em;
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
        }

        .markdown-cell h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin-top: 1em;
            margin-bottom: 0.5em;
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
        }

        .markdown-cell h3 {
            font-size: 1.25em;
            font-weight: bold;
            margin-top: 1em;
            margin-bottom: 0.5em;
        }

        .markdown-cell p {
            margin-bottom: 1em;
        }

        .markdown-cell ul {
            list-style-type: disc;
            padding-left: 2em;
            margin-bottom: 1em;
        }

        .markdown-cell ol {
            list-style-type: decimal;
            padding-left: 2em;
            margin-bottom: 1em;
        }

        .markdown-cell blockquote {
            border-left: 4px solid #dfe2e5;
            color: #6a737d;
            padding-left: 1em;
            margin-left: 0;
        }

        .markdown-cell code {
            background-color: rgba(27, 31, 35, 0.05);
            border-radius: 3px;
            padding: 0.2em 0.4em;
            font-family: monospace;
        }

        .dark .markdown-cell code {
            background-color: rgba(255, 255, 255, 0.1);
        }

        .markdown-cell pre {
            background-color: #f6f8fa;
            border-radius: 3px;
            padding: 16px;
            overflow: auto;
            margin-bottom: 1em;
        }

        .dark .markdown-cell pre {
            background-color: #1e293b;
        }

        .markdown-cell table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 1em;
        }

        .markdown-cell th,
        .markdown-cell td {
            border: 1px solid #dfe2e5;
            padding: 6px 13px;
        }

        .dark .markdown-cell th,
        .dark .markdown-cell td {
            border-color: #475569;
        }

        .markdown-cell tr:nth-child(2n) {
            background-color: #f6f8fa;
        }

        .dark .markdown-cell tr:nth-child(2n) {
            background-color: #1e293b;
        }

        .output_subarea table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 1em;
            font-size: 14px;
        }

        .output_subarea th {
            background-color: #f3f4f6;
            font-weight: 600;
        }

        .output_subarea th,
        .output_subarea td {
            border: 1px solid #dfe2e5;
            padding: 6px 13px;
        }

        .dark .output_subarea th,
        .dark .output_subarea td {
            border-color: #475569;
        }

        .output_subarea tr:nth-child(2n) {
            background-color: #f6f8fa;
        }

        .dark .output_subarea tr:nth-child(2n) {
            background-color: #1e293b;
        }
    </style>

    <div class="max-w-5xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">

        <div class="mb-10 text-center">
            <h1 class="text-4xl font-extrabold mb-4 text-slate-900 dark:text-white pb-2 flex items-center justify-center gap-3">
                <span class="text-orange-500">📓</span> IPYNB to PDF Converter – Convert Jupyter Notebook to PDF Online Free
            </h1>
            <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Convert Jupyter Notebooks (.ipynb) to clean, professional PDFs.
                Process runs 100% locally in your browser.
            </p>
        </div>

        <!-- Upload Zone -->
        <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mb-8 transition-all" id="upload-container">
            <label id="drop-zone" class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-orange-300 rounded-xl cursor-pointer bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors group">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <span class="text-5xl mb-4 group-hover:scale-110 transition-transform">📂</span>
                    <p class="mb-2 text-xl font-bold text-slate-700 dark:text-slate-200">Click to upload or drag .ipynb file</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Supported: Jupyter Notebook (.ipynb)</p>
                </div>
                <input type="file" id="file-input" class="hidden" accept=".ipynb">
            </label>
        </div>

        <!-- Settings & Preview (Hidden Initially) -->
        <div id="workspace" class="hidden space-y-6">

            <!-- Toolbar -->
            <div class="flex flex-col md:flex-row justify-between items-center bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 gap-4 sticky top-20 z-30 shadow-sm">
                <div class="flex items-center gap-4 flex-wrap">
                    <label class="flex items-center gap-2 cursor-pointer select-none text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <input type="checkbox" id="toggle-code" checked class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500">
                        Show Code
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer select-none text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <input type="checkbox" id="toggle-output" checked class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500">
                        Show Output
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer select-none text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <input type="checkbox" id="toggle-markdown" checked class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500">
                        Show Markdown
                    </label>
                </div>

                <div class="flex gap-2 w-full md:w-auto">
                    <button id="btn-reset" class="px-4 py-2 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg font-bold transition-colors">
                        Reset
                    </button>
                    <button id="btn-download" class="flex-1 md:flex-none px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold shadow-lg shadow-orange-500/30 transition-transform hover:scale-105 flex items-center gap-2 justify-center">
                        <span>Download PDF</span> ⬇️
                    </button>
                </div>
            </div>

            <!-- Preview Area -->
            <div id="notebook-preview" class="notebook-container bg-white text-black p-8 md:p-16 border border-gray-200 shadow-xl min-h-[800px] mx-auto w-full max-w-[210mm]">
                <!-- Canvas Content will be injected here -->
            </div>
        </div>

        <!-- SEO Content -->
        <article class="prose prose-slate max-w-none mt-12 border-t border-slate-200 dark:border-slate-700 pt-8">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Free Online IPYNB to PDF Converter</h2>
            <p class="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                Transform your Jupyter Notebook (.ipynb) files into high-quality, professional PDF documents instantly with our reliable IPYNB to PDF converter. Whether you are a Data Science student submitting assignments, a Machine Learning learner sharing code analysis, or a developer presenting Kaggle results, this free online tool ensures your charts, Markdown formatting, and code snippets are perfectly preserved in a standalone PDF format. There is no need to install Python, LaTeX, or any complex command-line utilities.
            </p>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">How to Use the IPYNB Converter</h3>
            <ol class="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Upload Notebook:</strong> Drag and drop your target .ipynb file into the upload zone above, or click to browse your device.</li>
                <li><strong>Review Output:</strong> Instantly preview how the rendered notebook will look. </li>
                <li><strong>Customize Formatting:</strong> Toggle visibility for Code, Markdown, and Output blocks to tailor the final document to your needs.</li>
                <li><strong>Download PDF:</strong> Click the "Download PDF" button to generate and save your formatted PDF locally.</li>
            </ol>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Key Features</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>Rich Rendering:</strong> Maintains accurate syntax highlighting, Markdown tables, mathematical equations (via MathJax), and inline plots.</li>
                <li><strong>Custom Toggles:</strong> Easily hide raw code cells and only show outputs, or vice versa.</li>
                <li><strong>Client-Side Processing:</strong> Your code never leaves your computer, ensuring total privacy.</li>
                <li><strong>Zero Installation:</strong> Completely browser-based, eliminating the need for strict dependency management or command-line setups.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Common Use Cases</h3>
            <ul class="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
                <li><strong>B.Tech & University Students:</strong> Submit coursework and lab manuals cleanly.</li>
                <li><strong>Kaggle Users & ML Practitioners:</strong> Share exploratory data analysis (EDA) results with non-technical stakeholders safely.</li>
                <li><strong>Hackathon Participants:</strong> Export beautifully styled projects for quick judging.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h3>
            <div class="space-y-4 mb-10">
                <details class="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
                    <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center">
                        Is it safe to convert my code?
                        <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                        Yes! All file reading, rendering, and PDF generation processes happen entirely inside your web browser. No data is stored on or transmitted to external servers.
                    </div>
                </details>
                <details class="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
                    <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center">
                        Do I need Python installed to use this?
                        <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                        Not at all. This tool requires no local environments, pip packages, or Jupyter installations to convert your files.
                    </div>
                </details>
                <details class="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
                    <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center">
                        Are embedded charts and data visualizations supported?
                        <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                        Yes, standard visual outputs like line graphs, bar charts, and plot images are directly rendered into the final PDF.
                    </div>
                </details>
                <details class="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
                    <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center">
                        Can I hide the raw Python code?
                        <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                        Yes. Use the "Show Code" toggle at the top of the workspace to hide all input cells, leaving only the markdown and output blocks visible.
                    </div>
                </details>
                <details class="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
                    <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center">
                        Will MathJax or LaTeX formulas render properly?
                        <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                        Absolutely. The converter supports MathJax text-rendering, meaning all equation syntax remains clean and readable.
                    </div>
                </details>
                <details class="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
                    <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center">
                        Why is this better than Jupyter's native export?
                        <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                        Jupyter often requires pandoc, XeLaTeX, or nbconvert configurations which can break easily. Our service is simpler and just works out of the box.
                    </div>
                </details>
                <details class="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
                    <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center">
                        Is there a file size limit for converting?
                        <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                        The only limit is your browser's local memory. The majority of assignment and project notebooks upload and convert within seconds.
                    </div>
                </details>
                <details class="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
                    <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center">
                        Do I have to pay to use this platform?
                        <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                        No. The IPYNB to PDF converter is 100% free with no hidden charges, watermarks, or subscription tiers.
                    </div>
                </details>
                <details class="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
                    <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center">
                        Can I use this on a mobile device or tablet?
                        <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                        Yes, the tool is fully responsive and supports downloading PDF files directly to iPads, iPhones, and Android devices.
                    </div>
                </details>
                <details class="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
                    <summary class="font-semibold text-slate-800 dark:text-slate-100 p-4 list-none flex justify-between items-center">
                        Does the generated PDF include page numbers?
                        <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div class="p-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                        By default, the layout resembles an infinite scroll notebook. However, you can use our separate "Page Numberer" tool afterward to neatly add numbers.
                    </div>
                </details>
            </div>

            <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <p class="text-sm text-slate-500 dark:text-slate-400 italic font-medium">
                    This IPYNB to PDF tool is optimized for students and developers who need fast, secure notebook conversion without installing additional software. All processing happens locally in your browser, ensuring complete data privacy.
                </p>
            </div>
        </article>
`;

function initIpynbToPdf() {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const workspace = document.getElementById('workspace');
    const uploadContainer = document.getElementById('upload-container');
    const preview = document.getElementById('notebook-preview');
    const btnDownload = document.getElementById('btn-download');
    const btnReset = document.getElementById('btn-reset');

    const toggleCode = document.getElementById('toggle-code');
    const toggleOutput = document.getElementById('toggle-output');
    const toggleMarkdown = document.getElementById('toggle-markdown');

    let currentNotebookData = null;

    // Helper Functions
    function renderNotebook() {
        if (!currentNotebookData) return;

        preview.innerHTML = ''; // Clear existing
        const cells = currentNotebookData.cells;

        cells.forEach(cell => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';

            // MARKDOWN CELLS
            if (cell.cell_type === 'markdown' && toggleMarkdown.checked) {
                const mdDiv = document.createElement('div');
                mdDiv.className = 'markdown-cell';
                const sourceText = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
                if (window.marked) {
                    let htmlContent = marked.parse(sourceText);
                    if (window.DOMPurify) htmlContent = DOMPurify.sanitize(htmlContent);
                    mdDiv.innerHTML = htmlContent;
                } else {
                    mdDiv.textContent = sourceText; // Fallback
                }
                cellDiv.appendChild(mdDiv);
            }

            // CODE CELLS
            else if (cell.cell_type === 'code') {
                // Input (Code)
                if (toggleCode.checked) {
                    const inputDiv = document.createElement('div');
                    inputDiv.className = 'input-area';

                    const promptDiv = document.createElement('div');
                    promptDiv.className = 'prompt';
                    promptDiv.innerText = `In [${cell.execution_count || ' '}]:`;

                    const codePre = document.createElement('pre');
                    codePre.className = 'input_area_code language-python';
                    const sourceCode = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
                    codePre.textContent = sourceCode;

                    inputDiv.appendChild(promptDiv);
                    inputDiv.appendChild(codePre);
                    cellDiv.appendChild(inputDiv);
                }

                // Output
                if (toggleOutput.checked && cell.outputs && cell.outputs.length > 0) {
                    const outputWrapper = document.createElement('div');
                    outputWrapper.className = 'output_wrapper';

                    cell.outputs.forEach(output => {
                        const subArea = document.createElement('div');
                        subArea.className = 'output_subarea';

                        // Text Output / Stream
                        if (output.output_type === 'stream') {
                            const pre = document.createElement('pre');
                            pre.className = 'output_text';
                            pre.textContent = Array.isArray(output.text) ? output.text.join('') : output.text;
                            subArea.appendChild(pre);
                        }
                        // Execute Result (Text)
                        else if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
                            const data = output.data;

                            // Image (PNG/JPEG)
                            if (data['image/png']) {
                                const img = document.createElement('img');
                                const b64 = Array.isArray(data['image/png']) ? data['image/png'].join('') : data['image/png'];
                                img.src = 'data:image/png;base64,' + b64;
                                img.className = 'output_png';
                                subArea.appendChild(img);
                            }
                            else if (data['image/jpeg']) {
                                const img = document.createElement('img');
                                const b64 = Array.isArray(data['image/jpeg']) ? data['image/jpeg'].join('') : data['image/jpeg'];
                                img.src = 'data:image/jpeg;base64,' + b64;
                                img.className = 'output_jpeg';
                                subArea.appendChild(img);
                            }
                            // HTML Output
                            else if (data['text/html']) {
                                const div = document.createElement('div');
                                let htmlOutput = Array.isArray(data['text/html']) ? data['text/html'].join('') : data['text/html'];
                                if (window.DOMPurify) htmlOutput = DOMPurify.sanitize(htmlOutput);
                                div.innerHTML = htmlOutput;
                                subArea.appendChild(div);
                            }
                            // Plain Text Fallback
                            else if (data['text/plain']) {
                                const pre = document.createElement('pre');
                                pre.className = 'output_text';
                                pre.textContent = Array.isArray(data['text/plain']) ? data['text/plain'].join('') : data['text/plain'];
                                subArea.appendChild(pre);
                            }
                        }
                        // Error
                        else if (output.output_type === 'error') {
                            const pre = document.createElement('pre');
                            pre.className = 'output_text text-red-600 bg-red-50 p-2 rounded';
                            pre.textContent = output.traceback.join('\n');
                            subArea.appendChild(pre);
                        }

                        outputWrapper.appendChild(subArea);
                    });
                    cellDiv.appendChild(outputWrapper);
                }
            }

            // Add to preview if it has content
            if (cellDiv.hasChildNodes()) {
                preview.appendChild(cellDiv);
            }
        });

        // Trigger Syntax Highlight
        if (window.Prism) Prism.highlightAllUnder(preview);

        // Trigger MathJax
        if (window.MathJax) {
            MathJax.typesetPromise([preview]);
        }
    }

    function processFile(file) {
        if (!file.name.endsWith('.ipynb')) {
            alert('Please upload a valid .ipynb file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target.result);
                currentNotebookData = json;
                uploadContainer.classList.add('hidden');
                workspace.classList.remove('hidden');
                renderNotebook();
            } catch (error) {
                console.error("JSON Parse Error:", error);
                alert('Error parsing the file. Please ensure it is a valid .ipynb (JSON) file.\n\nDetails: ' + error.message);
            }
        };
        reader.onerror = (e) => {
            console.error("File Read Error:", e);
            alert('Error reading file.');
        };
        reader.readAsText(file);
    }

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) processFile(file);
    }

    // Bind Events
    fileInput.addEventListener('change', handleFileSelect);

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('bg-orange-50', 'dark:bg-slate-700');
    });
    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('bg-orange-50', 'dark:bg-slate-700');
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('bg-orange-50', 'dark:bg-slate-700');
        const files = e.dataTransfer.files;
        if (files.length) processFile(files[0]);
    });

    btnReset.addEventListener('click', () => {
        fileInput.value = '';
        preview.innerHTML = '';
        workspace.classList.add('hidden');
        uploadContainer.classList.remove('hidden');
        currentNotebookData = null;
    });

    toggleCode.addEventListener('change', renderNotebook);
    toggleOutput.addEventListener('change', renderNotebook);
    toggleMarkdown.addEventListener('change', renderNotebook);

    btnDownload.addEventListener('click', () => {
        const element = document.getElementById('notebook-preview');
        const opt = {
            margin: [10, 10],
            filename: 'notebook.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        btnDownload.innerText = 'Generating...';
        btnDownload.disabled = true;

        html2pdf().set(opt).from(element).save().then(() => {
            btnDownload.innerHTML = '<span>Download PDF</span> ⬇️';
            btnDownload.disabled = false;
        });
    });
}

const routes = {
    '/': dashboardPage,
    '/attendance': attendancePage,
    '/humanizer': humanizerPage,
    '/compressor': compressorPage,
    '/file-merger': universalMergerPage,
    '/pdf-splitter': pdfSplitterPage,
    '/img-to-pdf': imgToPdfPage,
    '/pdf-tools': pdfPage,
    '/qr': qrGeneratorPage,
    '/pdf-arranger': pdfArrangerPage,
    '/watermark': watermarkPage,
    '/pagenumber': pageNumberPage,
    '/case': caseConverterPage,
    '/counter': wordCounterPage,
    '/ipynb-to-pdf': ipynbToPdfPage,
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
                <h2 class="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">404</h2>
                <p class="text-gray-600 dark:text-slate-300 mb-6">Tool not found or page missing.</p>
                <p class="text-sm text-gray-400 mb-8 font-mono bg-gray-100 inline-block px-3 py-1 rounded">Path: ${cleanPath}</p>
                <div>
                     <a href="/" class="text-blue-600 dark:text-blue-400 font-bold hover:underline">Go Home</a>
                </div>
            </div>
        `;
        return;
    }

    appRoot.innerHTML = content;
    window.scrollTo(0, 0);

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

    if (cleanPath === '/attendance') initAttendance();
    if (cleanPath === '/compressor') initCompressor();
    if (cleanPath === '/pdf-tools') initPDF();
    if (cleanPath === '/file-merger') initUniversalMerger();
    if (cleanPath === '/pdf-splitter') initPdfSplitter();
    if (cleanPath === '/img-to-pdf') initImgToPdf();
    if (cleanPath === '/humanizer') initHumanizer();
    if (cleanPath === '/pdf-arranger') initPdfArranger();
    if (cleanPath === '/watermark') initWatermark();
  
    if (cleanPath === '/pagenumber') initPageNumber();
    if (cleanPath === '/counter') startWordCounterWatcher();
    if (cleanPath === '/ipynb-to-pdf') initIpynbToPdf();
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
            card.className = "relative bg-white dark:bg-slate-800 p-2 border rounded-xl shadow-sm hover:shadow-md transition-all group";

            let content;
            if (item.type === 'text') {
                content = `<div class="aspect-[3/4] flex items-center justify-center bg-gray-50 dark:bg-slate-900 border rounded text-gray-500 dark:text-slate-400 font-mono text-xs p-2 overflow-hidden text-center">${item.file.name}</div>`;
            } else {
                content = `<img src="${item.thumbData}" class="w-full aspect-[3/4] object-contain border rounded bg-gray-100 mb-2">`;
            }

            card.innerHTML = content + `
                <div class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="bg-red-50 dark:bg-red-900/200 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm hover:bg-red-600" onclick="window.deletePageItem(${index})">&times;</button>
                </div>
                <div class="flex justify-between items-center text-xs text-gray-400 mt-1">
                    <span>${index + 1}</span>
                    <div class="flex gap-1">
                        <button class="hover:text-blue-600 dark:text-blue-400" onclick="window.movePageItem(${index}, -1)" ${index === 0 ? 'disabled' : ''}>&larr;</button>
                        <button class="hover:text-blue-600 dark:text-blue-400" onclick="window.movePageItem(${index}, 1)" ${index === pageItems.length - 1 ? 'disabled' : ''}>&rarr;</button>
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
                         <button class="bg-red-50 dark:bg-red-900/200 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600 shadow" onclick="window.delImg(${index})">&times;</button>
                    </div>
                    <div class="flex justify-between items-center text-white text-xs font-bold">
                        <button class="bg-white dark:bg-slate-800/20 hover:bg-white dark:bg-slate-800/40 p-1 rounded" onclick="window.moveImg(${index}, -1)" ${index === 0 ? 'disabled' : ''}>&larr;</button>
                        <span>${index + 1}</span>
                        <button class="bg-white dark:bg-slate-800/20 hover:bg-white dark:bg-slate-800/40 p-1 rounded" onclick="window.moveImg(${index}, 1)" ${index === allImages.length - 1 ? 'disabled' : ''}>&rarr;</button>
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
        statusDiv.classList.add('bg-gray-100', 'text-gray-700 dark:text-slate-200');

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
            statusDiv.classList.remove('bg-gray-100', 'text-gray-700 dark:text-slate-200');
            statusDiv.classList.add('bg-green-100', 'text-green-800');


        } catch (error) {
            console.error('PDF Split Error:', error);
            statusDiv.textContent = 'Failed to split PDF.';
            statusDiv.classList.remove('bg-gray-100', 'text-gray-700 dark:text-slate-200');
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
                msgDisplay.className = "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-3 rounded-lg";
                msgDisplay.innerHTML = `You are practically at the target! Just attend the next class to be safe.`;
            } else {
                msgDisplay.className = "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-lg";
                msgDisplay.innerHTML = `⚠️ You are Short!<br>You need to attend <strong>${needed}</strong> more classes consecutively to reach ${target}%.`;
            }
        }
        // Logic: Can skip?
        else {
            // Calculate how many can be bunked: (Present / (Total + Bunk)) >= Target/100
            const bunkable = Math.floor((100 * present - target * total) / target);

            if (bunkable > 0) {
                msgDisplay.className = "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-3 rounded-lg";
                msgDisplay.innerHTML = `✅ Safe Zone!<br>You can bunk <strong>${bunkable}</strong> classes and still stay above ${target}%.`;
            } else {
                msgDisplay.className = "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 p-3 rounded-lg";
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
            card.className = "relative bg-white dark:bg-slate-800 p-2 border rounded shadow group hover:shadow-md transition-shadow";

            // Image
            const img = document.createElement('img');
            img.src = item.thumbData;
            img.className = "w-full border mb-2";

            // Page Number Label
            const pgNum = document.createElement('div');
            pgNum.textContent = `Page ${item.displayNum}`;
            pgNum.className = "text-xs text-center font-bold text-gray-500 dark:text-slate-400 mb-2";

            // Controls
            const controls = document.createElement('div');
            controls.className = "flex justify-between items-center bg-gray-100 rounded p-1";

            // Left Btn
            const leftBtn = document.createElement('button');
            leftBtn.innerHTML = "&larr;";
            leftBtn.className = "px-2 py-1 text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:text-blue-400 hover:bg-blue-100 rounded disabled:opacity-30";
            leftBtn.disabled = index === 0;
            leftBtn.onclick = () => movePage(index, -1);

            // Right Btn
            const rightBtn = document.createElement('button');
            rightBtn.innerHTML = "&rarr;";
            rightBtn.className = "px-2 py-1 text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:text-blue-400 hover:bg-blue-100 rounded disabled:opacity-30";
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
function convertCase(type) {
    const textarea = document.getElementById("case-input");
    let text = textarea.value;

    if (!text) return;

    switch(type) {
        case "upper":
            text = text.toUpperCase();
            break;

        case "lower":
            text = text.toLowerCase();
            break;

        case "title":
            text = text.replace(/\w\S*/g,
                txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
            break;

        case "sentence":
            text = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g,
                c => c.toUpperCase()
            );
            break;

        case "alternating":
            text = text.split("").map((c,i) =>
                i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()
            ).join("");
            break;

        case "inverse":
            text = text.split("").map(c =>
                c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
            ).join("");
            break;
    }

    textarea.value = text;
    updateCaseCount();
}


function startWordCounterWatcher() {

    const input = document.getElementById("wc-input");
    if (!input) return;

    if (input.dataset.active === "true") return;
    input.dataset.active = "true";

    const wordsEl = document.getElementById("wc-words");
    const charsEl = document.getElementById("wc-chars");
    const noSpacesEl = document.getElementById("wc-spaces");
    const sentencesEl = document.getElementById("wc-sentences");
    const paragraphsEl = document.getElementById("wc-paragraphs");

    function updateCounts() {

        const text = input.value;

        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        const noSpaces = text.replace(/\s/g, "").length;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
        const paragraphs = text.split(/\n+/).filter(p => p.trim()).length;

        wordsEl.textContent = words;
        charsEl.textContent = chars;
        noSpacesEl.textContent = noSpaces;
        sentencesEl.textContent = sentences;
        paragraphsEl.textContent = paragraphs;
    }

    input.addEventListener("input", updateCounts);
    updateCounts();
}
