import { Outlet } from "react-router-dom";
import Rodape from "../Rodape/Rodape";
import "./LayoutComRodape.css";

function LayoutComRodape() {
  return (
    <div className="layout">
      <div className="layout__conteudo">
        <Outlet />
      </div>
      <Rodape />
    </div>
  );
}

export default LayoutComRodape;
