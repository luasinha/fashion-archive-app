import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import "./CampoTexto.css";

function CampoTexto({ id, rotulo, tipo = "text", erro, opcoes = [], ...props }) {
  const [visivel, setVisivel] = useState(false);
  const ehSenha = tipo === "password";
  let controle;

  if (tipo === "textarea") {
    controle = <textarea id={id} {...props} />;
  } else if (tipo === "select") {
    controle = (
      <select id={id} {...props}>
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.rotulo}
          </option>
        ))}
      </select>
    );
  } else {
    controle = <input id={id} type={ehSenha && visivel ? "text" : tipo} {...props} />;
  }

  const classes = ["campo"];
  if (erro) classes.push("campo--erro");
  if (ehSenha) classes.push("campo--senha");

  return (
    <div className={classes.join(" ")}>
      {rotulo && <label htmlFor={id}>{rotulo}</label>}
      <div className="campo__caixa">
        {ehSenha && <FiLock className="campo__icone" />}
        {controle}
        {ehSenha && (
          <button
            type="button"
            className="campo__olho"
            onClick={() => setVisivel(!visivel)}
            aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
          >
            {visivel ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      {erro && <span className="campo__erro">{erro}</span>}
    </div>
  );
}

export default CampoTexto;
