// VIDEO
const videoCarouselItem = document.querySelector('.item-video');
const videoCarouselParent = videoCarouselItem.parentElement.parentElement;
const videoCarouselJQ = $(`#${videoCarouselParent.id}`);
const videoElement = document.querySelector('video');

// VIDEO DIMENSIONS
const setVideoDimensions = () => {
  const height = document.querySelector('.main').offsetWidth / 1.5;
  videoCarouselItem.style.height = `${height}px`;
};

const videoReset = () => {
  videoElement.pause();
  videoElement.currentTime = 0;
};

// VIDEO BEHAVIOUR
const setVideoBehaviour = () => {
  const videoCheck = () => {
    const videoItem = document.querySelector('.item-video');

    if (videoItem.classList.contains('active')) {
      videoCarouselJQ.carousel('pause');
    } else {
      videoCarouselJQ.carousel('cycle');
      videoReset();
    }
  };

  videoCarouselJQ.on('slid.bs.carousel', () => {
    videoCheck();
  })

  videoCheck();
}



// OFFSET HEIGHT
let offsetHeight;

const setOffsetHeight = () => {
  const headerHeight = document.querySelector('.header').offsetHeight;
  const sidebarHeight = document.querySelector('.sidebar').offsetHeight;
  offsetHeight = headerHeight ? headerHeight + sidebarHeight : 0;
}



// CAROUSEL
const allCarousels = document.querySelectorAll('.carousel');
const allCarouselsJQ = $('.carousel');
let carouselPositions = [];
let currentCarouselPosition;

// CAROUSEL COUNTER
const setCounter = (carousel) => {
  const progressText = carousel.parentElement.querySelector('.image-progress p span');

  $(`#${carousel.id}`).on('slide.bs.carousel', (event) => {
    progressText.innerText = event.to + 1;
  })
};

// CAROUSEL SLIDE ON FOCUS
const setCarouselSlideOnFocus = (oldIndex, newIndex) => {
  // pause all and return if index -1 after resize
  if (newIndex === -1) {
    for (var index = 0; index < allCarouselsJQ.length; index++) {
      $(`#${allCarouselsJQ[index].id}`).carousel('pause');
    }
    return
  }
  
  // pause old
  if (oldIndex !== -1) {
    $(`#${allCarouselsJQ[oldIndex].id}`).carousel('pause');
  }

  // play new
  if (allCarouselsJQ[newIndex] !== videoCarouselParent) {
    videoReset();
    $(`#${allCarouselsJQ[newIndex].id}`).carousel('cycle');
  } else {
    setVideoBehaviour();
  }
};

const setCarouselBehaviour = () => {
  // reset scroll positions
  carouselPositions = [];

  // populate scroll positions
  allCarousels.forEach(carousel => {
    setCounter(carousel);
    carouselPositions.push(carousel.offsetTop + offsetHeight)
  });

  // set current position
  carouselPositions.forEach(position => {
    if (window.scrollY >= position - 60) {
      currentCarouselPosition = position;
    } else if (window.scrollY === 0 && offsetHeight === 0) {
      currentCarouselPosition = 0;
    } else {
      currentCarouselPosition = -1;
    }
  });

  // check current position on load/resize
  if (currentCarouselPosition !== -1) {
    setCarouselSlideOnFocus(-1, currentCarouselPosition);
  } else {
    setCarouselSlideOnFocus(-1, -1);
  };

  const eventBehaviour = () => {
    if (window.scrollY >= carouselPositions[currentCarouselPosition + 1] - 60 - (offsetHeight / 3)) {
      // scrolling down
      setCarouselSlideOnFocus(currentCarouselPosition, currentCarouselPosition + 1);
      currentCarouselPosition += 1;
    } else if (window.scrollY <= carouselPositions[currentCarouselPosition - 1]) {
      // scrolling up
      setCarouselSlideOnFocus(currentCarouselPosition, currentCarouselPosition - 1);
      currentCarouselPosition -= 1;
    } else if (window.scrollY <= carouselPositions[0] - offsetHeight) {
      setCarouselSlideOnFocus(0, -1);
      currentCarouselPosition = -1;
    }
  };

  document.removeEventListener('scroll', eventBehaviour);
  document.addEventListener('scroll', eventBehaviour);
};



// INITIALIZERS
const init = () => {
  setVideoDimensions();
  setOffsetHeight();
  setCarouselBehaviour();
};

$(window).resize(() => {
  init();
});

init();
