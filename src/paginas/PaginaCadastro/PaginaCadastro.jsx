import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Botao from "../../componentes/Botao/Botao";
import Cabecalho from "../../componentes/Cabecalho/Cabecalho";
import CampoTexto from "../../componentes/CampoTexto/CampoTexto";
import { useUsuario } from "../../hooks/useUsuario";
import { validarCadastro } from "../../utils/validacoes";

function PaginaCadastro() {
  const navigate = useNavigate();
  const { cadastrar } = useUsuario();
  const [formulario, setFormulario] = useState({
    nomeUsuario: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);

  function mudar(evento) {
    setFormulario({ ...formulario, [evento.target.name]: evento.target.value });
  }

  async function enviar(evento) {
    evento.preventDefault();
    const novosErros = validarCadastro(formulario);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setEnviando(true);
    try {
      await cadastrar(formulario);
      toast.success("Cadastro realizado com sucesso.");
      navigate("/home");
    } catch (erro) {
      toast.error(erro.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main>
      <Cabecalho destino="/" />
      <div className="tela">
        <h1 className="titulo-tela">Cadastrar</h1>
        <p className="subtitulo-tela">Crie sua conta no Fashion Archive!</p>

        <form onSubmit={enviar} noValidate>
          <CampoTexto id="nomeUsuario" name="nomeUsuario" rotulo="Nome de usuário:"
            placeholder="@usuario23" value={formulario.nomeUsuario}
            onChange={mudar} erro={erros.nomeUsuario} />
          <CampoTexto id="email" name="email" tipo="email" rotulo="E-mail:"
            placeholder="seuemail@email.com" value={formulario.email}
            onChange={mudar} erro={erros.email} />
          <CampoTexto id="senha" name="senha" tipo="password" rotulo="Senha:"
            placeholder="Digite sua senha" value={formulario.senha}
            onChange={mudar} erro={erros.senha} />
          <CampoTexto id="confirmarSenha" name="confirmarSenha" tipo="password"
            rotulo="Confirmar senha:" placeholder="Confirme sua senha"
            value={formulario.confirmarSenha} onChange={mudar} erro={erros.confirmarSenha} />
          <Botao type="submit" disabled={enviando}>
            {enviando ? "Cadastrando..." : "Cadastrar"}
          </Botao>
        </form>

        <div className="divisor">ou</div>
        <p className="rodape-formulario">
          Já possui uma conta? <Link className="link-rosa" to="/login">Entrar</Link>
        </p>
      </div>
    </main>
  );
}

export default PaginaCadastro;
