
let hovered;

onPosterHover = (poster) =>{
    if(hovered !== undefined) {
        hovered.children[0].children[0].setAttribute("class", "img-fluid img-poster");
        hovered.style.zIndex = "unset";
    }

    hovered = poster;
    hovered.style.zIndex = "2";
    hovered.children[0].children[0].setAttribute("class", "img-fluid img-poster film-poster-hover");

} 