import { Router } from "express";
import db from "../database/database.js";
import checkEmail from "../middleware/middleware.js";

const router = Router();

// Rotas de usuarios

router.post("/check-email", checkEmail, (req, res) => {

  return res.status(200).json({ message: "Email disponível" });
});

router.post("/users", checkEmail, function (req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    function (err) {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Erro ao tentar criar um usuário" });
      }

      return res
        .status(201)
        .json({ message: "Usuário criado com sucesso", id: this.lastID });
    }
  );
});

router.post("/login", function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao tentar fazer login" });
      }
      if (!row) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }
      return res.status(200).json({
        message: "Login bem-sucedido",
        user: row,
      });
    }
  );
});

router.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json(rows);
  });
});

// Rotas de telefone
router.post("/phones", function (req, res) {
  const { name, phone, clientId } = req.body;

  if (!phone || !name || !clientId) {
    return res.status(400).json({ error: "Telefone ou Nome ausentes." });
  }

  db.run(
    "INSERT INTO phones (name, phone, clientId) VALUES (? , ?, ?)",
    [name, phone, clientId],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao tentar cadastrar os dados" });
      }
      return res.status(201).json({
        message: `Telefone cadastrado.`,
      });
    }
  );
});

router.get("/phones", (req, res) => {
  const clientId = req.query.clientId;
  db.all("SELECT * FROM phones WHERE clientId = ?", [clientId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json(rows);
  });
});

// Rotas de membros

router.post("/members", checkEmail, (req, res) => {
  const { name, email, password, clientId } = req.body;

  if (!name || !email || !password || !clientId) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  db.run(
    "INSERT INTO members (name, email, password, clientId) VALUES (?, ?, ?, ?)",
    [name, email, password, clientId],
    (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Erro ao tentar cadastrar um novo membro" });
      }
      return res.status(201).json({ id: this.lastID });
    }
  );
});

router.get("/members", (req, res) => {
  const clientId = req.query.clientId;
  db.all(
    "SELECT * FROM members WHERE clientId = ?",
    [clientId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json(rows);
    }
  );
});

router.delete("/members", (req, res) => {
  const id = parseInt(req.query.id);
  if (!id) {
    return res.status(400).json({ error: "Id do membro ausente" });
  }
  db.run("DELETE FROM members WHERE id =?", [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(204).json({ message: `Membro deletado ${id}` });
  });
});

export default router;
