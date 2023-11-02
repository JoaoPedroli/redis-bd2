import User from "../model/User.ts";
import redis from "../database/redis.ts";
import { Request, Response } from "express";

class UserController {
	public async getUsers(req: Request, res: Response) {
		const Users = await User.findAll();
		res.status(200).send(Users);
	}

	public async createUser(req: Request, res: Response) {
		try {
			await User.build(req.body).save();
			res.status(201).json(req.body);
		} catch (error) {
			res.status(500).send(
				"An error occurred when trying to create a user."
			);
			console.log("Error create user: ", error);
		}
	}

	public async getUser(req: Request, res: Response) {
		try {
			const cachedData = await redis.get(`user-${req.params.email}`);

			if (cachedData) {
				console.log("Data retrieved from cache memory.");
				res.status(200).send(JSON.parse(cachedData));
			} else {
				const user = await User.findByPk(req.params.email);

				if (user) {
					res.status(200).send(user);

					redis.setEx(
						`user-${req.params.email}`,
						600,
						JSON.stringify(user)
					);

					console.log(
						"Data retrieved from the database and stored in cache memory."
					);
				} else {
					res.status(404).send("User not found.");
				}
			}
		} catch (error) {
			res.status(500).send(
				"An error occurred when trying to get a user."
			);
			console.log("Error get user: ", error);
		}
	}

	public async deleteUser(req: Request, res: Response) {
		try {
			const response = await User.destroy({
				where: { email: req.params.email },
			});

			if (response > 0) {
				res.status(200).send("User removed.");
			} else {
				res.status(404).send("User not found.");
			}
		} catch (error) {
			res.status(500).send(
				"An error occurred when trying to delete a user."
			);
			console.log("Error delete user: ", error);
		}
	}

	public async updateUser(req: Request, res: Response) {
		try {
			return await User.update(req.body, {
				where: { email: req.params.email },
			})
				.then(() => {
					res.status(200).send("User updated.");
				})
				.catch((error) => {
					res.status(404).send("User not found.");
					console.log("Catch Error update user: ", error);
				});
		} catch (error) {
			res.status(500).send(
				"An error occurred when trying to update a user."
			);
			console.log("Error update user: ", error);
		}
	}
}

export default new UserController();
