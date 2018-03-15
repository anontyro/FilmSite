
let quill;

window.onload =() =>{
    quill = createQuill();
    const content = JSON.parse(document.querySelector(".blog-content").value);
    quill.setContents(content);
    quill.disable();
    console.log(content);
};

const createQuill = () =>{
    let output = new Quill('#quillContainer', {
        "modules": {
            "toolbar": false
        },
        theme: 'snow'
    });
    return output;
}



const setContent = (delta) =>{
    let myDelta = delta;
    console.log(myDelta);
    quill.setContents(myDelta);
}



// const quillArr = []

// const makeQuill = (containerName, delta) =>{
//     const quill = new Quill('#'+containerName);
//     quill.setContent(delta)
//     quill.editor.disable();
//     quillArr.push(quill);
// }