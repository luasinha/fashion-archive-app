export function reduzirImagem(arquivo, tamanho = 200) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onerror = () => reject(new Error("Não foi possível ler a imagem."));
    leitor.onload = () => {
      const imagem = new Image();
      imagem.onerror = () => reject(new Error("Arquivo de imagem inválido."));
      imagem.onload = () => {
        const lado = Math.min(imagem.width, imagem.height);
        const canvas = document.createElement("canvas");
        canvas.width = tamanho;
        canvas.height = tamanho;
        canvas
          .getContext("2d")
          .drawImage(
            imagem,
            (imagem.width - lado) / 2,
            (imagem.height - lado) / 2,
            lado,
            lado,
            0,
            0,
            tamanho,
            tamanho
          );
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      imagem.src = leitor.result;
    };
    leitor.readAsDataURL(arquivo);
  });
}
