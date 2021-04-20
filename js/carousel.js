// carousel counter
const setCounter = () => {
  const allCarousels = document.querySelectorAll('.carousel');
  allCarousels.forEach(carousel => {
    const progressText = carousel.parentElement.querySelector('.image-progress p span');
  
    $(`#${carousel.id}`).on('slide.bs.carousel', (event) => {
      progressText.innerText = event.to + 1;
    })
  });
};


// VIDEO
const videoCarouselItem = document.querySelector('.item-video');
const videoCarouselParent = videoCarouselItem.parentElement.parentElement;
const videoCarouselJQ = $(`#${videoCarouselParent.id}`);
const videoElement = document.querySelector('video');
// const videoElementIframe = document.querySelector('iframe').contentDocument;


// video dimensions
const setVideoDimensions = () => {
  const height = document.querySelector('.main').offsetWidth / 1.5;

  videoCarouselItem.style.height = `${height}px`;
};

// video behaviour
const setVideoBehaviour = () => {
  // const videoSetup = () => {
  //   videoElementIframe.setAttribute('loop', 'true');
  // };

  const videoCheck = () => {
    const videoItem = document.querySelector('.item-video');

    if (videoItem.classList.contains('active')) {
      videoCarouselJQ.carousel('pause');
      videoElement.play();
      videoElement.muted = false;
      console.log('video is here!!!')
    } else if (videoElement.currentTime !== 0) {
      videoCarouselJQ.carousel('cycle');
      videoElement.pause();
      videoElement.currentTime = 0;
      console.log('no more video :(')
    }
  };

  videoCarouselJQ.on('slid.bs.carousel', () => {
    videoCheck();
  })

  // videoSetup()
  videoCheck();
}

$(window).resize(() => {
  setVideoDimensions();
});

setCounter();
setVideoDimensions();
setVideoBehaviour();
