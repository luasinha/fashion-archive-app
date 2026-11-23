import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
import UsuarioProvider from "./contextos/UsuarioProvider";
import Roteador from "./Roteador";

function App() {
  return (
    <UsuarioProvider>
      <Roteador />
      <ToastContainer position="top-center" autoClose={3500} />
    </UsuarioProvider>
  );
}

export default App;
