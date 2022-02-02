"use strict";
        function bookContent() {

        var content = `
        <style>
            p {
                margin-left: 0rem;
            }
            .flexContainer {
                display:flex; 
                flex-direction: row;
                background-color: #111b37;
                width: 70%;
    
                justify-content: space-between;
                justify-content: center;
                margin-left: auto;
                margin-right: auto;
            }
            .flexContainer .book {
                width: 50%;
                box-sizing: border-box; /* makes padding and border counted in the width */
            }
            
        </style>
        <p>This page displays relevent information of the books below. Change the information by using the text inputs, 
            buttons, and the date changer. The title and author are text characters and the price is a number. View the 
            description of the book by hovering over the image.
        </p>
    `;
                var ele = document.createElement("div");
                ele.innerHTML = content; // the HTML code specified just above...
                var bookContainer = document.createElement("div");
                bookContainer.classList.add('flexContainer'); // see styling in this file, above...
                ele.appendChild(bookContainer);
                bookContainer.appendChild(MakeBook({title: "The Road",
                        author: "Cormac McCarthy",
                        price: 12.00,
                        image: "pictures/theroad.jpeg",
                        release: "9/26/2006",
                        description:"A father and his young son journey on foot across a post-apocalyptic world after an extinction event."}));
                bookContainer.appendChild(MakeBook({title: "The Mist",
                        author: "Steven King",
                        price: 11.00,
                        image: "pictures/themist.jpeg",
                        release: "8/29/1980",
                        description: "An unnaturally thick and straight-edged cloud of mist spreads across a small town bringing with it a whole ecosystem of deadly creatures."}));
//                bookContainer.appendChild(MakeBook());
                return ele;
        }