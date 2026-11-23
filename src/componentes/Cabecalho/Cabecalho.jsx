import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Cabecalho.css";

function Cabecalho({ titulo, destino, acao }) {
  const navigate = useNavigate();

  return (
    <header className="cabecalho">
      <button
        type="button"
        className="cabecalho__voltar"
        onClick={() => (destino ? navigate(destino) : navigate(-1))}
        aria-label="Voltar"
      >
        <FiArrowLeft />
      </button>
      <h1>{titulo}</h1>
      <div className="cabecalho__acao">{acao}</div>
    </header>
  );
}

export default Cabecalho;
