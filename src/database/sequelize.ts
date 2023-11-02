import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
	process.env.PG_DATABASE ?? "",
	process.env.PG_USER ?? "",
	process.env.PG_PASSWORD,
	{
		host: process.env.PG_HOST ?? "localhost",
		port: parseInt(process.env.PG_PORT ?? "5432"),
		dialect: "postgres",
	}
);

const connect = async () => {
	try {
		await sequelize
			.authenticate()
			.then(() => {
				console.log(
					"=-=-=-= Connection to the database was established successfully =-=-=-="
				);
			})
			.catch((error) => {
				console.error("=-=-=-= Unable to connect to database:", error);
			});
	} catch (error) {
		console.error("=-=-=-= Unable to connect to database:", error);
	}
};

connect();

export default sequelize;
