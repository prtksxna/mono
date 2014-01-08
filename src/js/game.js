var Game = {
    init: function(endless) {
        var self = this;
        this.endless = endless;

        $("#menu").hide();
        $("#game").show();

        $("#points").text("");
        $("#word").text("");

        this.time = 20;
        this.makeBoard();
        this.tiles = [];
        this.playing = [];
        this.playedWords = [];
        this.points = 0;

        this.updateTime();
    },

    updateTime: function() {
        Game.time -= 1;
        $("#timer h2").text(Game.time);
        if(Game.time <= 0){
            Game.over();
            return false;
        }

        window.setTimeout(Game.updateTime, 1000);
    },

    over: function() {
        alert("Game is OVAR!!! You scored "+this.points+"!");
        $("#menu").show();
        $("#game").hide();
    },

    makeBoard: function() {
        var t = BoardGen.getBoard();
        $("#stack td").each(function(i) {
            var tile = new Tile(t[i], this);
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
        }else if(Dict.isWord(word)){
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

        this.points += points;

        if(this.endless) this.time += points;

        $("#points")
            .text("")
            .append(
                $("<h2>")
                    .text(this.points)
            );
    }
}
