import { z } from "zod";


export const createTaskSchema = z.object({
title: z.string().min(1).max(100),
description: z.string().min(1),
dueDate: z.string().optional(),
priority: z.enum(["Low", "Medium", "High", "Urgent"]),
assignedToId: z.string().min(1)
});


export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]).optional(),
  dueDate: z.string().optional(),
  assignedToId: z.string().optional(),
  status: z.enum(["To Do", "In Progress", "Done"]).optional()
});