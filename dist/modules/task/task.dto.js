"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1),
    dueDate: zod_1.z.string().optional(),
    priority: zod_1.z.enum(["Low", "Medium", "High", "Urgent"]),
    assignedToId: zod_1.z.string().min(1)
});
exports.updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    priority: zod_1.z.enum(["Low", "Medium", "High"]).optional(),
    dueDate: zod_1.z.string().optional(),
    assignedToId: zod_1.z.string().optional(),
    status: zod_1.z.enum(["To Do", "In Progress", "Done"]).optional()
});
