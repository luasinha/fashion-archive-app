import { comId, extrairLista, requisicao } from "./api.servico";
import {
  buscarNoLocalStorage,
  removerDoLocalStorage,
  salvarNoLocalStorage,
} from "./localstorage.servico";

const RECURSO = "usuarios";
const CHAVE_SESSAO = "usuarioLogado";

const listarUsuarios = async () => {
  const resposta = await requisicao(RECURSO);
  return extrairLista(resposta).map(comId);
};

export const sessaoSalva = () => buscarNoLocalStorage(CHAVE_SESSAO);

export const buscarUsuario = async (id) => {
  const resposta = await requisicao(RECURSO, `/${id}`);
  return comId(resposta?.data ?? resposta);
};

export const cadastrarUsuario = async ({ nomeUsuario, email, senha }) => {
  const emailNormalizado = email.trim().toLowerCase();
  const usuarioNormalizado = nomeUsuario.trim().replace(/^@/, "");
  const usuarios = await listarUsuarios();

  if (usuarios.some((u) => u.email === emailNormalizado)) {
    throw new Error("Este e-mail já está cadastrado.");
  }
  if (usuarios.some((u) => u.nomeUsuario === usuarioNormalizado)) {
    throw new Error("Este nome de usuário já está em uso.");
  }

  await requisicao(RECURSO, "", {
    method: "POST",
    body: JSON.stringify({
      nome: usuarioNormalizado,
      nomeUsuario: usuarioNormalizado,
      email: emailNormalizado,
      senha,
      bio: "",
      link: "",
      foto: "",
      medidas: { altura: "", peso: "", busto: "", cintura: "", quadril: "" },
      favoritos: [],
    }),
  });

  const atualizados = await listarUsuarios();
  const novo = atualizados.find((u) => u.email === emailNormalizado);
  if (!novo) {
    throw new Error("Não foi possível concluir o cadastro. Tente novamente.");
  }
  salvarNoLocalStorage(CHAVE_SESSAO, novo.id);
  return novo;
};

export const entrarUsuario = async (email, senha) => {
  const emailNormalizado = email.trim().toLowerCase();
  const usuarios = await listarUsuarios();
  const usuario = usuarios.find(
    (u) => u.email === emailNormalizado && u.senha === senha
  );
  if (!usuario) {
    throw new Error("E-mail ou senha incorretos.");
  }
  salvarNoLocalStorage(CHAVE_SESSAO, usuario.id);
  return usuario;
};

export const sairUsuario = () => removerDoLocalStorage(CHAVE_SESSAO);

export const atualizarUsuario = async (id, usuario) => {
  const dados = { ...usuario };
  delete dados.id;
  await requisicao(RECURSO, `/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });
};
