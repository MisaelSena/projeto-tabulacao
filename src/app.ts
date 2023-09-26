import express from "express";
import { atualizaUsuario, cadastrarUsuario, deletarUsuario, mostrarUsuarios } from "./controllers/user";
import { login } from "./controllers/login";

const app = express();

app.use(express.json());

app.post('/login', login);

app.post('/users', cadastrarUsuario);

app.get('/users', mostrarUsuarios);

app.patch('/users/:id_usuario', atualizaUsuario);

app.delete('/users/:id_usuario', deletarUsuario);


export default app;