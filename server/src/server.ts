import app from "./app.js"
import connectDB from './config/db.js';
import env from "./env.js";

const PORT = env.PORT || 5000;

const startServer = async () => { 
	try {
		await connectDB();
		app.listen(PORT, () => {
		  console.log(`Server listening on port ${PORT}!`);
		});
	} catch (error) {
		console.error("Failed to start server: ", error)
		process.exit(1)
	}
 }

startServer()
