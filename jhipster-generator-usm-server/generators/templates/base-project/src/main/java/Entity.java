package  <%= properties.packageName %>.dto;


import java.io.Serializable;





public class <%= properties.entityClass %> implements Serializable {

    private static final long serialVersionUID = 1L;


    <%_ for (idx in properties.fields) {
   
        var fieldType = properties.fields[idx].fieldType;
        var fieldName = properties.fields[idx].fieldName;
        var fieldInJavaBeanMethod = properties.fields[idx].fieldInJavaBeanMethod;
    _%>
    
    private <%= fieldType %> <%= fieldName %>;
    
    public String get<%= fieldInJavaBeanMethod %>() {
        return <%= fieldName %>;
    }
       
    public void set<%= fieldInJavaBeanMethod %>(String <%= fieldName %>) {
	   this.<%= fieldName %> = <%= fieldName %>;
    }


 <%_ } _%>
  
}
