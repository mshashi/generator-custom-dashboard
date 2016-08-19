package <%= packageName %>.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public class USMDashboardMapper extends ObjectMapper {

    private static final long serialVersionUID = 1L;

    public USMDashboardMapper() {
		this.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
	}

}
