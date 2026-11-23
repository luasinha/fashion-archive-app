# Fashion Archive

PWA em React: enciclopédia de moda (peças, tecidos, modelagens, corpo e história da moda). O CRUD é feito nos **comentários** de cada conteúdo: cadastrar, listar, pesquisar, editar e excluir. Os dados ficam no `localStorage`, como combinado com o professor.

## Como rodar

1. `npm install`
2. `npm run dev` e abra `http://localhost:5173`

## Estrutura

- `src/paginas`: telas do Figma (início, login, cadastro, principal, perfil, edição de perfil) e as telas de navegação
- `src/componentes`: Cabecalho, Rodape, LayoutComRodape, ValidarAutenticacao, CampoTexto, Botao, CardConteudo e Comentarios
- `src/servicos`: `usuarios.servico.js`, `comentarios.servico.js` e `localstorage.servico.js`
- `src/contextos` e `src/hooks`: usuário logado e favoritos
- `src/utils`: validações e redução de imagem
- `src/dados`: conteúdos e categorias
- `public`: ícones do PWA (manifest e service worker gerados pelo `vite-plugin-pwa`)

## PWA

Configurado com `vite-plugin-pwa` no `vite.config.js`. Para testar: `npm run build` e `npm run preview`, abra no Chrome e use o ícone de instalar na barra de endereço.
