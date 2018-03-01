let hovered;

let myShow;

window.onload = () =>{
    myShow = new SlideShow(2000, ".main-film-slideshow");
}

onPosterEvent = (event, mouseOver) =>{
    if(hovered !== undefined) {
        hovered.children[0].setAttribute("style", "display: none;");
    }
    if(mouseOver){
        hovered = event;
        hovered.children[0].setAttribute("style", "display: block;");
    }else{
        hovered.children[0].setAttribute("style", "display: none;");
    }

}

onPosterClicked = (id) => {
    console.log(id);
    window.location.replace('/film/'+id);
}

