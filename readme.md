A simple and interactive Room Booking Web Application built using HTML, CSS, and  JavaScript.
This project allows users to book rooms for specific time slots, manage bookings, and view availability in a clean UI.

🚀 Features

📅 Select date to view bookings

🏠 Multiple rooms with different capacities

⏰ Book rooms for specific time slots

❌ Prevents double booking

🔍 Filter rooms based on capacity

📋 View all bookings for a selected date

🗑️ Cancel individual bookings

🧹 Clear all bookings option

🌙 Dark mode toggle

💾 Data persistence using localStorage

🧠 How It Works

Each booking is stored using a unique key:

date-room-slot

Example:

2026-03-18-A-9-10

All bookings are saved in the browser using localStorage, so data is not lost after refresh.

When a user clicks on an available slot:

A confirmation modal appears

After confirmation, the slot gets booked

Booked slots are disabled

🛠️ Tech Stack

HTML – Structure of the app

CSS – Styling and layout

JavaScript ( JS) – Logic and interactivity

📂 Project Structure
project-folder/
│
├── index.html
├── style.css
├── script.js
└── README.md
🎯 Learning Objectives

This project helped in understanding:

DOM Manipulation

Event Handling

State Management (without frameworks)

Working with localStorage

Dynamic UI rendering

Modal implementation

Filtering data

