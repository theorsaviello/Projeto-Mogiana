// Exemplo de alerta ao clicar em "Comprar"
document.querySelectorAll(".botao").forEach(botao => {
  botao.addEventListener("click", () => {
    alert("Produto adicionado ao carrinho!");
  });
});
