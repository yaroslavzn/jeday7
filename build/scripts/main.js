$(function () {

    $('#my-menu').mmenu({
        extensions: ['widescreen', 'theme-black', 'effect-menu-slide', 'pagedim-black'],
        navbar: {
            title: '<img src="images/logo-1.svg" alt="Салон красоты S&Mitler"/>'
        },
        offCanvas: {
            position: 'right'
        }
    });

    var api = $('#my-menu').data('mmenu');

    api.bind('opened', function () {
        $('.hamburger').addClass('is-active');
    });

    api.bind('closed', function () {
        $('.hamburger').removeClass('is-active');
    });


    $('.carousel-services-content').equalHeights();

    $('.carousel-services').on('initialized.owl.carousel', function () {
        setTimeout(carouselService, 500);
    });
    
    $('.carousel-services').owlCarousel({
        nav: true,
        dots: false,
        smartSpeed: 700,
        navText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            800: {
                items: 2
            },
            1100: {
                items: 3
            }
        }
    });

    function carouselService() {
        $('.carousel-services-item').each(function () {
            var $this = $(this);
            var $thisHeight = $this.find('.carousel-services-content').outerHeight();
            var $thisImage = $this.find('.carousel-services-image').css('min-height', $thisHeight);
        });
    }

    carouselService();


    $('.carousel-services-composition .h3').each(function () {
        var $this = $(this);
        $this.html($this.html().replace(/(\S+)\s*$/, '<span>$1</span>'));
    });

    $('section .h2').each(function () {
        var $this = $(this);
        $this.html($this.html().replace(/^(\S+)/, '<span>$1</span>'));
    });

    // Resize window



    function onResize() {
        $('.carousel-services-content').equalHeights();
    }onResize();

    window.onresize = function () {
        onResize();
    }
});