document.querySelectorAll('.carousel').forEach(carousel => {
  const progressText = carousel.parentElement.querySelector('.image-progress p span');

  $(`#${carousel.id}`).on('slide.bs.carousel', (event) => {
    progressText.innerText = event.to + 1;
  })
});
