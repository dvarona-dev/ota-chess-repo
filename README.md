# Chess Grandmasters Wiki ♟️

A modern web application displaying a directory of Chess.com Grandmasters. Built with React, TypeScript, and Vite.

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Quick Start

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run lint:fix` | Fix linting issues |
| `npm run type-check` | TypeScript type checking |

## API

Uses the [Chess.com Public API](https://www.chess.com/news/view/published-data-api):
- Grandmasters List: `https://api.chess.com/pub/titled/GM`
- Player Profile: `https://api.chess.com/pub/player/{username}`

## License

This project was created as a technical challenge for Amenitiz.
