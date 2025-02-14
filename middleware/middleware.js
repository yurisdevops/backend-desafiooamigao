import db from "../database/database.js";

const checkEmail = (req, res, next) => {
  const { email } = req.body;

  // Verifica na tabela `users`
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, userRow) => {
    if (err) {
      console.error("Erro ao consultar tabela users:", err.message);
      return res.status(500).json({ error: "Erro ao verificar email" });
    }

    if (userRow) {
      console.log("Email já existe na tabela users:", email);
      return res.status(400).json({ error: "Email já existe" });
    }

    // Verifica na tabela `members`
    db.get("SELECT * FROM members WHERE email = ?", [email], (err, memberRow) => {
      if (err) {
        console.error("Erro ao consultar tabela members:", err.message);
        return res.status(500).json({ error: "Erro ao verificar email" });
      }

      if (memberRow) {
        console.log("Email já existe na tabela members:", email);
        return res.status(400).json({ error: "Email já existe" });
      }

      // Se o email não existe em nenhuma das tabelas, prossegue
      console.log("Email não encontrado, prosseguindo...");
      next();
    });
  });
};

export default checkEmail;
