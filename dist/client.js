import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const BASE = "https://api.portaldatransparencia.gov.br/api-de-dados";
const TOKEN = process.env.PORTAL_TOKEN || "";
export async function obterOrgaos(page = 1) {
    const resp = await axios.get(`${BASE}/orgaos-siafi`, {
        headers: { "key": "chave-api-dados", "value": TOKEN },
        params: { pagina: page }
    });
    return resp.data;
}
