import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import CardConteudo from "../../componentes/CardConteudo/CardConteudo";
import { CATEGORIAS, CONTEUDOS } from "../../dados/conteudos";
import { useUsuario } from "../../hooks/useUsuario";
import "./PaginaPrincipal.css";

function PaginaPrincipal() {
  const navigate = useNavigate();
  const { usuario } = useUsuario();
  const [busca, setBusca] = useState("");

  const inicio = Math.floor(Date.now() / 86400000) % CONTEUDOS.length;
  const destaques = [0, 1, 2].map((i) => CONTEUDOS[(inicio + i) % CONTEUDOS.length]);

  function pesquisar(evento) {
    evento.preventDefault();
    navigate(`/explorar?busca=${encodeURIComponent(busca)}`);
  }

  return (
    <main className="tela principal">
      <h1 className="principal__logo">Fashion Archive</h1>
      <p className="principal__ola">Olá, {usuario.nome}!</p>
      <p>Explore o universo da moda.</p>

      <form className="principal__busca" onSubmit={pesquisar}>
        <FiSearch />
        <input
          type="search"
          placeholder="Pesquisar no Fashion Archive..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          aria-label="Pesquisar"
        />
      </form>

      <h2 className="secao-titulo">Categorias</h2>
      <div className="principal__categorias">
        {CATEGORIAS.map((categoria) => (
          <Link key={categoria.slug} to={`/categoria/${categoria.slug}`}>
            {categoria.nome}
          </Link>
        ))}
      </div>

      <h2 className="secao-titulo">
        Destaques <Link to="/explorar">Ver todos</Link>
      </h2>
      <div className="principal__destaques">
        {destaques.map((conteudo) => (
          <CardConteudo key={conteudo.slug} conteudo={conteudo} />
        ))}
      </div>
    </main>
  );
}

export default PaginaPrincipal;
