"use strict";
function MakeLibrary(params) {

    var ele = document.createElement("div");
    ele.classList.add("library");


    if (!params) {
        params = {};
    }

    ele.libraryList = params.libraryList;

//    if (!ele.libraryList) {
//        var message = "libraryObject must not be empty";
//        console.log(message);
//        alert(message);
//        return;
//    }


    // modal
    var modal = document.createElement("div");
    modal.classList.add("modal");
//    ele.appendChild(modal);

//    var span = document.getElementsByClassName("close")[0];
    var modalButton = document.createElement("button");
    modalButton.classList.add("openModal");
    ele.appendChild(modalButton);

    modalButton.onclick = function () {
        modal.style.display = "block";
    };

//    span.onclick = function () {
//        modal.style.display = "none";
//    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    var currentImage = null;
    var flag = true;




    // zoom click
    var zoomEffect = document.createElement("div");
    zoomEffect.classList.add("img-zoom-box");
    modal.appendChild(zoomEffect);

    zoomEffect.onclick = function () {
        if (flag) {
            flag = false;
            document.createElement("img-2").style.display = "block";
            document.createElement("img-zoom-box").style.cursor = "zoom-out";
        } else {
            flag = true;
            document.createElement("img-2").style.display = "none";
            document.createElement("img-zoom-box").style.cursor = "zoom-in";
        }
    }


    // zoom effect
    function zoomEvent(e) {
        let slides = document.getElementsByClassName("mySlides");
        let original = slides[slideIndex - 1];
        let magnified = document.querySelector('#img-2');
        let style = magnified.style;
        
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;
        let imgWidth = original.offsetWidth;
        let imgHeight = original.offsetHeight;
        let xperc = ((x / imgWidth) * 100);
        let yperc = ((y / imgHeight) * 100);


        //lets user scroll past right edge of image
        if (x > (.01 * imgWidth)) {
            xperc += (.15 * xperc);
        }

        //lets user scroll past bottom edge of image
        if (y >= (.01 * imgHeight)) {
            yperc += (.15 * yperc);
        }


        style.backgroundPositionX = (xperc - 9) + '%';
        style.backgroundPositionY = (yperc - 9) + '%';

        style.left = (x - 180) + 'px';
        style.top = (y - 180) + 'px';

    }

    let zoom = function () {
        document.querySelector('#img-zoom-box')
                .addEventListener('mousemove', zoomEvent, false);
    }();





    // slideshow
    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) {
            slideIndex = slides.length;
        }

        if (n < 1) {
            slideIndex = 1;
        }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex - 1].style.display = "block";

        let imageUrl = slides[slideIndex - 1].childNodes[1].src;

        var imageEle = document.createElement("img-2").style.background = "url(" + imageUrl + ") no-repeat";
        modal.appendChild(imageEle);
    }

    return ele;
}