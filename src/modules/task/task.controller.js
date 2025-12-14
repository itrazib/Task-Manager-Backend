"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const task_service_1 = require("./task.service");
const createTask = async (req, res) => {
    const task = await task_service_1.taskService.create(req.user.id, req.body);
    res.json(task);
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
    const tasks = await task_service_1.taskService.getAll(req.user.id);
    res.json(tasks);
};
exports.getTasks = getTasks;
const updateTask = async (req, res) => {
    const task = await task_service_1.taskService.update(req.params.id, req.body);
    res.json(task);
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    await task_service_1.taskService.remove(req.params.id);
    res.json({ message: "Deleted" });
};
exports.deleteTask = deleteTask;
