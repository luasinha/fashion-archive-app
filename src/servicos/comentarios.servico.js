import { comId, extrairLista, requisicao } from "./api.servico";

const RECURSO = "comentarios";

export const listarComentarios = async () => {
  const resposta = await requisicao(RECURSO);
  return extrairLista(resposta).map(comId);
};

export const salvarComentario = async (comentario) => {
  const { id, ...dados } = comentario;
  if (id) {
    return requisicao(RECURSO, `/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    });
  }
  return requisicao(RECURSO, "", {
    method: "POST",
    body: JSON.stringify(dados),
  });
};

export const excluirComentario = (id) =>
  requisicao(RECURSO, `/${id}`, { method: "DELETE" });
