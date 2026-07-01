wedding-planner/
├── client/                          # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── assets/                  # Images, fonts, favicons
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── ui/                  # Button, Card, Input, Modal, etc.
│   │   │   ├── animations/          # Framer Motion variants & presets
│   │   │   └── layout/              # Navbar, Footer, Sidebar
│   │   ├── pages/                   # Page-level components
│   │   │   ├── Home/
│   │   │   ├── Dashboard/
│   │   │   ├── Planner/
│   │   │   └── Vendor/
│   │   ├── features/                # Feature-based modules (mirrors backend)
│   │   │   ├── auth/
│   │   │   ├── weddings/
│   │   │   ├── vendors/
│   │   │   └── guests/
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── context/                 # Context API / State management
│   │   ├── utils/                   # API helpers, formatters, validators
│   │   ├── styles/                  # Global styles, Tailwind config
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                          # Node.js/Express Backend
│   ├── src/
│   │   ├── config/                  # DB connection, env, email config
│   │   │   ├── db.js
│   │   │   ├── env.js
│   │   │   └── email.js
│   │   ├── modules/                 # Feature-based modules
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── auth.service.js
│   │   │   │   ├── auth.routes.js
│   │   │   │   └── auth.validation.js
│   │   │   ├── wedding/
│   │   │   │   ├── wedding.model.js
│   │   │   │   ├── wedding.controller.js
│   │   │   │   ├── wedding.service.js
│   │   │   │   └── wedding.routes.js
│   │   │   ├── vendor/
│   │   │   ├── guest/
│   │   │   └── budget/
│   │   ├── middlewares/             # Auth, error handling, validation
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── validate.middleware.js
│   │   ├── utils/                   # Helpers, logger, API responses
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── docker-compose.yml               # For containerization (optional but recommended)[reference:8]
├── package.json                     # Root package.json with scripts to run both apps[reference:9]
└── README.md

this is the today updates