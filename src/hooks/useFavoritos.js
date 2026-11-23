import { useUsuario } from "./useUsuario";

export function useFavoritos() {
  const { usuario, atualizar } = useUsuario();
  const favoritos = usuario?.favoritos || [];

  const ehFavorito = (slug) => favoritos.includes(slug);

  function alternar(slug) {
    const novos = ehFavorito(slug)
      ? favoritos.filter((s) => s !== slug)
      : [...favoritos, slug];
    atualizar({ favoritos: novos });
  }

  return { favoritos, ehFavorito, alternar };
}
