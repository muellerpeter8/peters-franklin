(function () {
  let screenWidth = window.outerWidth;
  const onresize = function (e) {
    screenWidth = e.target.outerWidth;
    showSlides();
  };
  window.addEventListener('resize', onresize);
  const slideParent = document.querySelector('.carousel-bgimg');
  const slides = document.querySelectorAll('.carousel-bgimg > div');
  addDotsCon();
  addDots();
  const dots = document.querySelectorAll('.dot');
  setFirstTwoSlides();
  const slide1 = document.querySelector('.slide1');
  const slide2 = document.querySelector('.slide2');
  let slideIndex = 1;
  showSlides(slideIndex);
  const slidesLength = slides.length;

  function addDotsCon() {
    slideParent.insertAdjacentHTML('afterend', '<div class="dotsCon" aria-label="Carousel Pagination"></div>');
  }

  function addDots() {
    const dotsCon = document.querySelector('.dotsCon');
    slides.forEach((newdots, index) => dotsCon.insertAdjacentHTML('beforeend', `<button class="dot" data-slide-number="${index + 1}" aria-controls="${index + 1}" aria-label="Slide Tab ${index + 1} of ${slides.length}"></button>`), );
  }

  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function setFirstTwoSlides() {
    slides[0].className += ' slide1';
    slides[1].className += ' slide2';
  }

  // add slide 1 and 2 to the end for an infinite slide show
  function showSlides(n) {
    slideParent.prepend(slide2);

    slideParent.prepend(slide1);

    if (n > slides.length) { slideIndex = 1; }

    if (n < 1) { slideIndex = slidesLength; }

    slides.forEach(slide => { slide.style.display = 'none'; });
    slides.forEach(slide => {
      slide.classList.remove('activeSlide1');
      slide.classList.remove('activeSlide2');
      slide.classList.remove('activeSlide3');
    });

    dots.forEach(dot => { dot.className = dot.className.replace(' active', ''); });

    dots[slideIndex - 1].className += ' active';

    slides[slideIndex - 1].style.display = 'flex';
    slides[slideIndex - 1].classList.add('activeSlide1');

    // add slide 1 and 2 to the end for an infinite slide show
    if (screenWidth >= 600) {
      if (slideIndex >= slides.length - 1) {
        slide1.style.display = 'flex';
        slide1.classList.add('activeSlide3');
        slideParent.append(slide1);
      } else {
        slides[slideIndex + 1].style.display = 'flex';
        slides[slideIndex + 1].classList.add('activeSlide3');
      }
      if (slideIndex === (slides.length)) {
        slide2.style.display = 'flex';
        slide2.classList.add('activeSlide3');
        slide1.classList.remove('activeSlide3');
        slide1.classList.add('activeSlide2');
        slideParent.append(slide2);
      } else {
        slides[slideIndex].style.display = 'flex';
        slides[slideIndex].classList.add('activeSlide2');
      }
    }
  }

  dots.forEach(dot =>
    dot.addEventListener('click', () => {
      const dotNumber = parseInt(dot.dataset.slideNumber);
      currentSlide(dotNumber);
    }));

  // swipe detection
  let touchstartX = 0;
  let touchendX = 0;

  const gestureZone = slideParent;

  gestureZone.addEventListener('touchstart', event => {
    touchstartX = event.changedTouches[0].screenX;
    event.preventDefault();
  }, false);

  function handleGesture() {
    if (touchendX < touchstartX) {
      plusSlides(1);
    }

    if (touchendX > touchstartX) {
      plusSlides(-1);
    }
  }

  gestureZone.addEventListener('touchend', event => {
    touchendX = event.changedTouches[0].screenX;
    handleGesture();
    event.preventDefault();
  }, false);
}());
