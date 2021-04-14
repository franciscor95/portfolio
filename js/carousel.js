const allCarousels = document.querySelectorAll('.carousel');
const allCarouselItems = document.querySelectorAll('.carousel-item');

// carousel counter
allCarousels.forEach(carousel => {
  const progressText = carousel.parentElement.querySelector('.image-progress p span');

  $(`#${carousel.id}`).on('slide.bs.carousel', (event) => {
    progressText.innerText = event.to + 1;
  })
});

// carousel dimensions
const getDimensions = () => {
  const column = document.querySelector('.main');
  return {
    width: column.offsetWidth,
    height: column.offsetWidth / 1.5,
    smallHeight: column.offsetWidth / 1.2,
  }
}

const setDimensions = () => {
  const docWidth = document.body.clientWidth;
  const { height, smallHeight, width } = getDimensions();

  const realHeight = docWidth < 768 ? smallHeight : height

  allCarouselItems.forEach((item) => {
    item.style.height = `${realHeight}px`;
    item.style.width = `${width}px`;
  })
}

$(window).resize(() => {
  setDimensions();
});

setDimensions();
