"use strict";
function MakeBook(params) {

    var ele = document.createElement("div");
    ele.classList.add("book");


    if (!params) {
        params = {};
    }

    ele.title = params.title || "Book";
    var author = params.author || "John Smith";
    var description = params.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus porttitor elit vel accumsan.";
    var price = params.price || "10.00";
    var img = params.image || "pictures/bookoutline.png";
    var release = params.release || "1/1/2000";


    console.log("bookParams");
    console.log("Title: " + ele.title);
    console.log('Description: ' + description);
    console.log('Price: $' + price);
    console.log("Author: " + author);


//    //Image variable
    var imageContainer = document.createElement("div");
    imageContainer.classList.add('hiddenElement');

    var bookImage = document.createElement("img");
    bookImage.src = img;

    var descriptionDiv = document.createElement("div");
    descriptionDiv.innerHTML = description;

    imageContainer.appendChild(bookImage);
    imageContainer.appendChild(descriptionDiv);

    ele.appendChild(imageContainer);

    ele.appendChild(document.createElement("br"));


    // Display info
    var bookInfo = document.createElement("div");
    ele.appendChild(bookInfo);

    function display( ) {

        bookInfo.innerHTML = "Title: " + ele.title + "<br/> Author: " + author + "<br/> Price: $" +
                price + " <br/> Release Date: " + release;
    }
    ;


    ele.appendChild(document.createElement("br"));



    // Public title function
    ele.setTitle = function (newTitle) {
        ele.title = newTitle;
        display();
    };

    var titleButton = document.createElement("button");
    titleButton.innerHTML = "Change title to: ";
    ele.appendChild(titleButton);

    var newTitleInput = document.createElement("input");
    ele.appendChild(newTitleInput);

    titleButton.onclick = function () {
        ele.setTitle(newTitleInput.value);
    };


    ele.appendChild(document.createElement("br"));


    // Private author function
    function setAuthor(newAuthor) {
        author = newAuthor;
        display();
    }
    ;

    var authorButton = document.createElement("button");
    authorButton.innerHTML = "Change author to: ";
    ele.appendChild(authorButton);

    var newAuthorInput = document.createElement("input");
    ele.appendChild(newAuthorInput);

    authorButton.onclick = function () {
        setAuthor(newAuthorInput.value);
    };


    ele.appendChild(document.createElement("br"));


    // Public price function
    ele.changePrice = function (change) {
        var value = Number(change);
        console.log("Changing price to: " + value);
        price = value;
        display();
    };

    var priceButton = document.createElement("button");
    priceButton.innerHTML = "Change price to: ";
    ele.appendChild(priceButton);

    var newPriceInput = document.createElement("input");
    ele.appendChild(newPriceInput);

    priceButton.onclick = function () {
        ele.changePrice(newPriceInput.value);
    };


    ele.appendChild(document.createElement("br"));



    ele.setDate = function (newDate) {
        release = newDate;
        display();
    };



    var newDateInput = document.createElement("input");
    newDateInput.type = "date";
    ele.appendChild(newDateInput);

    newDateInput.onchange = function () {
        var newDate = new Date(newDateInput.value);
        var dateString = (newDate.getMonth() + 1) + '/' + (newDate.getDate() + 1) + '/' + newDate.getFullYear();
        ele.setDate(dateString);
    };


    ele.log = function () {
        console.log("Title: " + ele.id + " is " + ele.title + ", author is: " + author + ", description is: " + description + ", price is: $" + price + " and release date is: " + release);
    };

    display();
    return ele;
}