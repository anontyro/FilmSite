let hovered;
const animation = 'fadeIn';

onPosterHover = (poster, mouseOver) =>{

    if(hovered !== undefined) {
        updatePoster(hovered, false);   
    }
    if(mouseOver){
        hovered = poster;
        updatePoster(hovered, true);      
    }else{
        updatePoster(poster, false);        
    }
} 

onPosterClicked = (id) =>{
    window.location.replace('/film/'+id);
}


updatePoster = (poster, mouseOver) =>{
    if(mouseOver){
        poster.style.zIndex = "2";
        poster.style.transform = "scale(1.3)";
        poster.children[1].style.display = "block";    
        poster.children[1].animate(animation, ()=>{
            poster.children[1].classList.remove(animation)
            poster.children[1].classList.remove('animated')        
        });
    }else{
        poster.style.zIndex = "unset";
        poster.style.transform = "scale(1)";
        poster.children[1].style.display = "none";
    }
}
