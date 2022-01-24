"use strict";
        function empContent() {

        var content = `
        <style>
            p {
                margin-left: 0rem;
            }
            .flexContainer {
                display:flex; 
                flex-direction: row;
                background-color: gray;
                width: 55%;
                justify-content: space-between;
                justify-content: center;
                
                margin-left: auto;
                margin-right: auto;

            }
            .flexContainer .emp {
                width: 50%; /* to fit three columns inside the flexContainer */
                box-sizing: border-box; /* makes padding and border counted in the width */
    
            }
        </style>
        <h3 style="justify-content: center;
                display:flex; 
                margin-left: auto;
                margin-right: auto;">Employees
        </h3>
        <p style="justify-content: center;
                display:flex; 
                margin-left: auto;
                margin-right: auto;">Temple University Computer Science Department Employees
        </p>
    `;
                var ele = document.createElement("div");
                ele.innerHTML = content;
                var empContainer = document.createElement("div");
                empContainer.classList.add('flexContainer');
                ele.appendChild(empContainer);
                empContainer.appendChild(MakeEmp("http://cis-linux2.temple.edu/~sallyk/pics_users/abha.jpg", "Abha", "abha@temple.edu"));
                empContainer.appendChild(MakeEmp("http://cis-linux2.temple.edu/~sallyk/pics_users/dominic.jpg", "Dominic", "dominic@temple.edu"));
                return ele;
        }