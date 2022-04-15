package model.userCatalog;

import dbUtils.DbConn;
import dbUtils.FormatUtils;
import dbUtils.PrepStatement;
import dbUtils.ValidationUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


public class DbMods {

    
    public static StringData findCatalogById(DbConn dbc, String id) {

        // The find API needs to represent three cases: found web_user, not found, db error. 
        StringData sd = new StringData();
        try {
            String sql = "SELECT book_id, book_title, author_name, price, release_date, book_image, description, "
                    + "user_catalog.web_user_id "
                    + "FROM web_user, user_catalog WHERE web_user.web_user_id = user_catalog.web_user_id "
                    + "AND book_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

//                
//                
//                 public String bookId = "";
//    public String userEmail = "";
//    public String bookTitle = "";
//    public String authorName = "";
//    public String price = "";
//    public String releaseDate = "";
//    public String bookImage = "";
//    public String description = "";
//    public String webUserId = "";
//
//    public String errorMsg = "";

                // plainInteger returns integer converted to string with no commas.
                sd.bookId = FormatUtils.plainInteger(results.getObject("book_id"));
                sd.bookTitle = FormatUtils.formatString(results.getObject("book_title"));
                sd.authorName = FormatUtils.formatString(results.getObject("author_name"));
                sd.price = FormatUtils.formatDollar(results.getObject("price"));
                sd.releaseDate = FormatUtils.formatDate(results.getObject("release_date"));
                sd.bookImage = FormatUtils.formatString(results.getObject("book_image"));
                sd.description = FormatUtils.formatString(results.getObject("description"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("user_catalog.web_user_id"));

            } else {
                sd.errorMsg = "Book Id Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in DbMods.findCatalogById(): " + e.getMessage();
        }
        return sd;

    } // findCatalogById
    
    /*
    Returns a "StringData" object that is full of field level validation
    error messages (or it is full of all empty strings if inputData
    totally passed validation.  
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

//    public String userEmail = "";
//    public String bookId = "";
//    public String bookTitle = "";
//    public String authorName = "";
//    public String price = "";
//    public String releaseDate = "";
//    public String bookImage = "";
//    public String description = "";
//    public String webUserId = "";

  
       
        // Validation
        errorMsgs.bookTitle = ValidationUtils.stringValidationMsg(inputData.bookTitle, 45, true);
        errorMsgs.authorName = ValidationUtils.stringValidationMsg(inputData.authorName, 45, true);
        
        errorMsgs.price = ValidationUtils.decimalValidationMsg(inputData.price, false);
        errorMsgs.releaseDate = ValidationUtils.dateValidationMsg(inputData.releaseDate, false);
        
        errorMsgs.bookImage = ValidationUtils.stringValidationMsg(inputData.bookImage, 300, false);
        errorMsgs.description = ValidationUtils.stringValidationMsg(inputData.description, 500, false);
        
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);

       
        
        return errorMsgs;
    } // validate 

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                  String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            // Start preparing SQL statement
            String sql = "INSERT INTO user_catalog (book_title, author_name, price, release_date, book_image, description, web_user_id) "
                    + "values (?,?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.bookTitle); // string type is simple
            pStatement.setString(2, inputData.authorName);
            pStatement.setBigDecimal(3, ValidationUtils.decimalConversion(inputData.price));
            pStatement.setDate(4, ValidationUtils.dateConversion(inputData.releaseDate));
            pStatement.setString(5, inputData.bookImage);
            pStatement.setString(6, inputData.description);
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.webUserId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "This title has already been used";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert
    
    public static StringData update(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
            
            "SELECT book_id, book_title, author_name, price, release_date, book_image, description, "
                    + "user_catalog.web_user_id "
                    + "FROM web_user, user_catalog WHERE web_user.web_user_id = user_catalog.web_user_id "
                    + "AND book_id = ?";
            
             String sql = "UPDATE web_user SET user_email=?, user_password=?, image= ?, membership_fee=?, birthday=?, "
                    + "user_role_id=? WHERE web_user_id = ?";
             */
            String sql = "UPDATE user_catalog SET book_title=?, author_name=?, price= ?, release_date=?, book_image=?, "
                    + "description=?, web_user_id=? WHERE book_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.bookTitle); // string type is simple
            pStatement.setString(2, inputData.authorName);
            pStatement.setBigDecimal(3, ValidationUtils.decimalConversion(inputData.price));
            pStatement.setDate(4, ValidationUtils.dateConversion(inputData.releaseDate));
            pStatement.setString(5, inputData.bookImage);
            pStatement.setString(6, inputData.description); // string type is simple
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setInt(8, ValidationUtils.integerConversion(inputData.bookId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That book title is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update
    
    
    public static String delete(String bookId, DbConn dbc) {

        if (bookId == null) {
            return "Error in modeluserCatalog.DbMods.delete: cannot delete book_id record because 'bookId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM user_catalog WHERE book_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, bookId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with book_id " + bookId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.userCatalog.DbMods.delete(): " + e.getMessage();
        }

        return result;
    }

} // class
