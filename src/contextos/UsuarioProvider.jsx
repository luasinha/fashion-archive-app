import { useState } from "react";
import { UsuarioContexto } from "./UsuarioContexto";
import {
  atualizarUsuario,
  buscarUsuarioLogado,
  cadastrarUsuario,
  entrarUsuario,
  sairUsuario,
} from "../servicos/usuarios.servico";

function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(buscarUsuarioLogado);

  function entrar(email, senha) {
    setUsuario(entrarUsuario(email, senha));
  }

  function cadastrar(dados) {
    setUsuario(cadastrarUsuario(dados));
  }

  function sair() {
    sairUsuario();
    setUsuario(null);
  }

  function atualizar(dados) {
    const atualizado = { ...usuario, ...dados };
    atualizarUsuario(usuario.id, atualizado);
    setUsuario(atualizado);
  }

  return (
    <UsuarioContexto.Provider value={{ usuario, entrar, cadastrar, sair, atualizar }}>
      {children}
    </UsuarioContexto.Provider>
  );
}

export default UsuarioProvider;
