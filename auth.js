// auth.js - funções de autenticação e utilitários compartilhados

function criarConta(){
  const nome = document.getElementById("cadNome") ? document.getElementById("cadNome").value.trim() : null;
  const email = document.getElementById("cadEmail") ? document.getElementById("cadEmail").value.trim() : null;
  const senha = document.getElementById("cadSenha") ? document.getElementById("cadSenha").value : null;

  if(!nome || !email || !senha){
    alert("Preencha todos os campos!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("usuarios")) || [];

  if(users.some(u => u.email === email)){
    alert("Este e-mail já está cadastrado!");
    return;
  }

  users.push({ nome, email, senha });
  localStorage.setItem("usuarios", JSON.stringify(users));

  alert("Conta criada com sucesso!");
  window.location.href = 'login.html';
}

function fazerLogin(){
  const emailEl = document.getElementById("loginEmail");
  const senhaEl = document.getElementById("loginSenha");
  const email = emailEl ? emailEl.value.trim() : null;
  const senha = senhaEl ? senhaEl.value : null;

  let users = JSON.parse(localStorage.getItem("usuarios")) || [];

  const userFound = users.find(u => u.email === email && u.senha === senha);

  if(!userFound){
    alert("E-mail ou senha incorretos!");
    return;
  }

  localStorage.setItem("usuarioLogado", JSON.stringify(userFound));
  window.location.href = 'paginagame.html';
}

function abrirLogin(){ window.location.href = 'login.html'; }
function abrirCadastro(){ window.location.href = 'cadastro.html'; }

function enviarFeedback(tipo){
  const msg = document.getElementById("feedback-msg");
  if(!msg) return;
  msg.innerText = `Obrigado! Seu feedback "${tipo}" foi registrado.`;
  msg.style.opacity = "1";

  setTimeout(() => {
    msg.style.opacity = "0";
  }, 3000);
}

function checkAuth(){
  const user = JSON.parse(localStorage.getItem('usuarioLogado'));
  return !!user;
}

function logout(){
  localStorage.removeItem('usuarioLogado');
  // after logout go back to login
  window.location.href = 'login.html';
}

function renderAuthHeader(){
  const container = document.getElementById('headerAuth');
  if(!container) return;
  const user = JSON.parse(localStorage.getItem('usuarioLogado'));
  if(user){
    // show user name and logout
    container.innerHTML = `
      <span id="userName">${user.nome ? escapeHtml(user.nome) : escapeHtml(user.email)}</span>
      <button class="btn small" onclick="logout()">Sair</button>
    `;
  } else {
    // show Entrar / Criar conta links
    container.innerHTML = `
      <a class="btn small-link" href="login.html">Entrar</a>
      <button class="btn small" onclick="abrirCadastro()">Criar conta</button>
    `;
  }
}

// small utility to avoid injecting raw strings
function escapeHtml(str){
  return String(str).replace(/[&<>"'`]/g, function(ch){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;', '`':'&#96;'}[ch];
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderAuthHeader();
});
