package <%= properties.packageName %>.controller;

import java.util.logging.Logger;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import <%= properties.packageName %>.service.ApplicationService;
import <%= properties.packageName %>.dto.<%= properties.entityClass %>;

@Controller
public class ApplicationController extends BaseController{

	@Autowired
	private ApplicationService applicationService;

    @Autowired
    private HttpClient httpClient;

    private String restEndHost;

	private Logger logger = Logger.getLogger(getClass().getName());

	private ApplicationController() { }

    @SuppressWarnings("rawtypes")
	@RequestMapping(value="<%= properties.methodURL %>", method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	    @ResponseBody ResponseEntity config(@RequestBody  final  <%= properties.entityClass %> request) {
       
       try {
            String apiUrl = "<%= properties.url %>";

            String URI = restEndHost + apiUrl;
           
            HttpResponse httpResponse = httpClient.execute(getPostRequest(URI,request));

            return getResponseAsString(httpResponse);
        } catch (Exception e) {
            System.out.println(e);
            // TODO: handle exception
        }
        return null;
    }

    public void setRestEndHost(String restEndHost){
        this.restEndHost = restEndHost;
    }

    public void setHttpClient(HttpClient httpClient){
        this.httpClient = httpClient;
    }

}
