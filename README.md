# 🏋️‍♂️ FitFinder

**FitFinder** is a collaborative fitness platform that helps users find and schedule personalized workouts based on their preferences and physical characteristics.  
The platform connects users with available group sessions, allows filtering by location, tracks workout history, and supports user interaction through feedback and comments.  
It also provides a dedicated interface for trainers to manage and publish new workout sessions.

---

## 📌 Key Features

### 👤 Personalized Workout Matching
- Users enter personal details such as gender, height, weight, etc.
- Automatic BMI calculation is available in the personal profile.
- Optional filtering by city or area.
- **All form fields include validation checks** to ensure accurate and complete data entry.

### 🕒 Real-Time Workout Availability
- Only workouts starting from the **current day and time** are displayed.
- Every **Saturday at midnight**, the system resets for the upcoming week.
- Workouts are filtered dynamically to show only relevant sessions.

### 📧 Booking & Email Notifications
- Upon booking a workout, users receive an **automated email** with all session details.
- Each user has a **personal schedule view** showing booked workouts throughout the week.

### 👥 Participation Limits
- Workouts have a **maximum number of participants**.
- Once a session is full, it is **automatically closed** for additional registrations.
- Users can **leave comments and feedback** on completed workouts.

### 🏋️‍♀️ Trainer Portal
- Trainers can **add new workouts** through a dedicated interface.
- Each session may include an image uploaded via DTO and file mapping.

---

## 🔐 Security & Automation

- **JWT-based authentication** for secure login and registration.
- **Role-based access control** (e.g., user vs. trainer permissions).
- **Scheduled tasks** to reset weekly workout data automatically.
- **Email service integration** for real-time confirmations and notifications.
- **Image upload handling** via DTO mapping.
- **Form validation implemented across all forms** to enhance data quality and prevent errors.

---
## 🧰 Tech Stack

### 🌐 Frontend (Client)
- **React** – UI rendering and component-based design
- **Axios** – HTTP communication with backend
- **React Router** – Routing between pages
- **React Hook Form** – Form handling and validation
- **CSS** – Styling and layout
- **MUI (Material-UI)** – Component library and design system
- **JWT handling** – Token-based authentication

### ⚙️ Backend (Server)
- **Java**
- **Spring Boot** – RESTful API, dependency injection
- **Spring Security** – JWT authentication and authorization
- **Spring Scheduler** – Automated weekly resets
- **JavaMailSender** – Email service integration
- **JPA + Hibernate** – ORM and database access
- **DTO Mapping** – Data transfer between layers
- **H2 / MySQL** – Local and production databases

---

## 📸 Screenshots

### Login Process  
<img src="https://github.com/user-attachments/assets/021a8c1d-c893-4ad0-8997-1c22b0228398" width="250"/>  
<img src="https://github.com/user-attachments/assets/c3b1a5ad-725c-454c-a62c-b0eeeddf3d4a" width="250"/>  
<img src="https://github.com/user-attachments/assets/eef61615-0c11-4148-b87f-7aeb1b9a67e3" width="250"/>

### Display of Workouts and Categories  
<img src="https://github.com/user-attachments/assets/a8212ac2-78bd-4240-bce9-363284c7dc54" width="250"/>  
<img src="https://github.com/user-attachments/assets/f0f994fa-d6bb-463b-8ec7-b20fdec3a53f" width="250"/>  
<img src="https://github.com/user-attachments/assets/9a6632f0-3681-432e-bfeb-955d104a915b" width="250"/>

### Booking a Workout and Email Notification if Not Available  
<img src="https://github.com/user-attachments/assets/586aeebd-aeaa-49ea-b525-827de4a7fe70" width="250"/>  
<img src="https://github.com/user-attachments/assets/a9695e06-1c0b-49d3-9bd4-862e7757ea07" width="250"/>

### Personal Area  
<img src="https://github.com/user-attachments/assets/57e836ae-2fd3-4de5-8447-901a583926f3" width="250"/>

---

## 📞 Contact

For questions, suggestions, or support:  
📧 fitfindersite@gmail.com
