import { useState } from "react";
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
  const [comentarios, setComentarios] = useState(listarComentarios);
  const [busca, setBusca] = useState("");
  const [texto, setTexto] = useState("");
  const [erroTexto, setErroTexto] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [textoEdicao, setTextoEdicao] = useState("");
  const [erroEdicao, setErroEdicao] = useState("");

  function publicar(evento) {
    evento.preventDefault();
    const erro = validarComentario(texto);
    setErroTexto(erro);
    if (erro) return;

    salvarComentario({
      conteudo: slug,
      autorId: usuario.id,
      autor: usuario.nomeUsuario,
      texto: texto.trim(),
      criadoEm: new Date().toISOString(),
    });
    toast.success("Comentário publicado com sucesso.");
    setTexto("");
    setComentarios(listarComentarios());
  }

  function iniciarEdicao(comentario) {
    setEditandoId(comentario.id);
    setTextoEdicao(comentario.texto);
    setErroEdicao("");
  }

  function salvarEdicao(comentario) {
    const erro = validarComentario(textoEdicao);
    setErroEdicao(erro);
    if (erro) return;

    salvarComentario({ ...comentario, texto: textoEdicao.trim(), editado: true });
    toast.success("Comentário atualizado com sucesso.");
    setEditandoId(null);
    setComentarios(listarComentarios());
  }

  function excluir(comentario) {
    if (!window.confirm("Deseja realmente excluir este comentário?")) return;
    excluirComentario(comentario.id);
    toast.success("Comentário excluído com sucesso.");
    setComentarios(listarComentarios());
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
        <Botao type="submit">Comentar</Botao>
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

      {doConteudo.length === 0 && (
        <p className="mensagem">Ainda não há comentários. Seja a primeira pessoa a comentar!</p>
      )}

      {doConteudo.length > 0 && filtrados.length === 0 && (
        <p className="mensagem">Nenhum comentário encontrado.</p>
      )}

      {filtrados.map((c) => (
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
