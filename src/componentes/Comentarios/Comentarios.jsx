import { useEffect, useState } from "react";
import { FiEdit2, FiSearch, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import Botao from "../Botao/Botao";
import CampoTexto from "../CampoTexto/CampoTexto";
import { useUsuario } from "../../hooks/useUsuario";
import {
  excluirComentario,
  listarComentarios,
  salvarComentario,
} from "../../servicos/comentarios.servico";
import { validarComentario } from "../../utils/validacoes";
import "./Comentarios.css";

function Comentarios({ slug }) {
  const { usuario } = useUsuario();
  const [comentarios, setComentarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState("");
  const [versao, setVersao] = useState(0);
  const [busca, setBusca] = useState("");
  const [texto, setTexto] = useState("");
  const [erroTexto, setErroTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [textoEdicao, setTextoEdicao] = useState("");
  const [erroEdicao, setErroEdicao] = useState("");

  useEffect(() => {
    let ativo = true;
    listarComentarios()
      .then((lista) => {
        if (!ativo) return;
        setComentarios(lista);
        setErroLista("");
      })
      .catch((erro) => {
        if (!ativo) return;
        setErroLista(erro.message);
        toast.error(erro.message);
      })
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, [versao]);

  function recarregar() {
    setCarregando(true);
    setVersao((v) => v + 1);
  }

  async function publicar(evento) {
    evento.preventDefault();
    const erro = validarComentario(texto);
    setErroTexto(erro);
    if (erro) return;

    setEnviando(true);
    try {
      await salvarComentario({
        conteudo: slug,
        autorId: usuario.id,
        autor: usuario.nomeUsuario,
        texto: texto.trim(),
        criadoEm: new Date().toISOString(),
      });
      toast.success("Comentário publicado com sucesso.");
      setTexto("");
      recarregar();
    } catch (erroApi) {
      toast.error(erroApi.message);
    } finally {
      setEnviando(false);
    }
  }

  function iniciarEdicao(comentario) {
    setEditandoId(comentario.id);
    setTextoEdicao(comentario.texto);
    setErroEdicao("");
  }

  async function salvarEdicao(comentario) {
    const erro = validarComentario(textoEdicao);
    setErroEdicao(erro);
    if (erro) return;

    try {
      await salvarComentario({ ...comentario, texto: textoEdicao.trim(), editado: true });
      toast.success("Comentário atualizado com sucesso.");
      setEditandoId(null);
      recarregar();
    } catch (erroApi) {
      toast.error(erroApi.message);
    }
  }

  async function excluir(comentario) {
    if (!window.confirm("Deseja realmente excluir este comentário?")) return;
    try {
      await excluirComentario(comentario.id);
      toast.success("Comentário excluído com sucesso.");
      recarregar();
    } catch (erroApi) {
      toast.error(erroApi.message);
    }
  }

  const termo = busca.toLowerCase();
  const doConteudo = comentarios
    .filter((c) => c.conteudo === slug)
    .sort((a, b) => String(b.criadoEm).localeCompare(String(a.criadoEm)));
  const filtrados = doConteudo.filter((c) =>
    `${c.texto} ${c.autor}`.toLowerCase().includes(termo)
  );

  return (
    <section className="comentarios">
      <h2 className="secao-titulo">Comentários ({doConteudo.length})</h2>

      <form onSubmit={publicar} noValidate>
        <CampoTexto
          id="novo-comentario"
          tipo="textarea"
          rows={3}
          placeholder="Escreva um comentário sobre este conteúdo..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          erro={erroTexto}
        />
        <Botao type="submit" disabled={enviando}>
          {enviando ? "Publicando..." : "Comentar"}
        </Botao>
      </form>

      {doConteudo.length > 0 && (
        <label className="comentarios__busca">
          <FiSearch />
          <input
            type="search"
            placeholder="Pesquisar nos comentários..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            aria-label="Pesquisar nos comentários"
          />
        </label>
      )}

      {carregando && <p className="mensagem">Carregando comentários...</p>}

      {!carregando && erroLista && (
        <div className="mensagem mensagem--erro">
          <p>{erroLista}</p>
          <button type="button" className="link-botao" onClick={recarregar}>
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando && !erroLista && doConteudo.length === 0 && (
        <p className="mensagem">Ainda não há comentários. Seja a primeira pessoa a comentar!</p>
      )}

      {!carregando && !erroLista && doConteudo.length > 0 && filtrados.length === 0 && (
        <p className="mensagem">Nenhum comentário encontrado.</p>
      )}

      {!carregando &&
        !erroLista &&
        filtrados.map((c) => (
          <article key={c.id} className="comentario">
            <div className="comentario__topo">
              <strong>@{c.autor}</strong>
              <span>
                {new Date(c.criadoEm).toLocaleDateString("pt-BR")}
                {c.editado && " · editado"}
              </span>
            </div>

            {editandoId === c.id ? (
              <>
                <CampoTexto
                  id={`edicao-${c.id}`}
                  tipo="textarea"
                  rows={3}
                  value={textoEdicao}
                  onChange={(e) => setTextoEdicao(e.target.value)}
                  erro={erroEdicao}
                />
                <div className="comentario__acoes">
                  <Botao variante="cinza" pequeno onClick={() => setEditandoId(null)}>
                    Cancelar
                  </Botao>
                  <Botao pequeno onClick={() => salvarEdicao(c)}>
                    Salvar
                  </Botao>
                </div>
              </>
            ) : (
              <p>{c.texto}</p>
            )}

            {c.autorId === usuario.id && editandoId !== c.id && (
              <div className="comentario__acoes">
                <button type="button" onClick={() => iniciarEdicao(c)}>
                  <FiEdit2 /> Editar
                </button>
                <button type="button" className="comentario__excluir" onClick={() => excluir(c)}>
                  <FiTrash2 /> Excluir
                </button>
              </div>
            )}
          </article>
        ))}
    </section>
  );
}

export default Comentarios;
