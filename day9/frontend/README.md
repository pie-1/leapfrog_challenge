# leapfrog_challenge

```markdown
# 🏔️ TrekSarathi - AI Trekking Route Planner for Nepal



## 📋 Overview

**TrekSarathi** (Trek + Sarathi meaning "companion" in Nepali) is a full-stack trekking platform that helps adventurers discover, plan, and execute their dream treks in Nepal. The platform features an interactive map with 200+ mountain passes, route calculation, guide directory, permit information, and emergency services.

### 🎯 Problem Solved
- Trekkers struggle to find accurate, up-to-date trek information
- Difficulty connecting with verified local guides
- Confusion about permits and regulations
- Lack of real-time route planning tools
- Emergency contact information not readily available

### 💡 Solution
- Interactive map with all major trek routes and mountain passes
- Real-time route calculation from user location to trek start points
- Verified guide directory with experience, pricing, and reviews
- Comprehensive permit guide for all major treks
- Emergency SOS features with one-tap dial

---

## ✨ Features

### 🌐 Core Features
- **Interactive Map** - Leaflet-based map with 200+ mountain passes and 10+ trek routes
- **Route Calculation** - OSRM-based routing from user location to trek start points
- **User Authentication** - Firebase Auth with Google and email/password login
- **Role-Based Dashboards** - Separate views for travellers and professional guides
- **Guide Directory** - Verified local guides with experience, pricing, and ratings
- **Permit Guide** - Complete permit information for all major treks
- **Emergency SOS** - One-tap emergency contacts with location sharing

### 🗺️ Map Features
- Custom colored markers (Green = Easy, Yellow = Moderate, Red = Hard)
- Mountain passes (201+ points from GeoJSON)
- Dual-layer route visualization (shadow + main line)
- User location sharing
- OpenTopoMap terrain tiles optimized for Nepal

### 👤 User Features
- **Traveller Dashboard** - Track treks completed, bucket list, stats
- **Guide Dashboard** - Manage profile, experience, pricing, availability
- **Edit Profile** - Update personal information, bio, location
- **Saved Treks** - Bookmark favourite routes

### 🔒 Authentication
- Firebase Authentication
- Google Sign-in
- Email/Password Sign-up
- Role-based access (Traveller/Guide)

### 📱 Responsive Design
- Mobile-first approach
- Fully responsive on all devices
- Touch-friendly map interactions

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI Framework |
| **Vite** | Build tool |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Leaflet** | Interactive maps |
| **React Leaflet** | React map components |
| **Firebase Auth** | Authentication |
| **Lucide React** | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime |
| **Express.js** | API framework |
| **MongoDB** | Database |
| **Mongoose** | ODM |
| **JWT** | Authentication (future) |
| **OSRM** | Route calculation |

### APIs & Services
- **OpenRouteService** - Route calculation
- **OpenStreetMap** - Map tiles
- **OpenTopoMap** - Terrain tiles
- **GeoNames** - Mountain passes data

---

## 📁 Project Structure

```
day9/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── trekController.js
│   │   │   └── userController.js
│   │   ├── data/
│   │   │   ├── mountain-passes-nepal.geojson
│   │   │   └── treks.js
│   │   ├── models/
│   │   │   ├── Trek.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── trekRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── scripts/
│   │   │   └── migrateTreks.js
│   │   ├── utils/
│   │   │   ├── geojsonParser.js
│   │   │   └── routingService.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── public/
    │   ├── images/
    │   └── videos/
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   └── FirebaseLogin.jsx
    │   │   ├── common/
    │   │   │   ├── AnimatedSection.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── Navbar.jsx
    │   │   │   └── PageLayout.jsx
    │   │   ├── forms/
    │   │   │   ├── EditProfileForm.jsx
    │   │   │   └── GuideRegistrationForm.jsx
    │   │   ├── home/
    │   │   │   ├── Hero.jsx
    │   │   │   ├── PopularTreks.jsx
    │   │   │   └── TrekkerForm.jsx
    │   │   ├── map/
    │   │   │   ├── RouteMap/
    │   │   │   │   ├── DifficultyMarker.jsx
    │   │   │   │   ├── index.jsx
    │   │   │   │   ├── MapControls.jsx
    │   │   │   │   ├── PassMarkers.jsx
    │   │   │   │   ├── RouteInfo.jsx
    │   │   │   │   ├── RouteLine.jsx
    │   │   │   │   ├── TrekMarkers.jsx
    │   │   │   │   └── UserLocationMarker.jsx
    │   │   │   └── TrekCard.jsx
    │   │   └── layout/
    │   │       └── Container.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Guides.jsx
    │   │   ├── Home.jsx
    │   │   ├── Permits.jsx
    │   │   ├── Profiles.jsx
    │   │   ├── Routes.jsx
    │   │   └── Safety.jsx
    │   ├── firebase.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env.local
    └── package.json
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (free tier)
- Firebase account (free tier)

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/treksarathi.git
cd treksarathi
```

### Step 2: Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/treksarathi
JWT_SECRET=your_super_secret_key
```

```bash
npm run dev
```

### Step 3: Frontend Setup
```bash
cd frontend
npm install
```

Create `.env.local` file:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

```bash
npm run dev
```

### Step 4: Seed Database
```bash
cd backend
node src/scripts/migrateTreks.js
```

---

## 🔧 Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for JWT tokens |

### Frontend (.env.local)
| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

---

## 📡 API Endpoints

### Treks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/treks` | Get all treks |
| GET | `/api/treks/map-points` | Get treks + mountain passes |
| GET | `/api/treks/search?q=` | Search treks |
| GET | `/api/treks/filter?difficulty=&maxBudget=` | Filter treks |
| GET | `/api/treks/route?userLat=&userLng=&trekLat=&trekLng=` | Get route |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/save` | Save/update user |
| GET | `/api/users/:uid` | Get user by UID |
| GET | `/api/users/all` | Get all users |
| PUT | `/api/users/role` | Update user role |
| PUT | `/api/users/guide-profile` | Update guide profile |
| PUT | `/api/users/update-profile` | Update user profile |

---

## 🎨 Features Showcase

### Map Features
- 🟢 **Green Markers** - Easy difficulty treks
- 🟡 **Yellow Markers** - Moderate difficulty
- 🔴 **Red Markers** - Hard difficulty
- 🔵 **Blue Markers** - Mountain passes
- 📍 **Red Marker** - User location
- 🟢 **Green Line** - Calculated route

### User Roles

#### Traveller
- View and filter treks
- Get route to trek starts
- Save favourite treks
- View trek stats
- Contact guides

#### Guide
- Create professional profile
- Add experience, languages, specialties
- Set pricing and availability
- View booking requests
- Manage portfolio

---

## 🚢 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Add environment variables
5. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---


## 🙏 Acknowledgements

- [OpenStreetMap](https://www.openstreetmap.org/) - Map data
- [OpenTopoMap](https://www.opentopomap.org/) - Terrain tiles
- [OSRM](http://project-osrm.org/) - Route calculation
- [Firebase](https://firebase.google.com/) - Authentication
- [MongoDB](https://www.mongodb.com/) - Database
- [Leaflet](https://leafletjs.com/) - Map library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

**Built with ❤️ for Nepal's Trekking Community**
```

This README.md includes:

| Section | Content |
|---------|---------|
| **Overview** | Project description and problem statement |
| **Features** | Complete feature list |
| **Tech Stack** | All technologies used |
| **Project Structure** | Full folder hierarchy |
| **Installation** | Step-by-step setup guide |
| **Environment Variables** | All required env vars |
| **API Endpoints** | Complete API documentation |
| **Deployment** | Hosting instructions |
| **Contributing** | Guidelines for contributors |
| **License** | MIT license |
| **Acknowledgements** | Credits to services used |

