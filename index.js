const track = document.querySelector('.caro_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.caro_button--next');
const backButton = document.querySelector('.caro_button--back');
const dotsNav = document.querySelector('.caro_nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);


// arrange the slides next to one another
// slides[0].style.left = slideWidth * 0 +'px';
// slides[1].style.left = slideWidth * 1 +'px';
// slides[2].style.left = slideWidth * 2 +'px';
// the code below is a shorter code version for 
// doing the same task i.e. arranging the slides
// next to one another
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);


const moveToSlide = (track, currentSlide, targetSlide) => {
    var leftStyle = targetSlide.style.left;
    track.style.transform = 'translateX(-' + leftStyle + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, backButton, nextButton, targetIndex) => {
// when ur on first slide it makes back arrow disappear
// when ur on middle slide it makes both arrows appear
// when ur on last slide it makes next arrow disppear
if (targetIndex === 0){
    backButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');   
} else if (targetIndex === slides.length - 1){
    backButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
} else {
    backButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');}
}

// when back button is clicked, move slides to the back
backButton.addEventListener('click', e=> {
    const currentSlide = track.querySelector('.current-slide');
    const backSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const backDot = currentDot.previousElementSibling;
    const backIndex = slides.findIndex(slide => slide === backSlide);

    moveToSlide(track, currentSlide, backSlide);
    updateDots(currentDot, backDot);
    hideShowArrows(slides, backButton, nextButton, backIndex);
});

// when next button is clicked, move slides to the next
nextButton.addEventListener('click', e=> {
    // first thing to do is find the current slide
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    // Move it over by the amount where the current slide is
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, backButton, nextButton, nextIndex);
});

// The following code is doing the same task as above of amountToMove
// Move it over by the amount where the current slide is
// const amountToMove = nextSlide.style.left;
// moves to the next slide
// track.style.transform = 'translateX(-' + amountToMove + ')';
// currentSlide.classList.remove('current-slide');
// nextSlide.classList.add('current-slide');
// Note: for above classList you don't need dot but for 
// querySelector you will need a dot })

// when nav indicators is clicked, move to that slide
dotsNav.addEventListener('click', e=> {
    // first thing to do is find out what indicator was clicked on
    // e tracks the event + gives all info relevant to that event
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, backButton, nextButton, targetIndex);
});























