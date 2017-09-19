/* Javascript for CommunityEyesXBlock. */
function CommunityEyesXBlock(runtime, element) {

    $(window).on('resize', function () {
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
}
