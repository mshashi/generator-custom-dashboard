


angular.module('<%= camelAppName %>.common.models').factory("FeatureGroupService", function($http, SERVICE_URL,$q) {

    return {
        /** @memberOf FeatureGroupService */

        getFeatureGroups: function(tla) {

            var d = $q.defer();

           

            var request = $http({
                method: "POST",
                url: SERVICE_URL + "<%= serviceURL %>",
                data: {
                    
                }
            });

            request.success(function(result) {
            

               

                d.resolve(result);
            });

            request.error(function(serverError) {
              
              
            });

            return d.promise;
        }
    };

 });   