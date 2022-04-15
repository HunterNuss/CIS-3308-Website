"use strict";

function liveCatalogContent() {

    function deleteCatalog(bookId, td) {
        console.log("to delete book " + bookId);

        modalFw.confirm("Do you really want to delete book " + bookId + "? ", function () {
            ajax("webAPIs/deleteCatalogAPI.jsp?deleteId=" + bookId, processDelete);

            function processDelete() {
                var dataRow = td.parentNode;
                var rowIndex = dataRow.rowIndex - 1; // adjust for column header row?
                var dataTable = dataRow.parentNode;
                dataTable.deleteRow(rowIndex);
            }
        });
    }
    

    var content = `
        <style>
            
            
        </style>
    `;
    var ele = document.createElement("div");
    ele.innerHTML = content;
    var catalogContainer = document.createElement("div");
    catalogContainer.classList.add("clickSort");
    ele.appendChild(catalogContainer);

    ajax("webAPIs/listCatalogAPI.jsp", processData, catalogContainer);

    function processData(catalogList) {
        if (catalogList.dbError.length > 0) {
            catalogContainer.innerHTML = catalogList.dbError;
            return;
        }

        catalogList = catalogList.userCatalogList;

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
            newCatalogList[i]._Update = SortableTableUtils.makeLink(
                    "<img src='icons/update.png' style='width:1rem' />", // innerHTML of link
                    '#/catalogUpdate/' + catalogList[i].bookId             // href of link
                    );

            newCatalogList[i]._Delete = SortableTableUtils.makeImage("icons/delete.png", "1rem");

            const bookId = catalogList[i].bookId;
            newCatalogList[i]._Delete.onclick = function () {
                deleteCatalog(bookId, this);
            };
        }

        catalogContainer.appendChild(MakeTable({title: "Live Catalog", objList: newCatalogList, sortOrderPropName: "Email", sortIcon: "icons/sortUpDown16.png", insertIcon: "icons/insert.png", route: "#/insertCatalog"}), "catalogContent");
    }

    return ele;
}