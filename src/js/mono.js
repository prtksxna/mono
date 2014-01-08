var mono = {
    init: function() {
        this.initUI();
    },

    initUI: function() {
        this.resizeUI();
        $("#menu h1").addClass("active");
        $("#menu ul li a").addClass("active");
        $("#game").hide();
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
    mono.init();
});


$(window).resize(function(){
    console.log(1);
    mono.resizeUI();
});
