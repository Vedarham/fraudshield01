# FraudShield Server

This is the backend server for FraudShield, a platform dedicated to detecting, reporting, and preventing fraudulent activities.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure user authentication and profile management.
- **Fraud Reporting:** Submit, view, and manage fraud reports.
- **Real-time Scanning:** Scan text and audio for potential fraud.
- **Alerting:** Get real-time alerts and safety information.
- **Health Checks:** Monitor the health of the server.

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/fraudshield.git
   ```
2. Navigate to the server directory:
   ```bash
   cd fraudshield/server
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the `server` directory.
2. Add the following environment variables to the `.env` file. See `.env.example` for a template.

```
EMERGENCY_NUMBER=
AI_SERVICE_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Usage

### Running the Application

- **Development:**
  ```bash
  npm run dev
  ```
- **Production:**
  ```bash
  npm start
  ```

### API Endpoints

#### Auth Routes

- `GET /api/profile`: Get user profile.
- `PUT /api/profile`: Update user profile.

#### Report Routes

- `POST /api/report`: Submit a new fraud report.
- `GET /api/reports`: Get a list of fraud reports.
- `GET /api/my-reports/:firebaseUID`: Get reports submitted by a specific user.

#### Scan Routes

- `POST /api/scan`: Scan text for potential fraud.
- `POST /api/upload-audio`: Upload and scan an audio file for potential fraud.

#### Alert Routes

- `GET /api/alert`: Get a security alert message.

#### Health Routes

- `GET /api/health`: Check the health of the server.

## Project Structure

```
server/
├── .gitignore
├── app.js
├── config.js
├── package-lock.json
├── package.json
├── server.js
├── lib/
│   └── logger.js
├── middleware/
│   └── errorHandler.middleware.js
├── models/
│   ├── Report.js
│   └── User.js
├── node_modules/
├── routes/
│   ├── alertsRoutes.js
│   ├── authRoutes.js
│   ├── healthRoutes.js
│   ├── reportsRoutes.js
│   └── scanRoutes.js
└── uploads/
    └── audio/
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the ISC License.
