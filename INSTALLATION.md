# Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

## Step 1: Install Dependencies

Navigate to the project directory and install all required packages:

```bash
cd jinka-admin
npm install
```

Or if you prefer yarn:

```bash
cd jinka-admin
yarn install
```

## Step 2: Configure API Endpoint

Open `src/App.jsx` and update the API URL:

```javascript
const API_URL = "https://api.jinka.gov.et"; // Replace with your actual API endpoint
```

## Step 3: Run Development Server

Start the development server:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The application will automatically open in your browser at `http://localhost:3000`

## Step 4: Build for Production

When ready to deploy, create a production build:

```bash
npm run build
```

Or with yarn:

```bash
yarn build
```

The optimized files will be in the `dist` folder.

## Step 5: Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can change it in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Change to any available port
    open: true
  }
})
```

### Installation Errors

If you encounter installation errors:

1. Delete `node_modules` folder
2. Delete `package-lock.json` or `yarn.lock`
3. Run `npm install` or `yarn install` again

### Build Errors

If you encounter build errors:

1. Clear the cache: `npm run build -- --force`
2. Ensure all dependencies are installed
3. Check that Node.js version is 16 or higher

## Default Login Credentials

For testing purposes (update these in production):
- Email: admin@jinka.gov.et
- Password: (will be provided by backend team)

## Next Steps

After installation, see [API_INTEGRATION.md](./API_INTEGRATION.md) to connect your backend API.
