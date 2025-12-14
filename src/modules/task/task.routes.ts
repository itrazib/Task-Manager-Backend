import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "./task.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createTaskSchema, updateTaskSchema } from "./task.dto";

const router = Router();

router.post("/", auth,validate(createTaskSchema), createTask);
router.get("/", auth, getTasks);
router.patch("/:id", auth,validate(updateTaskSchema), updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
