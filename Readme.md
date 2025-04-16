Private Club Messaging App
This is a simple web application that allows users to sign up, join a private club, create messages, and interact with other club members. It demonstrates the use of user authentication, role-based access control (admin and member roles), and message creation within a secure environment.

Features:
User Authentication: Users can sign up, log in, and manage their accounts.
Message Creation: Logged-in users can create messages with titles, text, and timestamps.
Membership Status: Users must enter a secret passcode to gain membership in the club. In this app the simple “1234” passcode is used.
Admin Functionality: Admin users can delete messages, while regular members can only view them.
Message Privacy: Only members can see the author and date of messages. Admins can see everything.
User Roles: Admins have more permissions, such as the ability to delete messages.

Technologies Used:
• Node.js: JavaScript runtime for building the backend.
• Express: Web framework for Node.js.
• Passport.js: Authentication middleware for handling login and session management.
• bcryptjs: For securely hashing and comparing passwords.
• PostgreSQL: Relational database to store user and message data.
• EJS: Templating engine for rendering views.
• dotenv: For environment variable declaration.

Environment Variables:
PORT = app running port
DB_HOST = db host
DB_NAME = dbname
DB_PORT = db port
DB_USER = dbuser
DB_PASSWORD = dbpassword
SESSION_SECRET = somesecret
PASSCODE= 1234
