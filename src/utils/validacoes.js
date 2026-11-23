const MEDIDAS = {
  altura: { rotulo: "Altura", min: 50, max: 250 },
  peso: { rotulo: "Peso", min: 20, max: 300 },
  busto: { rotulo: "Busto", min: 30, max: 200 },
  cintura: { rotulo: "Cintura", min: 30, max: 200 },
  quadril: { rotulo: "Quadril", min: 30, max: 200 },
};

export const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function urlValida(texto) {
  try {
    const url = new URL(texto);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validarLogin({ email, senha }) {
  const erros = {};
  if (!email.trim()) erros.email = "Informe o e-mail.";
  else if (!emailValido(email.trim())) erros.email = "Informe um e-mail válido.";
  if (!senha) erros.senha = "Informe a senha.";
  return erros;
}

export function validarCadastro({ nomeUsuario, email, senha, confirmarSenha }) {
  const erros = {};
  const usuario = nomeUsuario.trim().replace(/^@/, "");
  if (!usuario) erros.nomeUsuario = "Informe um nome de usuário.";
  else if (!/^[a-zA-Z0-9_.]{3,30}$/.test(usuario))
    erros.nomeUsuario = "Use de 3 a 30 letras, números, ponto ou underline.";
  if (!email.trim()) erros.email = "Informe o e-mail.";
  else if (!emailValido(email.trim())) erros.email = "Informe um e-mail válido.";
  if (!senha) erros.senha = "Informe a senha.";
  else if (senha.length < 6) erros.senha = "A senha deve ter pelo menos 6 caracteres.";
  if (!confirmarSenha) erros.confirmarSenha = "Confirme a senha.";
  else if (confirmarSenha !== senha) erros.confirmarSenha = "As senhas não são iguais.";
  return erros;
}

export function validarPerfil({ nome, nomeUsuario, bio, link }) {
  const erros = {};
  const usuario = nomeUsuario.trim().replace(/^@/, "");
  if (!nome.trim()) erros.nome = "Informe o nome.";
  else if (nome.trim().length < 2 || nome.trim().length > 50)
    erros.nome = "O nome deve ter entre 2 e 50 caracteres.";
  if (!usuario) erros.nomeUsuario = "Informe o nome de usuário.";
  else if (!/^[a-zA-Z0-9_.]{3,30}$/.test(usuario))
    erros.nomeUsuario = "Use de 3 a 30 letras, números, ponto ou underline.";
  if (bio.trim().length > 160) erros.bio = "A bio deve ter no máximo 160 caracteres.";
  if (link.trim() && !urlValida(link.trim()))
    erros.link = "Informe um link válido (http:// ou https://).";
  return erros;
}

export function validarMedidas(medidas) {
  const erros = {};
  Object.entries(MEDIDAS).forEach(([chave, { rotulo, min, max }]) => {
    const valor = String(medidas[chave] ?? "").trim();
    if (!valor) return;
    const numero = Number(valor);
    if (Number.isNaN(numero) || numero < min || numero > max)
      erros[chave] = `${rotulo}: informe um valor entre ${min} e ${max}.`;
  });
  return erros;
}

export function validarComentario(texto) {
  const limpo = texto.trim();
  if (!limpo) return "Escreva um comentário.";
  if (limpo.length < 3) return "O comentário deve ter pelo menos 3 caracteres.";
  if (limpo.length > 500) return "O comentário deve ter no máximo 500 caracteres.";
  return "";
}
