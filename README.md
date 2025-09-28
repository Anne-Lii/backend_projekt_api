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

###Bookings `/api/bookings`: CRUD operations for bookings:
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
###Drinks `/api/drinks`: CRUD operations for drinks:
```json
{
    "category": "",
    "drinkname": "",
    "description":"",
    "price": ""
}
```
###Food `/api/food`: CRUD operations for food:
```json
{
    "category": "",
    "food": "",
    "description":"",
    "price": ""
}
```

###Authentication 
`/api/auth/register`: Register a new user:
```json
{
    "username": "",
    "password": ""   
}
```

- `/api/auth/login`: Log in:
 ```json
{
    "username": "",
    "password": ""   
}
```


## Installation

Clone the repository and install dependencies:
```json
git clone https://github.com/Anne-Lii/backend_projekt_webbplats.git
```
cd backend_projekt_webbplats
npm install
npm start
