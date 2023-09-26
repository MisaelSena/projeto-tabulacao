import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const user = await AppDataSource.getRepository(User).findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({
        ok: false,
        mensagem: "E-mail ou Senha inválidos!",
      });
    }
    const senhaHash = user.senha;
    const verificaSenha = await bcrypt.compare(senha, senhaHash);

    if (!verificaSenha) {
      return res.status(401).json({
        ok: false,
        mensagem: "E-mail ou Senha inválidos!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET ?? "", {
      expiresIn: "1h",
    });

    const { senha: _, ...userLogin } = user;

    return res.status(200).json({
      user: userLogin,
      token: token,
    });
  } catch (error) {
    console.log(error, "Erro no login!");
    return res.status(401).json({
      ok: false,
      mensagem: "Erro ao efetuar Login",
    });
  }
};
