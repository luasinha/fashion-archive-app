import { FiHeart, FiHelpCircle, FiHome, FiSearch, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import "./Rodape.css";

const ITENS = [
  { para: "/home", rotulo: "Início", icone: <FiHome /> },
  { para: "/explorar", rotulo: "Explorar", icone: <FiSearch /> },
  { para: "/sobre", rotulo: "Sobre", icone: <FiHelpCircle /> },
  { para: "/favoritos", rotulo: "Favoritos", icone: <FiHeart /> },
  { para: "/perfil", rotulo: "Perfil", icone: <FiUser /> },
];

function Rodape() {
  return (
    <nav className="rodape">
      {ITENS.map((item) => (
        <NavLink key={item.para} to={item.para} className="rodape__item">
          {item.icone}
          <span>{item.rotulo}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default Rodape;
