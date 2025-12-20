A full-stack **Real-Time Chat Application** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with **Socket.IO** for instant messaging.  
This application allows users to securely communicate through real-time text and image messages with profile management and media sharing features.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User **Sign Up & Login** using **JWT authentication**
- Secure route protection based on authentication status
- Automatic redirection to **Sign Up / Login / Home** pages

---

### 👤 User Features
- Add and update **username, bio, and profile picture**
- View **contacts list** with profile pictures
- Real-time **online / offline status**
- One-to-one real-time chat
- Send and receive **text messages**
- Send and receive **image messages**
- **WhatsApp-style media section** to view shared images
- Profile updates stored securely using **Cloudinary**

---

### ⚡ Real-Time Functionality
- Instant message delivery using **Socket.IO**
- Live user status updates
- Smooth and responsive chat experience

---

## 🛠 Tech Stack

### Frontend
- React.js
- Context API
- CSS

### Backend
- Node.js
- Express.js
- Socket.IO

### Database
- MongoDB

### Authentication
- JWT (JSON Web Token)

### Cloud Storage
- Cloudinary (for profile pictures and chat images)

---

## 📂 Project Structure
chat-app/ │ ├── frontend/ │   ├── src/ │   ├── components/ │   ├── pages/ │   └── context/ │ ├── backend/ │   ├── models/ │   ├── routes/ │   ├── controllers/ │   ├── socket/ │   └── middleware/ │ └── README.md
Copy code

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
bash
git clone https://github.com/your-username/your-repo-name.git
2️⃣ Install dependencies
Frontend
Copy code
Bash
cd frontend
npm install
npm start
Backend
Copy code
Bash
cd backend
npm install
npm run dev
🔑 Environment Variables
Create a .env file in the backend folder and add:
Copy code

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

📌 Learning Outcomes
Building real-time applications using Socket.IO
Implementing secure authentication with JWT
Managing user presence (online/offline)
Handling image uploads with Cloudinary
Structuring scalable MERN stack applications
Real-world chat application architecture

🚀 Future Enhancements
Group chats
Message read receipts
Typing indicators
Push notifications
End-to-end encryption
