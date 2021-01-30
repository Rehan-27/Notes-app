showNotes();
// adding notes to local storage 
manage(addTxt);
let addBtn = document.getElementById(`addBtn`);
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById(`addTxt`);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let obj = {
        title: addTitle.value,
        note: addTxt.value
    }
    notesObj.push(obj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();
})

// making a function to add note cards 
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    manage(addTxt);

    let html = "";// adding a card to html 
    notesObj.forEach(function (element, index) {
        html += `
        <div class="card my-2 mx-2" style="width: 18rem; border:2px solid rgb(208, 112, 247  ); background-color:rgb(211, 148, 237,0.4); border-radius:5px">
        <div class="card-body">
            <h5 class="card-title">${element.title} </h5>
            <hr>
            <p class="card-text"> ${element.note}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-sm btn-outline-danger mt-3">Delete</button>
        </div>
    </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h6> No notes! Please add notes...</h6>`;
    }
}


// function to delete a note 
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let searchTxt = document.getElementById(`searchTxt`);
searchTxt.addEventListener("input", function () {
    let inputVal = searchTxt.value;
    let card = document.getElementsByClassName(`card`);
    Array.from(card).forEach(function (element) {
        let noteTxt = element.getElementsByTagName("p")[0].innerText;
        if (noteTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})


// function to enable/disable the addBtn button 
function manage(addTxt) {
    let addBtn = document.getElementById(`addBtn`);
    if (addTxt.value != '') {
        addBtn.disabled = false;
    }
    else {
        addBtn.disabled = true;
    }
}
