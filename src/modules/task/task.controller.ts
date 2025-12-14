import { taskService } from "./task.service";


export const createTask = async (req: any, res: any) => {
const task = await taskService.create(req.user.id, req.body);
res.json(task);
};


export const getTasks = async (req: any, res: any) => {
const tasks = await taskService.getAll(req.user.id);
res.json(tasks);
};


export const updateTask = async (req: any, res: any) => {
const task = await taskService.update(req.params.id, req.body);
res.json(task);
};


export const deleteTask = async (req: any, res: any) => {
await taskService.remove(req.params.id);
res.json({ message: "Deleted" });
};