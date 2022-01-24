"use strict";
        function blogContent() {

        // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
        var content = ` 
        
            <h3><u>Database</u></h3>
                <p>
                    This database table will allow the user to add the following to keep track of their books.
                </p>
                <ul>
                    <li>Book Title</li>
                    <li>Author's Name</li>
                    <li>Description</li>
                    <li>Rating</li>
                    <li>Price</li>
                    <li>If a Book Has Been Read or Not</li>
                </ul>

                &nbsp


                <h3><u>Experience</u></h3>
                <p>
                    I do not have any experience web design or web development. I began to learn JavaScript a while 
                    ago but didn't continue since I figured it would be more beneficial to learn it in a class. Since 
                    I have no experience, I hope to learn a lot in this class. I want to be able to work with web 
                    applications after this semester and having even the most basic knowledge can help with that.
                </p>
    
                &nbsp
    
                <h3><u>Homework 1</u></h3>
                <p>
                    There were a few challenges I had when completing this lab. I created an external style sheet 
                    which was easy but figuring out how to reference it was a little difficult. Once I figured out how 
                    to do that I understood it better. I also had problems with making the titleNav responsive. I had 
                    the code to make it responsive, but having the proper padding was a bit confusing to get right. The tutorials and 
                    examples that were provided were very useful for this assignment and helped me with a majority of 
                    my problems.
                </p>

                <p>
                    The rest of the lab was relatively easy. Changing the text and colors were straight forward.
                    Understanding all the id's was not difficult since they are named reasonably. Even including an 
                    image as the background was easy since there were examples on how to do it. 
                </p>

                <p>
                    This lab was very useful in general since it allow me to work with a lot of the basics of creating a 
                    website. A lot of it was covered in the lab activity, but the additional requirements had helped me 
                    understand the layout of the website a lot more.
                </p>
    
                &nbsp
    
                <h3><u>Homework 2</u></h3>
                <p>
                    The challenges I had faced related to the nav router. Since we used the nav route in the last part of the lab 
                    activity, adding it didn't create too many problems. The main problem was trying to style it to look like my 
                    header from the first homework. The other part I had problems with was getting the drop down menu to work. Trying 
                    to figure out how it is connected to the nav router and how to add another link took a lot of time 
                    to figure out.
                </p>
    
                <p>
                    The smaller parts of the lab were easier. I already had the links change color based on the action from the last 
                    homework. Adding "use strict" to all Javascript code was simple. Since we created different Javascript 
                    files in the lab activity, creating them for this homework did not take long. All of the employee files 
                    were straight forward and it was easy to convert to my website.
                </p>
    
                <p>
                    Like last week, the sample code and the lab activity was very useful. This homework was very similar 
                    so it was only changing a few things. Also, working with the nav router allowed me to understand it a 
                    lot better than the lab activity.
                </p>
    `;
                var ele = document.createElement("div");
                ele.innerHTML = content;
                return ele;
        }