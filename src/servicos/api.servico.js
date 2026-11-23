const URL_BASE = import.meta.env.VITE_API_URL;
const SECRET = import.meta.env.VITE_API_SECRET;

export const comId = (registro) => ({ ...registro, id: registro.id ?? registro._id });

export const extrairLista = (resposta) =>
  Array.isArray(resposta)
    ? resposta
    : (resposta?.data ?? resposta?.dados ?? resposta?.items ?? []);

export async function requisicao(recurso, caminho = "", opcoes = {}) {
  if (!URL_BASE || !SECRET) {
    throw new Error("API não configurada. Preencha o arquivo .env.");
  }

  let resposta;
  try {
    resposta = await fetch(`${URL_BASE}/${recurso}${caminho}`, {
      ...opcoes,
      headers: {
        "Content-Type": "application/json",
        "x-api-secret": SECRET,
      },
    });
  } catch {
    throw new Error("Falha de comunicação com a API. Verifique sua conexão.");
  }

  if (!resposta.ok) {
    throw new Error(`A API retornou um erro (código ${resposta.status}).`);
  }

  const texto = await resposta.text();
  return texto ? JSON.parse(texto) : null;
}
