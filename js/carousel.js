document.querySelectorAll('.carousel').forEach(carousel => {
  $(`#${carousel.id}`).carousel('nextWhenVisible');

  const progressText = carousel.parentElement.querySelector('.image-progress p');
  const totalItems = carousel.querySelector('.carousel-inner').children.length;
  
  progressText.innerText = `1 / ${totalItems}`
  
  $(`#${carousel.id}`).on('slide.bs.carousel', (event) => {
    const activeNumber = event.to + 1;
    progressText.innerHTML = `${activeNumber} / ${totalItems}`
  })
});
