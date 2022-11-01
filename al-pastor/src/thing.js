import Entity from "./entity.js";

export default class Thing extends Entity {
    vel = {x: -1, y: 0};

    tick() {
        this.pos.x += this.vel.x;
    }
}