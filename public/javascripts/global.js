$(document).ready(function () {
    var $grid = $('.grid').masonry({
        // options
        itemSelector: '.gridItem',
        columnWidth: '.gridItem',
        percentPosition: true,
        gutter: 10
    });

    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });

    $(".gridItem").hover(
        function () {
            $(this).find(".videoName").fadeIn(500);
            $(this).find(".videoDesc").fadeIn(500);
        }, function () {
            $(this).find(".videoName").fadeOut(500);
            $(this).find(".videoDesc").fadeOut(500);
        }
    );
});