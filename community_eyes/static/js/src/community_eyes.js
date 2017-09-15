/* Javascript for CommunityEyesXBlock. */
function CommunityEyesXBlock(runtime, element) {
    var $element = $(element);

    applyClassIfZoomed($element, getZoomLevel());

    // onResize event can also catch zoom
    $(window).on('resize', function () {
        applyClassIfZoomed($element, getZoomLevel());
        var windowAspectRatio = this.innerWidth / this.innerHeight;
        var imageAspectRatio = 1.6;
        var aspectRatioDelta = (windowAspectRatio - imageAspectRatio) / imageAspectRatio;

        if (windowAspectRatio >= imageAspectRatio) {
            var imageStretch = 100 + aspectRatioDelta * 100;

            $('#container, .expander-image')
                .css('background-size', '100% ' + imageStretch + '%')
                .css('background-position', '0 ' + aspectRatioDelta * 50 + '%');
        }
        else {
            var imageStretch = 100 - aspectRatioDelta * 100;

            $('#container, .expander-image')
                .css('background-size', imageStretch + '% 100%')
                .css('background-position', '-' + aspectRatioDelta * 50 + '% 0');
        }


    });

    function getZoomLevel() {
        var screenCssPixelRatio = (window.outerWidth - 8) / window.innerWidth;

        if (screenCssPixelRatio <= 1.10) {
            return 0;
        } else if (screenCssPixelRatio <= 1.32) {
            return 1;
        } else if (screenCssPixelRatio <= 1.58) {
            return 2;
        } else if (screenCssPixelRatio <= 1.90) {
            return 3;
        } else if (screenCssPixelRatio <= 2.28) {
            return 4;
        } else if (screenCssPixelRatio <= 2.70) {
            return 5;
        } else {
            return undefined;
        }
    }

    function applyClassIfZoomed($el, zoomLevel) {
        if(zoomLevel >= 2) {
            $el.addClass('zoomed');
        } else {
            $el.removeClass('zoomed');
        }
    }
}
