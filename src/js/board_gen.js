var BoardGen = function(){

    letters = [];
    populate();

    function populate() {
        pushLetter("e", 850);
        pushLetter("t", 850);
        pushLetter("a", 700);
        pushLetter("o", 701);
        pushLetter("n", 674);
        pushLetter("i", 650);
        pushLetter("h", 609);
        pushLetter("r", 599);
        pushLetter("s", 550);
        pushLetter("d", 425);
        pushLetter("l", 402);
        pushLetter("c", 278);
        pushLetter("u", 255);
        pushLetter("m", 241);
        pushLetter("w", 236);
        pushLetter("f", 223);
        pushLetter("g", 201);
        pushLetter("y", 196);
        pushLetter("p", 192);
        pushLetter("b", 149);
        pushLetter("v", 130);
        pushLetter("k", 130);
        pushLetter("q", 100);
        pushLetter("j", 100);
        pushLetter("z", 60);
        pushLetter("x", 60);
    }

    function pushLetter(l, t) {
        for(var i = 0; i < t; i++) {
            letters.push(l);
        }
    }

    return {
        getBoard: function() {
            var o = letters;
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
        },

        getTile: function() {
            var o = letters;
            var v = ["a", "e", "i", "o", "u"];
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            var b = [];

            b[0] = o[0];
            b[1] = (v.indexOf(o[0]) > -1) ? 5 : 3;

            return b;
        }
    }
}();
