/* eslint-disable no-undef */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
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

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return reply.status(401).send({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return reply.status(401).send({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return reply.status(200).send({ user, token });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  },
  register: async (request, reply) => {
    try {
      const { name, email, password } = request.body;

      if (!name || !email || !password) {
        return reply.status(400).send({ message: "Tous les champs sont requis" });
      }

      const userExisting = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      if (userExisting) {
        return reply.status(400).send({ message: "Cet email est déjà utilisé" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        }
      });

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return reply.status(201).send({
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      });
    } catch (error) {
      console.error("Error during registration:", error);
      return reply.status(500).send({ message: "Erreur interne du serveur" });
    }
  }
};

export default userController;