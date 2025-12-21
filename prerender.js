const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const BASE_URL = 'http://localhost:8080'; // We will serve the local directory here
const OUTPUT_DIR = __dirname;
const SITEMAP_HOST = 'https://articlarity.com';

const ROUTES = [
    {
        path: '/',
        name: 'dashboard',
        title: 'Articlarity - Free Online PDF, Image & AI Tools | No Login Required',
        description: 'Access 15+ free online tools for creators and students. Compress Images & PDFs, Merge Files, Humanize AI Text, Generate QR Codes, and more. Secure, client-side processing.',
        keywords: 'pdf tools, image compressor, ai text humanizer, pdf merger, free online tools'
    },
    {
        path: '/attendance-calculator',
        name: 'attendance-calculator',
        title: 'Attendance Calculator — Check Skip Eligibility',
        description: 'Calculate attendance percentage instantly. Check if you can skip class or must attend. Ideal for college students under 75% rule. Fast and accurate offline tool.',
        keywords: 'attendance calculator, 75% calculator, skip class calculator, percentage attendance online, university attendance rule'
    },
    {
        path: '/ai-humanizer',
        name: 'ai-humanizer',
        title: 'AI Humanizer — Make AI Text Sound Human',
        description: 'Convert AI-written text into natural human language. Rewrite essays, assignments & emails to pass originality checks. Free online AI-to-human tool.',
        keywords: 'ai humanizer, humanize text, bypass ai writing, rewrite essays, ai plagiarism fixer'
    },
    {
        path: '/image-compressor-100kb',
        name: 'image-compressor-100kb',
        title: 'Smart Image Compressor — Reduce Image Below 100KB',
        description: 'Compress JPG, PNG, WEBP to specific size like 100KB without losing clarity. Offline browser compression. Perfect for forms and uploads.',
        keywords: 'compress image online, reduce image size, 100kb image tool, jpg size reducer, png compressor free'
    },
    {
        path: '/file-merger',
        name: 'file-merger',
        title: 'Universal File Merger — Combine PDF, Images & Text',
        description: 'Merge PDF, JPG, TXT and image files into one document. Offline file combining tool. Fast, free & privacy protected.',
        keywords: 'merge files, pdf and jpg merger, combine images, file combiner tool, merge pdf pages'
    },
    {
        path: '/pdf-splitter',
        name: 'pdf-splitter',
        title: 'PDF Splitter — Extract Pages or Split PDF Instantly',
        description: 'Split PDF pages into multiple files or extract custom ranges. Secure offline processing. No upload needed. Free pdf splitter.',
        keywords: 'split pdf online, extract pdf pages, divide pdf file, pdf splitter tool, remove pdf pages'
    },
    {
        path: '/img-to-pdf',
        name: 'img-to-pdf',
        title: 'Image to PDF Converter — Turn JPG & PNG into PDF',
        description: 'Convert multiple images into a single PDF file. JPG, PNG, WEBP support. Offline secure conversion. Free and fast.',
        keywords: 'image to pdf, jpg to pdf, png converter pdf, photos to pdf, convert images'
    },
    {
        path: '/pdf-compressor',
        name: 'pdf-compressor',
        title: 'PDF Compressor — Shrink Large PDF Sizes',
        description: 'Compress PDF files without losing text clarity. Offline processing. Email & upload friendly file output. Free PDF size reducer.',
        keywords: 'compress pdf, reduce pdf size, pdf file shrink, pdf optimizer, pdf resize tool'
    },
    {
        path: '/qr-generator',
        name: 'qr-generator',
        title: 'QR Generator — Create QR Codes Instantly',
        description: 'Generate QR codes for links, WiFi passwords & text. Zero upload, offline safe. Download high-quality QR images for free.',
        keywords: 'qr generator, qr code maker, online qr tool, create qr image, qr browser tool'
    },
    {
        path: '/pdf-arranger',
        name: 'pdf-arranger',
        title: 'PDF Arranger — Reorder, Delete & Rotate Pages',
        description: 'Visually rearrange PDF pages with drag & drop. Delete or rotate pages offline. Perfect for document organization.',
        keywords: 'reorder pdf pages, remove pdf pages, rotate pdf, rearrange files, pdf editor page'
    },
    {
        path: '/pdf-watermark',
        name: 'pdf-watermark',
        title: 'Watermark PDF — Add Custom Text Watermarks',
        description: 'Add text watermarks to PDF pages. Branding, copyright & draft labels supported. Fully offline, no upload required.',
        keywords: 'watermark pdf, pdf text watermark, pdf brand tool, secure pdf watermarks'
    },
    {
        path: '/page-numberer',
        name: 'page-numberer',
        title: 'Add Page Numbers to PDF — Page Numberer Tool',
        description: 'Number PDF pages professionally. Adjust positions, margins, and start points. Best for research & report formatting.',
        keywords: 'pdf numbering, add page numbers, pdf index tool, number pages pdf'
    },
    {
        path: '/mp4-to-mp3',
        name: 'mp4-to-mp3',
        title: 'MP4 to MP3 Converter — Extract Audio Offline',
        description: 'Convert MP4 video into MP3 audio locally. Perfect for lectures, music clips and voice notes. High quality output.',
        keywords: 'mp4 to mp3, extract mp3, video audio converter, sound extractor'
    },
    {
        path: '/case-converter',
        name: 'case-converter',
        title: 'Case Converter — Uppercase, Lowercase & Title Tools',
        description: 'Convert text to uppercase, lowercase, title case & more. Perfect for students, writers, and developers. Free editor.',
        keywords: 'uppercase converter, lowercase converter, title case online, text formatting'
    },
    {
        path: '/word-counter',
        name: 'word-counter',
        title: 'Word Counter Pro — Count Words, Characters & Paragraphs',
        description: 'Instant word & character counting tool. Track essay length, social media limits & document size. Free & accurate.',
        keywords: 'word counter, character counter, text counter online, essay count'
    },
    {
        path: '/privacy-mode',
        name: 'privacy-mode',
        title: 'Maximum Privacy Mode — Offline File Processing',
        description: 'All tools use local browser processing — files never leave your device. Zero cloud upload security model.',
        keywords: 'offline pdf tools, secure file tool, no upload pdf, webassembly document processing'
    }
];

async function generateSitemap() {
    console.log('Generating Sitemap...');
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(route => `    <url>
        <loc>${SITEMAP_HOST}${route.path === '/' ? '' : route.path}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${route.path === '/' ? '1.0' : '0.8'}</priority>
    </url>`).join('\n')}
</urlset>`;

    await writeFile(path.join(OUTPUT_DIR, 'sitemap.xml'), sitemapContent);
    console.log('✅ Sitemap generated.');
}

async function runPrerender() {
    // 1. Start a simple local server to serve the current directory
    // We use a simple python command or similar, but for node script we can use 'http-server' or just rely on file:// if simple,
    // but file:// often has CORS issues with modules.
    // Let's assume we can run `npx http-server` or similar in parallel, OR better: use puppeteer's request interception to serve local files?
    // EASIEST: Just use `npx http-server . -p 8080` separately, OR spawn it here.

    console.log('Starting Prerender Build...');

    // Spawn http-server
    const { spawn } = require('child_process');
    const server = spawn('npx', ['http-server', '.', '-p', '8080']);

    // Give server a moment to start
    await new Promise(r => setTimeout(r, 2000));

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    for (const route of ROUTES) {
        if (route.path === '/') continue; // Index is already there, we might just want to update meta tags for it manually or overwrite it carefully (careful not to break build script logic). 
        // Actually, we usually want to generate index.html too if we were purely static, but here index.html is the Source of Truth.
        // We will SKIP writing index.html to avoid overwriting the source file, but we should ensure the source file has the correct meta tags for the home page.

        console.log(`Prerendering: ${route.path}`);

        try {
            // Navigate to the route
            // We append the hash if our app was hash based, but we moved to history API.
            // On a static server, /attendance might 404 if directory doesn't exist.
            // So we strictly load the ROOT index.html, then script navigates?
            // NO, `http-server` allows SPA fallback usually with -P proxy, but standard http-server doesn't.
            // Strategy: Load root, then use page.evaluate to pushState.

            await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle0' });

            // Navigate client-side
            await page.evaluate((path) => {
                window.history.pushState(null, '', path);
                window.dispatchEvent(new Event('popstate')); // Trigger our listener or just call render
                // Our script.js handles popstate, but let's call render directly to be safe if popstate isn't caught
                if (window.render) window.render();
            }, route.path);

            // Wait for content to render (look for specific selectors or just wait a bit)
            await new Promise(r => setTimeout(r, 1000)); // Simple wait for rendering

            // Get HTML
            // We want to grab the current state of the DOM.
            // However, we want to ensure <head> tags are updated.
            // Our client-side JS currently doesn't update specific meta tags dynamically (we only proposed it).
            // So we will INJECT them here in Node.

            let html = await page.content();

            // Inject Meta Tags
            // Replace <title>...</title>
            html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

            // Helper to replace content in meta tags
            const replaceMeta = (name, content) => {
                const regex = new RegExp(`<meta name="${name}" content=".*?">`);
                if (regex.test(html)) {
                    html = html.replace(regex, `<meta name="${name}" content="${content}">`);
                } else {
                    html = html.replace('</head>', `<meta name="${name}" content="${content}">\n</head>`);
                }
            };

            const replaceProperty = (property, content) => {
                const regex = new RegExp(`<meta property="${property}" content=".*?">`);
                if (regex.test(html)) {
                    html = html.replace(regex, `<meta property="${property}" content="${content}">`);
                } else {
                    html = html.replace('</head>', `<meta property="${property}" content="${content}">\n</head>`);
                }
            };

            // Standard SEO
            replaceMeta('description', route.description);
            replaceMeta('keywords', route.keywords);

            // Open Graph
            replaceProperty('og:title', route.title);
            replaceProperty('og:description', route.description);
            replaceProperty('og:url', `${SITEMAP_HOST}${route.path === '/' ? '' : route.path}`);

            // Twitter
            replaceProperty('twitter:title', route.title);
            replaceProperty('twitter:description', route.description);
            replaceProperty('twitter:url', `${SITEMAP_HOST}${route.path === '/' ? '' : route.path}`);

            // Ensure canonical link is correct
            const canonicalTag = `<link rel="canonical" href="${SITEMAP_HOST}${route.path === '/' ? '' : route.path}">`;
            if (html.includes('<link rel="canonical"')) {
                html = html.replace(/<link rel="canonical".*?>/, canonicalTag);
            } else {
                html = html.replace('</head>', `${canonicalTag}\n</head>`);
            }

            // Create Directory
            const dir = path.join(OUTPUT_DIR, route.name);
            if (!fs.existsSync(dir)) {
                await mkdir(dir);
            }

            // Write index.html
            // We need to fix relative paths for scripts/css since we are now in a subdir
            // e.g. src="script.js" -> src="../script.js"
            html = html.replace(/src="script.js"/g, 'src="../script.js"');
            html = html.replace(/href="style.css"/g, 'href="../style.css"');
            // Also fixes for linked images if any use relative paths? Ideally use absolute or root-relative in source.

            await writeFile(path.join(dir, 'index.html'), html);
            console.log(`✅ Generated ${route.name}/index.html`);

        } catch (e) {
            console.error(`❌ Error on ${route.path}:`, e);
        }
    }

    await browser.close();
    server.kill();

    await generateSitemap();

    console.log('🎉 Prerender Complete!');
    process.exit(0);
}

runPrerender();
