var account = {};

(function ( ) {
    // logs the user in by creating two text boxes
    account.logon = function ( ) {
        var ele = document.createElement("div");
        ele.classList.add("account");

        var emailSpan = document.createElement('span');
        emailSpan.innerHTML = "Email:";
        ele.appendChild(emailSpan);

        var emailInput = document.createElement("input");
        ele.appendChild(emailInput);

        var passwordSpan = document.createElement('span');
        passwordSpan.innerHTML = "Password:";
        ele.appendChild(passwordSpan);

        var passwordInput = document.createElement("input");
        passwordInput.setAttribute("type", "password");
        ele.appendChild(passwordInput);

        var submitButton = document.createElement("button");
        submitButton.innerHTML = "Submit";
        ele.appendChild(submitButton);

        var msgDiv = document.createElement("div");
        ele.appendChild(msgDiv);

        submitButton.onclick = function () {
            // calls the logon API which requires two parameters, the email and password
            var url = "webAPIs/logonAPI.jsp?email=" + escape(emailInput.value) +
                    "&password=" + escape(passwordInput.value);

            console.log("onclick function will make AJAX call with url: " + url);
            ajax(url, processLogon, msgDiv);

            // calls buildProfile which will display all information of the user
            function processLogon(obj) {
                msgDiv.innerHTML = buildProfile(obj);
            }
        };

        return ele;
    };

    // displays all information of the user
    function buildProfile(userObj) {
        var msg = "";
        console.log("Successfully called the logon API. Next line shows the returned object.");
        console.log(userObj);
        if (userObj.errorMsg.length > 0) {
            msg += "<strong>Error: " + userObj.errorMsg + "</strong>";
        } else {
            msg += "<strong>Welcome Web User " + userObj.webUserId + "</strong>";
            msg += "<br/> Birthday: " + userObj.birthday;
            msg += "<br/> MembershipFee: " + userObj.membershipFee;
            msg += "<br/> User Role: " + userObj.userRoleId + " " + userObj.userRoleType;
            msg += "<p> <img src ='" + userObj.image + "'></p>";
        }
        return msg;
    }

    // calls get profile API and if there is a user logged on it displays their information
    account.getProfile = function ( ) {
        var msgDiv = document.createElement("div");
        msgDiv.classList.add("account");

        var url = "webAPIs/getProfileAPI.jsp";
        ajax(url, processGetProfile, msgDiv);

        function processGetProfile(obj) {
            msgDiv.innerHTML = buildProfile(obj);
        }
        return msgDiv;
    };

    // calls log off API and if a user is logged on they get logged out
    account.logoff = function ( ) {
        var logoffDiv = document.createElement("div");
        logoffDiv.classList.add("account");

        var url = "webAPIs/logoffAPI.jsp";
        ajax(url, processLogoff, logoffDiv);
        
        function processLogoff(obj) {
            logoffDiv.innerHTML = buildProfile(obj);
        }
        return logoffDiv;
    };

}( )); 