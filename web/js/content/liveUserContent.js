"use strict";

function liveUserContent() {

//    function deleteUser(userId, td) {
//        console.log("to delete user " + userId);
//
//        if (confirm("Do you really want to delete user " + userId + "? ")) {
//            ajax("webAPIs/deleteUserAPI.jsp?deleteId=" + userId, processDelete);
//
//            function processDelete() {
//                var dataRow = td.parentNode;
//                var rowIndex = dataRow.rowIndex - 1; // adjust for column header row?
//                var dataTable = dataRow.parentNode;
//                dataTable.deleteRow(rowIndex);
//            }
//        }
//
//    }


    function deleteUser(userId, td) {
        console.log("to delete user " + userId);

        modalFw.confirm("Do you really want to delete user " + userId + "? ", function () {
            ajax("webAPIs/deleteUserAPI.jsp?deleteId=" + userId, processDelete);

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
    var userContainer = document.createElement("div");
    userContainer.classList.add("clickSort");
    ele.appendChild(userContainer);

    ajax("webAPIs/listUsersAPI.jsp", processData, userContainer);

    function processData(userList) {
        if (userList.dbError.length > 0) {
            userContainer.innerHTML = userList.dbError;
            return;
        }

        userList = userList.webUserList;

        var newUserList = [];

        for (var i = 0; i < userList.length; i++) {
            newUserList[i] = {};
            newUserList[i].User_Id = SortableTableUtils.makeNumber(userList[i].webUserId, false);
            newUserList[i].Email = SortableTableUtils.makeText(userList[i].userEmail);
            newUserList[i]._Image = SortableTableUtils.makeImage(userList[i].image, "8rem");
            newUserList[i].Birthday = SortableTableUtils.makeDate(userList[i].birthday);
            newUserList[i].Membership_Fee = SortableTableUtils.makeNumber(userList[i].membershipFee, true);
            newUserList[i].Role_Type = SortableTableUtils.makeText(userList[i].userRoleType);
            newUserList[i]._Update = SortableTableUtils.makeLink(
                    "<img src='icons/update.png' style='width:1rem' />", // innerHTML of link
                    '#/userUpdate/' + userList[i].webUserId             // href of link
                    );
            newUserList[i]._Delete = SortableTableUtils.makeImage("icons/delete.png", "1rem");

            const userId = userList[i].webUserId;
            newUserList[i]._Delete.onclick = function () {
                deleteUser(userId, this);
            };
        }

        userContainer.appendChild(MakeTable({title: "Live Users", objList: newUserList, sortOrderPropName: "User_Id", sortIcon: "icons/sortUpDown16.png", insertIcon: "icons/insert.png", route: "#/register"}), "userContent");
    }
    return ele;
}