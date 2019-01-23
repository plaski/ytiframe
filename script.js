const form = document.querySelector('#form');
const layer = document.querySelector('#layer');
let player;
let timeChecker;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const textInput = document.querySelector('#textInput');
  if (textInput === '') {
    return;
  }
  const movieID = textInput.value;
  if (player) {
    player.destroy();
    clearInterval(timeChecker);
  }
  createIframePlayer(movieID)
  textInput.value = '';
});

function createIframePlayer(id) {
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: id,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

function onPlayerReady(event) {
  event.target.playVideo();
  hideLayer();
};


function onPlayerStateChange(event) {
  if (event.data === 1) {
    const videoDuration = player.getDuration();
    timeChecker = setInterval(getTime, 200);

    function getTime() {
      const currentTime = player.getCurrentTime();
      const timeDifference = Math.floor(videoDuration - currentTime);
      if (timeDifference < 10) {
        showLayer(timeDifference);
      } else {
        hideLayer();
      }
    }
  } else {
    clearInterval(timeChecker);
  }
}

function showLayer(time) {
  layer.classList.remove('hide');
  layer.innerText = time.toString();
}

function hideLayer() {
  layer.classList.add('hide');
}