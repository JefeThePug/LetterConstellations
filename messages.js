function Message(pos, txt) {
   this.pos = pos;
   this.txt = txt;
   if (this.txt.substr(0, 1) === "t") {
      this.halflife = 500;
      this.fontsize = 40;
   } else {
      this.halflife = 5000;
      this.fontsize = 50;
   }
}

Message.prototype.update = function() {
   this.halflife--;
   if (this.halflife <= 0) {
      return true;
   }
   return false;
};

Message.prototype.draw = function() {
   push();
   fill(255);
   textSize(this.fontsize);
   noStroke();
   if (this.txt.substr(0, 1) !== "W") {
      textFont(fontStars);
   } else {
      textSize(25);
   }
   var tint = noise(this.pos.x, this.pos.y, millis() / 1000.0);
   fill(255, 255, tint * 255);
   text(this.txt, this.pos.x, this.pos.y);
   pop();
};