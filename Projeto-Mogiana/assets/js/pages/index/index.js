// Lista de produtos e links 
const produtos = [
  { nome: "Camisa Oficial 1", link: "PaginaCamisa1.html" },
  { nome: "Camisa Oficial 2", link: "PaginaCamisa2.html" },
  { nome: "Jaqueta Oficial", link: "PaginaJaqueta.html" },
  { nome: "Garrafinha Térmica Oficial", link: "PaginaGarrafinha.html" },
  { nome: "Boné Oficial", link: "PaginaBoné.html" }
];

const searchInput = document.getElementById("search");
const suggestions = document.getElementById("suggestions");

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