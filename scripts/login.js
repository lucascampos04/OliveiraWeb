function login() {
    const user = document.getElementById('usuario').value
    const senha = document.getElementById('senha').value
  
    if (user == 'admin' && senha == '123') {
      window.location.href = './perfil-admin.html'
      console.log("Login efetuado com sucesso \n Seja bem vindo" + user)
    }else if (user == 'lucas' && senha =='456'){
      alert("Login efetuado com sucesso")
      location.href = './telauser.html'
      console.log('Login efetuado com sucesso \n Seja bem vindo' + user)
    }
    else {
      console.log("Login ou senha incorretos")
      var senhaErrada = document.getElementById('senhaErrada')
      senhaErrada.style.display = 'block';
    }
  }
  
  document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      login();
    }
  });
  
  function toggleSenhaVisibility() {
    var senhaInput = document.getElementById("senha");
    var toggleButton = document.getElementById("toggle-senha");
  
    if (senhaInput.type === "password") {
      senhaInput.type = "text";
      toggleButton.classList.add("visible");
    } else {
      senhaInput.type = "password";
      toggleButton.classList.remove("visible");
    }
  }
  
  
  
  
  
  