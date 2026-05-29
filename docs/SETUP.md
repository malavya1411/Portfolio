# Local Setup Guide

This guide explains how to install dependencies, run the development server, and build the portfolio locally.

---

## 1. Prerequisites

Make sure you have the following installed on your machine:
- **Node.js**: Version 20.x or higher is recommended.
- **npm** (comes with Node.js) or **pnpm** / **yarn**.

---

## 2. Installation

Clone the repository and install the dependencies from the root directory:

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install npm dependencies
npm install
```

---

## 3. Development Scripts

Execute the following package scripts to manage the codebase:

### Start Development Server
Starts the Next.js development server with Turbopack compilation:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the page.

### Production Build
Generates a highly optimized production build and statically pre-renders all dynamic projects:
```bash
npm run build
```

### Start Production Build
Starts the production server after compilation:
```bash
npm run start
```

### Code Linting
Checks the codebase for syntax or formatting errors using ESLint:
```bash
npm run lint
```

---

## 4. Troubleshooting

### Port 3000 Already in Use
If you get a warning that port 3000 is occupied by another Next process:
```bash
# Find the Process ID (PID) running on port 3000
lsof -i :3000

# Terminate the process (replace <PID> with the actual process number)
kill -9 <PID>
```
Alternatively, Next.js will automatically fall back to using port `3001` or another available port.
