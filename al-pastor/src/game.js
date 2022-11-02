import Entity from "./entity.js";
import Player from "./player.js";

/** @type {HTMLCanvasElement} */

export default class Game {
    canvas = document.getElementById("canvas");

    ctx = canvas.getContext("2d");
    player = new Player();
    jump = false;
    started = false;

    ground = new Entity("ground", {x: 0, y: 250}, {w: 900, h: 10});
    cacti = [
        new Entity("cactus", {x: 300, y:(250 - 60)}, {w: 14*3, h: 20*3}),
        new Entity("cactus", {x: 700, y:(250 - 60)}, {w: 14*3, h: 20*3}),
        new Entity("cactus", {x: 900, y:(250 - 60)}, {w: 14*3, h: 20*3}),
    ];
    tacos = [
        new Entity("taco", {x: 500, y:100}, {w: 32, h: 32}),
        new Entity("taco", {x: 800, y:100}, {w: 32, h: 32}),
        new Entity("taco", {x: 950, y:100}, {w: 32, h: 32}),
    ];

    constructor() {
        this.canvas.width = 300;
        this.canvas.height = 300;
        document.addEventListener("keydown", (ev) => this.handleKey(ev, true));
        document.addEventListener("keyup", (ev) => this.handleKey(ev, false));
        document.addEventListener("touchstart", (ev) => this.handleMouse(true));
        document.addEventListener("touchend", (ev) => this.handleMouse(false));
    }

    tick(){

        //this.ctx.fillStyle = "#aae0f3";
        //this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = 300;
        this.canvas.height = 300;

        this.showScore(this.player.getScore);

        if (this.started) {
            this.showCactus(this.ctx);
            this.showTacos(this.ctx);
            this.ground.move(2);
        } 

        if (this.jump & this.started) {
            this.player.jump();
        }

        this.player.tick(this.ground, this.cacti, this.tacos);
        this.player.animate(this.ctx);
        this.ground.draw(this.ctx);

        this.gameOver();
    }

    /*addEnemy(){
        if (this.enemyTimer > this.enemyInterval) {
            this.things.push(
                new Entity(
                    "cactus",
                    {x: 300, y:(250 - 60)},
                    {w: 14*3, h: 20*3},   
                    "#6e6962"
                )
            );
            //console.log(this.things) 
            this.enemyTimer = Math.floor(Math.random() * 3) * 100;
        } else {
            this.enemyTimer++;
        }
    }*/

    showCactus(ctx) {
        this.cacti[0].draw(ctx);
        this.cacti[0].move(3);
        if (this.cacti[0].pos.x + this.cacti[0].size.w < 0) {
            this.cacti[0].setPositionX(Math.floor(Math.random() * 3) * 100 + 200 + this.cacti[2].getPosition.x);
        }

        this.cacti[1].draw(ctx);
        this.cacti[1].move(3);
        if (this.cacti[1].pos.x + this.cacti[1].size.w < 0) {
            this.cacti[1].setPositionX(Math.floor(Math.random() * 3) * 100 + 200 +this.cacti[0].getPosition.x);
        }

        this.cacti[2].draw(ctx);
        this.cacti[2].move(3);
        if (this.cacti[2].pos.x + this.cacti[2].size.w < 0) {
            this.cacti[2].setPositionX(Math.floor(Math.random() * 3) * 100 +200 +this.cacti[1].getPosition.x);
        }
        //console.log(Math.floor(Math.random() * 3 * 100));
    }

    showTacos(ctx) {
        this.tacos[0].draw(ctx);
        this.tacos[0].move(3);
        if (this.tacos[0].pos.x + this.tacos[0].size.w < 0) {
            this.tacos[0].setPositionX(Math.floor(Math.random() * 3) * 100 + 200 + this.tacos[2].getPosition.x);
        }

        this.tacos[1].draw(ctx);
        this.tacos[1].move(3);
        if (this.tacos[1].pos.x + this.tacos[1].size.w < 0) {
            this.tacos[1].setPositionX(Math.floor(Math.random() * 3) * 100 + 200 +this.tacos[0].getPosition.x);
        }

        this.tacos[2].draw(ctx);
        this.tacos[2].move(3);
        if (this.tacos[2].pos.x + this.tacos[2].size.w < 0) {
            this.tacos[2].setPositionX(Math.floor(Math.random() * 3) * 100 +200 +this.tacos[1].getPosition.x);
        }
        //console.log(Math.floor(Math.random() * 3 * 100));
    }

    showScore(score) {
        document.getElementById("score").textContent = score;
    }

    handleKey(ev, isDown) {
        if (!this.player.getHit) {
            switch (ev.key) {
                default:
                    return;
                case "ArrowUp":
                case "w":
                case " ":
                    this.jump = isDown;
                    break;
            }
        }
    }

    handleMouse(isDown) {
        this.jump = isDown;
    }

    gameOver() {
        if (this.player.getHit) {
            this.started = false;

            // stop moving the ground
            this.ground.move(0);
            document.getElementById("game-over").style = "display:block";
        }
    }

    restart() {
        this.player.resetPlayer();
        this.started = true;
        this.jump = false;
        this.cacti[0].setPositionX(500);
        this.cacti[1].setPositionX(800);
        this.cacti[2].setPositionX(1000);

        this.tacos[0].setPositionX(500);
        this.tacos[1].setPositionX(800);
        this.tacos[2].setPositionX(950);
    }

    get isStarted() {
        return this.started;
    }
}