// Carregar informações do usuário logado
document.addEventListener('DOMContentLoaded', function() {
  carregarDadosUsuario();
  configurarFormulario();
});

function carregarDadosUsuario() {
  // Verificar se há usuário logado
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (!currentUser) {
    // Se não houver usuário logado, redirecionar para login
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'login.html';
    return;
  }
  
  // Preencher os dados do usuário na página
  document.getElementById('user-nome').textContent = currentUser.nome || 'Não informado';
  document.getElementById('user-email').textContent = currentUser.email || 'Não informado';
  document.getElementById('user-endereco').textContent = currentUser.endereco || 'Não informado';
  document.getElementById('user-telefone').textContent = currentUser.telefone || 'Não informado';
  
  // Formatar e exibir a data de cadastro
  if (currentUser.dataCadastro) {
    const dataCadastro = new Date(currentUser.dataCadastro);
    const dataFormatada = dataCadastro.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    document.getElementById('user-data-cadastro').textContent = dataFormatada;
  } else {
    document.getElementById('user-data-cadastro').textContent = 'Não disponível';
  }
  
  console.log('Dados do usuário carregados:', currentUser);
}

function habilitarEdicao() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  // Preencher formulário com dados atuais
  document.getElementById('edit-nome').value = currentUser.nome || '';
  document.getElementById('edit-email').value = currentUser.email || '';
  document.getElementById('edit-endereco').value = currentUser.endereco || '';
  document.getElementById('edit-telefone').value = currentUser.telefone || '';
  
  // Mostrar formulário e esconder visualização
  document.getElementById('perfil-info-view').style.display = 'none';
  document.getElementById('perfil-form-edit').style.display = 'block';
  document.getElementById('botao-editar').style.display = 'none';
}

function cancelarEdicao() {
  // Esconder formulário e mostrar visualização
  document.getElementById('perfil-info-view').style.display = 'block';
  document.getElementById('perfil-form-edit').style.display = 'none';
  document.getElementById('botao-editar').style.display = 'inline-block';
}

function configurarFormulario() {
  const form = document.getElementById('perfil-form-edit');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      salvarAlteracoes();
    });
  }
}

function salvarAlteracoes() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  // Obter valores do formulário
  const novoNome = document.getElementById('edit-nome').value.trim();
  const novoEndereco = document.getElementById('edit-endereco').value.trim();
  const novoTelefone = document.getElementById('edit-telefone').value.trim();
  
  // Validar nome
  if (!novoNome) {
    alert('O nome não pode estar vazio!');
    return;
  }
  
  // Atualizar dados do usuário
  currentUser.nome = novoNome;
  currentUser.endereco = novoEndereco;
  currentUser.telefone = novoTelefone;
  
  // Salvar no localStorage
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  // Atualizar na lista de usuários
  const usuariosKey = 'usuarios';
  const usuarios = JSON.parse(localStorage.getItem(usuariosKey)) || [];
  const index = usuarios.findIndex(u => u.email === currentUser.email);
  
  if (index !== -1) {
    usuarios[index] = currentUser;
    localStorage.setItem(usuariosKey, JSON.stringify(usuarios));
  }
  
  // Atualizar interface do cartSystem se disponível
  if (typeof cartSystem !== 'undefined') {
    cartSystem.setCurrentUser(currentUser);
  }
  
  console.log('Dados atualizados:', currentUser);
  
  // Recarregar dados na página
  carregarDadosUsuario();
  
  // Voltar para visualização
  cancelarEdicao();
  
  // Mostrar mensagem de sucesso
  alert('Informações atualizadas com sucesso!');
}

// Tornar funções disponíveis globalmente
window.habilitarEdicao = habilitarEdicao;
window.cancelarEdicao = cancelarEdicao;