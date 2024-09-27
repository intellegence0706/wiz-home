function set_parallax() {
    var item_count = 4;

    var $depart_step;
    var list_top;
    var next_top;
    var item_height;
    var range;
    var arr_range = [];
    var progress = 0;

    var set_step = function() {
    	$depart_step = $('#depart_step');
    	list_top = Math.floor($depart_step.offset().top);
    	next_top = Math.floor($depart_step.offset().top + $depart_step.height());
    	item_height = $('#depart_list').height();
    	range = (next_top - list_top) / (item_count + 1);

    	var _step = list_top;
    	for (var i = 0; i < item_count; i++) {
    		var _arr = [];
    		_arr['min'] = Math.floor(_step);
    		_step = _step + range;
    		_arr['max'] = Math.floor(_step);

    		arr_range[i] = _arr;
    	}
    }
    set_step();
    $(window).resize(set_step);

    var parallax = function() {
        var st = $(window).scrollTop();

        var index = current_position(st);
        if(index !== undefined && !$('.depart_item').eq(index).hasClass('-current')) {
	    	$('.depart_item').removeClass('-current').eq(index).addClass('-current');
        }

        if(index !== undefined) {
			progress = get_progress(st, index);

			var offset = (progress + 1) * -239;
			var marume = 10;

			if(offset > -239 - marume) offset = -239;
			if(offset < (-239 * 2) + marume) offset = (-239 * 2);
			$('.depart_item.-current').find('.depart_indicator_circle circle').css('stroke-dashoffset', offset);
		}

    	// 現在の範囲内の配列を探す
        function current_position(st) {
        	for (var i = 0; i < arr_range.length; i++) {
        		if(arr_range[i].min <= st && st < arr_range[i].max) {
        			return i;
        		} else {
        			continue;
        		}
        	}
        }

        // 現在のカレントの進捗率
        function get_progress(st, index) {
        	return (st - arr_range[index].min) / (arr_range[index].max - arr_range[index].min);
        }

    };

    parallax();
    $(window).scroll(parallax);
    $(window).resize(parallax);
    $('body').bind('touchmove', parallax);
}

function set_interview() {
	$('#interview_nav_sum').html($('.interview_item').length);

	$interview_slide = $('#interview_list');
	$interview_slide.slick({
	    arrows: false,
	    dots: false,
	    fade: false,
	    infinite: true,
	    slidesToShow: 1,
	    slidesToScroll: 1,
	    autoplay: true,
	    speed: 400,
	    autoplaySpeed: 4000,
	    pauseOnHover: false,
	    swipeToSlide: true,
	    draggable: true
	});

	$('#interview_nav_prev').on('click', function() {
		$interview_slide.slick('slickPrev');
	});

	$('#interview_nav_next').on('click', function() {
		$interview_slide.slick('slickNext');
	});

	$interview_slide.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
		$('#interview_nav_current').html(nextSlide + 1);
		$interview_slide.find(".slick-slide").each((index, el) => {
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

set_parallax();
set_interview();
