function set_schedle_tt() {
    var $tt = $('#schedule_tt');

    var update_progress = function() {
        var wrapper_width = $tt.width();
        var content_width = $tt.children().outerWidth();

        var progress = Math.floor( $tt.scrollLeft() / (content_width - wrapper_width) * 100);
        $('#schedule_progress > span').css('width', progress + '%');
    };
    update_progress();
    $tt.on('scroll', update_progress);
    $(window).on('resize', update_progress);

    var scroll_range = $tt.width() / 2;
    $('#schedule_tt_prev').on('click', function() {
        $tt.animate({scrollLeft: $tt.get(0).scrollLeft - scroll_range});
    });
    $('#schedule_tt_next').on('click', function() {
        $tt.animate({scrollLeft: $tt.get(0).scrollLeft + scroll_range});
    });
}
set_schedle_tt();


function set_other_slide() {

    // 自信のスライドを削除
    var current = $('body').data('interview');
    $('.other_slide_item').eq(current - 1).remove();

    $other_slide_list = $('#other_slide_list');
    $other_slide_list.slick({
        arrows: false,
        dots: false,
        fade: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        speed: 400,
        autoplaySpeed: 4000,
        pauseOnHover: false,
        swipeToSlide: true,
        draggable: true,
        responsive: [{
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                infinite: true,
                autoplay: true,
            }
        }]
    });

    $('#other_slide_prev').on('click', function() {
        $other_slide_list.slick('slickPrev');
    });

    $('#other_slide_next').on('click', function() {
        $other_slide_list.slick('slickNext');
    });

    $other_slide_list.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
        $other_slide_list.find(".slick-slide").each((index, el) => {
            const $this = $(el),
                slickindex = $this.attr("data-slick-index");
            if (nextSlide == slick.slideCount - 1 && currentSlide == 0) {
                if (slickindex == "-1") {
                    $this.addClass("is-active-next");
                } else {
                    $this.removeClass("is-active-next");
                }
            } else if (nextSlide == 0) {
                if (slickindex == slick.slideCount) {
                    $this.addClass("is-active-next");
                } else {
                    $this.removeClass("is-active-next");
                }
            } else {
                $this.removeClass("is-active-next");
            }
        });
    });
}
set_other_slide();

$("#schedule_tt").mousedragscrollable();