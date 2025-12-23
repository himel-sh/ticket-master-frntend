# TicketMaster Frontend

Frontend application for the TicketMaster ticket booking platform built with React and Vite.

## Project Purpose

TicketMaster Frontend is a modern, responsive web application that allows users to browse, search, and book transportation tickets. It provides role-based dashboards for customers, sellers, and administrators with comprehensive features for ticket management, booking, and analytics.

## Live URL

[TicketMaster Live](https://ticketmaster-b12m11.web.app)

## Key Features

### Customer Features

- 🎫 Browse and search available tickets
- 🔍 Sort tickets by price (Low to High / High to Low)
- 📄 Pagination support (6 tickets per page)
- 🛒 Book tickets with real-time countdown timers
- 💳 Secure payment processing with Stripe
- 📊 View booking history and order status
- 📈 Personal spending statistics and analytics
- 🌙 Dark/Light mode toggle
- 📱 Responsive design for all devices

### Seller Features

- ➕ Add and manage ticket inventory
- 📈 Real-time sales statistics with interactive charts
- 💰 Track revenue and sales metrics
- 📊 View detailed analytics (total revenue, tickets sold, conversion rates)
- ✅ Manage customer orders and approvals
- 🔄 Update ticket information

### Admin Features

- 👥 Manage users and roles
- ✅ Approve/Reject tickets before public listing
- 📢 Advertise featured tickets (max 6 at a time)
- 📊 Platform-wide statistics and analytics
- 🎯 Monitor all orders and transactions
- 👤 Manage seller requests

### General Features

- 🔐 Secure authentication with Firebase
- 🌐 Role-based access control (Customer, Seller, Admin)
- 🎨 Beautiful purple theme (#4E56C0, #9B5DE0, #D78FEE, #FDCFFA)
- ⚡ Fast and responsive UI
- 🔔 Toast notifications for user feedback
- 🛡️ Password change functionality
- 🎯 Popular routes showcase
- ❓ FAQ section
- 📧 Contact and About pages

## NPM Packages Used

### Core Dependencies

- **react** (^19.2.0) - UI library
- **react-dom** (^19.2.0) - React DOM rendering
- **react-router** (^7.9.6) - Client-side routing

### Build & Development

- **vite** (^7.2.2) - Build tool and dev server
- **@vitejs/plugin-react** (^5.1.0) - Vite React plugin
- **tailwindcss** (^4.1.17) - Utility-first CSS framework
- **@tailwindcss/vite** (^4.1.17) - Tailwind CSS Vite plugin

### UI & Styling

- **daisyui** (^5.5.5) - Tailwind CSS component library
- **react-icons** (^5.5.0) - Icon library

### Data Management & API

- **axios** (^1.13.2) - HTTP client
- **@tanstack/react-query** (^5.90.12) - Data fetching and caching
- **@tanstack/react-query-devtools** (^5.91.1) - React Query debugging tools

### Forms & Validation

- **react-hook-form** (^7.68.0) - Performant form management

### Authentication

- **firebase** (^12.6.0) - Firebase SDK for authentication

### Notifications

- **react-hot-toast** (^2.6.0) - Toast notifications

### Data Visualization

- **recharts** (^2.15.4) - Composable charting library

### Animations & Effects

- **react-fast-marquee** (^1.6.5) - Scrolling text animation
- **react-spinners** (^0.17.0) - Loading spinners

### Development Tools

- **eslint** (^9.39.1) - JavaScript linter
- **@eslint/js** (^9.39.1) - ESLint JavaScript rules
- **eslint-plugin-react-hooks** (^7.0.1) - React Hooks linting
- **eslint-plugin-react-refresh** (^0.4.24) - React Refresh linting
- **globals** (^16.5.0) - Global variables for different environments

## Installation & Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env.local` file in the frontend directory:

```
VITE_API_URL=http://localhost:3000
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   ├── Form/
│   │   ├── Home/
│   │   ├── Modal/
│   │   └── Shared/
│   ├── pages/
│   │   ├── AllTickets/
│   │   ├── Dashboard/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── SignUp/
│   │   └── TicketDetails/
│   ├── hooks/
│   ├── providers/
│   ├── routes/
│   ├── layouts/
│   ├── assets/
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Features in Detail

### Dark Mode

- System preference detection
- Manual toggle in navbar
- Persistent storage of user preference
- Smooth transitions between themes

### Ticket Sorting & Pagination

- Sort by price: Low to High, High to Low
- 6 tickets per page
- Direct page navigation
- Smooth scroll to top on page change

### Real-time Statistics

- Interactive charts using Recharts
- Revenue tracking
- Sales metrics
- Conversion rates
- Order breakdown

### Responsive Design

- Mobile-first approach
- Tailwind CSS breakpoints
- Optimized for all screen sizes

## Performance Optimizations

- React Query for efficient data caching
- Lazy loading of components
- Optimized images and assets
- Pagination for large datasets
- Memoization of expensive computations

## Security Features

- Firebase authentication
- Role-based access control
- Password change functionality
- Secure payment processing with Stripe
- Environment variable protection

---

**Made with ❤️ by Shahriar Hasan Himel**
