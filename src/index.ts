import dotenv from "dotenv";
import express from "express";
import UserRouter from "./router.ts";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", UserRouter);

app.listen(process.env.API_PORT, () => {
	console.log(`=-=-=-= Server is running on port ${process.env.API_PORT} 🎉 =-=-=-=`);
});
