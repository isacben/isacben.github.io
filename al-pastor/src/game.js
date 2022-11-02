import Entity from "./entity.js";
import Player from "./player.js";

/** @type {HTMLCanvasElement} */

export default class Game {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    player = new Player();
    jump = false;
    started = false;

    ground = new Entity("ground", {x: 0, y: 250}, {w: 900, h: 10}, "#5d6872");
    things = [this.ground];

    tacoTimer = 0;
    tacoInterval = 300;

    enemyTimer = 0;
    enemyInterval = 300;

    constructor() {
        this.canvas.width = 300;
        this.canvas.height = 300;
        document.addEventListener("keydown", (ev) => this.handleKey(ev, true));
        document.addEventListener("keyup", (ev) => this.handleKey(ev, false));
        document.addEventListener("touchstart", (ev) => this.handleMouse(true));
        document.addEventListener("touchend", (ev) => this.handleMouse(false));
    }

    tick(){

        this.ctx.fillStyle = "#aae0f3";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.showScore(this.player.getScore);

        if (this.started) {
            this.addTaco();
            this.addEnemy();

            // move the ground
            this.things[0].move(2);
        } 

        if (this.jump & this.started) {
            this.player.jump();
        }

        this.player.tick(this.things);
        this.player.animate(this.ctx);

        this.things.forEach(thing => {
            if (thing.type === "taco") {
                thing.move(2);
            } else if (thing.type === "enemy") {
                thing.move(3);
            }
            thing.draw(this.ctx);
        });

        this.deleteThing(); 
        this.gameOver();
    }

    addTaco(){
        if (this.tacoTimer > this.tacoInterval) {
            this.things.push(
                new Entity(
                    "taco",
                    {x: 300, y:100},
                    {w: 32, h: 32},
                    "#be955c"
                )
            );
            //console.log(this.things) 
            this.tacoTimer = Math.floor(Math.random() * 3) * 100;
        } else {
            this.tacoTimer++;
        }
    }

    addEnemy(){
        if (this.enemyTimer > this.enemyInterval) {
            this.things.push(
                new Entity(
                    "enemy",
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
    }

    deleteThing(){
        this.things.forEach(function(thing, index, object) {
            if (thing.pos.x + thing.size.w < 0) {
              object.splice(index, 1);
            }
        });
    }

    showScore(score) {
        // this.ctx.fillStyle = "black";
        // this.ctx.font = "16px Arial";
        // this.ctx.textAlign = "right";
        // this.ctx.fillText(score, 290, 25);
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
            this.things[0].move(0);
            document.getElementById("game-over").style = "display:block";
        }
    }

    restart() {
        this.player.resetPlayer();
        this.started = true;
        this.things = this.things.slice(0, 1)
        this.jump = false;
    }

    get isStarted() {
        return this.started;
    }
}