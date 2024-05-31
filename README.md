# Resturang Etoile- Projekt Backend-baserad webbutveckling
Anne-Lii Hansen 
Mail: anha2314@student.miun.se

Ett RESTful API för hantering av bokningar, drycker och mat för en fiktiv restaurang

## Funktioner
- Skapa, läsa, uppdatera och ta bort bokningar
- Skapa, läsa, uppdatera och ta bort drycker
- Skapa, läsa, uppdatera och ta bort maträtter
- Säker autentisering för användare

## Teknologi

- Node.js
- Express.js
- MongoDB (Mongoose)
- bcrypt (password hashing)
- jsonwebtoken (authentication)
- dotenv

## Installation

Klona repo från Github:
`https://github.com/Anne-Lii/backend_projekt_webbplats.git`
npm install
npm run start

## Endpoints

- `/api/bookings`: CRUD operations för bokningar:
{
    "name": "",
    "email": "",
    "phone":"",
    "date": "",
    "time": "",
    "guests": ""
}

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