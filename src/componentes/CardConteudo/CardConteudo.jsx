import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { nomeCategoria } from "../../dados/conteudos";
import { useFavoritos } from "../../hooks/useFavoritos";
import "./CardConteudo.css";

function CardConteudo({ conteudo }) {
  const { ehFavorito, alternar } = useFavoritos();
  const favorito = ehFavorito(conteudo.slug);

  return (
    <article className="card-conteudo">
      <div className="card-conteudo__topo">
        <div>
          <p className="card-conteudo__categoria">{nomeCategoria(conteudo.categoria)}</p>
          <h3>
            <Link to={`/conteudo/${conteudo.slug}`}>{conteudo.titulo}</Link>
          </h3>
        </div>
        <button
          type="button"
          className="card-conteudo__favorito"
          onClick={() => alternar(conteudo.slug)}
          aria-label={favorito ? "Remover dos favoritos" : "Favoritar"}
        >
          {favorito ? <FaHeart /> : <FiHeart />}
        </button>
      </div>
      <p>{conteudo.resumo}</p>
    </article>
  );
}

export default CardConteudo;
