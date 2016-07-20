package <%= properties.packageName %>.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import org.springframework.http.ResponseEntity;

import <%= properties.packageName %>.service.ApplicationService;
import <%= properties.packageName %>.dto.<%= properties.entityClass %>;

@Controller
public class ApplicationController {

	@Autowired
	private ApplicationService applicationService;

	private Logger logger = Logger.getLogger(getClass().getName());

	public ApplicationController() { }

	@SuppressWarnings("rawtypes")
	@RequestMapping(value="/FeatureGroup/getFeatureGroups", method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	    @ResponseBody ResponseEntity config(@RequestBody  final  <%= properties.entityClass %> request) {
       
       try {
            
            String stubsApiBaseUri = "<%= properties.url %>";
            
            HttpClient httpClient = HttpClients.createDefault();
            URIBuilder builder = new URIBuilder(stubsApiBaseUri);
            builder.addParameter("tla", "<%= properties.tla %>");
            String listStubsUri = builder.build().toString();
            HttpPost postRequest = new HttpPost(listStubsUri);

            ObjectMapper entityMapper = new ObjectMapper();
            String writeValueAsString = entityMapper.writeValueAsString(request);

            StringEntity entity = new StringEntity(writeValueAsString);
            entity.setContentType(MediaType.APPLICATION_JSON_VALUE);
            postRequest.setEntity(entity);

            HttpResponse getStubResponse = httpClient.execute(postRequest);

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("Access-Control-Allow-Origin", "*");

            return new ResponseEntity<String>(EntityUtils.toString(getStubResponse.getEntity()), responseHeaders,
                    HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            // TODO: handle exception
        }
        return null;
    }

    


}
