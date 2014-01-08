var Game = {
    init: function(endless) {
        var self = this;
        this.endless = endless;

        $("#menu").hide();
        $("#game").show();

        this.makeBoard();
        this.tiles = [];
        this.playing = [];

        $("#del").on("click", function() {
            self.del();
        });
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
    }
}
