import { useState } from "react";
import { FiSettings, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Botao from "../../componentes/Botao/Botao";
import Cabecalho from "../../componentes/Cabecalho/Cabecalho";
import { CONTEUDOS } from "../../dados/conteudos";
import { useFavoritos } from "../../hooks/useFavoritos";
import { useUsuario } from "../../hooks/useUsuario";
import { validarMedidas } from "../../utils/validacoes";
import "./PaginaPerfil.css";

const MEDIDAS_VAZIAS = { altura: "", peso: "", busto: "", cintura: "", quadril: "" };

const LINHAS = [
  [
    { chave: "altura", rotulo: "Altura", unidade: "cm" },
    { chave: "peso", rotulo: "Peso", unidade: "kg" },
  ],
  [
    { chave: "busto", rotulo: "Busto", unidade: "cm" },
    { chave: "cintura", rotulo: "Cintura", unidade: "cm" },
    { chave: "quadril", rotulo: "Quadril", unidade: "cm" },
  ],
];

function PaginaPerfil() {
  const navigate = useNavigate();
  const { usuario, atualizar, sair } = useUsuario();
  const { favoritos } = useFavoritos();
  const medidasAtuais = { ...MEDIDAS_VAZIAS, ...usuario.medidas };

  const [editando, setEditando] = useState(false);
  const [medidas, setMedidas] = useState(medidasAtuais);
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);

  const salvos = CONTEUDOS.filter((c) => favoritos.includes(c.slug)).slice(0, 4);

  function cancelar() {
    setMedidas(medidasAtuais);
    setErros({});
    setEditando(false);
  }

  async function salvarMedidas() {
    const novosErros = validarMedidas(medidas);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) {
      toast.warn("Corrija as medidas destacadas.");
      return;
    }

    setSalvando(true);
    try {
      await atualizar({ medidas });
      toast.success("Medidas atualizadas com sucesso.");
      setEditando(false);
    } catch (erro) {
      toast.error(erro.message);
    } finally {
      setSalvando(false);
    }
  }

  function sairDaConta() {
    sair();
    navigate("/");
  }

  return (
    <main>
      <Cabecalho
        titulo="Perfil"
        destino="/home"
        acao={
          <button type="button" onClick={() => navigate("/editar-perfil")} aria-label="Configurações">
            <FiSettings />
          </button>
        }
      />
      <div className="banner" />

      <div className="tela">
        <div className="perfil-cabeca">
          <div className="avatar">
            {usuario.foto ? <img src={usuario.foto} alt={usuario.nome} /> : <FiUser />}
          </div>
          <Botao variante="preenchido" pequeno onClick={() => navigate("/editar-perfil")}>
            Editar perfil
          </Botao>
        </div>

        <h2 className="perfil__nome">{usuario.nome}</h2>
        <p className="perfil__usuario">@{usuario.nomeUsuario}</p>
        {usuario.bio && <p className="perfil__bio">{usuario.bio}</p>}
        {usuario.link && (
          <a className="link-rosa perfil__link" href={usuario.link} target="_blank" rel="noreferrer">
            {usuario.link}
          </a>
        )}

        <h2 className="secao-titulo">
          Medidas corporais:
          {editando ? (
            <span className="perfil__edicao">
              <button type="button" onClick={cancelar}>Cancelar</button>
              <button type="button" onClick={salvarMedidas} disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar"}
              </button>
            </span>
          ) : (
            <button type="button" onClick={() => setEditando(true)}>Alterar medidas</button>
          )}
        </h2>
        <div className="perfil__medidas">
          {LINHAS.map((linha, i) => (
            <div key={i} className={linha.length === 2 ? "perfil__linha perfil__linha--dupla" : "perfil__linha"}>
              {linha.map((m) => (
                <div key={m.chave} className="perfil__medida">
                  <span>{m.rotulo}</span>
                  {editando ? (
                    <input
                      type="number"
                      inputMode="decimal"
                      value={medidas[m.chave]}
                      onChange={(e) => setMedidas({ ...medidas, [m.chave]: e.target.value })}
                      aria-label={m.rotulo}
                    />
                  ) : (
                    <strong>
                      {medidasAtuais[m.chave] ? `${medidasAtuais[m.chave]} ${m.unidade}` : "—"}
                    </strong>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        {Object.values(erros).map((mensagem) => (
          <p key={mensagem} className="campo__erro">{mensagem}</p>
        ))}

        <h2 className="secao-titulo">
          Itens salvos: <Link to="/favoritos">Ver todos</Link>
        </h2>
        <div className="perfil__salvos">
          {[0, 1, 2, 3].map((i) =>
            salvos[i] ? (
              <Link key={salvos[i].slug} to={`/conteudo/${salvos[i].slug}`}>
                {salvos[i].titulo}
              </Link>
            ) : (
              <div key={i} />
            )
          )}
        </div>

        <button type="button" className="link-botao perfil__sair" onClick={sairDaConta}>
          Sair da conta
        </button>
      </div>
    </main>
  );
}

export default PaginaPerfil;
