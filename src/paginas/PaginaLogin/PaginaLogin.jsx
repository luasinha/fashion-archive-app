import { useState } from "react";
import { FaFacebook, FaGoogle, FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Botao from "../../componentes/Botao/Botao";
import Cabecalho from "../../componentes/Cabecalho/Cabecalho";
import CampoTexto from "../../componentes/CampoTexto/CampoTexto";
import { useUsuario } from "../../hooks/useUsuario";
import { validarLogin } from "../../utils/validacoes";
import "./PaginaLogin.css";

function PaginaLogin() {
  const navigate = useNavigate();
  const { entrar } = useUsuario();
  const [formulario, setFormulario] = useState({ email: "", senha: "" });
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);

  function mudar(evento) {
    setFormulario({ ...formulario, [evento.target.name]: evento.target.value });
  }

  function emBreve() {
    toast.info("Função disponível em breve.");
  }

  async function enviar(evento) {
    evento.preventDefault();
    const novosErros = validarLogin(formulario);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setEnviando(true);
    try {
      await entrar(formulario.email, formulario.senha);
      toast.success("Login realizado com sucesso.");
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
        <h1 className="titulo-tela">Entrar</h1>
        <p className="subtitulo-tela">Acesse a sua conta com seu e-mail e senha.</p>

        <form onSubmit={enviar} noValidate>
          <CampoTexto id="email" name="email" tipo="email" rotulo="E-mail:"
            placeholder="seuemail@email.com" value={formulario.email}
            onChange={mudar} erro={erros.email} />
          <CampoTexto id="senha" name="senha" tipo="password" rotulo="Senha:"
            placeholder="Digite sua senha" value={formulario.senha}
            onChange={mudar} erro={erros.senha} />
          <button type="button" className="login__esqueceu link-botao" onClick={emBreve}>
            Esqueceu a senha?
          </button>
          <Botao type="submit" disabled={enviando}>
            {enviando ? "Entrando..." : "Entrar"}
          </Botao>
        </form>

        <div className="login__sociais">
          <button type="button" onClick={emBreve} aria-label="Entrar com Google"><FaGoogle /></button>
          <button type="button" onClick={emBreve} aria-label="Entrar com X"><FaXTwitter /></button>
          <button type="button" onClick={emBreve} aria-label="Entrar com Facebook"><FaFacebook /></button>
        </div>

        <div className="divisor">ou</div>
        <p className="rodape-formulario">
          Não possui uma conta? <Link className="link-rosa" to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </main>
  );
}

export default PaginaLogin;
