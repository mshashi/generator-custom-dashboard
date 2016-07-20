'use strict';
class USMCtrl {
    constructor($scope,FeatureGroupService) {
        FeatureGroupService.getFeatureGroups('<%= tla %>').then(function(featureGroups){
	$scope.featureGroups= featureGroups;
	$scope.$apply();
	});
	
	$scope.getFeatureDetails = function(feature){
	console.log(feature.featureName);
	};
    }
}

angular.module('<%= camelAppName %>.welcome')
.controller('USMCtrl', USMCtrl);