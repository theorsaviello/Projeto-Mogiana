document.getElementById("formLogin").addEventListener("submit", function(e) {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  let mensagem = document.getElementById("mensagem");

  // Buscar usuário na lista de usuários
  const usuariosKey = 'usuarios';
  const usuarios = JSON.parse(localStorage.getItem(usuariosKey)) || [];
  
  const usuario = usuarios.find(user => user.email === email && user.senha === senha);

  if (!usuario) {
    // Verificar compatibilidade com sistema antigo
    const usuarioAntigo = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioAntigo && usuarioAntigo.email === email && usuarioAntigo.senha === senha) {
      // Migrar usuário antigo para o novo sistema
      if (!usuarios.find(u => u.email === email)) {
        usuarios.push({
          ...usuarioAntigo,
          dataCadastro: new Date().toISOString()
        });
        localStorage.setItem(usuariosKey, JSON.stringify(usuarios));
      }
      
      // Fazer login com usuário antigo
      realizarLogin(usuarioAntigo, mensagem);
      return;
    }
    
    mensagem.style.color = "red";
    mensagem.textContent = "E-mail ou senha inválidos!";
    return;
  }

  realizarLogin(usuario, mensagem);
});

function realizarLogin(usuario, mensagem) {
  console.log('Realizando login para:', usuario);
  
  mensagem.style.color = "green";
  mensagem.textContent = "Login realizado com sucesso!";
  
  // Definir usuário atual no sistema de carrinho
  if (typeof cartSystem !== 'undefined') {
    cartSystem.setCurrentUser(usuario);
  } else {
    // Fallback: salvar no localStorage diretamente se o cartSystem não estiver disponível
    localStorage.setItem('currentUser', JSON.stringify(usuario));
  }
  
  // Redirecionar para a loja
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}