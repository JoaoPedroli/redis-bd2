import express from "express";
const router = express.Router();
import UsuarioController from "../src/controller/UserController.ts";

router.get("/", UsuarioController.getUsers);
router.get("/:email", UsuarioController.getUser);
router.post("/", UsuarioController.createUser);
router.put("/:email", UsuarioController.updateUser);
router.delete("/:email", UsuarioController.deleteUser);

export default router;
