import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import CardConteudo from "../../componentes/CardConteudo/CardConteudo";
import { CATEGORIAS, CONTEUDOS } from "../../dados/conteudos";
import "./PaginaExplorar.css";

function PaginaExplorar() {
  const [parametros, setParametros] = useSearchParams();
  const busca = parametros.get("busca") || "";
  const categoria = parametros.get("categoria") || "";

  const termo = busca.toLowerCase();
  const filtrados = CONTEUDOS.filter(
    (c) =>
      (!categoria || c.categoria === categoria) &&
      `${c.titulo} ${c.resumo} ${c.secoes.map((s) => s.texto).join(" ")}`
        .toLowerCase()
        .includes(termo)
  );

  function atualizarFiltro(chave, valor) {
    const novos = new URLSearchParams(parametros);
    if (valor) novos.set(chave, valor);
    else novos.delete(chave);
    setParametros(novos, { replace: true });
  }

  return (
    <main className="tela">
      <h1 className="titulo-tela">Explorar</h1>

      <label className="explorar__busca">
        <FiSearch />
        <input
          type="search"
          placeholder="Pesquisar no Fashion Archive..."
          value={busca}
          onChange={(e) => atualizarFiltro("busca", e.target.value)}
          aria-label="Pesquisar"
        />
      </label>

      <div className="explorar__chips">
        <button
          type="button"
          className={!categoria ? "chip chip--ativo" : "chip"}
          onClick={() => atualizarFiltro("categoria", "")}
        >
          Todos
        </button>
        {CATEGORIAS.map((c) => (
          <button
            key={c.slug}
            type="button"
            className={categoria === c.slug ? "chip chip--ativo" : "chip"}
            onClick={() => atualizarFiltro("categoria", c.slug)}
          >
            {c.nome}
          </button>
        ))}
      </div>

      {filtrados.length === 0 ? (
        <p className="mensagem">Nenhum conteúdo encontrado.</p>
      ) : (
        filtrados.map((c) => <CardConteudo key={c.slug} conteudo={c} />)
      )}
    </main>
  );
}

export default PaginaExplorar;
