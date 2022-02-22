"use strict";

function catalogContent() {

    var content = `
        <style>
            
            
        </style>
    `;
    var ele = document.createElement("div");
    ele.innerHTML = content;
    var catalogContainer = document.createElement("div");
    catalogContainer.classList.add("clickSort");
    ele.appendChild(catalogContainer);

    ajax("json/catalog.json", processData, document.getElementById("catalogContent"));

    function processData(catalogList) {

        var newCatalogList = [];

        for (var i = 0; i < catalogList.length; i++) {
            newCatalogList[i] = {};
            newCatalogList[i].Email = SortableTableUtils.makeText(catalogList[i].userEmail);
            newCatalogList[i]._Image = SortableTableUtils.makeImage(catalogList[i].bookImage, "8rem");
            newCatalogList[i].Book_Title = SortableTableUtils.makeText(catalogList[i].bookTitle);
            newCatalogList[i].Author_Name = SortableTableUtils.makeText(catalogList[i].authorName);
            newCatalogList[i].Description = SortableTableUtils.makeText(catalogList[i].description);
            newCatalogList[i].Price = SortableTableUtils.makeNumber(catalogList[i].price, true);
            newCatalogList[i].Release_Date = SortableTableUtils.makeDate(catalogList[i].releaseDate);
        }

        catalogContainer.appendChild(MakeTable({title: "Catalog", objList: newCatalogList, sortOrderPropName: "Email", sortIcon: "icons/sortUpDown16.png"}), "catalogContent");
    }

    return ele;
}

//var title = params.title || " ";
//    var objList = params.objList || [];
//    var sortOrderPropName = params.sortOrderPropName || objList[0];
//    var sortIcon = params.sortIcon;