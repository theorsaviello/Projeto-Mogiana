let quantidadeAtual = 1;

// Dados do produto
const produtoAtual = {
  id: 'boné-oficial',
  name: 'Boné Oficial',
  price: 139.90,
  image: 'images/Boné Oficial.png'
};

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
  inicializarPagina();
});

function inicializarPagina() {
  // Habilitar botões por padrão (não há seleção de tamanho)
  habilitarBotoes();

  // Animação de entrada dos elementos
  const elementos = document.querySelectorAll('.produto-container > *, .avaliacoes');
  elementos.forEach((elemento, index) => {
    elemento.style.opacity = '0';
    elemento.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      elemento.style.transition = 'all 0.6s ease';
      elemento.style.opacity = '1';
      elemento.style.transform = 'translateY(0)';
    }, index * 200);
  });
}

function habilitarBotoes() {
  const botaoComprar = document.querySelector('.botao-comprar');
  const botaoCarrinho = document.querySelector('.botao-carrinho');
  
  if (botaoComprar) {
    botaoComprar.disabled = false;
  }
  if (botaoCarrinho) {
    botaoCarrinho.disabled = false;
  }
}

function trocarImagem(miniatura) {
  const imagemPrincipal = document.getElementById('produto-imagem');
  const miniaturas = document.querySelectorAll('.miniatura');
  
  // Remove classe active de todas as miniaturas
  miniaturas.forEach(m => m.classList.remove('active'));
  
  // Adiciona classe active na miniatura clicada
  miniatura.classList.add('active');
  
  // Troca a imagem principal
  imagemPrincipal.src = miniatura.src;
}

function aumentarQuantidade() {
  quantidadeAtual++;
  document.getElementById('quantidade').textContent = quantidadeAtual;
}

function diminuirQuantidade() {
  if (quantidadeAtual > 1) {
    quantidadeAtual--;
    document.getElementById('quantidade').textContent = quantidadeAtual;
  }
}

function adicionarAoCarrinho() {
  const item = {
    ...produtoAtual,
    quantity: quantidadeAtual
  };

  // Usar função do sistema de carrinho global
  if (typeof addItemToCart === 'function') {
    addItemToCart(item);
    
    // Feedback visual
    const botao = document.querySelector('.botao-carrinho');
    const textoOriginal = botao.textContent;
    botao.textContent = 'Adicionado!';
    botao.style.background = '#28a745';
    
    setTimeout(() => {
      botao.textContent = textoOriginal;
      botao.style.background = '';
    }, 2000);
  } else {
    alert('Produto adicionado ao carrinho!');
  }
}

function comprarProduto() {
  // Adicionar ao carrinho primeiro
  const produto = {
    ...produtoAtual,
    quantity: quantidadeAtual
  };
  
  addItemToCart(produto);
  
  // Redirecionar para página de checkout/carrinho
  setTimeout(() => {
    window.location.href = 'carrinho.html';
  }, 1000);
}