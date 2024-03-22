import $ from "jquery";

$(function() {
    togglePages($('.nav-btn'));
});

function togglePages(btns) {
    btns.on('click', function() {
        toggleActive(btns, this);
        const page = $(this).data('page');
        switch(page) {
          case 'home':
            homePage();
            break;
          case 'reserve':
            reservePage();
            break;
          case 'check':
            checkPage();
            break;
          case 'view':
            viewPage();
            break;
          default:
            break;
        }
    })
 }

 function toggleActive(btns, active) {
    btns.each(function() {
      $(this).attr('data-active', 'false');
    });
    $(active).attr('data-active', 'true');
  }

  function homePage() {
    console.log('Home Page');
  }
  
  function reservePage() {
    console.log('Reserve Page');
  }
  
  function checkPage() {
    console.log('Check Page');
  }
  
  function viewPage() {
    console.log('View Page');
  }