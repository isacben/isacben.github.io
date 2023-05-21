
var player;
var videoStart = 1;
let vidId = "aLDIgvPlYP8";

const FULL_DASH_ARRAY = 283;
let WARNING_THRESHOLD = 0;
let ALERT_THRESHOLD = 0;

let COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

let TIME_LIMIT = 0;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

//startTimer();

function onTimesUp() {
    resetTimer();
    
    if (player.getPlayerState() != 1)
        player.playVideo();
}

function startTimer() {
    if (TIME_LIMIT > 0) {
        prepareVideo();
        enableButtons(true);
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
            );
            setCircleDasharray();
            setRemainingPathColor(timeLeft);

            if (timeLeft === 0) {
            onTimesUp();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerInterval);

    TIME_LIMIT = 0;
    timePassed = 0;
    timeLeft = TIME_LIMIT;
    
    setCircleDasharray();
    document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
    );
    
    enableButtons(false);
    prepareVideo();

    setRemainingPathColor(timeLeft);
}

function addToTimer(amount) {
    TIME_LIMIT += amount;
    timeLeft = TIME_LIMIT;
    COLOR_CODES["warning"]["threshold"] = Math.floor(TIME_LIMIT / 2);
    COLOR_CODES["alert"]["threshold"] = Math.floor(TIME_LIMIT / 4);
    setCircleDasharray();
    document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
    );
}

function enableButtons(flag) {
    document.getElementById("one").disabled = flag;
    document.getElementById("five").disabled = flag;
    document.getElementById("ten").disabled = flag;
    document.getElementById("start").disabled = flag;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft === 0) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(alert.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(info.color);
  }
  else if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}


// Youtube

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '180',
    width: '320',
    videoId: vidId,
    playerVars: { autoplay: 0, start: videoStart},
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  
}

function onPlayerReady(event) {
  event.target.stopVideo();
  //prepareVideo();
}

var done = false;
function onPlayerStateChange(event) {
  /*if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 59000);
    done = true;
  }*/
}

function prepareVideo() {
    player.seekTo(videoStart);
    player.setPlaybackRate(0.95);
    player.pauseVideo();
}