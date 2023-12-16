let Name = document.getElementById("Name");
let Url = document.getElementById("Url");
let bookMarks = [];

if (localStorage.getItem("bookMarks") === null) {
    // if no data found in localstorage
    productList = [];
}
else {
    // found data ,display data
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
    //   console.log(productList);
    displayBookmarks(bookMarks);
}

function createBookMark() {
    if (validateProductName() && validateUrl()) {
        var bookMark = {
            name: Name.value,
            url: Url.value
        };
        bookMarks.push(bookMark);
        localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
        displayBookmarks(bookMarks);
    } else {
        // Handle invalid input
    }
}

function displayBookmarks(list) {
    let ourTable = "";
    for (let i = 0; i < list.length; i++) {
        ourTable += `<tr>
            <td>${i}</td>
            <td>${list[i].name}</td>
            <td>${list[i].url}</td>
            <td><button id="Delete" type="button" class="btn"><a href="${list[i].url}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-eye me-1"></i>Visit</a></button></td>
            <td><button id="Visit" type="button" class="btn" onclick="deleteLink(${i})"><i class="fa-solid fa-trash-can me-1"></i>Delete</button></td>
        </tr>`;
    }
    document.getElementById("Data").innerHTML = ourTable;
}

function deleteLink(index) {
    bookMarks.splice(index, 1);
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));

    displayBookmarks(bookMarks);
}

function validateProductName() {
    const regexPattern = /^.{3,}$/;
    if (regexPattern.test(Name.value)) {
        Name.classList.remove("is-invalid");
        Name.classList.add("is-valid");
        return true;
    } else {
        Name.classList.remove("is-valid");
        Name.classList.add("is-invalid");
        return false;
    }
}

function validateUrl() {
    const regexPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (regexPattern.test(Url.value)) {
        Url.classList.remove("is-invalid");
        Url.classList.add("is-valid");
        return true;
    } else {
        Url.classList.remove("is-valid");
        Url.classList.add("is-invalid");
        return false;
    }
}
