import "./Botao.css";

function Botao({ children, variante = "preenchido", pequeno = false, type = "button", ...props }) {
  const classes = `botao botao--${variante}${pequeno ? " botao--pequeno" : ""}`;
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

export default Botao;
