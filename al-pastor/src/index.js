import Game from "./game.js";

const game = new Game();

function loop() {
    requestAnimationFrame(loop);
    game.tick();

    if (!game.isStarted) {
        document.getElementById("startbutton").disabled = false;
        document.getElementById("startbutton").style = "display:block";
        document.getElementById("cover").style = "display:block";
    }
}
requestAnimationFrame(loop);

function start() {
    game.restart();

    document.getElementById("startbutton").disabled = true;
    document.getElementById("startbutton").style = "display:none";
    document.getElementById("cover").style = "display:none";
    document.getElementById("game-over").style = "display:none";
}
document.getElementById("startbutton").addEventListener("click", start);