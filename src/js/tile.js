var Tile = function(t, el, g) {

    this.init = function() {
        var self = this;
        this.render();


        this.el.on(window.tapin, function() {
            Game.tiltAdjacentTiles(self, true);
            $("#tap")[0].load();
            $("#tap")[0].play();
            if(self.used()) return false;
            self.used(true);
            Game.playLetter(self);
            return false;
        });

        this.el.on(window.tapout, function() {
            Game.tiltAdjacentTiles(self, false);
        });
    }

    this.render = function() {
        this.el.text(this.al);
        this.el.append($("<small>").text(this.points()));
        this.el.removeClass();
        this.el.addClass("av" + this.points());
    }

    this.maxOut = function() {
        if(!this.al) return false;
        this.av = 1;
        this.render();
        return true;
    }

    this.play = function() {
        this.av -= 1;
        if(this.av === 0){
            this.makePowerUp();
        }else{
            this.render();
        }
    }

    this.makePowerUp = function() {
        var that = this;
        var icons = ["fire", "time", "move"];
        var choices = ["twox", "twox","twox","twox","twox","twox","twox","freeze", "adjacent","adjacent","adjacent"];
        var choice = choices[Math.floor(Math.random() * choices.length)];

        var icon = icons[choices.indexOf(choice)];
        console.log(icon);

        this.al = false;
        this.av = false;

        this.el.html("");
        this.el.append(
            $("<span>").addClass("glyphicon glyphicon-" + icon)
        );

        this.el.attr("data-power", choice);
        this.el.addClass(choice);

        this.el.unbind();
        this.el.on(window.tapin, function() {
            Game.activatePowerUp($(this).attr("data-power"), that);
            that.makeTile();
            return false;
        });
    }

    this.makeTile = function() {
        this.el.unbind();
        this.el.removeClass();
        var t = BoardGen.getTile();
        this.al = t[0];
        this.av = t[1];
        this.used(false);
        this.init();
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

    this.al = t[0];
    this.av = t[1];
    this.el = $(el);
    this.el.removeClass();
    this.used(false);
    this.init();

}
