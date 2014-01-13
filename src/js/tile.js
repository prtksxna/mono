var Tile = function(t, el, g) {

    this.init = function() {
        var self = this;
        this.render();


        this.el.on("click", function() {
            if(self.used()) return;
            self.used(true);
            Game.playLetter(self);
        });
    }

    this.render = function() {
        this.el.text(this.al);
        this.el.append($("<small>").text(this.points()));
    }

    this.play = function() {
        this.av -= 1;
        if(this.av === 0){
            this.refresh();
        }else{
            this.render();
        }
    }

    this.refresh = function() {
        if(this.type === "l"){
            this.makePowerUp();
        }else{
            this.makeLetter();
        }
    }

    this.makePowerUp = function() {
        var choices = ["2x", "fr", "<>"];
        var choice = choices[Math.floor(Math.random() * 3)];
        this.el.text(choice);
    }

    this.used = function(v) {
        if(v !== undefined) this.used_val = v;

        if(this.used_val){
            this.el.addClass("used");
        }else{
            this.el.removeClass("used");
        }

        return this.used_val;
    }

    this.points = function() {
        var v = ["a", "e", "i", "o", "u"];
        var total = (v.indexOf(this.al) > -1) ? 6 : 4;
        return total - this.av;
    }

    this.type = "l"; // l for letter, p for powerup
    this.al = t[0];
    this.av = t[1];
    this.el = $(el);
    this.used(false);
    this.init();

}
