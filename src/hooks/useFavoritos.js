import { toast } from "react-toastify";
import { useUsuario } from "./useUsuario";

export function useFavoritos() {
  const { usuario, atualizar } = useUsuario();
  const favoritos = usuario?.favoritos || [];

  const ehFavorito = (slug) => favoritos.includes(slug);

  async function alternar(slug) {
    const novos = ehFavorito(slug)
      ? favoritos.filter((s) => s !== slug)
      : [...favoritos, slug];
    try {
      await atualizar({ favoritos: novos });
    } catch (erro) {
      toast.error(erro.message);
    }
  }

  return { favoritos, ehFavorito, alternar };
}
