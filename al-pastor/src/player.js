import Entity from "./entity.js";
import {ZZFX, zzfx} from './ZzFX.js'

export default class Player extends Entity {
    vel = {x: 0, y: 0};
    grounded = false;
    gravity = 0.5;
    jumpForce = 11;
    score = 0;
    hit = false;
    isStarted = false;
    status = "idle";
    frameTimer = 0;
    frameTrigger = 4;
    frame = 1;

    constructor() {
        super("player", {x: 20, y: 250 - 60}, {w: 48, h: 60});
        this.playerImage = document.getElementById("player");
    }

    jump() {
        if (this.grounded & !this.hit) {
            this.vel.y += this.jumpForce;
            this.frameTimer = 0;
            this.status = "jumping";
            zzfx(...[.8,,471,.04,.02,.06,2,.87,3.3,,,,,,,,,.61,.04]);
        }
    }

    tick(ground, cacti, tacos) {
        this.frameTimer++;
        this.pos.y -= Math.floor(this.vel.y);
        this.grounded = false;

        if (this.checkCollision(ground)) {
            this.pos.y -= this.bounds.bottom - ground.bounds.top;
            this.vel.y = 0;
            this.grounded = this.pos.y < ground.getPosition.y;
        }
        this.vel.y -= this.gravity;

        cacti.forEach((cactus) => {
            if (this.checkCollision(cactus) && !this.hit) {
                this.vel.y = 0;
                this.vel.y += 8;
                this.hit = true;
                this.status = "lost";
                zzfx(...[1.15,0,79,.03,.01,.08,2,2.14,,-0.6,,,,.8,,.4,,.65,.03,.12]);
            }
        });

        tacos.forEach((taco) => {
            if (this.checkCollision(taco) && !this.hit) {
                zzfx(...[1.02,0,1300,.01,.04,.18,1,1.07,,,-50,.02,,,,,,.58,.02]);
                taco.setPositionX(-70);
                this.score++;
            }
        });

        if (this.grounded && !this.hit && this.isStarted) {
            this.status = "running";
        }

    }

    animate(ctx) {
        switch (this.status) {
            case "idle":
                ctx.drawImage(this.playerImage, 0, 0, 60, 60, this.pos.x, this.pos.y, 60, 60);
                break;
            case "lost":
                ctx.drawImage(this.playerImage, 480, 0, 60, 60, this.pos.x, this.pos.y, 60, 60); //60*8
                break;
            case "jumping":
                ctx.drawImage(this.playerImage, 420, 0, 60, 60, this.pos.x, this.pos.y, 60, 60); //60*7
                break;
            case "running":
                if (this.frameTimer % this.frameTrigger === 0) {
                    if (this.frame === 6) {
                        this.frame = 1;
                    } else {
                        this.frame += 1;
                    }
                }
                const frame = this.frame*60;
                ctx.drawImage(this.playerImage, frame, 0, 60, 60, this.pos.x, this.pos.y, 60, 60);
                break;
        }
    }

    get getScore() {
        return this.score;
    }

    get getHit() {
        return this.hit;
    }

    resetPlayer() {
        this.score = 0;
        this.hit = false;
        this.isStarted = true;
        this.frameTimer = 0;
    }
}