// Verifica se o usuário já aceitou os cookies
if (!localStorage.getItem('cookiesAccepted')) {
    // Se não aceitou, exibe o banner
    document.getElementById('cookie-banner').style.display = 'block';
  }
  
  // Função para aceitar os cookies
  function acceptCookies() {
    // Armazena a preferência do usuário no armazenamento local
    localStorage.setItem('cookiesAccepted', true);
    // Esconde o banner
    document.getElementById('cookie-banner').style.display = 'none';
  }
  
  // Adiciona um evento de clique no botão de aceitar cookies
  document.getElementById('accept-cookies').addEventListener('click', acceptCookies);
  