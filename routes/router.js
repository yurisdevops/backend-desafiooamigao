import { Router } from "express";
import db from "../database/database.js";
import checkEmail from "../middleware/middleware.js";

const router = Router();

// Rotas de usuarios
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
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao tentar cadastrar os dados" });
      }
      return res.status(201).json({
        message: `Telefone cadastrado.`,
        phoneId: this.lastID,
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

export default router;
