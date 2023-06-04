var buttonStart = document.getElementById('btn-start-game');

buttonStart.addEventListener('click', openStartGame);

function openStartGame(){
    var newWindow = window.open('', 'Jogo iniciado', 'width=700, height=500');

    var htmlContent = `
    <html>
    <head>
        <link rel="stylesheet" href="game/gameStyle.css">
        <title>Jogo iniciado</title>
    </head>
    <body style="background-color: black;">

    <script>
        var buttonStart = document.getElementById('btn-start-game');

        buttonStart.addEventListener('click', openStartGame);

        function openStartGame() {
            var newWindow = window.open('game.html', 'Jogo iniciado', 'width=700, height=500');
        }
    </script>
    </body>
    </html>
    `

    newWindow.document.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
}