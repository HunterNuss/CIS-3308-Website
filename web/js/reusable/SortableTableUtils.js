var SortableTableUtils = {};

SortableTableUtils.makeText = function (text) {
    var tableData = document.createElement('td');
    text = text || "";
    if (text === "") {
        tableData.sortOrder = -1;
    } else {
        tableData.sortOrder = text.toUpperCase();
    }
    tableData.innerHTML = text;
    tableData.style.textAlign = "left";

    return tableData;
};

SortableTableUtils.makeNumber = function (num, isFormatCurrency) {

    var tableData = document.createElement('td');

    if (!num) { 
        num = "";
        tableData.sortOrder = -1; 
    } else { 
        tmp = num + "";

        tmp = tmp.replace(" ", "");
        tmp = tmp.replace(",", "");
        tmp = tmp.replace("$", "");

        if (isNaN(tmp)) { 
            tableData.sortOrder = -1; 
            num = "Not numeric " + num; 
        } else {
            var convertedNum = Number(tmp);
            tableData.sortOrder = convertedNum; 
            if (isFormatCurrency) {
                num = convertedNum.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
            }
        }
    }

    tableData.innerHTML = num;
    tableData.style.textAlign = "right"; 
    return tableData;
};


SortableTableUtils.makeDate = function (dateString) {

    var tableData = document.createElement('td');

    if (!dateString) { 
        dateString = "";
        tableData.sortOrder = -1;
        
    } else {

        var parsedDate = Date.parse(dateString);
        if (isNaN(dateString) && !isNaN(parsedDate)) {
            
            var years = 170;
            var days = years * 365;
            var hours = days * 24;
            var minutes = hours * 60; 
            var seconds = minutes * 60; 
            tableData.sortOrder = parsedDate/1000 + seconds;
        } else {
            tableData.sortOrder = -1;
            dateString = "Not a Date "+dateString;
        }
    }

    tableData.innerHTML = dateString;
    tableData.style.textAlign = "center";
    return tableData;
};

SortableTableUtils.makeImage = function (imageFileName, width) {

    var tableData = document.createElement('td');
    var img = document.createElement("img");
    if (imageFileName && imageFileName !== "") {
        img.src = imageFileName;
    }
    img.style.width = width;

    tableData.appendChild(img);
    tableData.style.textAlign = "center";
    tableData.sortOrder = null;
    return tableData;
};