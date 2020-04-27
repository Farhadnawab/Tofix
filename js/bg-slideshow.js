$(document).ready(function() {
    var batchTotal, glideOffset, transformGrid, minHLX = -160, minHLY = -160;
    var grid = document.getElementById("grid"); 

    function getBatchSize() {
        let trX, trY, rX, rZ;
        if (window.innerWidth > 2600) { // Large screens, 6 batch
            batchTotal = 6;
            trX = 65;
            trY = 44;
            rX = -49;
            rZ = -54;
            minHLX=-160;
            minHLY=-160;
            grid.style.width = '1800px';
            glideOffset = 473 * batchTotal; //2 = 450
        }
        if (window.innerWidth > 2300) { // Large screens, 6 batch
            batchTotal = 6;
            trX = 65;
            trY = 44;
            rX = -49;
            rZ = -54;
            minHLX=-160;
            minHLY=-160;
            grid.style.width = '1800px';
            glideOffset = 364 * batchTotal; //2 = 450
        }
        else if (window.innerWidth > 1380) { // Large screens, 6 batch
            batchTotal = 6;
            trX = 80;
            trY = 35;
            rX = -49;
            rZ = -54;
            minHLX=-120;
            minHLY=-120;
            grid.style.width = '800px';
            glideOffset = 228 * batchTotal; //2 = 450
        } else if (window.innerWidth > 750) { // Medium screens, 4 batch
            batchTotal = 4;
            trX = 80;
            trY = 35;
            rX = -49;
            rZ = -54;
            minHLX=-120;
            minHLY=-120;
            grid.style.width = '800px';
            glideOffset = 228 * batchTotal; //2 = 450
        } else { // Small screens, 4 batches
            batchTotal = 4;
            trX = 44;
            trY = 55;
            rX = -49;
            rZ = -62;
            minHLX=-80;
            minHLY=-70;
            grid.style.width = '600px';
            glideOffset = 132 * batchTotal;
        }

        transformGrid = "translateX("+trX+"vw) translateY("+trY+"vh) rotateX("+rX+"deg) rotateZ("+rZ+"deg)";
        grid.style.transform = transformGrid;
    }
    getBatchSize();
                
    let boxShadowOpt = " 10px 0px rgba(0,0,0,0.5)";


    var slideOffset = 0;
    var groupId = 0;
    var timeSlider = 3500; //3500 Ã  la base
    var timeGlide = 700;
    var timeOpacity = 200;
    var timeCardsHighlight = 500;

    //var groups = document.getElementsByClassName("group");

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        transitionDuration: 0
    });

    var skippedItems=0;
    var slideRepeatTimeout;
    var Hgroups = $(grid).masonry('getItemElements');
    var highlightGroup = function(){

        var group = [];
        for (let i = 0; i < batchTotal; i++) {
            group.push($(Hgroups[i+skippedItems])); //Pick start 6 items
        }
        skippedItems += batchTotal;

        let zindex = 1;
        setTimeout(function() {
            group.forEach(function (e) {
                let timeOffset = getRandomInt(-300, 300);
                e.css('z-index', (zindex++)%2);
                let img = e.find('.grid-img');
                let transformX = getRandomInt(minHLX, -10)
                let transformY = transformX//+getRandomInt(-30,30);//getRandomInt(minHLY, -10)
                let offsetY = getRandomInt(-40, 40);
                
                let offX, offY;
                img.animate({
                    fake1: transformX,
                    fake2: transformY,
                }, {
                    step: function(now,fx) {
                        if (fx.prop === "fake1") {
                            offX = now;
                        } else if (fx.prop === "fake2") {
                            offY = now;
                            $(this).css('-webkit-transform','translate('+ offX +'px,'+ offY +'px)'); 
                            $(this).css('box-shadow',(-offX)+'px '+(-offY+offsetY)+'px' + boxShadowOpt); 
                        }
                    },
                    duration:timeCardsHighlight+timeOffset,
                    easing: 'easeOutCirc'
                });
            });
        }, 300);
    }
    
    var moveSlider = function(){
        
        slideOffset -= glideOffset;
        $(grid).animate({  fake: slideOffset }, {
            step: function(now,fx) {
                
                $(this).css('-webkit-transform',transformGrid + ' translate3d(0px, '+(now)+'px, 0px)'); 
            },
            duration:timeGlide,
            easing: 'easeInOutCubic'
        });

        slideRepeatTimeout = setTimeout(moveSlider, timeSlider);
        slideRepeatTimeout = setTimeout(highlightGroup, timeSlider);
    }
   

    function slide() {
        
        var groups = $(grid).masonry('getItemElements');
        var group = [];
        for (let i = 0; i < batchTotal; i++) {
            group.push($(groups[i])); //Pick start 6 items
        }
                    
        setTimeout(function() {
            

            group.forEach(function (e, idx) {
                let newE = group[idx].clone();

                //e.css('opacity', 0)
                setTimeout(function(){
                    e.animate({fake: 1000 }, {
                        step: function(now,fx) {
                            if (fx.prop == 'fake')
                                $(this).css('transform', 'translateY(-'+now+'px) rotateZ(90deg)');
                        },
                        duration:400,
                        easing: 'easeInCirc'
                    });
                }, 200);
                setTimeout(function(){
                    e.animate({ opacity: 0}, {
                        duration:100
                    });
                }, 400);
                $(grid).masonry('remove', e); 
                $(grid).append(newE).masonry('appended', newE);
            });
            initializeVideo(".video-elem");
        }, timeSlider);


        console.log(groups.length);
        slideRepeatTimeout = setTimeout(slide, timeSlider);
    }

    function initializeVideo(elem){
        $(elem).each(function(){
            $(this)[0].play();
            $(this)[0].loop = true;
        });
    }

    setTimeout(function() {
        
        moveSlider();
        highlightGroup();
        setTimeout(() => {
            slide();    
        }, 1000);
        
        document.getElementById("sh").style.opacity=1;
    }, 200)

    initializeVideo(".video-elem");
});

/*$(window).on('resize', function() {
    var timerResize = false;
    alert("asd");
    getBatchSize();
    $(grid).masonry('reloadItems')
    if (!timerResize) {
        clearTimeout(slideRepeatTimeout);
        slide();
        timerResize = true;
        setTimeout(function() { timerResize = false }, 2000)
    }
});*/