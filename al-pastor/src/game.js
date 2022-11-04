import Entity from "./entity.js";
import Player from "./player.js";

/** @type {HTMLCanvasElement} */

export default class Game {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    jump = false;
    started = false;

    ground = null;
    cacti = [];
    tacos = [];

    constructor() {

        this.player = new Player();
        this.cactusImage = document.getElementById("cactus");
        this.tacoImage = document.getElementById("taco");
        this.groundImage = document.getElementById("ground");

        this.canvas.width = 300;
        this.canvas.height = 300;

        document.addEventListener("keydown", (ev) => this.handleKey(ev, true));
        document.addEventListener("keyup", (ev) => this.handleKey(ev, false));
        document.addEventListener("touchstart", (ev) => this.handleMouse(true));
        document.addEventListener("touchend", (ev) => this.handleMouse(false));

        this.ground = new Entity("ground", {x: 0, y: 250}, {w: 1080, h: 10}, this.groundImage);
        for (let i=0; i<2; i++) {
            this.cacti.push(new Entity("cactus", {x: 300, y:(250 - 60)}, {w: 14*3, h: 20*3}, this.cactusImage));
            this.tacos.push(new Entity("taco", {x: 950, y:100}, {w: 32, h: 32}, this.tacoImage));
        }
    }

    tick(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        if (this.started) {
            this.showCactus(this.ctx);
            this.showTacos(this.ctx);
            this.ground.move(4);
            this.showScore(this.player.getScore);

            if (this.jump) {
                this.player.jump();
            }
        } 

        this.player.tick(this.ground, this.cacti, this.tacos);
        this.player.animate(this.ctx);
        this.ground.draw(this.ctx);

        // game over
        if (this.player.getHit) {
            this.started = false;
            document.getElementById("game-over").style = "display:block";
        }
    }

    showCactus(ctx) {
        this.cacti[0].draw(ctx);
        this.cacti[0].move(5);
        if (this.cacti[0].pos.x + this.cacti[0].size.w < 0) {
            this.cacti[0].setPositionX(Math.floor(Math.random() * 5) * 100 + 300 + this.cacti[1].getPosition.x);
        }

        this.cacti[1].draw(ctx);
        this.cacti[1].move(5);
        if (this.cacti[1].pos.x + this.cacti[1].size.w < 0) {
            this.cacti[1].setPositionX(Math.floor(Math.random() * 4) * 100 + 300 +this.cacti[0].getPosition.x);
        }
    }

    showTacos(ctx) {
        this.tacos[0].draw(ctx);
        this.tacos[0].move(3);
        if (this.tacos[0].pos.x + this.tacos[0].size.w < 0) {
            this.tacos[0].setPositionX(Math.floor(Math.random() * 4) * 100 + 300 + this.tacos[1].getPosition.x);
        }

        this.tacos[1].draw(ctx);
        this.tacos[1].move(3);
        if (this.tacos[1].pos.x + this.tacos[1].size.w < 0) {
            this.tacos[1].setPositionX(Math.floor(Math.random() * 3) * 100 + 300 + this.tacos[0].getPosition.x);
        }
    }

    showScore(score) {
        document.getElementById("score").textContent = score;
    }

    handleKey(ev, isDown) {
        if (ev.key === "ArrowUp" || ev.key === "w" || ev.key === " ") {
            this.jump = isDown;
        }    
    }

    handleMouse(isDown) {
        this.jump = isDown;
    }

    restart() {
        this.player.resetPlayer();
        this.started = true;
        this.jump = false;
        this.cacti[0].setPositionX(500);
        this.cacti[1].setPositionX(800);

        this.tacos[0].setPositionX(500);
        this.tacos[1].setPositionX(800);
    }

    get isStarted() {
        return this.started;
    }
}