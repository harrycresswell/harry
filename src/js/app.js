// MobileMenu and Hamburger
$(document).ready(function(){
    /* when .Hamburger is clicked */
    $('.Hamburger').click(function(){
      /* add .is-active to animate */
      $(this).toggleClass('is-active');
      /* add .is-visible to show nav */
      $('.MobileMenu').toggleClass('is-visible');
      /* when Nav link is clicked */
      $('.Header-link').click(function(){
        /* hide nav */
        $('.MobileMenu').removeClass('is-visible');
        /* and remove active class from Hamburger */
        $('.MobileMenu').removeClass('is-active');
      });
    });
  });