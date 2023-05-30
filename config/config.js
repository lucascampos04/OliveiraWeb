var configImg = document.getElementById('settings');

configImg.addEventListener('click', openWindowSetting);

function openWindowSetting() {
    var newWindow = window.open('', 'Configurações', 'width=400, height=500');
    
    var htmlContent = `
        <html>
        <head>
            <link rel="stylesheet" href="config/config.css">
        <title>Configurações</title>
        </head>
        <body>
        <div class="container">
        <div class="logo">
            <img src="./logo.png" alt="Logo">
        </div>

        <h1>Configurações</h1>
        
        <form>
            <label for="grafico">Gráfico</label>
            <select id="grafico">
                <option value="leve">Leve</option>
                <option value="medio">Médio</option>
                <option value="alto">Alto</option>
            </select>

            <label for="volume">Volume</label>
            <input type="range" id="volume" min="0" max="100" value="50">
            
            <button type="submit" id="exitPag">Salvar</button>
        </form>
        
        <div class="loginRedes">
            <a href="#"><img src="./img/facebook.png" alt="Facebook"></a>
            <a href="#"><img src="./img/google.png" alt="Google"></a>
            <a href="#"><img src="./img/steam.png" alt="Steam"></a>
            <a href="#"><img src="./img/smartphone-call.png" alt="Telefone"></a>
        </div>
    </div>
        </body>
        </html>
    `;


    newWindow.document.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
}
