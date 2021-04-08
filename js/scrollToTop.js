const navigators = document.querySelectorAll('.navigator');

navigators.forEach(navigator => {
  navigator.addEventListener('click', event => {
    window.scrollTo({top: 0, left: 0});
  });
  
  navigator.addEventListener('touchend', event => {
    window.scrollTo({top: 0, left: 0});
  });
});
