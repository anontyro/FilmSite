
class SlideShow{
    
    constructor(speed, slideDomObject){
        this.currentImg = 0;
        this.posterSlideShowObject = document.querySelector(slideDomObject);
        this.totalSlides = this.posterSlideShowObject.children.length;
        this.transitionSpeed = speed;
        this.setViewableSlide();
        this.timer = setInterval( () =>{this.setViewableSlide();},this.transitionSpeed);
    }

    pauseSlideShow(){
        clearInterval(this.timer);
    }
    
    startSlideShow(){
        this.timer = setInterval( () => {
            this.setViewableSlide();
        },this.transitionSpeed);
    }

    nextSlide(){
        this.pauseSlideShow();
        this.setViewableSlide();
        this.startSlideShow();
    }

    previousSlide(){
            this.pauseSlideShow();
            this.setPreviousSlide();
            this.startSlideShow();
    }

    setPreviousSlide(){
        let previousSlide = this.currentImg -2;
        if(previousSlide >= 0 && previousSlide < this.totalSlides){
            this.posterSlideShowObject.children[previousSlide].setAttribute("style", "display: block");
            this.posterSlideShowObject.children[this.currentImg-1].setAttribute("style", "display: none");
            this.currentImg--;
        }else {
            this.posterSlideShowObject.children[this.totalSlides-1].setAttribute("style", "display: block");
            this.posterSlideShowObject.children[this.currentImg-1].setAttribute("style", "display: none");
            this.currentImg = this.totalSlides-1;
        }    
    }
    
    setViewableSlide(){
        let nextslide = this.currentImg +1;

        this.posterSlideShowObject.children[this.currentImg].setAttribute("style", "display: block");
        
        if(this.posterSlideShowObject.children[this.currentImg-1] !== undefined){
            this.posterSlideShowObject.children[this.currentImg-1].setAttribute("style", "display: none");
        } else{
            this.posterSlideShowObject.children[this.totalSlides-1].setAttribute("style", "display: none");
        }
    
        if(nextslide < this.totalSlides){
            this.currentImg++
        }else {
            this. currentImg = 0;
        }
    
    }
}
