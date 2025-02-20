# CHORDS Web Portal

CHORDS (Canada Health Operations & Record Data System) is a secure web portal for managing patient health records and consent management.

## Features

- **Secure Authentication**
  - Multi-Factor Authentication (MFA)
  - Role-based access control
  - Session management

- **Patient Features**
  - View and manage health records
  - Control consent settings
  - Track data access history
  - Receive real-time notifications

- **Healthcare Provider Features**
  - Request patient data access
  - View authorized records
  - Emergency access protocol
  - Audit logging

- **Administrator Features**
  - User management
  - System monitoring
  - Access control oversight
  - Analytics dashboard

## Technology Stack

- **Frontend**
  - React 18
  - TypeScript
  - Material-UI v5
  - React Router v6
  - Formik + Yup (Form handling)
  - Vite (Build tool)
  - DayJS (Date handling)

- **Security Features**
  - JWT Authentication
  - Multi-Factor Authentication
  - Role-Based Access Control (RBAC)
  - Audit Logging

## Prerequisites

- Node.js 18.x or later
- pnpm 10.x or later (recommended) or npm 9.x or later

## Setup Instructions

1. Install Node.js and pnpm (if not already installed)
   ```bash
   # Install Node.js
   winget install OpenJS.NodeJS.LTS
   
   # Install pnpm
   npm install -g pnpm
   ```

2. Clone the repository
   ```bash
   git clone [repository-url]
   cd chords-web-portal
   ```

3. Install dependencies
   ```bash
   pnpm install
   ```

4. Start the development server
   ```bash
   pnpm dev
   ```

5. Open http://localhost:4000 in your browser

## Development Guidelines

- Follow TypeScript best practices
- Use Material-UI components for consistent UI
- Implement responsive design for all screens
- Follow WCAG 2.1 accessibility guidelines
- Write unit tests for new features

## Security Considerations

- All data transmission must be encrypted
- Implement proper session management
- Follow HIPAA compliance guidelines
- Regular security audits
- Proper error handling and logging

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Follow code review process

## License

MIT License

Copyright (c) 2024 CHORDS Web Portal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 