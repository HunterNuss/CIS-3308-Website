<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData();
    // wants the email and password in the URL
    String searchEmail = request.getParameter("email");
    String searchPassword = request.getParameter("password");
    
    if ((searchEmail == null) || (searchPassword == null)) {
        sd.errorMsg = "Cannot search for user: 'email' and 'password' must be supplied";
    } else {
        DbConn dbc = new DbConn();
        sd.errorMsg = dbc.getErr(); 
        if (sd.errorMsg.length() == 0) { 
            System.out.println("*** Ready to call DbMods.findByEmail");
            // looks at DbMods for the email and password
            sd = DbMods.logonFind(dbc, searchEmail, searchPassword); 
            // logs on user
            if (sd.errorMsg.length() == 0) {
                session.setAttribute("loggedOnUser", sd);   
            }
                    
        }
        dbc.close(); 
    }
    
    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());
%>