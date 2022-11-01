export default class Entity {
    type = "";
    pos = {x: 0, y: 0};
    size = {w: 0, h: 0};
    color = "";
    img = new Image();

    constructor(type, pos, size, color) {
        this.type = type;
        this.pos = pos;
        this.size = size;
        this.color = color;
    }

    draw(ctx) {
        if (this.type === "taco") {
            this.img.src = "../img/".concat(this.type, ".png");
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(this.img, this.pos.x, this.pos.y, 10*3, 8*3);
        } else if (this.type === "ground") {
            this.img.src = "./../img/".concat(this.type, ".png");
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(this.img, this.pos.x, this.pos.y, 360*3, 20*3);
        } else if (this.type === "enemy") {
            this.img.src = "../img/".concat("cactus", ".png");
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(this.img, this.pos.x, this.pos.y, 14*3, 20*3);
        }
        else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
        }
    }

    move(vel) {
        this.pos.x += -vel;
        if (this.pos.x === -720 && this.type === "ground") {
            //console.log(this.pos.x);
            this.pos.x = 0;
        }
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