"use strict";

function homeContent() {

// ` this is a "back tick". You can use it to define multi-line strings in JavaScript.
// 
// NetBeans menu option "Source - Format" will not work with the text inside of a 
// String, so you have to do this indentation manually with the editor. 

    var content = `
     
            <p>Have you read a book and don't want to forget about it? You can save it. </p>
            
            <p>Have you heard about a book that you want to read? Add it to the list.</p>
            
            <p>
               This site is a way for those who enjoy reading to organize and keep track or books they have read. 
               Having the option to add the book information, save the price, and rate the book will allow you to 
               make sure you always know what to read next. Encouraging users to add as many books as they 
               would like to increase their range of genres and to fuel their passion of reading. 
            </p>
            
            <p>This page is similar to the website GoodReads: </p>
            <a href= "https://www.goodreads.com/">goodreads.com</a>
    
    
    `;
    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele;
}