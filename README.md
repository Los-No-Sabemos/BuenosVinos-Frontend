
# Buenos Vinos Frontend

## Overview

Buenos Vinos is a wine collection companion app. This frontend, built with React and Tailwind CSS, allows users to browse, add, and manage their personal wine cellar, view featured wines, and explore wine details.

## Features

* User authentication (signup, login) with JWT
* Browse public wines and featured wines in the footer
* Add, edit, and delete wines in your personal cellar
* Filter saved wines by region
* Responsive design with Tailwind CSS

## Tech Stack

* React 18
* Vite
* React Router
* Context API for authentication
* Axios for API calls
* Tailwind CSS for styling

## Prerequisites

* Node.js v16+
* npm or yarn
* A running instance of the Buenos Vinos backend API

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/buenos-vinos-frontend.git
   cd buenos-vinos-frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

## Environment Variables

Create a `.env` file in the project root with:

```env
VITE_API_URL=https://api.yourdomain.com
```

Replace `https://api.yourdomain.com` with your backend URL (e.g., `http://localhost:5000`).

## Running Locally

```bash
npm run dev
# or
yarn dev
```

Open `http://localhost:5173` in your browser.

## Building for Production

```bash
npm run build
# or
yarn build
```

Preview the build locally:

```bash
npm run preview
```

Deploy the contents of the `dist/` folder to your static host (e.g., Netlify, Vercel).

## Folder Structure

```
src/
├── components/       # Reusable UI components (Footer, NavBar, etc.)
├── pages/            # Page-level components (Home, MyCellar, AddWine, etc.)
├── services/         # API client & helper functions
├── context/          # Auth context and provider
├── styles/           # Tailwind config
└── main.jsx          # App entry point with Router and Providers
```

## Scripts

* `npm run dev` – start dev server
* `npm run build` – build for production
* `npm run preview` – preview production build

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/XYZ`)
3. Commit your changes (`git commit -m "feat: XYZ"`)
4. Push to your fork (`git push origin feature/XYZ`)
5. Open a Pull Request

## License

MIT © 2025 Buenos Vinos Team


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Description
This is the Frontend of the Buenos Vinos project, built using React.
The app allows users to browse public wines and manage their own private wine collection via a personal cellar interface.

🔗 The repository with the Backend (Express API) code can be found here: https://github.com/Los-No-Sabemos/BuenosVinos-Backend
