<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData();
    // checks if a user is logged in
    if (session.getAttribute("loggedOnUser") != null) {
        // if a user is logged in, it will log them out
        session.invalidate();
        sd.errorMsg = "User logged out";
    } else {
        sd.errorMsg = "User could not log out. No user logged in.";
    }
    
    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());
%>