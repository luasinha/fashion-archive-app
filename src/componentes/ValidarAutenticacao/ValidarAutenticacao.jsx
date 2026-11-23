import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUsuario } from "../../hooks/useUsuario";

function ValidarAutenticacao() {
  const navigate = useNavigate();
  const { usuario } = useUsuario();

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
    }
  }, [usuario, navigate]);

  return usuario ? <Outlet /> : null;
}

export default ValidarAutenticacao;
