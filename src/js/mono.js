var UI = {

    init: function() {
        this.initUI();
        this.initObservers();
    },


    initObservers: function() {
        $("#time_trial").on(window.tapin, function() {
            Game.init(false);
        });

        $("#endless_mode").on(window.tapin, function() {
            Game.init(true);
        });


        $("#del").on(window.tapin, function() {
            Game.del();
        });

        $("#play").on(window.tapin, function() {
            Game.play();
        });

    },

    initUI: function() {
        this.resizeUI();
        this.renderRack();
        $("#menu h1").addClass("active");
        $("#menu ul li a").addClass("active");
        $("#game").hide();
    },

    renderRack: function() {
        var stack = $("#stack");
        for(var i = 0; i < 5; i++) {
            var tr = $("<tr>");
            for(var j = 0; j < 5; j++) {
                var td = $("<td>").text(i+j).attr("id", "cell_" + i + "_" + j);
                tr.append(td);
            }
            stack.append(tr);
        }

        $("#stack td").each(function() {
            var $this = $(this);
            $this.height($this.width());
        });
    },

    resizeUI: function() {
        var h = $(window).height();
        var w = $(window).width();

        if(w < h){
            $("#container").removeClass("compress");
            $("body").css("font-size", h/100.0);
        }else{
            $("#container").addClass("compress");
            $("body").css("font-size", ($("#container").height()/100.0));
        }

        var h2 = (h - w) / 3;
        $("#stack").width(w);
        $("#stack").height(w);
        $("#top_bar").height(h2);
        $("#rack").height(h2);
        $("#play").height(h2);

        $("#del").height(h2);
        $("#del").width(h2);
        $("#pause").height(h2);
        $("#pause").width(h2);

        $("#points").width((w-h2)/2);
        $("#timer").width((w-h2)/2);
    }
};


$(document).ready(function() {


    // are we running in native app or in browser?
    window.isphone = false;
    if(document.URL.indexOf("http://") === -1
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true;
    }

    window.tapin = (window.isphone) ? "touchstart" : "mousedown";
    window.tapout = (window.isphone) ? "touchend" : "mouseup";

    UI.init();
/*    if(window.isphone) {
        document.addEventListener("deviceready", function(){
            UI.init();
        }, true);
    } else {
        UI.init();
    }*/

});

$(window).resize(function(){
    UI.resizeUI();
});
