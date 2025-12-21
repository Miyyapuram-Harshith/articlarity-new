# Articlarity - Deployment Instructions

This project is now fully optimized for both **Cloudflare Pages** (or any static host) and **Local Offline Use**.

## 🚀 How to Deploy (Cloudflare / GitHub Pages / Netlify)
1.  **Upload**: Drag and drop this entire folder `Articlarity.com` to your hosting provider.
2.  **Done**: The site works immediately.
    -   Clean URLs like `/attendance` work automatically because we generated the folders.
    -   SEO tags are pre-injected for every tool.

## 💻 How to Run Locally (Offline)
1.  Open the folder.
2.  Double-click `index.html`.
3.  Navigate to any tool.
    -   **Note**: Because of the "Clean URL" structure, if you want to open the Attendance tool directly from your file explorer, you must open `Articlarity.com/attendance/index.html`.

## 🛠 For Developers (Re-enabling Build Scripts)
To run the `prerender.js` script again in the future (to update SEO tags):
1.  Run `npm init -y`
2.  Run `npm install puppeteer`
3.  Run `node prerender.js`
