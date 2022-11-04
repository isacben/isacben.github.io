export default class Entity {
    type = "";
    pos = {x: 0, y: 0};
    size = {w: 0, h: 0};

    constructor(type, pos, size, img) {
        this.type = type;
        this.pos = pos;
        this.size = size;
        this.img = img;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.pos.x, this.pos.y);
    }

    move(vel) {
            this.pos.x += -vel;
            if (this.pos.x === -540 && this.type === "ground") {
                this.pos.x = 0
            }
    }

    setPositionX(posX) {
        this.pos.x = posX;
    }

    get getPosition() {
        return this.pos;
    }

    get bounds() {
        return {
            left: this.pos.x,
            right: this.pos.x + this.size.w,
            top: this.pos.y,
            bottom: this.pos.y + this.size.h,
        };
    }

    checkCollision(other) {
        return (
            this.bounds.left < other.bounds.right &&
            this.bounds.right > other.bounds.left &&
            this.bounds.top < other.bounds.bottom &&
            this.bounds.bottom > other.bounds.top
        );
    }

}