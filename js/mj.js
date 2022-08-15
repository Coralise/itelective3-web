function hoverCard() {
    $('.hover-card').hover(function() {
        $('.hc-image').addClass('notransition');
        $('.hc-image').css('transform', 'scale(0.9)');
        $('.hc-image').css('opacity', '0');
        $('.hc-image')[0].offsetHeight;
        $('.hc-image').removeClass('notransition');
        $('.hc-image').css('transform', 'scale(1)');
        $('.hc-image').css('opacity', '1');
        $('.hc-image').attr('src', $(this).data('imgSrc'));
    }, function() {
        $('.hc-image').css('transform', 'scale(0.9)');
        $('.hc-image').css('opacity', '0');
    });
}

function slideIn(jElm, startPos, pxs, duration) {
    
    if (jElm.hasClass('slid')) return;

    var transform;

    switch (startPos) {
        case 'top': {
            transform = 'translateY(' + pxs + ')';
            break;
        }
        case 'bottom': {
            transform = 'translateY(-' + pxs + ')';
            break;
        }
        case 'left': {
            transform = 'translateX(-' + pxs + ')';
            break;
        }
        case 'right': {
            transform = 'translateX(' + pxs + ')';
            break;
        }
    }

    jElm.css('transition', duration);
    jElm.removeClass('op0');
    jElm.addClass('slid');
    jElm.css('transform', 'none');
}

function slideOut(jElm, endPos, pxs, duration) {

    var transform;

    switch (endPos) {
        case 'top': {
            transform = 'translateY(' + pxs + ')';
            break;
        }
        case 'bottom': {
            transform = 'translateY(-' + pxs + ')';
            break;
        }
        case 'left': {
            transform = 'translateX(-' + pxs + ')';
            break;
        }
        case 'right': {
            transform = 'translateX(' + pxs + ')';
            break;
        }
    }

    jElm.css('transition', duration);
    jElm.addClass('op0');
    jElm.css('transform', transform);
    jElm.removeClass('slid');
}