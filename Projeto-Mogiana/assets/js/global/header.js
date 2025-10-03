// Funcionalidade compartilhada do header para todas as páginas

// Lista de produtos e links 
const produtos = [
  { nome: "Camisa Oficial 1", link: "PaginaCamisa1.html" },
  { nome: "Camisa Oficial 2", link: "PaginaCamisa2.html" },
  { nome: "Camisa Oficial 3", link: "PaginaCamisa3.html" },
  { nome: "Jaqueta Oficial", link: "PaginaJaqueta.html" },
  { nome: "Garrafinha Térmica Oficial", link: "PaginaGarrafinha.html" },
  { nome: "Boné Oficial", link: "PaginaBoné.html" }
];

// Inicializar funcionalidade do header quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  initializeHeader();
});

function initializeHeader() {
  const searchInput = document.getElementById("search");
  const suggestions = document.getElementById("suggestions");

  if (searchInput && suggestions) {
    // Função para mostrar sugestões enquanto digita
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      suggestions.innerHTML = "";

      if (query.length > 0) {
        const resultados = produtos.filter(p =>
          p.nome.toLowerCase().includes(query)
        );

        if (resultados.length > 0) {
          resultados.forEach(p => {
            const li = document.createElement("li");
            li.textContent = p.nome;
            li.addEventListener("click", () => {
              window.location.href = p.link;
            });
            suggestions.appendChild(li);
          });
          suggestions.style.display = "block"; // mostra sugestões
        } else {
          suggestions.style.display = "none"; // sem resultados → esconde
        }
      } else {
        suggestions.style.display = "none"; // input vazio → esconde
      }
    });

    // Pressionar Enter para pesquisar
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.toLowerCase();
        const produto = produtos.find(p =>
          p.nome.toLowerCase().includes(query)
        );
        if (produto) {
          window.location.href = produto.link;
        } else {
          alert("Produto não encontrado!");
        }
      }
    });

    // Esconder sugestões ao clicar fora
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.style.display = "none";
      }
    });
  }

  // Efeito de encolher header ao rolar
  window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    const body = document.querySelector("body");
    if (window.scrollY > 50) {
      header.classList.add("shrink");
      body.classList.add("shrink-padding");
    } else {
      header.classList.remove("shrink");
      body.classList.remove("shrink-padding");
    }
  });

  // Funcionalidade das categorias
  const categorias = document.querySelectorAll('.categorias span');
  categorias.forEach(categoria => {
    categoria.addEventListener('click', function() {
      const texto = this.textContent.toLowerCase();
      
      // Redirecionar para a página inicial com filtro (pode ser implementado depois)
      if (texto.includes('camisa')) {
        // Filtrar camisas na página inicial
        window.location.href = 'index.html#camisas';
      } else if (texto.includes('casaco') || texto.includes('jaqueta')) {
        window.location.href = 'index.html#casacos';
      } else if (texto.includes('garrafa')) {
        window.location.href = 'index.html#garrafas';
      } else if (texto.includes('boné')) {
        window.location.href = 'index.html#bones';
      }
    });
  });
}

// Função para criar o HTML do header
function createHeaderHTML() {
  return `
    <div class="topo">
      <!-- Barra de pesquisa -->
      <div class="search-container">
        <input type="text" id="search" placeholder="Pesquisar produto..." autocomplete="off"/>
        <ul id="suggestions"></ul>
      </div>

      <!-- Logo -->
      <img src="images/LogoLoja.png" alt="Logo da Loja" class="logo">

      <!-- Links de login/cadastro/carrinho -->
      <div class="auth-links">
        <a href="cadastro.html">CADASTRE-SE</a> | 
        <a href="login.html">INICIAR SESSÃO</a>
        <a href="carrinho.html" class="carrinho">🛒</a>
      </div>
    </div>

    <!-- Faixa azul -->
    <div class="faixa"></div>

    <!-- Categorias -->
    <nav class="categorias">
      <span>Camisas</span>
      <span>Casacos</span>
      <span>Garrafas</span>
      <span>Bonés</span>
    </nav>
  `;
}