import { useRef, useState } from "react";
import { FiCamera, FiLink, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Botao from "../../componentes/Botao/Botao";
import Cabecalho from "../../componentes/Cabecalho/Cabecalho";
import CampoTexto from "../../componentes/CampoTexto/CampoTexto";
import { useUsuario } from "../../hooks/useUsuario";
import { reduzirImagem } from "../../utils/imagem";
import { validarPerfil } from "../../utils/validacoes";
import "./PaginaEdicaoPerfil.css";

function PaginaEdicaoPerfil() {
  const navigate = useNavigate();
  const { usuario, atualizar } = useUsuario();
  const entradaFoto = useRef(null);

  const inicial = {
    nome: usuario.nome || "",
    nomeUsuario: usuario.nomeUsuario || "",
    bio: usuario.bio || "",
    link: usuario.link || "",
    foto: usuario.foto || "",
  };

  const [formulario, setFormulario] = useState(inicial);
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);

  function mudar(evento) {
    setFormulario({ ...formulario, [evento.target.name]: evento.target.value });
  }

  async function escolherFoto(evento) {
    const arquivo = evento.target.files[0];
    evento.target.value = "";
    if (!arquivo) return;
    if (!arquivo.type.startsWith("image/")) {
      toast.error("Escolha um arquivo de imagem.");
      return;
    }
    try {
      const foto = await reduzirImagem(arquivo);
      setFormulario((atual) => ({ ...atual, foto }));
    } catch (erro) {
      toast.error(erro.message);
    }
  }

  async function salvar(evento) {
    evento.preventDefault();
    const novosErros = validarPerfil(formulario);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) {
      toast.warn("Corrija os campos destacados.");
      return;
    }

    setSalvando(true);
    try {
      await atualizar({
        nome: formulario.nome.trim(),
        nomeUsuario: formulario.nomeUsuario.trim().replace(/^@/, ""),
        bio: formulario.bio.trim(),
        link: formulario.link.trim(),
        foto: formulario.foto,
      });
      toast.success("Perfil atualizado com sucesso.");
      navigate("/perfil");
    } catch (erro) {
      toast.error(erro.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main>
      <Cabecalho titulo="Editar perfil" destino="/perfil" />
      <div className="banner edicao__banner">
        <button
          type="button"
          onClick={() => entradaFoto.current.click()}
          aria-label="Escolher foto"
        >
          <FiCamera />
        </button>
      </div>
      <input
        ref={entradaFoto}
        type="file"
        accept="image/*"
        className="edicao__arquivo"
        onChange={escolherFoto}
      />

      <div className="tela">
        <div className="perfil-cabeca">
          <div className="avatar">
            {formulario.foto ? <img src={formulario.foto} alt={formulario.nome} /> : <FiUser />}
          </div>
          <Botao variante="cinza" pequeno onClick={() => entradaFoto.current.click()}>
            Alterar foto
          </Botao>
        </div>
        <h2 className="edicao__nome">{usuario.nome}</h2>

        <form onSubmit={salvar} noValidate>
          <CampoTexto id="nome" name="nome" rotulo="Nome:" placeholder="Nome"
            value={formulario.nome} onChange={mudar} erro={erros.nome} />
          <CampoTexto id="nomeUsuario" name="nomeUsuario" rotulo="Nome de usuário:"
            placeholder="@usuario23" value={formulario.nomeUsuario}
            onChange={mudar} erro={erros.nomeUsuario} />
          <CampoTexto id="bio" name="bio" tipo="textarea" rows={4} rotulo="Bio:"
            placeholder="Conte um pouco sobre você" value={formulario.bio}
            onChange={mudar} erro={erros.bio} />

          <div className={erros.link ? "campo campo--erro" : "campo"}>
            <label htmlFor="link">Link:</label>
            <div className="edicao__link">
              <span><FiLink /></span>
              <input id="link" name="link" placeholder="https://..."
                value={formulario.link} onChange={mudar} />
            </div>
            {erros.link && <span className="campo__erro">{erros.link}</span>}
          </div>

          <div className="edicao__acoes">
            <Botao variante="cinza" onClick={() => { setFormulario(inicial); setErros({}); }}>
              Redefinir
            </Botao>
            <Botao type="submit" disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar alterações"}
            </Botao>
          </div>
        </form>
      </div>
    </main>
  );
}

export default PaginaEdicaoPerfil;
