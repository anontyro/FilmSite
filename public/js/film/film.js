let hovered;

onPosterEvent = (event) =>{
    if(hovered !== undefined) {
        hovered.children[0].setAttribute("style", "display: none;");
    }
    hovered = event;
    hovered.children[0].setAttribute("style", "display: block;");
}

getRandomNumber = (min, max) => {
    console.log(max);
    const x = Math.random() * (max - min) + min;
    return x;
}