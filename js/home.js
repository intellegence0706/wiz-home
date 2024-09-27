function set_hero_start() {
    $('.hero_slide_item').each(function(index, el) {
        var $rect = $(this).find('rect');
        var total = $rect.length;

        $rect.each(function() {
          $rect.eq(Math.floor(Math.random() * total)).prependTo($(this).parent());
        });

        $(this).find('rect').each(function(index, el) {
            $(this).css('transition-delay', index * 0.1 + 's');
        });
    });

    function change_slide() {
        var current_index = $('.hero_slide_item:last').data('index') % 3 + 1;

        $('.hero_slide_item').last().addClass('-fadeout');
        $('#hero_count_current_list').css('margin-top', ((current_index - 1) * -3) + "em");

        setTimeout(function(){
            $('.hero_slide_item').last().removeClass('-fadeout').prependTo('#hero_slide');
        }, 2000);

        $('.about_slide_list').each(function() {
            $(this).slick('slickNext');
        });
        setTimeout(change_slide, 6000);
    }

    $(window).on('load', function(event) {
        $('body').addClass('-load');
        setTimeout(function(){
            $('#opening').remove();
            change_slide();
        }, 7000);
    });

}
set_hero_start();

function set_about_slide() {
    $('.about_slide_list').each(function(index, el) {
        $(this).slick({
            arrows: false,
            dots: false,
            fade: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            speed: 2000,
            pauseOnHover: false,
            draggable: false
        });
    });
}

function set_works_slide() {
    $works_slide = $('#works_slide');
    $works_slide.slick({
        arrows: false,
        dots: false,
        fade: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        draggable: true,
        responsive: [{
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
            }
        }]
    });

    $('#works_slide_prev').on('click', function() {
        $works_slide.slick('slickPrev');
    });

    $('#works_slide_next').on('click', function() {
        $works_slide.slick('slickNext');
    });
}

function set_recruit_slide() {
    var current_slide = 1;
    var max_slide = $('#recruit_slide_list').children().length;
    var arr_imgs = [];
    var timer;
    var t_interval = 4000;

    // 初期設定
    function init_slide() {

        // サブスライド・ページャー生成
        for (var i = 0; i < max_slide; i++) {
            $('#recruit_slide_nav').append('<li/>');

            if (i < max_slide - 1) {
                $('#recruit_sub').append('<li/>');
            }
        }

        // サブスライドの画像を設定
        var str_list = $('#recruit_slide_list').html();
        $('#recruit_sub > li')
            .html(str_list)
            .each(function() {
                var index = $(this).index() + 1;
                $(this).children().css('transition-delay', index * 0.2 + 's');
            });

        // クリックイベント
        $('#recruit_slide_nav > li, #recruit_sub > li > div').on('click', function() {
            clearInterval(timer);
            set_current($(this).index() + 1);
        });

        set_current(1);
    }

    function set_current(index) {

        // リセット
        $('#recruit_slide_list > div, #recruit_slide_nav > li, #recruit_sub > li > div').removeClass('-current');

        // カレントクラスを付与
        $('#recruit_slide_list > div').eq(index - 1).addClass('-current');
        $('#recruit_slide_nav > li').eq(index - 1).addClass('-current');

        $('#recruit_sub > li').each(function() {
            var current_sub = (index + $(this).index()) % max_slide;
            $(this).children('div').eq(current_sub).addClass('-current');
        });
    }

    function auto_slide() {
        var next_slide = current_slide % max_slide + 1;
        set_current(next_slide);

        current_slide++;
    }

    init_slide();

    // 画像読み込み完了後の処理
    $(window).on('load', function() {
        timer = setInterval(auto_slide, t_interval);
    });

}

set_about_slide();
set_works_slide();
set_recruit_slide();