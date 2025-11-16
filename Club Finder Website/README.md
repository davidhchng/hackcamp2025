
# Club Finder Website

This is a code bundle for Club Finder Website. The original project is available at https://www.figma.com/design/Q88ek2XtCQuX7Uyaws91wZ/Club-Finder-Website.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Development Server

Start the development server:
```bash
npm run dev
# or
npm start
```

The application will be available at `http://localhost:3000` and should automatically open in your browser.

### Building for Production

Build the project for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## AI-Powered Recommendations (Optional)

This app supports ChatGPT API integration for intelligent club recommendations. To enable it:

### Option 1: Environment Variable (Recommended for Development)

1. Create a `.env` file in the `Club Finder Website` directory:
```bash
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

2. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

3. Restart the dev server after adding the key

### Option 2: In-App Settings

1. Go to the Profile page
2. Scroll down to "OpenAI API Key" section
3. Enter your API key
4. Click "Save"

The API key is stored locally in your browser and never sent to our servers.

**Note:** Without an API key, the app will use local keyword matching for recommendations, which still works great!

## Project Structure

- `src/` - Source code
  - `components/` - React components
  - `data/` - Mock data
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions (club matching, ChatGPT API)
- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
