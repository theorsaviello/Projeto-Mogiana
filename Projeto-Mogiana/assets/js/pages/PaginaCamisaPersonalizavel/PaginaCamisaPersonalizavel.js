/**
 * JavaScript para Camisa Personalizável
 * 
 * Convenção de nomenclatura das imagens:
 * CamisaPersonalizavel<CorPrincipal><CorSecundaria><Padrao>.png
 * 
 * Exemplos:
 * - CamisaPersonalizavelAzulPretoVerticais.png
 * - CamisaPersonalizavelDouradoAzulCurva.png
 */

let tamanhoSelecionado = '';
let quantidadeAtual = 1;

// Configurações de personalização atuais
let personalizacaoAtual = {
  corPrincipal: 'Azul',
  corSecundaria: 'Preto', 
  padrao: 'Verticais'
};

// Dados do produto
const produtoAtual = {
  id: 'camisa-personalizavel',
  name: 'Camisa Personalizável',
  price: 349.99,
  image: 'images/CamisaPersonalizavelAzulPretoVerticais.png'
};

// Mapeamento dos valores para normalização dos nomes de arquivo
const normalizacaoValores = {
  // Cores
  'Azul': 'Azul',
  'Preto': 'Preto', 
  'Dourado': 'Dourado',
  // Padrões
  'Verticais': 'Verticais',
  'Horizontal': 'Horizontal',
  'Curva': 'Curva'
};

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
  inicializarPagina();
});

function inicializarPagina() {
  console.log('Inicializando página de camisa personalizável...');
  
  // Configurar seleção de tamanhos
  configurarSelecaoTamanhos();
  
  // Configurar opções de personalização
  configurarPersonalizacao();
  
  // Desabilitar botões inicialmente
  desabilitarBotoes();
  
  // Aplicar animações de entrada
  aplicarAnimacoes();
  
  // Atualizar imagem inicial
  atualizarImagemProduto();
}

function configurarSelecaoTamanhos() {
  const botoesTamanho = document.querySelectorAll('.tamanho');
  const sizeWarning = document.getElementById('size-warning');
  
  botoesTamanho.forEach(botao => {
    botao.addEventListener('click', function() {
      // Remove seleção anterior
      botoesTamanho.forEach(b => b.classList.remove('selected'));
      // Adiciona seleção atual
      this.classList.add('selected');
      tamanhoSelecionado = this.dataset.tamanho;
      
      console.log('Tamanho selecionado:', tamanhoSelecionado);
      
      // Esconder aviso de tamanho
      if (sizeWarning) {
        sizeWarning.classList.remove('show');
      }
      
      // Habilitar botões
      habilitarBotoes();
    });
  });
}

function configurarPersonalizacao() {
  // Configurar listeners para cada grupo de personalização
  configurarGrupoPersonalizacao('cor-principal', 'corPrincipal');
  configurarGrupoPersonalizacao('cor-secundaria', 'corSecundaria');
  configurarGrupoPersonalizacao('padrao', 'padrao');
}

function configurarGrupoPersonalizacao(nomeGrupo, propriedade) {
  const radios = document.querySelectorAll(`input[name="${nomeGrupo}"]`);
  
  radios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        personalizacaoAtual[propriedade] = this.value;
        console.log(`${propriedade} alterado para:`, this.value);
        console.log('Personalização atual:', personalizacaoAtual);
        
        // Atualizar imagem do produto
        atualizarImagemProduto();
      }
    });
  });
}

function atualizarImagemProduto() {
  const nomeArquivo = gerarNomeArquivo();
  const caminhoImagem = `images/${nomeArquivo}`;
  
  console.log('Atualizando imagem para:', caminhoImagem);
  
  const imagemPrincipal = document.getElementById('produto-imagem');
  const miniatura = document.querySelector('.miniatura');
  
  if (imagemPrincipal) {
    // Adicionar efeito de transição suave
    imagemPrincipal.style.opacity = '0.7';
    
    setTimeout(() => {
      imagemPrincipal.src = caminhoImagem;
      imagemPrincipal.alt = `Camisa Personalizável - ${personalizacaoAtual.corPrincipal} ${personalizacaoAtual.corSecundaria} ${personalizacaoAtual.padrao}`;
      imagemPrincipal.style.opacity = '1';
      
      // Atualizar miniatura também
      if (miniatura) {
        miniatura.src = caminhoImagem;
      }
      
      // Atualizar dados do produto para o carrinho
      produtoAtual.image = caminhoImagem;
    }, 150);
  }
}

function gerarNomeArquivo() {
  // Normalizar os valores removendo espaços e acentos
  const corPrincipal = normalizacaoValores[personalizacaoAtual.corPrincipal] || personalizacaoAtual.corPrincipal;
  const corSecundaria = normalizacaoValores[personalizacaoAtual.corSecundaria] || personalizacaoAtual.corSecundaria;
  const padrao = normalizacaoValores[personalizacaoAtual.padrao] || personalizacaoAtual.padrao;
  
  const nomeArquivo = `CamisaPersonalizavel${corPrincipal}${corSecundaria}${padrao}.png`;
  
  console.log('Nome do arquivo gerado:', nomeArquivo);
  return nomeArquivo;
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
  
  // Troca a imagem principal com efeito suave
  imagemPrincipal.style.opacity = '0.7';
  setTimeout(() => {
    imagemPrincipal.src = miniatura.src;
    imagemPrincipal.style.opacity = '1';
  }, 150);
}

function aumentarQuantidade() {
  quantidadeAtual++;
  document.getElementById('quantidade').textContent = quantidadeAtual;
  console.log('Quantidade aumentada para:', quantidadeAtual);
}

function diminuirQuantidade() {
  if (quantidadeAtual > 1) {
    quantidadeAtual--;
    document.getElementById('quantidade').textContent = quantidadeAtual;
    console.log('Quantidade diminuída para:', quantidadeAtual);
  }
}

function adicionarAoCarrinho() {
  if (!tamanhoSelecionado) {
    mostrarAvisoTamanho();
    return;
  }

  // Criar objeto do item com todas as opções de personalização
  const item = {
    ...produtoAtual,
    size: tamanhoSelecionado,
    quantity: quantidadeAtual,
    // Adicionar opções de personalização ao objeto
    opcoes: {
      corPrincipal: personalizacaoAtual.corPrincipal,
      corSecundaria: personalizacaoAtual.corSecundaria,
      padrao: personalizacaoAtual.padrao
    }
  };

  console.log('Adicionando item ao carrinho:', item);

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
    
    console.log('Item adicionado ao carrinho com sucesso');
  } else {
    console.error('Função addItemToCart não encontrada');
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
    quantity: quantidadeAtual,
    opcoes: {
      corPrincipal: personalizacaoAtual.corPrincipal,
      corSecundaria: personalizacaoAtual.corSecundaria,
      padrao: personalizacaoAtual.padrao
    }
  };
  
  console.log('Comprando produto:', produto);
  
  if (typeof addItemToCart === 'function') {
    addItemToCart(produto);
  }
  
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

function aplicarAnimacoes() {
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

// Função para obter resumo da personalização (útil para debug)
function obterResumoPersonalizacao() {
  return {
    ...personalizacaoAtual,
    tamanho: tamanhoSelecionado,
    quantidade: quantidadeAtual,
    nomeArquivo: gerarNomeArquivo()
  };
}

// Expor função para debug no console
window.debugPersonalizacao = obterResumoPersonalizacao;