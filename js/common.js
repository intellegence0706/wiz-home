var _ua = {
    IE: document.uniqueID,
    Mobile: typeof window.orientation != 'undefined'
};

(function() {
    var $html = $('html');
    if (_ua.IE) $html.addClass('IE');
    if (_ua.Mobile) $html.addClass('Mobile');
})();

$(function() {
    tel_no();
    set_nav();
    set_fixnav();
    smooth_scroll();
});

$(window).on('load', set_init);

function set_init() {
    $('body').addClass('-load');
}

function tel_no() {
    if (_ua.Mobile) return;
    $('a[href^="tel:"]').removeAttr('href');
}

function set_nav() {
    $('.cmnnav li').each(function(index, el) {
        $(this).css('transition-delay', index * 0.05 + 's');
    });
    $('#cmnmenu').on('click', function() {
        $(this).toggleClass('-open');
        $('#cmnnav').fadeToggle(300, function() {
            $('#cmnnav').toggleClass('-open');
        }).css('display', 'flex');
    });
}

function set_cmnparallax() {
    var cmnparallax = function() {
        var st = $(window).scrollTop();
        var wh = $(window).height();
        var ww = $(window).width();

        if (st >= wh / 2) {
            $('#cmnfixnav, #cmnfixrec').addClass('-show');
        } else {
            $('#cmnfixnav, #cmnfixrec').removeClass('-show');
        }
    };

    cmnparallax();
    $(window).scroll(cmnparallax);
    $(window).resize(cmnparallax);
    $('body').bind('touchmove', cmnparallax);
}

function set_fixnav() {
    if ($('.cmnhd_anchor').length >= 1) {
        $('.cmnhd_anchor').clone(true).attr({
            id: 'cmnfixnav',
            class: 'cmnfixnav'
        }).appendTo('body');
        set_cmnparallax();
    }

    if ($('.cmnhd_recruit').length >= 1) {
        $('.cmnhd_recruit').clone(true).attr({
            id: 'cmnfixrec',
            class: 'cmnfixrec'
        }).appendTo('body');
        set_cmnparallax();
    }
}

function smooth_scroll() {
    $('a[href^="#"]').on('click', function() {
        var speed = 500,
            def_offset = 0,
            href = $(this).attr('href'),
            offset = $(this).data('offset') != null ? $(this).data('offset') : 0,
            target = $(href == '#' || href == "" ? 'html' : href),
            position = target.offset().top + def_offset + offset;
        window.scrollTo({
            top: position,
            behavior: "smooth"
        });
        return false;
    });
}

function get_param(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function archive_change(op) {
    var i = op.selectedIndex,
        link = op.options[i].value;
    location.href = link;
}