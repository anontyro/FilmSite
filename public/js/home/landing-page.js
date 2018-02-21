
let hovered;

onPosterHover = (poster) =>{
    const animation = 'fadeIn';
    if(hovered !== undefined) {
        hovered.style.zIndex = "unset";
        hovered.style.transform = "scale(1)";
        hovered.children[1].style.display = "none";
    }

    hovered = poster;
    hovered.style.zIndex = "2";
    hovered.style.transform = "scale(1.3)";
    hovered.children[1].style.display = "block";    
    hovered.children[1].animate(animation, ()=>{
        hovered.children[1].classList.remove(animation)
        hovered.children[1].classList.remove('animated')        
    });
    // hovered.children[1].classList.add("animated"); 
    // hovered.children[1].classList.add("fadeInDown");           

} 

onPosterClicked = (id) =>{
    window.location.replace('/film/'+id);
}

//animated