import express, { Request, Response } from "express";
import { obterOrgaos, Orgao } from "./client";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/orgaos", async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const orgaos: Orgao[] = await obterOrgaos(page);
        res.json({ data: orgaos, page });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Falha ao buscar órgãos" });
    }
});

app.listen(PORT, () => console.log(`Server rodando em http://localhost:${PORT}`));
