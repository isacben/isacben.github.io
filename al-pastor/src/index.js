import Game from "./game.js";

const game = new Game();
let requestId = null;
let startTime = 0;

function loop(timestamp) {
    const elapsed = timestamp - startTime;
    if (elapsed > 10) {
        startTime = timestamp;
        game.tick();
    }

    if (!game.isStarted) {
        document.getElementById("startbutton").disabled = false;
        document.getElementById("startbutton").style = "display:block";
        document.getElementById("cover").style = "display:block";
    }
    requestId = requestAnimationFrame(loop);
}
requestId = requestAnimationFrame(loop);

function start() {
    cancelAnimationFrame(requestId);
    game.restart();

    document.getElementById("startbutton").disabled = true;
    document.getElementById("startbutton").style = "display:none";
    document.getElementById("cover").style = "display:none";
    document.getElementById("game-over").style = "display:none";
    loop();
}
document.getElementById("startbutton").addEventListener("click", start);