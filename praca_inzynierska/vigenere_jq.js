$('td').on('mouseover mouseout', function(){
                 $(this).prevAll().addBack()
                 .add($(this).parent().prevAll()
                 .children(':nth-child(' + ($(this).index() + 1) + ')')).toggleClass('hover');
          });