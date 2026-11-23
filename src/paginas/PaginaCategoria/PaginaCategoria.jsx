import { Link, useParams } from "react-router-dom";
import Cabecalho from "../../componentes/Cabecalho/Cabecalho";
import CardConteudo from "../../componentes/CardConteudo/CardConteudo";
import { CATEGORIAS, CONTEUDOS } from "../../dados/conteudos";

function PaginaCategoria() {
  const { slug } = useParams();
  const categoria = CATEGORIAS.find((c) => c.slug === slug);

  if (!categoria) {
    return (
      <main>
        <Cabecalho destino="/home" />
        <p className="mensagem">
          Categoria não encontrada. <Link className="link-rosa" to="/home">Voltar ao início</Link>
        </p>
      </main>
    );
  }

  return (
    <main>
      <Cabecalho destino="/home" titulo={categoria.nome} />
      <div className="tela">
        <p className="subtitulo-tela">{categoria.descricao}</p>
        {CONTEUDOS.filter((c) => c.categoria === slug).map((c) => (
          <CardConteudo key={c.slug} conteudo={c} />
        ))}
      </div>
    </main>
  );
}

export default PaginaCategoria;
