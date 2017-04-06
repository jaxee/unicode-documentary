$( document ).ready(function() {
    var sections = ["uniWhat", "uniImportance", "uniTechnical", "uniGlobalization", "uniPreservation", "uniReferences"];
    
    $(".uniWhat").children('img').addClass("selected");

    $(".arrow").click(function() {
        $.scrollify.move("#what");
    });

    $(".uniWhat").click(function() {
        $.scrollify.move("#what");
    });

    $(".uniImportance").click(function() {
        $.scrollify.move("#importance");
    });

    $(".uniTechnical").click(function() {
        $.scrollify.move("#technical");
    });

    $(".uniGlobalization").click(function() {
        $.scrollify.move("#globalization");
    });

    $(".uniPreservation").click(function() {
        $.scrollify.move("#preservation");
    });

    $(".uniReferences").click(function() {
        $.scrollify.move("#references");
    });

    // $(function backToTop() {
    //     $('.navigation').css("display", "none");
    //     window.location.replace("http://localhost:4002/#home");
    // });

    $(function() {
        $.scrollify({
            section : ".scrollT",
            sectionName : "section-name",
            before:function() {
                var current = $.scrollify.current();
                changeNav(current[0].id);

                if (current[0].id == "homePage") {
                        $('.navigation').fadeOut(300);
                        $('.navigation').css("display", "none");
                } else {
                    $('.navigation').fadeIn(500);
                }


            }
        });
        function changeNav(scrolledID){
            for(var i in sections){
                var el = document.getElementsByClassName(sections[i]);
                if(sections[i] == scrolledID){
                    $(el).children('img').addClass("selected");
                    continue;
                }
                
                $(el).children('img').removeClass("selected");
            }
        }
    });
});