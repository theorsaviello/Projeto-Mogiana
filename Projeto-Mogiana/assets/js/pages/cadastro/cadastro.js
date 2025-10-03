document.getElementById("formCadastro").addEventListener("submit", function(e) {
  e.preventDefault();

  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  let confirmaSenha = document.getElementById("confirmaSenha").value;
  let mensagem = document.getElementById("mensagem");

  if (senha !== confirmaSenha) {
    mensagem.style.color = "red";
    mensagem.textContent = "As senhas não conferem!";
    return;
  }

  // Verificar se o email já está cadastrado
  const usuariosKey = 'usuarios';
  const usuarios = JSON.parse(localStorage.getItem(usuariosKey)) || [];
  
  const usuarioExistente = usuarios.find(user => user.email === email);
  if (usuarioExistente) {
    mensagem.style.color = "red";
    mensagem.textContent = "Este e-mail já está cadastrado!";
    return;
  }

  // Criar objeto do usuário
  let usuario = {
    nome: nome,
    email: email,
    senha: senha,
    dataCadastro: new Date().toISOString()
  };

  // Adicionar usuário à lista de usuários
  usuarios.push(usuario);
  localStorage.setItem(usuariosKey, JSON.stringify(usuarios));

  // Manter compatibilidade com o sistema antigo
  localStorage.setItem("usuario", JSON.stringify(usuario));

  console.log('Usuário cadastrado:', usuario);

  mensagem.style.color = "green";
  mensagem.textContent = "Cadastro realizado com sucesso! Redirecionando para o login...";

  // Limpar formulário
  document.getElementById("formCadastro").reset();

  // Redirecionar para login após 2 segundos
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
});