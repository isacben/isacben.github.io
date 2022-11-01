import Entity from "./entity.js";
import {ZZFX, zzfx} from './ZzFX.js'

export default class Player extends Entity {
    vel = {x: 0, y: 0};
    grounded = false;
    gravity = 0.2;
    jumpForce = 7.1;
    score = 0;
    hit = false;
    isStarted = false;
    img = new Image();
    status = "idle";
    frameTimer = 0;
    frameTrigger = 9;
    frame = 1;

    constructor() {
        super("player", {x: 20, y: 250 - 60}, {w: 48, h: 60}, "#9a4f50");
        this.img.src = "./al-pastor/img/player.png";
    }

    jump() {
        if (this.grounded & !this.hit) {
            zzfx(...[.8,,471,.04,.02,.06,2,.87,3.3,,,,,,,,,.61,.04]);
            this.vel.y += this.jumpForce;
            this.frameTimer = 0;
            this.status = "jumping";
        }
    }

    tick(entities) {
        this.frameTimer++;
        this.pos.y -= this.vel.y;

        this.grounded = false;

        entities.forEach((entity, index, object) => {
            if (entity.type === "ground") {
                if (this.checkCollision(entity)) {
                    /* this.pos.y -= 
                        this.vel.y > 0 
                        ? this.bounds.top - entity.bounds.bottom 
                        : this.bounds.bottom - entity.bounds.top; */
                    this.pos.y -= this.bounds.bottom - entity.bounds.top;
                    this.vel.y = 0;
                    this.grounded = this.pos.y < entity.getPosition.y;
                }
                this.vel.y -= this.gravity;
            } else if (entity.type === "taco") {
                if (this.checkCollision(entity) && !this.hit) {
                    object.splice(index, 1);
                    zzfx(...[1.02,0,1300,.01,.04,.18,1,1.07,,,-50,.02,,,,,,.58,.02]);
                    this.score++;
                }
            } else if (entity.type === "enemy" && !this.hit) {
                if (this.checkCollision(entity)) {
                    this.vel.y = 0;
                    this.vel.y += 5;
                    //object.splice(index, 1);
                    this.hit = true;
                    this.status = "lost";
                    zzfx(...[1.15,0,79,.03,.01,.08,2,2.14,,-0.6,,,,.8,,.4,,.65,.03,.12]);
                }
            }
        });

        if (this.grounded && !this.hit && this.isStarted) {
            this.status = "running";
        }

        if (this.vel.y > 0) {
            //console.log("UP");
        } else if (this.vel.y < 0 && !this.grounded && !this.hit && this.isStarted) {
            this.status = "jumping";
        }
    }

    animate(ctx) {
        ctx.imageSmoothingEnabled = false;
        switch (this.status) {
            case "idle":
                ctx.drawImage(this.img, 0, 0, 20, 20, this.pos.x, this.pos.y, 20*3, 20*3);
                break;
            case "lost":
                ctx.drawImage(this.img, 20*8, 0, 20, 20, this.pos.x, this.pos.y, 20*3, 20*3);
                break;
            case "jumping":
                ctx.drawImage(this.img, 20*7, 0, 20, 20, this.pos.x, this.pos.y, 20*3, 20*3);
                break;
            case "running":
                if (this.frameTimer % this.frameTrigger === 0) {
                    if (this.frame === 6) {
                        this.frame = 1;
                    } else {
                        this.frame += 1;
                    }
                    //console.log(this.frameTimer);
                }
                ctx.drawImage(this.img, this.frame*20, 0, 20, 20, this.pos.x, this.pos.y, 20*3, 20*3);
                break;
        }
    }

    //dropPlayer() {
        //this.vel.y += 5;
    //}

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