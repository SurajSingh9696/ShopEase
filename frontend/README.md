# ShopEase Frontend

Modern React e-commerce frontend built with Vite, Tailwind CSS, and React Router.

## Getting Started

### Install Dependencies
```bash
npm install
```

### Environment Setup
Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## Features

- 🛍️ Product browsing with filters
- 🛒 Shopping cart management
- 📦 Order tracking
- 👤 User authentication
- 👨‍💼 Admin panel
- 📱 Fully responsive design

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- Context API

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React Context providers
├── pages/          # Page components
├── services/       # API service layer
├── utils/          # Utility functions
├── App.jsx         # Main app component
└── main.jsx        # Entry point
```

## Learn More

See the main [README.md](../README.md) for complete documentation.
