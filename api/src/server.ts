import express from "express";
import cors from "cors";
import "dotenv/config";
import  {startConnectionDatabase}  from "./config/database/Database";
const PORT = process.env.PORT;
const url = process.env.FRONT;
const hop = process.env.HOPPSCOTCH;
const app = express();

app.use(express.json());

let allDomains = [url, hop];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || allDomains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  try {
    console.log(`Rota funcionando!!`);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Erro: ${err}`);
    } else {
      throw new Error(`Erro desconhecido!`);
    }
  }
});
app.listen(PORT, async () => {
  try {
    await startConnectionDatabase();
    console.log(`Servidor rodando na porta ${PORT}`);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Erro: ${err}`);
    } else {
      throw new Error(`Erro desconhecido!`);
    }
  }
});
