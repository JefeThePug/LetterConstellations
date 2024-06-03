function Letter(position, letter) {
    this.pos = position;
    this.val = letter;
    this.s = 40;
    this.w = 40;
    if (this.val.length > 1) {
        this.pos.x += this.s;
        this.w = 120;
    }

    this.isClicked = function() {
        if (mouseIsPressed && abs(mouseX - this.pos.x) <= this.w / 2 && abs(mouseY - this.pos.y) <= this.s / 2) {
            return true;
        }
        return false;
    };
}

Letter.prototype.draw = function() {
    push();
    strokeWeight(5);
    textFont(fontShown);
    fill(255);
    textSize(25);
    if (this.isClicked()) {
        stroke(255, 255, 0);
    } else {
        stroke(85, 0, 190);
    }
    rect(this.pos.x, this.pos.y, this.w, this.s, 20);
    fill(0);
    noStroke();
    text(this.val, this.pos.x, this.pos.y - 3.5);
    pop();
};
