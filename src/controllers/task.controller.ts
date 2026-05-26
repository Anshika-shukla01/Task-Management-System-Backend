import { Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../middleware/auth.middleware";

// ================= CREATE TASK =================
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user!.userId,
      },
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= GET TASKS (Pagination + Filter + Search) =================
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const statusQuery = req.query.status;
    const searchQuery = req.query.search;

    const status =
      typeof statusQuery === "string"
        ? statusQuery === "true"
        : undefined;

    const search =
      typeof searchQuery === "string"
        ? searchQuery
        : undefined;

    // const tasks = await prisma.task.findMany({
    //   where: {
    //     userId: req.user!.userId,
    //     ...(status !== undefined && { status }),
    //     ...(search && {
    //       title: {
    //         contains: search,
    //       },
    //     }),
    //   },
    //   skip: (page - 1) * limit,
    //   take: limit,
    //   orderBy: { createdAt: "desc" },
    // });

    // const total = await prisma.task.count({
    //   where: { userId: req.user!.userId },
    // });

    const whereClause = {
      userId: req.user!.userId,
      ...(status !== undefined && { status }),
      ...(search && {
        title: {
          contains: search,
        },
      }),
    };

    const tasks = await prisma.task.findMany({
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.task.count({
      where: whereClause,
    });

    return res.status(200).json({
      total,
      page,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= GET SINGLE TASK =================
export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.params.id);

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user!.userId,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= UPDATE TASK =================
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const { title, description } = req.body;

    const existingTask = await prisma.task.findFirst({
      where: { id, userId: req.user!.userId },
    });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
      },
    });

    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= DELETE TASK =================
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.params.id);

    const existingTask = await prisma.task.findFirst({
      where: { id, userId: req.user!.userId },
    });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= TOGGLE TASK =================
export const toggleTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.params.id);

    const existingTask = await prisma.task.findFirst({
      where: { id, userId: req.user!.userId },
    });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        status: !existingTask.status,
      },
    });

    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};