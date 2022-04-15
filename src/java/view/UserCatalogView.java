package view;

// classes imported from java.sql.*

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.userCatalog.*;

// classes in my project
import dbUtils.*;

public class UserCatalogView {

    public static StringDataList getAllBooks(DbConn dbc) {

        // sdl will be an empty array and DbError with "" 
        StringDataList sdl = new StringDataList(); 
        
        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();
        
        try {
            String sql = "SELECT user_email, book_id, book_title, book_image, author_name, price, release_date, description, user_catalog.web_user_id "
                    + "FROM user_catalog, web_user "
                    + "WHERE web_user.web_user_id = user_catalog.web_user_id ORDER BY book_id ";
                                
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new StringData();
                
                // the formatUtils methods do not throw exceptions, but if they find illegal data, they write 
                // a message right in the field that they are trying to format.

                // plainInteger returns integer converted to string with no commas.
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));
                sd.bookImage = FormatUtils.formatString(results.getObject("book_image"));
                sd.bookId = FormatUtils.plainInteger(results.getObject("book_id"));
                sd.bookTitle = FormatUtils.formatString(results.getObject("book_title"));
                sd.authorName = FormatUtils.formatString(results.getObject("author_name"));
                sd.price = FormatUtils.formatDollar(results.getObject("price"));
                sd.releaseDate = FormatUtils.formatDate(results.getObject("release_date"));
                sd.description = FormatUtils.formatString(results.getObject("description"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));

                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in UserCatalog.getAllBooks(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}