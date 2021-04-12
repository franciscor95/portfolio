document.querySelectorAll('.carousel').forEach(carousel => {
  const progressText = carousel.parentElement.querySelector('.image-progress p span');

  $(`#${carousel.id}`).on('slide.bs.carousel', (event) => {
    progressText.innerText = event.to + 1;
  })
});

// document.querySelectorAll('.carousel .carousel-item').forEach(carousel => {
//   const width = carousel.offsetWidth;

//   carousel.style.height = `${width}px`;
// });
