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
        this.el.append($("<small>").text(this.av));
    }

    this.play = function() {
        this.av -= 1;
        if(this.av === 0) console.log("wat");
        this.used(false);
        this.render();
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

    this.type = "l"; // l for letter, p for powerup
    this.al = t[0];
    this.av = t[1];
    this.el = $(el);
    this.used(false);
    this.init();

}
