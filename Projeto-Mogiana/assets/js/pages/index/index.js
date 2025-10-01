// Lista de produtos e links
const produtos = [
  { nome: "Camisa Oficial 1", link: "camisaoficial.html" },
  { nome: "Jaqueta Oficial", link: "JaquetaOficial.html" },
  { nome: "Garrafinha Térmica Oficial", link: "GarrafinhaTérmicaOficial.html" },
  { nome: "Boné Oficial", link: "BonéOficial.html" }
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

    resultados.forEach(p => {
      const li = document.createElement("li");
      li.textContent = p.nome;
      li.addEventListener("click", () => {
        window.location.href = p.link;
      });
      suggestions.appendChild(li);
    });
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


