// params: title, objList, sortOrderPropName, sortIcon

function MakeTable(params) {


    if (!params) {
        params = {};
    }

    var title = params.title || " ";
    var objList = params.objList || [];
    var sortOrderPropName = params.sortOrderPropName || objList[0];
    var sortIcon = params.sortIcon;
    var insertIcon = params.insertIcon || "";
    var route = params.route || "";


    function jsSort(objList, byProperty, orderDirection) {

        if (!objList || !objList[0]) {
            var message = "Cannot sort. Need an objList with at least one object";
            console.log(message);
            alert(message);
            return;
        }

        var obj = objList[0];
        if (!obj[byProperty]) {
            var message = "objList does not have property " + byProperty + " -- cannot sort by that property.";
            console.log(message);
            alert(message);
            return;
        }

        if (!obj[byProperty].sortOrder || obj[byProperty].sortOrder === null) {
            var message = "Cannot sort objList by property " + byProperty +
                    " because this property never had it's sortOrder set (by a method in SortableTableUtils.js).";
            console.log(message);
            alert(message);
            return;
        }

        objList.sort(function (q, z) {
            var qVal = q[byProperty].sortOrder;
            var zVal = z[byProperty].sortOrder;
            var tmp = null;

            if (orderDirection) {
                tmp = qVal;
                qVal = zVal;
                zVal = tmp;
            }

            var c = 0;
            if (qVal > zVal) {
                c = 1;
            } else if (qVal < zVal) {
                c = -1;
            }
            console.log("comparing " + qVal + " to " + zVal + " is " + c);
            return c;
        });

    }

    function isToShow(obj, searchKey) {

        if (!searchKey || searchKey.length === 0) {
            return true;
        }

        var searchKeyUpper = searchKey.toUpperCase();

        for (var prop in obj) {
            if (prop[0] !== "_") {
                var propVal = obj[prop].innerHTML;
                var propValUpper = propVal.toUpperCase();

                console.log("checking if " + searchKeyUpper + " is in " + propValUpper);

                if (propValUpper.includes(searchKeyUpper)) {
                    console.log("Yes it is inside");
                    return true;
                }
            }
        }
        console.log("no it is not inside");
        return false;
    }



    function addTableBody(table, list, sortOrderPropName, filterValue, orderDirection) {

        var oldBody = table.getElementsByTagName("tbody");
        if (oldBody[0]) {
            console.log("ready to remove oldBody");
            table.removeChild(oldBody[0]);
        }

        jsSort(list, sortOrderPropName, orderDirection);

        var tableBody = document.createElement("tbody");
        table.appendChild(tableBody);


        for (var i in objList) {
            if (isToShow(objList[i], filterValue)) {
                var tableRow = document.createElement("tr");
                tableBody.appendChild(tableRow);

                var obj = objList[i];
                for (var prop in obj) {
                    tableRow.appendChild(obj[prop]);
                }
            }
        }

    }




    var container = document.createElement("div");

    var heading = document.createElement("h2");
    heading.innerHTML = title + "   ";
    container.appendChild(heading);

    if (insertIcon.length != 0) {
        var insertButton = document.createElement("button");
        insertButton.innerHTML = "<img src='" + insertIcon + "'/> ";
        insertButton.style.border = "transparent";
        heading.appendChild(insertButton);

        if (route.length != 0) {
            insertButton.onclick = function () {
                window.location.hash = route;
            };
        }

    }


    var searchDiv = document.createElement("div");
    container.appendChild(searchDiv);
    searchDiv.innerHTML = "Filter by: ";

    var searchInput = document.createElement("input");
    searchDiv.appendChild(searchInput);

    var newTable = document.createElement("table");
    container.appendChild(newTable);

    var headerRow = document.createElement("tr");
    newTable.appendChild(headerRow);

    var obj = objList[0];
    for (var propName in obj) {
        var headingCell = document.createElement("th");

        headingText = propName.replace("_", " ");

        if (propName[0] !== "_") {
            headingText = "<img src='" + sortIcon + "'/> " + headingText;
            headingCell.sortPropName = propName;
            headingCell.orderDirection = true;
            headingCell.onclick = function () {
                console.log("WILL SORT ON " + this.sortPropName);
                addTableBody(newTable, objList, this.sortPropName, "", this.orderDirection);
                this.orderDirection = !this.orderDirection;
            };

        }
        headingCell.innerHTML = headingText;
        headerRow.appendChild(headingCell);
    }


    addTableBody(newTable, objList, sortOrderPropName, "");




    searchInput.onkeyup = function () {
        console.log("search filter changed to " + searchInput.value);
        addTableBody(newTable, objList, sortOrderPropName, searchInput.value);
    };

    return container;

}