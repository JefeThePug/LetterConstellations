function Star(position, target, tint) {
    this.position = position;
    this.target = target;
    this.diameter = random(1, 8);
    if (tint) {
        this.tint = 110;
        yellowStars++;
    } else {
        this.tint = 255;
    }
}

Star.prototype.update = function() {
    this.position = p5.Vector.lerp(this.position, this.target, 0.04);
};

Star.prototype.draw = function() {
    var alpha = noise(this.target.x, this.target.y, millis() / 1000.0);
    noStroke();
    fill(255, 255, this.tint, alpha * 255);
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
};
