// Carregar pedidos do usuário logado
document.addEventListener('DOMContentLoaded', function() {
  carregarPedidos();
});

function carregarPedidos() {
  // Verificar se há usuário logado
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (!currentUser) {
    // Se não houver usuário logado, redirecionar para login
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'login.html';
    return;
  }
  
  // Buscar pedidos do usuário
  const pedidosKey = `pedidos_${currentUser.email}`;
  const pedidos = JSON.parse(localStorage.getItem(pedidosKey)) || [];
  
  console.log('Pedidos carregados:', pedidos);
  
  if (pedidos.length === 0) {
    // Exibir mensagem de sem pedidos
    document.getElementById('sem-pedidos').style.display = 'block';
    document.getElementById('pedidos-lista').style.display = 'none';
  } else {
    // Exibir pedidos
    document.getElementById('sem-pedidos').style.display = 'none';
    document.getElementById('pedidos-lista').style.display = 'flex';
    renderizarPedidos(pedidos);
  }
}

function renderizarPedidos(pedidos) {
  const pedidosLista = document.getElementById('pedidos-lista');
  pedidosLista.innerHTML = '';
  
  // Ordenar pedidos do mais recente para o mais antigo
  pedidos.sort((a, b) => new Date(b.dataPedido) - new Date(a.dataPedido));
  
  pedidos.forEach(pedido => {
    const pedidoCard = criarCardPedido(pedido);
    pedidosLista.appendChild(pedidoCard);
  });
}

function criarCardPedido(pedido) {
  const card = document.createElement('div');
  card.className = 'pedido-card';
  
  // Calcular datas de status
  const datas = calcularDatasStatus(pedido.dataPedido);
  
  // Criar HTML do card
  card.innerHTML = `
    <div class="pedido-header">
      <div>
        <div class="pedido-codigo">Pedido #${pedido.codigo}</div>
        <div class="pedido-data">Realizado em ${formatarData(pedido.dataPedido)}</div>
      </div>
    </div>
    
    <div class="pedido-status">
      <h3>Status do Pedido</h3>
      <div class="status-timeline">
        ${criarStatusItem('✓', 'Pedido Realizado', datas.pedido, true)}
        ${criarStatusItem('✓', 'Pagamento Confirmado', datas.pagamento, datas.pagamentoCompleto)}
        ${criarStatusItem('📦', 'Em Separação', datas.separacao, datas.separacaoCompleto)}
        ${criarStatusItem('🚚', 'Em Transporte', datas.transporte, datas.transporteCompleto)}
        ${criarStatusItem('🏠', 'Entregue', datas.entrega, datas.entregueCompleto)}
      </div>
    </div>
    
    <div class="pedido-produtos">
      <h3>Produtos</h3>
      <div class="produtos-lista">
        ${pedido.produtos.map(produto => criarItemProduto(produto)).join('')}
      </div>
    </div>
    
    <div class="pedido-total">
      <span class="pedido-total-label">Total:</span>
      <span class="pedido-total-valor">R$ ${pedido.total.toFixed(2)}</span>
    </div>
  `;
  
  return card;
}

function criarStatusItem(icone, label, data, completo) {
  const statusClass = completo ? 'completed' : 'pending';
  const dataTexto = completo ? formatarData(data) : 'Aguardando...';
  
  return `
    <div class="status-item ${statusClass}">
      <div class="status-icon">${icone}</div>
      <div class="status-info">
        <div class="status-label">${label}</div>
        <div class="status-data">${dataTexto}</div>
      </div>
    </div>
  `;
}

function criarItemProduto(produto) {
  const tamanhoTexto = produto.size ? `<div class="produto-info">Tamanho: ${produto.size}</div>` : '';
  const imagemSrc = produto.image || 'images/placeholder.png';
  
  return `
    <div class="produto-item">
      <img src="${imagemSrc}" alt="${produto.name}" class="produto-imagem">
      <div class="produto-detalhes">
        <div class="produto-nome">${produto.name}</div>
        ${tamanhoTexto}
        <div class="produto-info">Quantidade: ${produto.quantity}</div>
      </div>
      <div class="produto-preco">R$ ${(produto.price * produto.quantity).toFixed(2)}</div>
    </div>
  `;
}

function calcularDatasStatus(dataPedido) {
  const dataInicial = new Date(dataPedido);
  const agora = new Date();
  
  // Calcular datas previstas para cada status
  const dataPagamento = new Date(dataInicial);
  dataPagamento.setDate(dataPagamento.getDate() + 1); // 1-2 dias após pedido
  
  const dataSeparacao = new Date(dataPagamento);
  dataSeparacao.setDate(dataSeparacao.getDate() + 1); // 1 dia após pagamento
  
  const dataTransporte = new Date(dataSeparacao);
  dataTransporte.setDate(dataTransporte.getDate() + 2); // 1-2 dias após separação
  
  const dataEntrega = new Date(dataTransporte);
  dataEntrega.setDate(dataEntrega.getDate() + 4); // 2-5 dias após transporte
  
  return {
    pedido: dataInicial,
    pagamento: dataPagamento,
    separacao: dataSeparacao,
    transporte: dataTransporte,
    entrega: dataEntrega,
    pagamentoCompleto: agora >= dataPagamento,
    separacaoCompleto: agora >= dataSeparacao,
    transporteCompleto: agora >= dataTransporte,
    entregueCompleto: agora >= dataEntrega
  };
}

function formatarData(data) {
  const dataObj = new Date(data);
  return dataObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function gerarCodigoPedido() {
  // Gerar código no formato XXXXX-XX
  const parte1 = Math.floor(10000 + Math.random() * 90000); // 5 dígitos
  const parte2 = Math.floor(10 + Math.random() * 90); // 2 dígitos
  return `${parte1}-${parte2}`;
}

// Função para finalizar compra (será chamada da página do carrinho)
function finalizarCompra(produtos, total) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (!currentUser) {
    alert('Você precisa estar logado para finalizar a compra.');
    window.location.href = 'login.html';
    return false;
  }
  
  // Criar objeto do pedido
  const pedido = {
    codigo: gerarCodigoPedido(),
    dataPedido: new Date().toISOString(),
    produtos: produtos,
    total: total,
    status: 'realizado'
  };
  
  // Salvar pedido no localStorage
  const pedidosKey = `pedidos_${currentUser.email}`;
  const pedidos = JSON.parse(localStorage.getItem(pedidosKey)) || [];
  pedidos.push(pedido);
  localStorage.setItem(pedidosKey, JSON.stringify(pedidos));
  
  console.log('Pedido finalizado:', pedido);
  
  return true;
}

// Exportar função para uso global
window.finalizarCompra = finalizarCompra;