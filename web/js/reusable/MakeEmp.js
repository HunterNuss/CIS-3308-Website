"use strict";

function MakeEmp(img, name, title) {

    var ele = document.createElement("div");
    ele.classList.add("emp");

    // employee image file
    var empImage = document.createElement("img");
    empImage.src = img;
    ele.appendChild(empImage);

    // name of employee
    var nameHeading = document.createElement("h3");
    nameHeading.innerHTML = name;
    ele.appendChild(nameHeading);

    // title of employee
    var titleHeading = document.createElement("h4");
    titleHeading.innerHTML = title;
    ele.appendChild(titleHeading);

    return ele;
}