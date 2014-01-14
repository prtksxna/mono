var Game = {
    init: function(endless) {
        var self = this;
        this.endless = endless;

        $("#menu").hide();
        $("#game").show();

        $("#points").text("");
        $("#word").text("");

        this.time = 120;
        this.tiles = [];
        this.makeBoard();
        this.playing = [];
        this.playedWords = [];
        this.points = 0;

        this.freeze = false;
        this.twox = false;

        this.updateTime();
    },

    updateTime: function() {
        if(Game.freeze !== false){
            Game.freeze -= 1;
            if(Game.freeze <= 0) Game.freeze = false;
        }else{
            Game.time -= 1;
        }
        $("#timer h2").text(Game.time);

        if(Game.twox !== false){
            Game.twox -= 1;
            if(Game.twox <= 0) Game.twox = false;
        }

        if(Game.time <= 0){
            Game.over();
            return false;
        }

        window.setTimeout(Game.updateTime, 1000);
    },

    over: function() {
        alert("Game is OVAR!!! You scored "+this.points+"!");
        $("#stack td").unbind();
        $("#menu").show();
        $("#game").hide();
    },

    makeBoard: function() {
        var self = this;
        var t = BoardGen.getBoard();
        $("#stack td").each(function(i) {
            var tile = new Tile(t[i], this);
            self.tiles.push(tile);
        });
    },

    playLetter: function(tile) {
        this.playing.push(tile);
        $("#word").append($("<span>").text(tile.al));
    },

    del: function() {
        if(this.playing.length === 0) return false;

        var t = this.playing.pop();
        t.used(false);

        $("#word span").last().remove();
        return t;
    },

    play: function() {
        if(this.playing.length === 0) return false;

        var word = this.playing.map(function(e, i){
            return e.al;
        }).join("");

        if(this.playedWords.indexOf(word) > -1){
            alert("You've played that before");
        }else if(true || DICTIONARY.indexOf(word) > -1){
            this.playedWords.push(word);
            this.updatePoints();
            this.playing.forEach(function(e,i,a) {
                e.play();
            });
        }else{
            alert("Not a word");
        }

        this.playing.forEach(function(e,i,a) {
            e.used(false);
        });

        this.playing = [];
        $("#word").html("");
    },

    updatePoints: function() {
        var p = this.playing.map(function(e, i){
            return e.points();
        });

        var points = p.reduce(function(c, p) {
            return c+p;
        });

        var multi = (this.twox === false) ? 1 : 2;

        this.points += points * multi;

        if(this.endless) this.time += points;

        $("#points")
            .text("")
            .append(
                $("<h2>")
                    .text(this.points)
            );
    },

    activatePowerUp: function(p, t) {
        console.log(p, t);
        console.log(this.tiles.indexOf(t));
        if(p === "fr"){
            this.freeze = (this.freeze === false) ? 10 : this.freeze + 10;
        }else if(p === "2x"){
            this.twox = (this.twox === false) ? 10 : this.twox + 10;
        }
    }
}
