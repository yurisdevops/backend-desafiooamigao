import db from "../database/database.js"; // Caminho corrigido para o arquivo database.js

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      return res.status(400).json({ error: "Email já existe" });
    }
    next();
  });

  db.get("SELECT * FROM members WHERE email = ?", [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      return res.status(400).json({ error: "Email já existe" });
    }
    next();
  });
};

export default checkEmail;
