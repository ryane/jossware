/*-----------------------------------------------------------------------------------*/
/*  Start custom foundation document
/*-----------------------------------------------------------------------------------*/
$(document).foundation();

$(function() {

  /*-----------------------------------------------------------------------------------*/
  /*  Anchor link
  /*-----------------------------------------------------------------------------------*/
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
      || location.hostname == this.hostname) {

      var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
        return false;
      }
    }
  });

  /*-----------------------------------------------------------------------------------*/
  /*  Animated Counter
  /*-----------------------------------------------------------------------------------*/
  jQuery('#counter-1').appear(function() {
    $('#counter-1').countTo({
      from: 0,
      to: 560,
      speed: 4000,
      refreshInterval: 50,
      onComplete: function(value) {
      //console.debug(this);
      }
    });
  });

  jQuery('#counter-2').appear(function() {
    $('#counter-2').countTo({
      from: 0,
      to: 153,
      speed: 4000,
      refreshInterval: 50,
      onComplete: function(value) {
      //console.debug(this);
      }
    });
  });

  jQuery('#counter-3').appear(function() {
     $('#counter-3').countTo({
      from: 0,
      to: 1350,
      speed: 4000,
      refreshInterval: 50,
      onComplete: function(value) {
      //console.debug(this);
      }
    });
  });

  jQuery('#counter-4').appear(function() {
     $('#counter-4').countTo({
      from: 0,
      to: 350,
      speed: 4000,
      refreshInterval: 50,
      onComplete: function(value) {
      //console.debug(this);
      }
    });
  });

});
