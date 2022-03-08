"use strict";

function liveUserContent() {

    var content = `
        <style>
            
            
        </style>
    `;
    var ele = document.createElement("div");
    ele.innerHTML = content;
    var userContainer = document.createElement("div");
    userContainer.id = "testcontainer"
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
            
        }
        
        userContainer.appendChild(MakeTable({title: "Live Users", objList: newUserList, sortOrderPropName: "User_Id", sortIcon: "icons/sortUpDown16.png"}), "userContent");
    }
    return ele;
}