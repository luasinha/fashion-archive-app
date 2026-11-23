# Fashion Archive

PWA em React: enciclopédia de moda (peças, tecidos, modelagens, corpo e história da moda). O CRUD é feito nos **comentários** de cada conteúdo: cadastrar, listar, pesquisar, editar e excluir, tudo pela API da empresa.

## Como rodar

1. Copie `.env.example` para `.env` e preencha `VITE_API_URL` e `VITE_API_SECRET`.
2. `npm install` e depois `npm install vite-plugin-pwa`
3. `npm run dev` e abra `http://localhost:5173`

## Estrutura

- `src/paginas`: telas do Figma (início, login, cadastro, principal, perfil, edição de perfil) e as telas de navegação
- `src/componentes`: Cabecalho, Rodape, LayoutComRodape, CampoTexto, Botao, CardConteudo e Comentarios
- `src/servicos`: `api.servico.js`, `usuarios.servico.js`, `comentarios.servico.js` e `localstorage.servico.js`
- `src/contextos` e `src/hooks`: usuário logado e favoritos
- `src/utils`: validações e redução de imagem
- `src/dados`: conteúdos e categorias
- `public`: ícones do PWA (o manifest e o service worker são gerados pelo `vite-plugin-pwa`, configurado no `vite.config.js`)

## API

A API é usada em dois recursos: `usuarios` e `comentarios` (`GET`, `POST`, `PUT` e `DELETE`). O secret é enviado no cabeçalho `x-api-secret`. Para alterar isso, edite apenas `src/servicos/api.servico.js`.

O `localStorage` guarda somente o identificador de quem está logado (`usuarioLogado`), como na aula. Todos os registros ficam na API.

## PWA

Configurado com `vite-plugin-pwa` no `vite.config.js`. Para testar: `npm run dev`, ou `npm run build` e `npm run preview`. Abra no Chrome e use o ícone de instalar na barra de endereço.
