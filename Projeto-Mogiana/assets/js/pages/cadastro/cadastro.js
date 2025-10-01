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

  // Criar objeto do usuário
  let usuario = {
    nome: nome,
    email: email,
    senha: senha
  };

  // Salvar no localStorage
  localStorage.setItem("usuario", JSON.stringify(usuario));

  mensagem.style.color = "green";
  mensagem.textContent = "Cadastro realizado com sucesso!";

  // Limpar formulário
  document.getElementById("formCadastro").reset();
});
