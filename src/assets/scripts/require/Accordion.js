var Accordion = (function() {
  var $accordions = $('[data-toggler]');


  // find target accordion, reveal it
  var doClickThing = function(target) {
    var $target = target;

    $target.siblings('[data-toggler-content]')
        .removeClass('js-active')
        .slideUp(300)
        .end()
      .prev('[data-toggler-title]')
        .siblings('[data-toggler-title]')
        .removeClass('js-active')
        .end().end()
      .prev('[data-toggler-title]')
        .toggleClass('js-active')
        .end()
      .toggleClass('js-active')
        .slideToggle(300);
  }

  var init = function() {
    var $hashTarget = $accordions.find('[data-toggler-content]:target');

    if ($hashTarget.length) {
      doClickThing($hashTarget);
    }
    $accordions.find('[data-toggler-title] a').click(function(e){
      if ($(this).parent('[data-toggler-title]').hasClass('js-active')) {
        e.preventDefault();
      }
      var $target = $(this).parent('[data-toggler-title]').next('[data-toggler-content]');
      doClickThing($target);
    });
  }

  return {
      init: init
  };
})();

$(document).ready(function(){
  Accordion.init();
});
