import app from "./app.js";
import {connectDB} from "./config/db.js";

// Connect to database on cold start
connectDB().catch(error => {
    console.error("Failed to connect to database:", error);
});

// Export the app for Vercel (no app.listen!)
export default app;