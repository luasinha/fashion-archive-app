import { Navigate, useNavigate } from "react-router-dom";
import Botao from "../../componentes/Botao/Botao";
import { useUsuario } from "../../hooks/useUsuario";
import "./PaginaInicio.css";

function PaginaInicio() {
  const navigate = useNavigate();
  const { usuario, carregando } = useUsuario();

  if (!carregando && usuario) {
    return <Navigate to="/home" replace />;
  }

  return (
    <main className="inicio">
      <div className="inicio__marca">
        <h1>
          FASHION
          <br />
          ARCHIVE
        </h1>
        <p>Seu arquivo de moda.</p>
      </div>

      <div className="inicio__acoes">
        <p>
          Explore a história, os estilos e os conceitos que moldam o universo da moda.
        </p>
        <Botao onClick={() => navigate("/login")}>Entrar</Botao>
        <Botao variante="contorno" onClick={() => navigate("/cadastro")}>
          Cadastrar
        </Botao>
      </div>
    </main>
  );
}

export default PaginaInicio;
