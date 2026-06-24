# Vaibhav Mishra - Creative Developer Portfolio 🎨💻

Welcome! This is the source repository for my professional portfolio website. The project is designed with a premium, cyberpunk-inspired **"Developer HUD"** aesthetic, featuring neon accents, target coordinate grids, custom graphic design guidelines, and immersive animations.

---

## 🚀 Live Demos
* **Vercel Production Deployment**: [shabdless.vercel.app](https://shabdless.vercel.app)
* **Vercel Deploy Alias**: [portfolio-website-len43wwdi-shabdless-projects.vercel.app](https://portfolio-website-len43wwdi-shabdless-projects.vercel.app)

---

## 🛠️ Technology Stack

* **Core UI Engine**: React (v18+)
* **Fast Bundler**: Vite (lightning-fast Hot Module Replacement)
* **Custom Styling**: Custom Vanilla CSS (modular design tokens, full-viewport CSS variables)
* **Animations**: Framer Motion (page transitions, interactive card entry, modal logic)
* **Routing**: React Router DOM (multi-page routes, query hashes, dynamic scroll-to-viewports)
* **Icons**: Lucide React & React Icons
* **Form Handler**: Web3Forms API (asynchronous contact form delivery)
* **Asset Integration**: Base64 data streaming, dynamic vector drawings, custom typographic engines (`Radeil3D` & `Agraham`)

---

## ✨ Features & Visual Highlights

### 🔍 Immersive Bookshelf Loader Intro
* A custom full-screen virtual bookshelf drawing utilizing SVG searchlight sweeping clip paths.
* Animates a dramatic "spotlight sweep" that highlights glowing cat eyes in the center, concluding with a deep scaling zoom and blur transition to reveal the main website.

### 📅 Library Due-Date Ledger Stamp
* A ledger-ruled library card widget displaying ink stamp date markers for custom milestones (`SEP 26 2005`, `JUN 06 2018`, and current active date).
* Includes vintage ledger blue rulings, skewed angles, and hover-triggered coordinate tilt transitions.

### 📐 Photoshop-style Artboard Rulers & Calibration Swatches
* Ticks are styled programmatically using CSS repeating linear gradients (major ticks every 50px, minor ticks every 10px) with custom boundary marks.
* Injects standard print calibration bars including crosshair targets (registration marks), five color swatches (Slate, Indigo, Pink, Cyan, White), and color metadata.

### 🎯 Blueprint Wireframe Card Hover
* Card grids feature a targeting scope overlay upon hover:
  * Diagonal wireframe guidelines.
  * Concentric target circles with coordinate plus `+` signs.
  * Real-time metadata: `FPS: 60.00`, `RENDER: 0.04ms`, `MEM: 0x4E1A`, `STATUS: READY`, and print coordinates.

### 🖋️ Floating Bezier Vector Art
* An interactive SVG Bezier pen tool drawing floating in the background of the hero container with diagonal guidelines, construction anchor boxes, and custom path linear gradients.

---

## 💻 Local Setup & Development

### 1. Clone the repository
```bash
git clone https://github.com/Vmishra2222/GraphicsPortfolio.git
cd GraphicsPortfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environments
Create a `.env` file in the root directory:
```env
VITE_WEB3FORMS_ACCESS_KEY="your-web3forms-access-key"
```

### 4. Run local dev server
```bash
npm run dev
```
The application will boot at [http://localhost:5173/](http://localhost:5173/).

### 5. Build for production
```bash
npm run build
npm run preview
```

---

## 🎨 Creative Credentials & Brand Settings
* **Logo Typeface**: Configured with `Radeil3D` (Radeil 3D Demo) for headings, navbar logo, and footer stamps.
* **Handwriting Scribbles**: Styled with `Agraham` for personal diary-style annotations (`pdf for print!`, `let's build!`).
* **Active Theory HUD Colors**:
  * `--accent-color`: `#00f3ff` (electric cyan)
  * `--accent-secondary`: `#ff007f` (neon pink)
  * `--accent-tertiary`: `#adff2f` (volt yellow)
  * `--bg-color`: `#050814` (space black)
