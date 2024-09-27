function set_works_slide() {

	$post_slide_list = $('#post_slide_list');
	$post_slide_list.slick({
        arrows: false,
        dots: false,
        fade: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        draggable: true,
        asNavFor: '#post_thumb_list',
    });

    $('.post_slide_arrow.-prev').on('click', function() {
    	$post_slide_list.slick('slickPrev');
    });

    $('.post_slide_arrow.-next').on('click', function() {
    	$post_slide_list.slick('slickNext');
    });

    $post_thumb_list = $('#post_thumb_list');
    $post_thumb_list.slick({
        arrows: false,
        dots: false,
        fade: false,
        centerMode: true,
        variableWidth: true,
        infinite: false,
        autoplay: false,
        draggable: true,
        swipeToSlide: true,
        focusOnSelect: true,
        asNavFor: '#post_slide_list',
    });

    $('.post_thumb_arrow.-prev').on('click', function() {
    	$post_thumb_list.slick('slickPrev');
    });

    $('.post_thumb_arrow.-next').on('click', function() {
    	$post_thumb_list.slick('slickNext');
    });

}

set_works_slide();