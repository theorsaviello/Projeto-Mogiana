document.getElementById("formLogin").addEventListener("submit", function(e) {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  let mensagem = document.getElementById("mensagem");

  // Recuperar usuário do localStorage
  let usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    mensagem.style.color = "red";
    mensagem.textContent = "Nenhum usuário cadastrado!";
    return;
  }

  if (usuario.email === email && usuario.senha === senha) {
    mensagem.style.color = "green";
    mensagem.textContent = "Login realizado com sucesso!";
    // Exemplo: redirecionar para a loja
    setTimeout(() => {
      window.location.href = "index.html"; // página inicial da loja
    }, 1500);
  } else {
    mensagem.style.color = "red";
    mensagem.textContent = "E-mail ou senha inválidos!";
  }
});
