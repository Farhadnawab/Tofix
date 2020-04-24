function initializeVideo(elem){
    $(elem).each(function(){
        $(this)[0].play();
        $(this)[0].loop = true;
    });
}
$(document).ready(function() {
    setTimeout(function() {

        document.getElementById("sh").style.opacity=1;
        var clone = $(".slideshow .grid").clone();
        clone.appendTo(".slideshow .grid").addClass("duplicated");
        clone.prependTo(".slideshow .grid").addClass("duplicated");

    }, 200)

    initializeVideo(".video-elem");
});