# FraudShield

A web application dedicated to protecting users from online fraud through real-time scanning, reporting, and educational resources.

## Features

*   **Scam Detection:** Scan URLs, emails, and messages for potential phishing and scam attempts.
*   **Community Reporting:** Report suspicious activities to help protect other users.
*   **Real-time Alerts:** Receive notifications about new and emerging threats.
*   **Educational Resources:** Learn about different types of online fraud and how to protect yourself.
*   **Gamified Learning:** Engage in interactive games to enhance your understanding of fraud prevention.
*   **User Authentication:** Secure user accounts with Firebase Authentication.
*   **Personalized Dashboard:** View your reports, manage alerts, and access emergency contacts.

## Technologies Used

*   **Frontend:**
    *   React
    *   Vite
    *   Tailwind CSS
    *   React Router
    *   Framer Motion
    *   Lucide React
*   **Backend:**
    *   Firebase (Authentication, Firestore)
*   **HTTP Client:**
    *   Axios
*   **Linting:**
    *   ESLint

## Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/fraudshield.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd fraudshield/client
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the root of the `client` directory and add your Firebase configuration:
    ```env
    VITE_ApiKey=your-api-key
    VITE_AuthDomain=your-auth-domain
    VITE_ProjectId=your-project-id
    VITE_StorageBucket=your-storage-bucket
    VITE_MessagingSenderId=your-messaging-sender-id
    VITE_AppId=your-app-id
    ```

### Running the Application

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`.

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run lint`: Lints the code.
*   `npm run preview`: Previews the production build.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.