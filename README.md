# Restaurant Etoile – Backend API
Backend project for the course **Backend-Based Web Development** (Mid Sweden University).  

Developed by **Anne-Lii Hansen**  

---

## 🌟 About
A RESTful API for managing bookings, drinks, and food for a fictional restaurant.  
The API supports secure authentication and full CRUD functionality.  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication & Security:** bcrypt (password hashing), JSON Web Tokens (JWT)  
- **Other:** dotenv  

---

## 🚀 Features
- Create, read, update, and delete **bookings**  
- Create, read, update, and delete **drinks**  
- Create, read, update, and delete **food items**  
- Secure user authentication with JWT  

---


## Endpoints

## Bookings `/api/bookings`: CRUD operations for bookings:
```json
{
    "name": "",
    "email": "",
    "phone":"",
    "date": "",
    "time": "",
    "guests": ""
}
```

- `/api/drinks`: CRUD operations för dryck:
{
    "category": "",
    "drinkname": "",
    "description":"",
    "price": ""
}

- `/api/food`: CRUD operations för mat:
{
    "category": "",
    "food": "",
    "description":"",
    "price": ""
}

- `/api/auth/register`: Registrera en ny användare:
{
    "username": "",
    "password": ""   
}

- `/api/auth/login`: Logga in:
{
    "username": "",
    "password": ""   

}


## Installation

Klona repo från Github:
`https://github.com/Anne-Lii/backend_projekt_webbplats.git`
npm install
npm run start
