import {
  buscarNoLocalStorage,
  removerDoLocalStorage,
  salvarNoLocalStorage,
} from "./localstorage.servico";

const CHAVE_USUARIOS = "usuarios";
const CHAVE_SESSAO = "usuarioLogado";

const listarUsuarios = () => buscarNoLocalStorage(CHAVE_USUARIOS) || [];

export const buscarUsuarioLogado = () => {
  const id = buscarNoLocalStorage(CHAVE_SESSAO);
  return listarUsuarios().find((u) => u.id === id) || null;
};

export const cadastrarUsuario = ({ nomeUsuario, email, senha }) => {
  const emailNormalizado = email.trim().toLowerCase();
  const usuarioNormalizado = nomeUsuario.trim().replace(/^@/, "");
  const usuarios = listarUsuarios();

  if (usuarios.some((u) => u.email === emailNormalizado)) {
    throw new Error("Este e-mail já está cadastrado.");
  }
  if (usuarios.some((u) => u.nomeUsuario === usuarioNormalizado)) {
    throw new Error("Este nome de usuário já está em uso.");
  }

  const novo = {
    id: Date.now(),
    nome: usuarioNormalizado,
    nomeUsuario: usuarioNormalizado,
    email: emailNormalizado,
    senha,
    bio: "",
    link: "",
    foto: "",
    medidas: { altura: "", peso: "", busto: "", cintura: "", quadril: "" },
    favoritos: [],
  };

  salvarNoLocalStorage(CHAVE_USUARIOS, [...usuarios, novo]);
  salvarNoLocalStorage(CHAVE_SESSAO, novo.id);
  return novo;
};

export const entrarUsuario = (email, senha) => {
  const emailNormalizado = email.trim().toLowerCase();
  const usuario = listarUsuarios().find(
    (u) => u.email === emailNormalizado && u.senha === senha
  );
  if (!usuario) {
    throw new Error("E-mail ou senha incorretos.");
  }
  salvarNoLocalStorage(CHAVE_SESSAO, usuario.id);
  return usuario;
};

export const sairUsuario = () => removerDoLocalStorage(CHAVE_SESSAO);

export const atualizarUsuario = (id, usuario) => {
  const usuarios = listarUsuarios().map((u) => (u.id === id ? usuario : u));
  salvarNoLocalStorage(CHAVE_USUARIOS, usuarios);
};
