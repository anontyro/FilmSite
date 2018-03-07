const quill = new Quill('#editor-container', {
    modules: {
        toolbar: [
            ['bold', 'italic'],
            ['link', 'blockquote', 'code-block', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }]
        ]
    },
    theme: 'snow'
});

const addForm = document.querySelector('#addNewsForm');

addForm.onsubmit = () =>{
    const newsBody = document.querySelector('input[name=newsBody]');

    newsBody.value = JSON.stringify(quill.getContents());
    
    return true;
}