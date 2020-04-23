/*----------------------- VARIABLES ----------------------------------*/

//Change depending on the $breakpoints defined in portfolio.scss 
var isMobile = false,
isTablet = false,
isDesktop = false,
fancyScroll = null;

/*--------------------------NAVBAR-------------------------------------*/
(function ($) {

    /* Hamburger Toggle */
    $(document).on("click","#hamburger-toggle-btn",function(){
        $('body').toggleClass("hamburger-active");
    });

    /** Sticky Header **/
    Scroll = $(window).scrollTop();
    function StickyHeader(){		
        Scroll = $(window).scrollTop();
        
        if (Scroll >= 1)
            $("body").addClass('sticked');

        else
            $("body").removeClass('sticked');

            if (window.matchMedia('only screen and (max-width: 1200px)').matches) {
                $("body").addClass('sticked');
        }
    }
    StickyHeader();
    $(window).scroll(function(){
        StickyHeader();
    });

    /**change nav color depending on pages**/
      $("document").ready(function () {
         if ($('body').is('.services, .presentations-evenementielles, .presentations-commerciales, .templates-powerpoint, .supports-de-formation, .presentations-financieres, .pitchdecks') ) {
        $('#navbar').addClass('blue-text')
            
           $(".navbar .nav .has-dropdown").mouseenter(function () {
            $('#navbar').removeClass('blue-text');
        });
        $(".has-dropdown").mouseleave(function () {
            $('#navbar').addClass('blue-text');
        });}
        
    });



    /**change icon color**/
    $("document").ready(function () {
        $(".navbar .nav > ul ul.dropdown > li:nth-child(1) > a").mouseenter(function () {
            $(".service1").attr('src', '/assets/services/icons/commercial.svg');
        });
        $(".navbar .nav > ul ul.dropdown > li:nth-child(1) > a").mouseleave(function () {
            $(".service1").attr('src', '/assets/nav/icons/commercial.svg');
        });
         $(".navbar .nav > ul ul.dropdown > li:nth-child(2) > a").mouseenter(function () {
            $(".service2").attr('src', '/assets/services/icons/template.svg');
        });
        $(".navbar .nav > ul ul.dropdown > li:nth-child(2) > a").mouseleave(function () {
            $(".service2").attr('src', '/assets/nav/icons/template.svg');
        });
         $(".navbar .nav > ul ul.dropdown > li:nth-child(3) > a").mouseenter(function () {
            $(".service3").attr('src', '/assets/services/icons/finance.svg');
        });
        $(".navbar .nav > ul ul.dropdown > li:nth-child(3) > a").mouseleave(function () {
            $(".service3").attr('src', '/assets/nav/icons/finance.svg');
        });
         $(".navbar .nav > ul ul.dropdown > li:nth-child(4) > a").mouseenter(function () {
            $(".service4").attr('src', '/assets/services/icons/pitchdeck.svg');
        });
        $(".navbar .nav > ul ul.dropdown > li:nth-child(4) > a").mouseleave(function () {
            $(".service4").attr('src', '/assets/nav/icons/pitchdeck.svg');
        });
         $(".navbar .nav > ul ul.dropdown > li:nth-child(5) > a").mouseenter(function () {
            $(".service5").attr('src', '/assets/services/icons/keynote.svg');
        });
        $(".navbar .nav > ul ul.dropdown > li:nth-child(5) > a").mouseleave(function () {
            $(".service5").attr('src', '/assets/nav/icons/keynote.svg');
        });
         $(".navbar .nav > ul ul.dropdown > li:nth-child(6) > a").mouseenter(function () {
            $(".service6").attr('src', '/assets/services/icons/formation.svg');
        });
        $(".navbar .nav > ul ul.dropdown > li:nth-child(6) > a").mouseleave(function () {
            $(".service6").attr('src', '/assets/nav/icons/formation.svg');
        });
    });


}(jQuery));


/*-----------------------SCROLL SETUP----------------------------------*/
/*------------------- Enable or create horizontal scroll -----------------------------------*/
// On window load, execute scripts depending on the viewport size
function setHorizontalScroll() {
    if ($('html').hasClass('no-csstransitions')) {
        fancyScroll = new IScroll('#portfolio', { //commentary for default values
            scrollX: true, //false
            scrollY: true,  //true
            mouseWheel: true, //false
            bounceTime: 1000, //600
            deceleration: 0.006, //0.0006
            snap: 'li', //false (not a string)
            tap: true, //false : allows to click on mobile
            useTransform: false, //true 
            useTransition: false, //true 
            bindToWrapper: false //should be false, but is true
        });
    }
    else {
        fancyScroll = new IScroll('#portfolio', { //commentary for default values
            scrollX: true, //false
            scrollY: false,  //true
            mouseWheel: true, //false
            bounceTime: 1000, //600
            deceleration: 0.006, //0.0006
            snap: 'li', //false (not a string)
            tap: true, //false : allows to click on mobile
            bindToWrapper: false //should be false, but is true
        });
    }
}

function whatMedia() {
    //determine the media size
    if (window.matchMedia('only screen and (min-width: 1024px) and (orientation: landscape)').matches) {
        isMobile = false;
        isTablet = false;
        isDesktop = true;
    }
    else if (window.matchMedia('only screen and (min-width: 768px)').matches) {
        isMobile = false;
        isTablet = true;
        isDesktop = false;
    }
    else {
        isMobile = true;
        isTablet = false;
        isDesktop = false;
    }
}



//change the language from URL
//var address = window.location.href.toString();
//var langset = Localize.getLanguage();
//var res = address.match("/en");
//if ((res != null)) {
//    Localize.setLanguage('en');
//}


$(window).on('orientationchange resize', function () {
    /*iScroll needs to know the exact dimensions of both the wrapper and the scroller. They are computed at start up but if elements change in size, we need to tell iScroll that we are messing with the DOM using the refresh() function.
    */
    whatMedia();
    if (isDesktop) {
        if (fancyScroll) {
            setTimeout(function () {
                fancyScroll.refresh();
            }, 1000);
        }
        else {
            setHorizontalScroll();
        }
    }
    else {
        if (fancyScroll) {
            fancyScroll.scrollTo(0, 0);
            fancyScroll.destroy();
            fancyScroll = null;
        }
    }
});

$.fn.isOnScreen = function () {
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};

$(window).load(function () {
   
    $('.badge').on('tap', function replay() {
        $(this).get(0).play();
    });

    /*if desktop, open modal*/
     $('.navbar').on('tap', '.firephone', function () {
            if (window.matchMedia('only screen and (min-width: 1024px)').matches) {
               $('.phone-modal').toggleClass('in');
        }
        
    });

    /*if mobile or tablet, open phone app to call*/
    if (window.matchMedia('only screen and (max-width: 1024px)').matches) {
               $(".firephone").attr("href", "tel:33140404040");
        }

    /* Clicking on the scroll down button of each page goes to the next section, taking the navbar into account */
    $('.scroll-down').on('tap', 'label', function toNextSection() {
        var parent = $(this).closest('section.hero');
        console.log(parent.height() + 'px');

        $('html, body').animate({
            scrollTop: parent.height() - $('.navbar').height()
        }, 600);
        return false;
    });

    /* Clicking wherever outside the phone modal closes it */
    $('.phone-modal').on('tap', function () {
        $('.phone-modal').removeClass('in');
    });

    /* Videos only plays when they are in view */
    /* Scrolling also closes the phone modal */
    $(window).on('scroll', function modifyNavbar(e) {
        $('.phone-modal').removeClass('in');


        $('.badge').each(function playVideo() {
            if ($(this).isOnScreen() && !$(this).attr("data-played")) {
                $(this).get(0).play();
                $(this).attr("data-played", 1);
            }
        });
    });

    var size = parseInt($("body").css('font-size')) * 3.333;

    /* If mobile landscape */
    if (window.matchMedia('only screen and (min-width: 480px) and (max-width: 768px) and (orientation: landscape)').matches) {
        $('body:not(.homepage) .hero-title').fitText(1, { maxFontSize: (size * 0.7) + 'px', minFontSize: '10px' });
        $('body.homepage .hero-title').fitText(1, { maxFontSize: (size * 0.8) + 'px', minFontSize: '10px' });
        
    }
    /* all others devices */
    else {
        $('body:not(.homepage) .hero-title').fitText(1, { maxFontSize: size + 'px', minFontSize: '10px' });
        $('body.homepage .hero-title').fitText(3, { maxFontSize: '60px', minFontSize: '28px' });
        $('body.search .hero-title').fitText(3, { maxFontSize: '52px', minFontSize: '28px' });
        
    }

    /*Scroll Reveal*/
    //Defaults
    window.sr = ScrollReveal(
         {
             origin: 'bottom',
             distance: '20px',
             duration: 2200,
             opacity: 0,
             scale: 1,
             reset: 'true',
             easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
         }
         );

    var textReveal = {
        //scrollreveal
        origin: 'bottom',
        distance: '30px',
        duration: 1500,
        opacity: 0,
        scale: 1,
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
    };

    var prodReveal = {
        //scrollreveal
        //origin: 'right',
        //distance: '500px',
        origin: 'left',
        distance: '9800px',
        duration: 1500,
        opacity: 1,
        scale: 0.4,
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
    };

    //    var nodeList = document.querySelectorAll('.thumbnail');
    //    var nodeArray = [
    //        document.querySelector('#slide_3'),
    //        document.querySelector('#slide_2'),
    //        document.querySelector('#slide_1')
    //];

    //Productions
    if ($("#portfolio").length > 0) {
        //sr.reveal('.thumbnail', prodReveal, 150);
    }

    //Homepage
    if ($(".homepage").length > 0) {
        sr.reveal('.hero-title');
        sr.reveal('.hero-desc', { delay: '100' });
        sr.reveal('.button', { delay: '200' })
    }

    //Search
    if ($(".search").length > 0) {
        sr.reveal('.hero-title', { delay: '50' });
        sr.reveal('.hero-desc', { delay: '150' });
        sr.reveal('.offsetContainer', { delay: '75' });
        sr.reveal('.slide', { delay: '100' });
        sr.reveal('.logo-client',{ delay: '150' }, 100);
        sr.reveal('.faq-question',{ delay: '100' }, 100);
        sr.reveal('.boxContainer',{ delay: '150' }, 100);

    }

    //Agency
    if ($("#agency").length > 0) {
        sr.reveal('.hero-wrapper');
        sr.reveal('.sectionTitle', textReveal);
        sr.reveal('p', textReveal);
        sr.reveal('.logo-client', { container: '.logos-list' }, 50);
    }

    //CaseStudy
    if ($(".other-cases").length > 0) {
        sr.reveal('.hero-wrapper');
        sr.reveal('.sectionTitle', textReveal);
        sr.reveal('p', textReveal);
    }

    //Resources
    if ($(".peetch").length > 0) {
        sr.reveal('.hero-wrapper');
        sr.reveal('.sectionTitle', textReveal);
        sr.reveal('p', textReveal);
    }

    /* SETTING UP ISCROLL IF NECESSARY */
    whatMedia();

    if (isMobile) {
        $('html').on('tap', '.thumbnail', function (e) {
            var url = $(this).find('.button').attr('href');
            window.open(url, '_self');
        });
    }

    if (isDesktop && $('#portfolio').length) {
        setHorizontalScroll();

        var tbWidth = $('#slide_1').outerWidth();
        var sectionWidth = $('#portfolio').outerWidth();
        var numElements = Math.floor(sectionWidth / tbWidth);
        var scrollLength = tbWidth * numElements;
        var scrollDirection = -1;

        console.log(tbWidth, sectionWidth, sectionWidth / tbWidth, scrollLength);
        var scrollX = scrollDirection * sectionWidth * ((document.getElementsByClassName('thumbnail').length - 1) / (sectionWidth / tbWidth));
        fancyScroll.scrollBy(scrollX - 400, 0);

        //animation du scroll
        setTimeout(function () { fancyScroll.scrollTo(0, 0, 1200, IScroll.utils.ease.bounce2); }, 100);

        $('.floatbutton').off('tap');
        $('.floatbutton').on('tap', function goRight() {
            fancyScroll.scrollBy(scrollDirection * sectionWidth, 0, 1000, IScroll.utils.ease.circular);
        });

        //$('.floatbutton').off('tap');
        //$('.floatbutton:last-of-type').on('tap', 'img', function goRight() {
        //    fancyScroll.scrollBy(scrollDirection * sectionWidth, 0, 2000, IScroll.utils.ease.circular);
        //    
        //});


        fancyScroll.on('scrollEnd', function (e) {
            if (this.x <= this.maxScrollX) {
                scrollDirection = 1;
                $(".nextproject").addClass('rotate180');
            }
            else if (this.x === 0) {
                scrollDirection = -1;
                $(".nextproject").removeClass('rotate180');
            }

        })

        window.fc = fancyScroll;

        setTimeout(function () {
            //fancyScroll.refresh();
        }, 1000);
    }

    $('.modal-loading').addClass('closed');

});
