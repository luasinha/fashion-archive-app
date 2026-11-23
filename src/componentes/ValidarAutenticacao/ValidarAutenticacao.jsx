import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUsuario } from "../../hooks/useUsuario";

function ValidarAutenticacao() {
  const navigate = useNavigate();
  const { usuario, carregando } = useUsuario();

  useEffect(() => {
    if (!carregando && !usuario) {
      navigate("/login");
    }
  }, [carregando, usuario, navigate]);

  if (carregando) {
    return <main className="carregando">Carregando...</main>;
  }

  return usuario ? <Outlet /> : null;
}

export default ValidarAutenticacao;
