
let hovered;

onPosterHover = (poster) =>{
    if(hovered !== undefined) {
        hovered.style.zIndex = "unset";
        hovered.style.transform = "scale(1)";
        
    }

    hovered = poster;
    hovered.style.zIndex = "2";
    hovered.style.transform = "scale(1.3)";

} 

onPosterClicked = (id) =>{
    window.location.replace('/film/'+id);
}