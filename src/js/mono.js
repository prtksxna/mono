var UI = {

    init: function() {
        this.initUI();
        this.initObservers();
    },


    initObservers: function() {
        $("#time_trial").on(window.tap, function() {
            Game.init(false);
        });

        $("#endless_mode").on(window.tap, function() {
            Game.init(true);
        });


        $("#del").on(window.tap, function() {
            Game.del();
        });

        $("#play").on(window.tap, function() {
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
        if($(document).width() < $(document).height()){
            $("#container").removeClass("compress");
            $("body").css("font-size", ($(window).height()/100.0));
        }else{
            $("#container").addClass("compress");
            $("body").css("font-size", ($("#container").height()/100.0));
        }
    }
};


$(document).ready(function() {
    // are we running in native app or in browser?
    window.isphone = false;
    if(document.URL.indexOf("http://") === -1
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true;
    }

    window.tap = (window.isphone) ? "touchstart" : "click";

    if(window.isphone) {
        document.addEventListener("deviceready", UI.init, false);
    } else {
        UI.init();
    }
});

$(window).resize(function(){
    UI.resizeUI();
});
