Advanced Task Management System with Real-time Updates
Objective:
Build a real-time task management system with basic authentication, task management (CRUD), and real-time task updates. The focus should be on functionality, real-time collaboration, and core application features.
Requirements:
1. User Authentication:
Implement user registration and login using JWT (JSON Web Tokens) for authentication.
Use MongoDB to store users.
Each user can create tasks and manage tasks they are assigned to.
2. Task Management (CRUD):
Implement full CRUD functionality for tasks.
Each task should have the following fields:
title, description,  status (enum: ['Pending', 'In Progress', 'Completed']), dueDate, and assignedTo.
Users can:
Create tasks.
Update the task's status.
Assign tasks to other users.
Delete their own tasks.
3. Real-time Updates:
Use Socket.io or WebSockets to enable real-time updates when tasks are created, updated, or deleted.
All users assigned to a task should see real-time changes without refreshing the page.
4. Task Filtering and Sorting:
Implement basic task filtering by status and dueDate.
Allow sorting tasks by createdAt or dueDate.
5. Frontend:
Use React for the frontend.
Redux for state management (simplified, only for authentication and task state).
Create a simple, responsive task dashboard with: Task list.
Filters and sorting options.
Form to create and update tasks.
Assign tasks to other users.
logout
6. Backend:
Build the backend with Node.js and Express.
Use MongoDB to store task and user data.
Implement RESTful APIs for task management and authentication.
7. Security:
Ensure basic security practices such as:
JWT authentication for all task-related API endpoints.
Input validation for forms (both backend and frontend).
Proper error handling.
Bonus Features (If time permits):
Task Activity Log:
Track when a task is created, updated, or deleted.
Show activity history in the task details view.
File Upload:
Allow users to upload attachments (images or documents) to a task using Multer.
Store files locally or with a basic cloud solution like AWS S3 (if experienced).
Email Notifications:
Send email notifications using Nodemailer when a task is assigned to a user or updated.
Deliverables:
A GitHub repository with:
The complete codebase.
A README.md with setup instructions (must include backend and frontend setup).
 