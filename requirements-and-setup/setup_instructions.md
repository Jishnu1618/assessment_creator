# 🛠️ Step-by-Step Developer Launch Guide

Follow these sequential steps to run VedaAI on your local machine for evaluation, development, or testing.

---

## 🚀 Step 1: Clone the Repository

Clone the codebase and navigate to the project workspace root:
```bash
git clone https://github.com/Jishnu1618/assessment_creater.git
cd assessment_creater
```

---

## 📦 Step 2: Launch the Backend Express Server

Navigate to the `backend` folder, install the required dependencies, set up your configuration keys, and boot the server.

1. **Change directory**:
   ```bash
   cd backend
   ```
2. **Install Node dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment variables**:
   Create a new `.env` file in the root of the `backend/` folder and paste the following, replacing the database connection strings and API keys with your own:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. **Boot the Development Server**:
   ```bash
   npm run dev
   ```
   *The console should show connection confirmations for MongoDB Atlas and BullMQ. The REST endpoint will be listening on `http://localhost:5000` and WebSockets on `ws://localhost:5000`.*

---

## 🎨 Step 3: Launch the Next.js Frontend Client

Open a new terminal window in your workspace root (`assessment_creater/`), navigate to the `frontend` directory, install packages, and boot the interface.

1. **Change directory**:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Launch the Next.js dev server**:
   ```bash
   npm run dev
   ```
4. **Open your browser**:
   Navigate to **[http://localhost:3000](http://localhost:3000)** to view VedaAI in action!

---

## 🧪 Step 4: Run a Demo Test Assignment

Once both servers are running locally, you can verify the complete full-stack integration:
1. Click the glowing **"Create Assignment"** button on the left sidebar.
2. In the form stepper, fill out the details:
   * **Subject**: `Biology`
   * **Class**: `Class: 9th`
   * **Title**: `Quiz on Cell Biology`
   * **Due Date**: Notice that past dates are disabled inside the calendar picker. Select a future date.
   * **Generation Language**: Choose `Bengali`, `Hindi`, or `English`.
   * **Additional Details**: *(Optional)* E.g. *"Focus on eukaryotic organelles and cell wall composition."*
3. Click **"Next"**.
4. The premium glassmorphic loader will trigger, showing active progress updates (e.g. *Analyzing guidelines...*, *Uploading references to Gemini...*, *Structuring detailed answers...*) via live WebSockets connections.
5. Upon successful generation, you are dynamically redirected to the `/output` screen. The customizable print-ready exam sheet, interactive badging, and full grading answer key are loaded perfectly in clean Light Mode!

---

## 🛡️ Testing Failure Resiliency & Offline Mode

You can showcase VedaAI's advanced architecture to reviewers by demonstrating its fault-tolerant design:

### 1. Offline Redis Bypass Testing
* **Scenario**: Turn off your local Redis service or leave the `REDIS_HOST` environment variable blank in `backend/.env`.
* **Behavior**: Rather than crashing or stalling, VedaAI's backend will detect that Redis is offline, automatically bypass the BullMQ message queue, and process the generation request asynchronously inline. The WebSocket progress ticks and paper generation will continue to function flawlessly!

### 2. Output Blank State Protection Guard
* **Scenario**: Attempt to navigate directly to `http://localhost:3000/output` without generating a paper first, or simulate a model failure by keying in an invalid `GEMINI_API_KEY`.
* **Behavior**: Rather than rendering empty fields or crashing the React application, our Next.js store detects that `generatedPaper` is null, intercepting the render and displaying a clean empty state warning banner with a **"Go Back Home"** action button.
