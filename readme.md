# Emergency Reporting App

This is a MERN (MongoDB, Express.js, React.js, Node.js) application built to facilitate the urgent reporting of emergencies by users. The application allows users to report emergencies in real-time, notifies all connected users about reported emergencies, provides a platform for volunteers to offer assistance, and includes a chat functionality for users to communicate with volunteers or other users in need.

## Features

- **Real-time Emergency Reporting**: Users can urgently report emergencies through the app, and all connected users receive real-time notifications about the reported emergencies.

- **Personalized Dashboard**: Users who have reported emergencies can view their own reported emergencies on the dashboard and update their status (solved/unsolved).

- **Volunteer System**: Anyone can become a volunteer, and volunteers are notified via email about emergencies reported in their vicinity.

- **Chat Functionality**: Users can chat with volunteers or other users in need through the app's chat feature.

## Technologies Used

- **MongoDB**: NoSQL database used to store user information, emergency reports, and chat data.
- **Express.js**: Backend framework used to handle HTTP requests and routing.
- **React.js**: Frontend framework used to build the user interface and components.
- **Node.js**: JavaScript runtime environment used to run the server-side code.
- **Socket.io**: Real-time engine used to enable bidirectional communication between the server and clients for real-time notifications.
- **Tailwind CSS**: Utility-first CSS framework used for styling the UI components.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ashishthotwe07/crisisConntect.git
```

2. Install dependencies for both the client and server:

```bash
cd crisisConntect
cd client && npm install
cd ../server && npm install
```

3. Set up environment variables:

   - Create a `.env` file in the server directory.
   - Define the necessary environment variables such as MongoDB URI, JWT secret, email SMTP settings, etc.

```


## License

This project is licensed under the [MIT License](LICENSE).
