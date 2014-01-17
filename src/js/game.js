var Game = {
    init: function(endless) {
        var self = this;
        this.endless = endless;

        $("#menu").hide();
        $("#game").show().removeClass("twox");
        $("#timer").removeClass("freeze");

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
            if(Game.freeze <= 0){
                Game.freeze = false;
                $("#timer").removeClass("freeze");
            }
        }else{
            Game.time -= 1;
        }
        $("#timer").text(Game.timeFormat());

        if(Game.twox !== false){
            Game.twox -= 1;
            if(Game.twox <= 0){
                Game.twox = false;
                $("#game").removeClass("twox");
            }
        }

        if(Game.time <= 0){
            Game.over();
            return false;
        }

        window.setTimeout(Game.updateTime, 1000);
    },

    timeFormat: function() {
        var m = Math.floor(Game.time / 60);
        var s = Game.time % 60;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        return m + ":" + s;
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
            $("#word").removeClass();
            setTimeout(function(){
                $("#word").addClass("badword");
            },1);
        }else if(DICTIONARY.indexOf(word) > -1){

            $("#word").removeClass();
            setTimeout(function(){
                $("#word").addClass("goodword");
            },1);

            this.playedWords.push(word);
            this.updatePoints();
            this.playing.forEach(function(e,i,a) {
                e.play();
            });
        }else{
            $("#word").removeClass();
            setTimeout(function(){
                $("#word").addClass("badword");
            },1);
        }

        this.playing.forEach(function(e,i,a) {
            e.used(false);
        });

        this.playing = [];
        $("#word").html("");
    },

    updatePoints: function() {
        $("#stack td").removeClass("dance");
        setTimeout(function(){
            $("#stack td").addClass("dance");
        },1);

        var p = this.playing.map(function(e, i){
            return e.points();
        });

        var points = p.reduce(function(c, p) {
            return c+p;
        });

        var multi = (this.twox === false) ? 1 : 2;

        this.points += points * multi;

        if(this.endless) this.time += points;

        $("#points").text(this.points + " points");
    },

    activatePowerUp: function(p, t) {
        if(p === "freeze"){
            this.freeze = (this.freeze === false) ? 10 : this.freeze + 10;
            $("#timer").addClass("freeze");
        }else if(p === "twox"){
            this.twox = (this.twox === false) ? 10 : this.twox + 10;
            $("#game").addClass("twox");
        }else if(p === "adjacent"){
            var at = this.adjacentTiles(t);
            at.forEach(function(e, i, a) {
                e.maxOut();
            });
        }
    },

    adjacentTiles: function(t, hash) {
        var ti  = this.tiles.indexOf(t);
        var at = [];
        var ha = {};

        if(ti > 4){
            at.push(this.tiles[ti-5]);
            ha["up"] = this.tiles[ti-5];
        }

        if(ti < 20){
            at.push(this.tiles[ti+5]);
            ha["down"] = this.tiles[ti+5];
        }

        if(ti % 5 !== 0){
            at.push(this.tiles[ti - 1]);
            ha["left"] = this.tiles[ti-1];
        }

        if((ti+1) % 5 !== 0){
            at.push(this.tiles[ti + 1]);
            ha["right"] = this.tiles[ti+1];
        }

        return (hash) ? ha : at;
    },

    tiltAdjacentTiles: function(tile, tilt){
        var tiles = this.adjacentTiles(tile, true);
        if(tilt){
            for(var direction in tiles){
                tiles[direction].el.addClass("tilt-" + direction);
            }
        }else{
            for(var direction in tiles){
                tiles[direction].el.removeClass("tilt-" + direction);
            }
        }
    }
}
