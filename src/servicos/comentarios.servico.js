import { buscarNoLocalStorage, salvarNoLocalStorage } from "./localstorage.servico";

const CHAVE = "comentarios";

export const listarComentarios = () => buscarNoLocalStorage(CHAVE) || [];

export const salvarComentario = (comentario) => {
  const comentarios = listarComentarios();
  if (!comentario.id) {
    comentarios.push({ ...comentario, id: Date.now() });
  } else {
    const indice = comentarios.findIndex((c) => c.id === comentario.id);
    comentarios[indice] = comentario;
  }
  salvarNoLocalStorage(CHAVE, comentarios);
};

export const excluirComentario = (id) => {
  salvarNoLocalStorage(
    CHAVE,
    listarComentarios().filter((c) => c.id !== id)
  );
};
