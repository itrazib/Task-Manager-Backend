"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const db_1 = require("../../config/db");
const mongodb_1 = require("mongodb");
const socket_1 = require("../../socket");
exports.taskService = {
    async create(userId, data) {
        const task = {
            title: data.title,
            description: data.description,
            priority: data.priority,
            dueDate: data.dueDate ? new Date(data.dueDate) : null,
            creatorId: userId,
            assignedToId: data.assignedToId,
            status: "To Do",
            createdAt: new Date(),
        };
        const result = await db_1.db.collection("tasks").insertOne(task);
        socket_1.io.emit("taskUpdated", {
            _id: result.insertedId,
            ...task,
        });
        (0, socket_1.notifyUser)(data.assignedToId, "taskAssigned", {
            taskId: result.insertedId,
            title: task.title,
        });
        return { _id: result.insertedId, ...task };
    },
    async getAll(userId) {
        return db_1.db
            .collection("tasks")
            .find({
            $or: [
                { creatorId: userId },
                { assignedToId: userId },
            ],
        })
            .toArray();
    },
    async update(id, data) {
        const taskId = new mongodb_1.ObjectId(id);
        const oldTask = await db_1.db
            .collection("tasks")
            .findOne({ _id: taskId });
        if (!oldTask)
            return ({ message: "Task not found" });
        await db_1.db.collection("tasks").updateOne({ _id: taskId }, { $set: data });
        if (data.assignedToId &&
            oldTask.assignedToId !== data.assignedToId) {
            (0, socket_1.notifyUser)(data.assignedToId, "taskAssigned", {
                taskId: id,
                title: oldTask.title,
            });
        }
        socket_1.io.emit("taskUpdated", {
            _id: id,
            ...data,
        });
        return { message: "Updated" };
    },
    async remove(id) {
        await db_1.db.collection("tasks").deleteOne({
            _id: new mongodb_1.ObjectId(id),
        });
        socket_1.io.emit("taskUpdated", { deletedId: id });
        return { message: "Deleted" };
    },
};
