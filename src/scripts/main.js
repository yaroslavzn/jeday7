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

    $('select').selectize({
        create: true
    });

    $('.reviews').owlCarousel({
        loop: true,
        items: 1,
        smartSpeed: 700,
        nav: false
    });

    $('.partners').owlCarousel({
        loop: true,
        smartSpeed: 700,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });
    // Resize window



    function onResize() {
        $('.carousel-services-content').equalHeights();
    }onResize();

    window.onresize = function () {
        onResize();
    };

    //E-mail Ajax Send
    $("form.callback").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "/mail.php", //Change
            data: th.serialize()
        }).done(function() {
            $(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
            setTimeout(function() {
                // Done Functions
                $(th).find('.success').removeClass('active').fadeOut();
                th.trigger("reset");
            }, 3000);
        });
        return false;
    });
    
    // back to top button
    
    $(window).scroll(function () {
       if ($(this).scrollTop() > $(this).height()) {
           $('.top').addClass('active');
       } else {
           $('.top').removeClass('active');
       }
    });

    $('.top').click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 'slow', 'swing');
    });

    // preloader function

    $(window).on('load', function () {
        $('.preloader').delay(750).fadeOut('slow');
    });
});