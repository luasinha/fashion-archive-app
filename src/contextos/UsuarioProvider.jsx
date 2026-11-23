import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UsuarioContexto } from "./UsuarioContexto";
import {
  atualizarUsuario,
  buscarUsuario,
  cadastrarUsuario,
  entrarUsuario,
  sairUsuario,
  sessaoSalva,
} from "../servicos/usuarios.servico";

function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(() => Boolean(sessaoSalva()));

  useEffect(() => {
    const id = sessaoSalva();
    if (!id) return;
    let ativo = true;
    buscarUsuario(id)
      .then((dados) => ativo && setUsuario(dados))
      .catch((erro) => ativo && toast.error(erro.message))
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, []);

  async function entrar(email, senha) {
    setUsuario(await entrarUsuario(email, senha));
  }

  async function cadastrar(dados) {
    setUsuario(await cadastrarUsuario(dados));
  }

  function sair() {
    sairUsuario();
    setUsuario(null);
  }

  async function atualizar(dados) {
    const atualizado = { ...usuario, ...dados };
    await atualizarUsuario(usuario.id, atualizado);
    setUsuario(atualizado);
  }

  return (
    <UsuarioContexto.Provider
      value={{ usuario, carregando, entrar, cadastrar, sair, atualizar }}
    >
      {children}
    </UsuarioContexto.Provider>
  );
}

export default UsuarioProvider;
