# Feed Recommendation API

This is a simple Node.js Express API written in TypeScript that serves a list of videos.

## Getting Started

### Install dependencies

```
npm install
```

### NPM Scripts

- **`npm run dev`**: Start the API server in development mode using ts-node.
- **`npm run build`**: Compile TypeScript files to JavaScript in the `dist` folder.
- **`npm start`**: Run the compiled server from the `dist` folder.
- **`npm test`**: Run Mocha tests in the `src` folder.
- **`npm run lint`**: Run ESLint on all TypeScript files.

## API Endpoints

### `GET /api/videos`
Returns a JSON array of video objects:
```json
[
  {
    "id": "1",
    "title": "How to Build a YouTube Clone",
    "description": "Step-by-step guide to building a YouTube clone with Next.js and Tailwind CSS.",
    "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg"
  },
  // ...more videos
]
```

## Project Structure

- `src/index.ts` - Main Express server
- `src/video.ts` - Video type and sample data
- `src/index.test.ts` - Mocha tests for the API

## Requirements
- Node.js >= 18
- npm >= 9

## Notes
- The API is for demonstration and does not persist data.
- You can modify `src/video.ts` to add or change video data.
