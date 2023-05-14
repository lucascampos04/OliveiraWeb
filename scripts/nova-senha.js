function new_pass(){
    const email = document.getElementById('email')
    const new_email = document.getElementById('confirme-email')
    const cdg = document.getElementById('codigo')

    if (email == new_email){
        window.location.href = 'confir-pass.html'
        console.log("Email ok")
    }else{
        alert("Email ou codigo incorreto, por favor verifique se estão corretos")
        console.log("Email ou codigo incorreto")
    }

    if(cdg == '123'){
        prompt("Helllo")
        console.log("Codigo aplicado com sucesso")
    }
}

document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      new_pass();
    }
  });