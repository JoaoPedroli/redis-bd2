import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.ts";

const User = sequelize.define(
	"User",
	{
		email: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{}
);

async function sync() {
	await User.sync();
	console.log("=-=-=-= Synced. =-=-=-=");
}

sync();

export default User;
