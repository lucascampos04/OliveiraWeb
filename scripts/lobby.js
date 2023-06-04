var lobbySound = document.getElementById('sound-lobby');
var stopMusic = document.getElementById('stop-music-img');
var isPlaying = true;
imgOnsound = 'img/sound.png'
imgOffsound = 'img/sound.png'

function toggleMusic() {
  if (isPlaying) {
    lobbySound.pause();
    stopMusic.src = imgOffsound;
    isPlaying = false;
  } else {
    lobbySound.play();
    stopMusic.src = imgOnsound;
    isPlaying = true;
  }
}


