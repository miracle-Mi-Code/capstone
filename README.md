# MarketMeld Africa: Full-Stack Commerce Engine

MarketMeld Africa is a high-performance, mobile-first full-stack e-commerce solution engineered to connect African artisans, farmers, and retailers with regional and global buyers. Built using the MERN stack architecture, the system incorporates atomic stock controls, secure token-based authentication, and a modern, responsive UI.

---

## 📁 System Directory Layout

```text
marketmeld-africa/ (capstone/)
├── README.md               # System documentation
├── backend/                # Node.js / Express API Engine
│   ├── config/             # Database connectivity profiles
│   ├── controllers/        # Business logic handlers (auth, orders)
│   ├── models/             # Strict Mongoose Document Schemas
│   ├── routes/             # RESTful API Endpoints
│   ├── .env                # Core server secrets (Protected)
│   ├── create-account.js   # Automated developer account injector
│   └── server.js           # Server application entry-point
└── frontend/               # React UI Architecture
    ├── src/
    │   ├── components/     # Reusable UI elements (Product Grid, Navbar)
    │   ├── context/        # Global State Providers (Cart Management)
    │   ├── pages/          # Layout views (Login, Registration, Dashboard)
    │   └── App.jsx         # Client routing wrapper
    └── package.json        # Frontend dependencies & scripts
🛠️ Tech Stack Matrix
Backend core: Node.js, Express.js REST API

Database Layer: MongoDB Atlas Cluster (via Mongoose ODM)

Security & Sessioning: JSON Web Tokens (JWT), BcryptJS password hashing

Frontend Layer: React.js (Functional Components, Hooks, Context API)

Design Framework: Tailwind CSS (Mobile-first responsive grids)

⚙️ Local Installation & Development Setup
1. System Prerequisites
Ensure you have Node.js (v16+) installed on your machine.

2. Clone and Environment Initialization
Navigate to your project root folder and configure your database keys:

Open the backend/ directory.

Create or verify your .env configuration file contains your live MongoDB credentials:

Code snippet
PORT=5000
MONGO_URI=mongodb+srv://miracleibrahim1234_db_user:4Idohgloy3ekKjOr@cluster0.hf1pbsi.mongodb.net/marketmeld?appName=Cluster0
JWT_SECRET=super_secret_west_africa_artisan_key_2026
NODE_ENV=development
🚀 Execution Guide
Because the frontend and backend are standalone subsystems, they must be run in two separate terminal windows simultaneously.

Terminal 1: Spin Up the Backend Services
Open your first terminal window, enter the backend workspace, inject your master developer administrative account, and start the core engine server:

Bash
# Step 1: Navigate to backend folder
cd backend

# Step 2: Run the account seed injector (Run once only)
node create-account.js

# Step 3: Launch the API listener engine
node server.js
Expected Console Output:

MarketMeld Backend Core Online on Port 5000

✅ Successfully authenticated firewall handshake with MongoDB Atlas!

Terminal 2: Spin Up the React UI Client
Open a second, separate terminal window and execute the UI builder process:

Bash
# Step 1: Navigate to the frontend folder
cd frontend

# Step 2: Install dependencies if running for the first time
npm install

# Step 3: Run the local browser development server
npm run dev
Expected Console Output:

VITE vX.X.X  ready in XX ms

➜  Local:   http://localhost:5173/

Open your web browser and navigate to http://localhost:5173 to interact with the frontend engine grid.

🔐 Master Developer Test Credentials
Once the system injection script finishes running, use these details on the React Application Sign-In screen to log directly into your system administrator dashboard layer:

Login Email: ibrahim.miracle@marketmeld.com

Secure Password: MarketMeldPassword2026!

🛑 Common Troubleshooting
Error: ENOENT: no such file or directory... open package.json
Cause: Trying to execute npm run dev or node server.js from the generic root /capstone directory.

Fix: You must cd backend or cd frontend explicitly before issuing terminal control actions.

Database script injection failed: querySrv ECONNREFUSED
Cause: Your local router or ISP's DNS network configurations cannot resolve modern MongoDB SRV lookup flags.

Fix: Activate a local VPN or Cloudflare WARP (1.1.1.1) to cleanly route past your provider's local connection blocks.

