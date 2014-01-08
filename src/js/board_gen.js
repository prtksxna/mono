var BoardGen = {
    init: function() {
        this.letters = [];
        this.populate();
    },

    populate: function() {
        this.pushLetter("e", 850);
        this.pushLetter("t", 850);
        this.pushLetter("a", 700);
        this.pushLetter("o", 701);
        this.pushLetter("n", 674);
        this.pushLetter("i", 650);
        this.pushLetter("h", 609);
        this.pushLetter("r", 599);
        this.pushLetter("s", 550);
        this.pushLetter("d", 425);
        this.pushLetter("l", 402);
        this.pushLetter("c", 278);
        this.pushLetter("u", 255);
        this.pushLetter("m", 241);
        this.pushLetter("w", 236);
        this.pushLetter("f", 223);
        this.pushLetter("g", 201);
        this.pushLetter("y", 196);
        this.pushLetter("p", 192);
        this.pushLetter("b", 149);
        this.pushLetter("v", 130);
        this.pushLetter("k", 130);
        this.pushLetter("q", 100);
        this.pushLetter("j", 100);
        this.pushLetter("z", 60);
        this.pushLetter("x", 60);
    },

    pushLetter: function(l, t) {
        for(var i = 0; i < t; i++) {
            this.letters.push(l);
        }
    },

    getBoard: function() {
        var o = this.letters;
        var v = ["a", "e", "i", "o", "u"];
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        o = o.slice(0,25);

        if(o.indexOf("q") > -1 && o.indexOf("u") < 0){
            o[Math.floor(Math.random() * 25)] = "u";
        }

        var b = [];

        for(var i = 0; i < o.length; i++) {
            var e = o[i];
            var av = (v.indexOf(e) > -1) ? 5 : 3;
            b.push([e, av]);
        }

        return b;
    }
}
