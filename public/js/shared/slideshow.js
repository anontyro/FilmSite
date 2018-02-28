let currentImg = 0;

let posterSlideShowObject;

let totalSlides;

let transitionSpeed = 5000;

let timer = setInterval( () => {
    setViewableSlide();
}, transitionSpeed);

window.onload = () =>{
    addSlideShowElements();
    setViewableSlide();
    
}

const SlideShow = () =>{

}

addSlideShowElements = () =>{
    posterSlideShowObject = document.querySelector(".main-film-container");
    totalSlides = posterSlideShowObject.children.length;
}

pauseSlideShow = () =>{
    clearInterval(timer);
}

startSlideShow = () =>{
    timer = setInterval( () => {
        setViewableSlide();
    },transitionSpeed);
}

setViewableSlide = () =>{

    let nextslide = currentImg +1;

    posterSlideShowObject.children[currentImg].setAttribute("style", "display: block");
    
    if(posterSlideShowObject.children[currentImg-1] !== undefined){
        posterSlideShowObject.children[currentImg-1].setAttribute("style", "display: none");
    } else{
        posterSlideShowObject.children[totalSlides-1].setAttribute("style", "display: none");
    }

    if(nextslide < totalSlides){
        currentImg++
    }else {
        currentImg = 0;
    }

}