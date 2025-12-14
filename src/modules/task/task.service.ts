import { db } from "../../config/db";
import { ObjectId } from "mongodb";
import { io, notifyUser } from "../../socket";

export const taskService = {

  async create(userId: string, data: any) {
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

    const result = await db.collection("tasks").insertOne(task);


    io.emit("taskUpdated", {
      _id: result.insertedId,
      ...task,
    });

    notifyUser(data.assignedToId, "taskAssigned", {
      taskId: result.insertedId,
      title: task.title,
    });

    return { _id: result.insertedId, ...task };
  },

  
  async getAll(userId: string) {
    return db
      .collection("tasks")
      .find({
        $or: [
          { creatorId: userId },
          { assignedToId: userId },
        ],
      })
      .toArray();
  },


  async update(id: string, data: any) {
    const taskId = new ObjectId(id);


    const oldTask: any = await db
      .collection("tasks")
      .findOne({ _id: taskId });

    if (!oldTask) return({message: "Task not found"});

    await db.collection("tasks").updateOne(
      { _id: taskId },
      { $set: data }
    );


    if (
      data.assignedToId &&
      oldTask.assignedToId !== data.assignedToId
    ) {
      notifyUser(data.assignedToId, "taskAssigned", {
        taskId: id,
        title: oldTask.title,
      });
    }

   
    io.emit("taskUpdated", {
      _id: id,
      ...data,
    });

    return { message: "Updated" };
  },


  async remove(id: string) {
    await db.collection("tasks").deleteOne({
      _id: new ObjectId(id),
    });

    io.emit("taskUpdated", { deletedId: id });

    return { message: "Deleted" };
  },
};
