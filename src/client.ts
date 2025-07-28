import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE = "https://api.portaldatransparencia.gov.br/api-de-dados";
const TOKEN = process.env.PORTAL_TOKEN || "";

export interface Orgao { codigo: string; descricao: string; }

export async function obterOrgaos(page = 1): Promise<Orgao[]> {
    try {
        const resp = await axios.get<Orgao[]>(`${BASE}/orgaos-siafi`, {
            headers: { "chave-api-dados": TOKEN },
            params: { pagina: page }
        });
        return resp.data;
    } catch (err) {
        console.error("Erro ao buscar órgãos:", err);
        throw new Error("Falha ao buscar órgãos");
    }
}
