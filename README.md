# Wanderlust Project

Wanderlust is a full-stack web application for discovering, listing, and reviewing unique stays and experiences around the world. Inspired by modern property rental platforms, it features user authentication, property CRUD operations, interactive map integration, and a community-driven review system. The project leverages Node.js, Express.js, MongoDB, Cloudinary, and contemporary frontend technologies to provide a robust, practice-ground for real-world web development skills.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 🌍 **Property Listings**: Easily create, update, and delete property listings with photos, locations, pricing, descriptions, and categories.
- 🗺️ **Interactive Maps**: Integrates [Leaflet](https://leafletjs.com/) for geocoded address search and drag-and-drop marker selection, allowing users to pinpoint property locations visually.
- 🖼️ **Cloud Image Uploads**: Image hosting is handled efficiently using [Cloudinary](https://cloudinary.com/), supporting multiple formats.
- 📝 **Structured Reviews**: Users can post, view, and delete reviews, complete with star ratings and comments for each property.
- 🔐 **Authentication & Authorization**: Register and login forms with session security using [Passport.js](http://www.passportjs.org/). Only listing owners can edit/delete their own listings, and only review authors can delete their reviews.
- 💡 **Advanced Search & Filter**: Search listings by title, country, and budget, as well as by category through UI filters.
- ✨ **Responsive Design**: Built with modern CSS techniques and [Bootstrap 5](https://getbootstrap.com/) for consistently smooth UX on all devices.
- 🛠️ **Robust Validation**: All user input is validated on both client and server sides using [Joi](https://joi.dev/) schemas to prevent invalid or malicious form submissions.
- ✔️ **Flash Messaging**: Context-aware success and error notifications are provided using flash messages.
- 📦 **Production-Ready Config**: Easily configurable for local development or deployment on cloud platforms using environment variables.

---

## Demo

> _**Note:** This is a learning project and does not offer live bookings or process real transactions._       Users are solely responsible for the content they submit, including locations and reviews. user-submitted data is not verified in this Project . 
        

- **Try Locally**: [Setup instructions below](#setup--installation)


## Tech Stack

**Frontend:**
- [EJS](https://ejs.co/) (Templating)
- [Bootstrap 5](https://getbootstrap.com/)
- [Leaflet.js](https://leafletjs.com/) (interactive maps)
- Vanilla JavaScript (form validation and map actions)

**Backend:**
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [MongoDB](https://mongodb.com/) ([Mongoose](https://mongoosejs.com/))
- [Cloudinary](https://cloudinary.com/) (Image storage)
- [Multer](https://github.com/expressjs/multer) for file uploads
- [Passport.js](http://www.passportjs.org/) (Local strategy for authentication)
- [Joi](https://joi.dev/) (Schema validation)
- [Connect-Flash](https://github.com/jaredhanson/connect-flash) (user notifications)
- [Express-Session](https://github.com/expressjs/session) + [connect-mongo](https://github.com/jdesboeufs/connect-mongo) (Session storage)

---

## Project Structure

```
Wanderlust-Project/
│
├── Models/             # Mongoose models (Listing, User, Reviews)
├── controller/         # Express route controllers
├── public/             # Static files (images, styles, client JS)
├── utils/              # Shared utility modules (validation, wrappers)
├── views/              # EJS templates for each page
│   ├── includes/         # Navbar, Footer
│   └── listings/         # Listing-specific pages (create, edit, detail, error, etc)
├── app.js              # Main application file (Express and route config)
├── cloudConfig.js      # Cloudinary config for image uploads
├── package.json
└── .env.example        # Sample environment config (not tracked in git)
```

---

## Setup & Installation

### Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB Atlas** cluster or local instance
- **Cloudinary** account for image uploads

### 1. Clone this repository

```bash
git clone https://github.com/shibopriyo5/Wanderlust-Project.git
cd Wanderlust-Project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Fill in your `.env` file:

```
ATLAS_URL=your-mongodb-connection-string
SECRET=your-session-secret
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
NODE_ENV=development
```

### 4. Start the application

```bash
node app.js
```

Server runs by default on [http://localhost:8080](http://localhost:8080)

---

## Usage

- Access the homepage for all available listings.
- Register for an account or log in to create a new listing, edit/delete your own listings, and add reviews.
- Use the search bar to filter properties by country, budget, or title.
- Click "Find on Map" in forms to geolocate listings by city/country, or manually adjust the map marker.
- Add images to listings—uploads are handled securely by Cloudinary.
- Leave reviews for other listings, or manage your own reviews.

_**Disclaimer:** All data shown (such as listings, locations, and reviews) is for demonstration purposes only and not representative of any real-world service or business. No actual bookings or payments are processed._       Users are solely responsible for the content they submit, including locations and reviews.
       user-submitted data is not verified in this Project . 

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for bug fixes, feature suggestions, or improvements. All code should adhere to existing coding style and best practices.

---



## License

ISC License

Copyright (c) 2026

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.


---
