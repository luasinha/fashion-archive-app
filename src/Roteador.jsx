import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import ValidarAutenticacao from "./componentes/ValidarAutenticacao/ValidarAutenticacao";
import LayoutComRodape from "./componentes/LayoutComRodape/LayoutComRodape";
import PaginaInicio from "./paginas/PaginaInicio/PaginaInicio";
import PaginaLogin from "./paginas/PaginaLogin/PaginaLogin";
import PaginaCadastro from "./paginas/PaginaCadastro/PaginaCadastro";
import PaginaPrincipal from "./paginas/PaginaPrincipal/PaginaPrincipal";
import PaginaExplorar from "./paginas/PaginaExplorar/PaginaExplorar";
import PaginaSobre from "./paginas/PaginaSobre/PaginaSobre";
import PaginaFavoritos from "./paginas/PaginaFavoritos/PaginaFavoritos";
import PaginaPerfil from "./paginas/PaginaPerfil/PaginaPerfil";
import PaginaEdicaoPerfil from "./paginas/PaginaEdicaoPerfil/PaginaEdicaoPerfil";
import PaginaCategoria from "./paginas/PaginaCategoria/PaginaCategoria";
import PaginaConteudo from "./paginas/PaginaConteudo/PaginaConteudo";

const roteador = createBrowserRouter([
  {
    path: "",
    element: <PaginaInicio />,
  },
  {
    path: "login",
    element: <PaginaLogin />,
  },
  {
    path: "cadastro",
    element: <PaginaCadastro />,
  },
  {
    element: <ValidarAutenticacao />,
    children: [
      {
        element: <LayoutComRodape />,
        children: [
          { path: "home", element: <PaginaPrincipal /> },
          { path: "explorar", element: <PaginaExplorar /> },
          { path: "sobre", element: <PaginaSobre /> },
          { path: "favoritos", element: <PaginaFavoritos /> },
          { path: "perfil", element: <PaginaPerfil /> },
          { path: "editar-perfil", element: <PaginaEdicaoPerfil /> },
          { path: "categoria/:slug", element: <PaginaCategoria /> },
          { path: "conteudo/:slug", element: <PaginaConteudo /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

function Roteador() {
  return <RouterProvider router={roteador} />;
}

export default Roteador;
