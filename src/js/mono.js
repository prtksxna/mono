var UI = {

    init: function() {
        this.initUI();
        this.initObservers();
    },


    initObservers: function() {
        $("#time_trial").on("click", function() {
            Game.init(false);
        });
        $("#del").on("click", function() {
            Game.del();
        });

        $("#play").on("click", function() {
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

$(function() {
    UI.init();
});


$(window).resize(function(){
    UI.resizeUI();
});
