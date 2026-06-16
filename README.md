# Hospital Management System

## Overview
A frontend-focused Hospital Management System built using React and Bootstrap. This application provides a modular interface for managing hospital operations, featuring role-based login, an administrative dashboard, user management, and branch administration. It is designed with reusable UI components and protected routing to serve as a solid foundation for backend integration.

## Features
- **Authentication:** Role Selection, Branch Selection, Login Validation, Password Visibility Toggle.
- **Administration:** Dashboard Statistics, User CRUD Operations, Branch CRUD Operations.
- **Routing & Security:** Protected Routes based on authentication state.
- **UI/UX:** Responsive Design, Reusable Components, Sidebar Navigation, Header Navigation, Modal Components, Form Validation.

## Tech Stack
**Frontend:**
- React
- React Router DOM
- Bootstrap 5
- React Icons
- React Recharts

**Development Tools:**
- Vite
- ESLint

## Folder Structure
```text
src/
├── components/     # Reusable UI components (Modals, Forms, Sidebar, Header)
├── pages/          # Main application views (Dashboard, Login, Management)
├── styles/         # Modular CSS stylesheets
├── config-service/ # Configuration files, context providers, and mock storage
├── routes/         # Routing logic and protected route wrappers
└── assets/         # Static assets like images and global CSS
```

## Installation Guide
Ensure you have Node.js installed on your local machine.

1. Clone the repository:
   ```bash
   git clone REPOSITORY_URL
   cd hospital-management-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Locally
To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## Build Commands
To generate a production-ready build:
```bash
npm run build
```
The compiled files will be output to the `dist/` directory.

## Available Scripts
- `npm run dev` - Starts the Vite development server.
- `npm run build` - Builds the application for production.
- `npm run lint` - Runs ESLint to identify code quality issues.

## Project Structure Explanation
The application is structured to separate concerns efficiently:
- **Components** handle specific UI elements and layout pieces like sidebars and modals.
- **Pages** represent full screen views constructed from multiple components.
- **Config-Service** contains business logic, authentication context, and mock storage interfaces, serving as the data layer before an actual backend is connected.
- **Routes** manage the navigation tree and enforce route protection for authenticated users.

## Current Development Status
- **Frontend Completion:** 84%
- **Build Status:** Passing
- **Lint Status:** Passing
- **Authentication:** Mock Authentication
- **Backend Integration:** Pending
- **Code Quality:** Good
- **Responsive Support:** Desktop, Laptop, Tablet

## Roadmap
**Implemented:**
- [x] Login Module
- [x] Administrator Dashboard
- [x] User Management
- [x] Branch Management
- [x] Protected Routing
- [x] Responsive Layout
- [x] Sidebar Navigation
- [x] Header Navigation
- [x] Modal Components
- [x] Form Validation
- [x] Mock Authentication

**Planned:**
- [ ] Analytics Module
- [ ] Audit Logs Module
- [ ] Settings Module
- [ ] Backend API Integration
- [ ] JWT Authentication
- [ ] Role-Based Permissions
- [ ] Database Integration

## Deployment
Deployment instructions will be updated once the backend API integration is finalized. The frontend static files can be hosted on standard static hosting platforms.

## Live Demo

Explore the application here:

👉 https://amareshpaithacs.github.io/Hospital-Management-system/

## Contributing
1. Fork the repository
2. Create a new feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

## Author Information
Developed for the final Hospital Management System submission.

## License
This project is licensed under the MIT License.
