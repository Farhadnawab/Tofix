//FAQ
        var $faqQuestion = $('.faq-question'),
        $faqAnswer = $('.faq-answer'),
        activeClass = "active";
        crossClass = "plus";
        
        $faqAnswer.addClass('hidden');
        
        $faqQuestion.on('click', function (e) {
            e.preventDefault();
            var self = $(this);
            self.toggleClass(activeClass);
            self.toggleClass(crossClass);
            self.nextAll($faqAnswer).first().stop().slideToggle(350);
        });
        
        $('.faq-answer').on('tap', '.clientListLink', function () {
            $('.client-modal').toggleClass('in');
        
        });
        
        $('.client-modal').on('tap', function () {
            $('.client-modal').removeClass('in');
        });



//Card Scroller
        var x,y,top,left,down;
        
        $("#scroller").mousedown(function(e){
            e.preventDefault();
            down=true;
            x=e.pageX;
            y=e.pageY;
            top=$(this).scrollTop();
            left=$(this).scrollLeft();
        });
        
        $("body").mousemove(function(e){
            if(down){
                var newX=e.pageX;
                var newY=e.pageY;
        
                $("#scroller").scrollTop(top-newY+y);    
                $("#scroller").scrollLeft(left-newX+x);    
            }
        });
        
        $("body").mouseup(function(e){down=false;});