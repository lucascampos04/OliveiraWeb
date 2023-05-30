var lobbySound = document.getElementById('sound-lobby');
var stopMusic = document.getElementById('stop-music-img');
var isPlaying = true;
imgOnsound = 'img/auto-sound.png'
imgOffsound = 'img/sem-som.png'

function toggleMusic() {
  if (isPlaying) {
    lobbySound.pause();
    stopMusic.src = imgOffsound;
    isPlaying = false;
  } else {
    lobbySound.play();
    stopMusic.src = imgOnsound
    isPlaying = true;
  }
}
