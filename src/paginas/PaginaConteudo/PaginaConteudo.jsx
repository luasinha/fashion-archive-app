import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Cabecalho from "../../componentes/Cabecalho/Cabecalho";
import Comentarios from "../../componentes/Comentarios/Comentarios";
import { CONTEUDOS, nomeCategoria } from "../../dados/conteudos";
import { useFavoritos } from "../../hooks/useFavoritos";
import "./PaginaConteudo.css";

function PaginaConteudo() {
  const { slug } = useParams();
  const { ehFavorito, alternar } = useFavoritos();
  const conteudo = CONTEUDOS.find((c) => c.slug === slug);

  if (!conteudo) {
    return (
      <main>
        <Cabecalho />
        <p className="mensagem">
          Conteúdo não encontrado. <Link className="link-rosa" to="/explorar">Explorar conteúdos</Link>
        </p>
      </main>
    );
  }

  const favorito = ehFavorito(slug);
  const relacionados = conteudo.relacionados
    .map((s) => CONTEUDOS.find((c) => c.slug === s))
    .filter(Boolean);

  return (
    <main>
      <Cabecalho destino={`/categoria/${conteudo.categoria}`} />
      <div className="tela">
        <p className="conteudo__categoria">
          <Link to={`/categoria/${conteudo.categoria}`}>{nomeCategoria(conteudo.categoria)}</Link>
        </p>
        <h1 className="conteudo__titulo">{conteudo.titulo}</h1>
        <button type="button" className="conteudo__favorito" onClick={() => alternar(slug)}>
          {favorito ? <FaHeart /> : <FiHeart />} {favorito ? "Nos favoritos" : "Favoritar"}
        </button>

        <p className="conteudo__resumo">{conteudo.resumo}</p>

        {conteudo.secoes.map((secao) => (
          <section key={secao.titulo} className="conteudo__secao">
            <h2>{secao.titulo}</h2>
            <p>{secao.texto}</p>
          </section>
        ))}

        {relacionados.length > 0 && (
          <section className="conteudo__secao">
            <h2>Veja também</h2>
            <ul>
              {relacionados.map((r) => (
                <li key={r.slug}>
                  <Link className="link-rosa" to={`/conteudo/${r.slug}`}>{r.titulo}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <Comentarios slug={slug} />
      </div>
    </main>
  );
}

export default PaginaConteudo;
