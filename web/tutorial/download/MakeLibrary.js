// parmas: an object containing title, author, and images
// title: a string (required)
// author: a string (required)
// images: an array (required)

"use strict";
function MakeLibrary(params) {
    // overall element
    var ele = document.createElement("div");
    ele.classList.add("library");


    // search input element
    var input = document.createElement("input");
    ele.appendChild(input);
    input.classList.add("search");
    input.placeholder = "Search..";

    ele.appendChild(document.createElement("br"));






    // overall book element
    var libraryEle = document.createElement("div");
    ele.appendChild(libraryEle);
    libraryEle.classList.add("allBooks");


    // checks the parameter
    if (!params) {
        alert("Must include parameter: Object");
        return;
    }

    if (params.length == 0) {
        alert("Invalid Input, object length is 0");
        return;
    }

    // libraryList now contains the object
    var libraryList = params.library;


    // used later to hold all book elements
    var bookElements = [];



    // loops through each element of the object to create each book
    for (let i = 0; i < libraryList.length; i++) {

        /*
         
         Object Assignment
         
         */


        // accesses the title of each book
        let title = libraryList[i].title;
        if (title.length == 0) {
            alert("Must include title name in object");
            return;
        }

        // accesses the author of each book
        let author = libraryList[i].author;
        if (author.length == 0) {
            alert("Must include author name in object");
            return;
        }

        // accesses the images of each book
        let images = libraryList[i].images;
        if (images.length == 0) {
            alert("Must include at least one image in object");
            return;
        }



        /*
         
         Book Div
         
         */

        if (title.length > 22) {
            title = title.substring(0, 19) + "...";
        }

        if (author.length > 22) {
            author = author.substring(0, 19) + "...";
        }

        // creates each div that all the content is in (title & author)
        let book = document.createElement("div");
        book.classList.add("book");
        book.innerHTML = title + "<br>" + author + "<br>";
        libraryEle.appendChild(book);

        bookElements.push(book);



        /*
         
         Modal Feature
         
         */



        // creates the modal the divs
        let modal = document.createElement("div");
        modal.classList.add("modal");
        libraryEle.appendChild(modal);

        // creates the content of each modal which includes the close feature, images, and the arrow buttons
        let modalContent = document.createElement("div");
        modalContent.classList.add("modalContent");
        modal.appendChild(modalContent);


        // creates the close button in the top right
        let close = document.createElement("span");
        close.classList.add("close");
        close.innerHTML = "&times;";
        modalContent.appendChild(close);



        // when a book div gets clicked on it this displays the modal
        book.onclick = function () {
            modal.style.display = "block";
        };

        // when the x in the corner gets clicked, the modal closes
        close.onclick = function () {
            modal.style.display = "none";
            currentSlide(1);
        };

        // when anywhere outside of the modal gets clicked, the modal closes.
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };



        // div contains all sets of images
        let imgZoomBox = document.createElement("div");
        imgZoomBox.classList.add("imgZoomBox");
        modalContent.appendChild(imgZoomBox);

        // contains each new slide div and the zoomed in image
        let slideshowContainer = document.createElement("div");
        slideshowContainer.classList.add("slideshow-container");
        imgZoomBox.appendChild(slideshowContainer);


        let slides = [];
        let srcArray = [];
        // loop to create each new slide and create each new image src element
        for (var j = 0; j < images.length; j++) {
            // creates each slide
            slides[j] = document.createElement("div");
            slides[j].classList.add("mySlides");
            slideshowContainer.appendChild(slides[j]);

            // creates the img element
            srcArray[j] = document.createElement("img");
            srcArray[j].classList.add("originalImg");
            slides[j].appendChild(srcArray[j]);


            //assigns each image to an index
            srcArray[j].src = images[j];

        }



        // creates the zoomed in image
        let zoomedImg = document.createElement("div");
        zoomedImg.classList.add('zoomedImg');
        imgZoomBox.appendChild(zoomedImg);



        // the overall div for the previous and next arrows
        let arrowButtons = document.createElement("div");
        arrowButtons.classList.add("arrowButtons");
        modalContent.appendChild(arrowButtons);

        // the creation of the previous arrow
        let previous = document.createElement("a");
        previous.innerHTML = "&#10094;";
        previous.classList.add("prev");
        arrowButtons.appendChild(previous);

        // the creation of the next arrow
        let next = document.createElement("a");
        next.innerHTML = "&#10095;";
        next.classList.add("next");
        arrowButtons.appendChild(next);


        // previous click function to move back a slide
        previous.onclick = function () {
            plusSlides(-1);
        };

        // next click function to move forward a slide
        next.onclick = function () {
            plusSlides(1);
        };



        /*
         
         Zoom Feature
         
         */



        // a flag to check if the image has been clicked
        var flag = true;

        // to determine what action to do if the image is click
        imgZoomBox.onclick = function () {
            if (flag) {     // if the image was zoomed out
                flag = false;
                // displays the zoomed in image
                zoomedImg.style.display = "block";
                // changes cursor to the zoom out style
                imgZoomBox.style.cursor = "zoom-out";
            } else {    // if the image was already zoomed in
                flag = true;
                // removes the zoomed in image
                zoomedImg.style.display = "none";
                // changes the cursor to the zoom in style
                imgZoomBox.style.cursor = "zoom-in";
            }
        };


        // the function that generates where the zoomed in image is
        function zoomEvent(e) {
            // gets the orginal image
            let original = slides[slideIndex - 1];
            let style = zoomedImg.style;

            // gets the x and y position on the click
            let x = e.pageX - this.offsetLeft;
            let y = e.pageY - this.offsetTop;

            // gets the img width and height including the padding and border
            let imgWidth = original.offsetWidth;
            let imgHeight = original.offsetHeight;

            // places the zoomed in image area
            let xperc = ((x / imgWidth) * 100);
            let yperc = ((y / imgHeight) * 100);


            // lets user scroll past right edge of image
            if (x > (.01 * imgWidth)) {
                xperc += (.15 * xperc);
            }

            // lets user scroll past bottom edge of image
            if (y >= (.01 * imgHeight)) {
                yperc += (.15 * yperc);
            }

            // change in position of where it is clicked
            style.backgroundPositionX = (xperc - 9) + '%';
            style.backgroundPositionY = (yperc - 9) + '%';

            // places the zoom area to the top left of the cursor
            style.left = (x - 180) + 'px';
            style.top = (y - 180) + 'px';

        }


        // calls the event listener when the mouse moves
        // event listener calls the zoom event functions which will get the proper location
        let zoom = function () {
            imgZoomBox.addEventListener('mousemove', zoomEvent, false);
        }();



        /*
         
         Slideshow Feature
         
         */



        // sets the slideIndex to 1 to display first image
        let slideIndex = 1;
        showSlides(slideIndex);


        // changes the index of the slide
        // called when either the previous or next arrow button is clicked
        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        // displays a specific slide index
        // called to make sure it always displays the first image when modal is opened
        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        // displays the slides
        function showSlides(n) {

            // checks to see if the index is going past the amount of images
            // keeps the index at the last image
            if (n > slides.length) {
                slideIndex = slides.length;
            }

            // checks to see if the index is lower than the first slide
            // keeps the index at the first image
            if (n < 1) {
                slideIndex = 1;
            }

            // sets each slide to display nothing, so not all images are being shown
            for (var k = 0; k < slides.length; k++) {
                slides[k].style.display = "none";
            }

            // sets the current slide to be shown
            slides[slideIndex - 1].style.display = "block";

            // sets variable to each slides src
            let imageUrl = srcArray[slideIndex - 1].src;

            // displays proper zoomed image
            zoomedImg.style.background = "url(" + imageUrl + ") no-repeat";
        }
    }



    /*
     
     Filter Feature
     
     */



    input.onkeyup = function () {
        // sets user input to uppercase
        var filter = input.value.toUpperCase();

        // loops through all books added
        for (var i = 0; i < bookElements.length; i++) {
            // checks to see if the books text is the same as the input value
            var txtValue = bookElements[i].textContent || bookElements[i].innerText;
            if (txtValue.toUpperCase().includes(filter)) {
                // if it is the same, it doesn't change
                bookElements[i].style.display = "";
            } else {
                // if it is not the same, the display changes to none
                bookElements[i].style.display = "none";
            }
        }
    };


    ele.setSize = function (size) {
        for (var i = 0; i < bookElements.length; i++) {
            bookElements[i].style.width = "" + size + "rem";
        }
    };

    ele.setFontStyle = function (font) {
        for (var i = 0; i < bookElements.length; i++) {
            bookElements[i].style.fontFamily = font;
        }
    };

    return ele;
}