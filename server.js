import express from "express";
import userRoutes from "./routes/router.js"; // Certifique-se de usar o caminho correto

const app = express();

app.use(express.json());

// Usar o router com o prefixo '/api'
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
