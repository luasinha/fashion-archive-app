import { useContext } from "react";
import { UsuarioContexto } from "../contextos/UsuarioContexto";

export function useUsuario() {
  return useContext(UsuarioContexto);
}
