/* eslint-disable no-undef */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

const userController = {
  login: async (request, reply) => {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        return reply.status(400).send({ message: "All fields are required" });
      }

      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
        orderBy: {
          id: "asc",
        },
      });

      if (!user) {
        return reply.status(401).send({ message: "Email is not registered" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return reply.status(401).send({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      reply.setCookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        path: "/",
      });
      return reply.status(200).send({ user });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  },
  register: async (request, reply) => {
    try {
      const { fullname, email, password } = request.body;

      if (!fullname || !email || !password) {
        return reply
          .status(400)
          .send({ message: "Tous les champs sont requis" });
      }

      const userExisting = await prisma.user.findFirst({
        where: {
          email: email,
        },
        orderBy: {
          id: "asc",
        },
      });

      if (userExisting) {
        return reply
          .status(400)
          .send({ message: "Cet email est déjà utilisé" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          fullname,
          email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      reply.setCookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        path: "/",
      });
      return reply.status(201).send({
        user: {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Error during registration:", error);
      return reply.status(500).send({ message: "Erreur interne du serveur" });
    }
  },
  getme: async (request, reply) => {
    try {
      const userId = request.user.userId;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }

      return reply.status(200).send({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  },
  deleteUser: async (request, reply) => {
    try {
      const userId = request.body.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }
      await prisma.user.delete({
        where: { id: userId },
      });
      return reply.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  },
  updateUser: async (request, reply) => {
    try {
      const userId = request.body.id;
      const { fullname, email } = request.body;
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          fullname: fullname || user.fullname,
          email: email || user.email,
        },
      });
      return reply
        .status(200)
        .send({ message: "User updated successfully", updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  },
};

export default userController;
