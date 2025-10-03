// JavaScript específico para página da Camisa 1

let tamanhoSelecionado = '';
let quantidadeAtual = 1;

// Dados do produto
const produtoAtual = {
  id: 'camisa-oficial-1',
  name: 'Camisa Oficial 1',
  price: 349.99,
  image: 'images/Camisa Oficial 1.png'
};

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
  inicializarPagina();
});

function inicializarPagina() {
  // Configurar seleção de tamanhos
  const botoesTamanho = document.querySelectorAll('.tamanho');
  const sizeWarning = document.getElementById('size-warning');
  
  botoesTamanho.forEach(botao => {
    botao.addEventListener('click', function() {
      // Remove seleção anterior
      botoesTamanho.forEach(b => b.classList.remove('selected'));
      // Adiciona seleção atual
      this.classList.add('selected');
      tamanhoSelecionado = this.dataset.tamanho;
      
      // Esconder aviso de tamanho
      if (sizeWarning) {
        sizeWarning.classList.remove('show');
      }
      
      // Habilitar botões
      habilitarBotoes();
    });
  });

  // Desabilitar botões inicialmente
  desabilitarBotoes();

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

function desabilitarBotoes() {
  const botaoComprar = document.querySelector('.botao-comprar');
  const botaoCarrinho = document.querySelector('.botao-carrinho');
  
  if (botaoComprar) {
    botaoComprar.disabled = true;
  }
  if (botaoCarrinho) {
    botaoCarrinho.disabled = true;
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
  if (!tamanhoSelecionado) {
    mostrarAvisoTamanho();
    return;
  }

  const item = {
    ...produtoAtual,
    size: tamanhoSelecionado,
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
  if (!tamanhoSelecionado) {
    mostrarAvisoTamanho();
    return;
  }

  // Adicionar ao carrinho primeiro
  const produto = {
    ...produtoAtual,
    size: tamanhoSelecionado,
    quantity: quantidadeAtual
  };
  
  addItemToCart(produto);
  
  // Redirecionar para página de checkout/carrinho
  setTimeout(() => {
    window.location.href = 'carrinho.html';
  }, 1000);
}

function mostrarAvisoTamanho() {
  const sizeWarning = document.getElementById('size-warning');
  if (sizeWarning) {
    sizeWarning.classList.add('show');
    
    // Esconder aviso após 3 segundos
    setTimeout(() => {
      sizeWarning.classList.remove('show');
    }, 3000);
  }
}