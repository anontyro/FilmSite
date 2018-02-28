let hovered;

onPosterEvent = (event) =>{
    if(hovered !== undefined) {
        hovered.children[0].setAttribute("style", "display: none;");
    }
    hovered = event;
    hovered.children[0].setAttribute("style", "display: block;");
}

onPosterClicked = (id) => {
    console.log(id);
    window.location.replace('/film/'+id);
}

