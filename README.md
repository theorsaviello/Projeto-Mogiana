# 🛒 Projeto Mogiana

Um projeto de e-commerce **totalmente funcional** desenvolvido como estudo de caso, simulando a loja oficial do **Clube Atlético Mogiana** (time fictício). O objetivo é aplicar conceitos de desenvolvimento web front-end para criar uma plataforma de vendas online interativa e completa, utilizando apenas **HTML, CSS e JavaScript puro**.

O sistema utiliza o `localStorage` do navegador para gerenciar todas as informações, incluindo sessões de usuário, carrinhos de compras e cadastros, proporcionando uma experiência persistente e dinâmica sem a necessidade de um back-end.

---

## 📌 Funcionalidades Implementadas

- **Página Inicial Dinâmica:** Exibe os principais produtos da loja com acesso rápido às páginas de detalhes.

- **Sistema de Login e Cadastro:**
  - Permite que usuários criem contas e acessem seus perfis.
  - Utiliza `localStorage` para persistir os dados dos usuários de forma segura no navegador.
  - O cabeçalho se adapta dinamicamente, exibindo o nome do usuário logado e a opção de logout.

- **Carrinho de Compras Inteligente:**
  - Adição, remoção e atualização de quantidade de itens.
  - O carrinho é salvo no `localStorage`, persistindo entre sessões.
  - **Carrinho de Convidado:** Visitantes podem adicionar itens ao carrinho antes de fazer login.
  - **Fusão de Carrinhos:** Ao fazer login, o carrinho de convidado é automaticamente mesclado ao carrinho do usuário.

- **Catálogo de Produtos e Categorias:**
  - Páginas dedicadas para cada categoria de produto (Camisas, Casacos, etc.).
  - Páginas de detalhes para cada item, com descrição, seleção de tamanho e quantidade.

- **Personalização de Produtos:**
  - Uma página exclusiva para a **Camisa Personalizável**, onde o usuário pode escolher cores e padrões, com a imagem do produto sendo atualizada em tempo real.

- **Busca de Produtos:**
  - Barra de pesquisa no cabeçalho com sugestões de autocompletar, permitindo encontrar produtos facilmente.

---

## 🏗️ Estrutura do Projeto

O projeto é organizado de forma modular, separando arquivos HTML, CSS e JavaScript por funcionalidade.

```
/Projeto-Mogiana/assets/
├── css/
│   ├── global/       # Estilos globais (header, carrinho, etc.)
│   └── pages/        # Estilos específicos para cada página
├── images/           # Imagens dos produtos e logo
├── js/
│   ├── global/       # Scripts globais (cart-system.js, header.js)
│   └── pages/        # Scripts específicos para cada página
├── *.html            # Arquivos HTML para cada página da loja
```

---

## 🚀 Tecnologias Utilizadas

- **HTML5:** Estrutura semântica de todas as páginas.
- **CSS3:** Estilização moderna e responsiva, com organização modular.
- **JavaScript (ES6+):** Lógica de interatividade, manipulação do DOM e gerenciamento de estado (login, carrinho) via `localStorage`.

---

## 📌 Próximos Passos

- [X] Finalizar a **página inicial** com layout responsivo e destaques de produtos.
- [X] Criar a **página de login e cadastro** com validação de formulários e persistência no `localStorage`.
- [X] Implementar a **página do carrinho de compras** com gerenciamento completo de itens.
- [X] Criar páginas individuais para cada **produto**, com seleção de tamanho e quantidade.
- [X] Adicionar sistema de **busca de produtos** com autocompletar.
- [X] Implementar **páginas de categorias** para filtrar produtos.
- [X] Desenvolver a funcionalidade de **personalização de camisa** com atualização de imagem em tempo real.
- [ ] Desenvolver a **página de pedidos** para exibir o histórico de compras do usuário.
- [ ] Criar a área de **perfil do usuário** para gerenciar dados pessoais.
- [ ] Integrar com uma **API de pagamentos** para finalizar as compras.
- [ ] Migrar o armazenamento de dados para um **banco de dados** com um back-end dedicado.

---

## 👨‍💻 Autores

**Theo Saviello** e **Renan Henrique**

*Este é um projeto acadêmico e pessoal para estudo de desenvolvimento web front-end.*
