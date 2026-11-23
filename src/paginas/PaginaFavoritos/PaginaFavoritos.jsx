import { Link } from "react-router-dom";
import CardConteudo from "../../componentes/CardConteudo/CardConteudo";
import { CONTEUDOS } from "../../dados/conteudos";
import { useFavoritos } from "../../hooks/useFavoritos";

function PaginaFavoritos() {
  const { favoritos } = useFavoritos();
  const conteudos = CONTEUDOS.filter((c) => favoritos.includes(c.slug));

  return (
    <main className="tela">
      <h1 className="titulo-tela">Favoritos</h1>
      <p className="subtitulo-tela">Os conteúdos que você salvou.</p>
      {conteudos.length === 0 ? (
        <p className="mensagem">
          Você ainda não favoritou nada. <Link className="link-rosa" to="/explorar">Explorar conteúdos</Link>
        </p>
      ) : (
        conteudos.map((c) => <CardConteudo key={c.slug} conteudo={c} />)
      )}
    </main>
  );
}

export default PaginaFavoritos;
