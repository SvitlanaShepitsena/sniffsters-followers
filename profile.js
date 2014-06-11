var IndexCtrl=function(){function IndexCtrl($scope,$state,toastr,DataService,CopyProfileService){var _this=this;this.$scope=$scope,this.$state=$state,this.toastr=toastr,this.DataService=DataService,this.CopyProfileService=CopyProfileService,$scope.index=this,this.spinner=!0;var promiseT=this.DataService.getProfile();promiseT.then(function(breederProfile){_this.error=!1,_this.BreederProfile=breederProfile,_this.Id=breederProfile.Email,_this.CopyProfileService.SetProfile(breederProfile),_this.BreederProfileEdit=CopyProfileService.GetProfileClone()},function(){_this.error=!0,_this.ShowError("Error in Db Connection")}).finally(function(){_this.spinner=!1})}return IndexCtrl.prototype.SaveKennelName=function(){var breederProfileOriginal=this.CopyProfileService.GetProfileClone();breederProfileOriginal.KennelName=this.BreederProfileEdit.KennelName,breederProfileOriginal.Story=this.BreederProfileEdit.Story,this.Save(breederProfileOriginal)},IndexCtrl.prototype.SaveAboutParents=function(){var breederProfileOriginal=this.CopyProfileService.GetProfileClone();breederProfileOriginal.Parents=this.BreederProfileEdit.Parents,breederProfileOriginal.Girls=this.BreederProfileEdit.Girls,breederProfileOriginal.Boys=this.BreederProfileEdit.Boys,console.log(breederProfileOriginal),this.Save(breederProfileOriginal)},IndexCtrl.prototype.SaveAddInfo=function(){var breederProfileOriginal=this.CopyProfileService.GetProfileClone();breederProfileOriginal.AddInfo=this.BreederProfileEdit.AddInfo,this.Save(breederProfileOriginal)},IndexCtrl.prototype.Next=function(state){this.$state.go(state)},IndexCtrl.prototype.ShowError=function(errorMessage){this.toastr.error(errorMessage)},IndexCtrl.prototype.ShowSuccess=function(successMessage){this.toastr.success(successMessage)},IndexCtrl.prototype.Clone=function(){this.BreederProfileCopy=this.CopyProfileService.GetProfileClone()},IndexCtrl.prototype.GetClone=function(){return this.CopyProfileService.GetProfileClone()},IndexCtrl.prototype.UpdateBreederProfile=function(breederProfile){this.BreederProfile=breederProfile},IndexCtrl.prototype.Save=function(breederProfile){var _this=this,promise=this.DataService.updateProfile(breederProfile);promise.then(function(){_this.CopyProfileService.SetProfile(breederProfile),_this.UpdateBreederProfile(breederProfile),_this.ShowSuccess("Successfully Saved")},function(){_this.ShowError("Db Connection Problem")})},IndexCtrl.$inject=["$scope","$state","toastr","DataService","CopyProfileService"],IndexCtrl}(),PhotosCtrl=function(){function PhotosCtrl($scope,$state,toastr,DataService,CopyProfileService){var _this=this;this.$scope=$scope,this.$state=$state,this.toastr=toastr,this.DataService=DataService,this.CopyProfileService=CopyProfileService;var newGallery=new Gallery;this.GalleriesNew=new Array(newGallery),$scope.photosCtrl=this,$scope.index.url="photos",$scope.index.spinner=!0,DataService.getGalleries().then(function(data){_this.Galleries=data},function(){_this.ShowError("Error in getting Photo Galleries from the server")}).finally(function(){$scope.index.spinner=!1})}return PhotosCtrl.prototype.saveNewGalleries=function(){var index=0;this.updateGallery(this.GalleriesNew,index)},PhotosCtrl.prototype.updateGallery=function(galleries,index){var _this=this;if(0==galleries.length)return void(0==this.GalleriesNew.length&&this.GalleriesNew.push(new Gallery));var gallery=galleries[index];this.DataService.updateGallery(gallery).then(function(){_this.GalleriesNew.splice(index,1),_this.Galleries.push(gallery),_this.updateGallery(galleries,index)})},PhotosCtrl.prototype.addGallery=function(){this.GalleriesNew.push(new Gallery)},PhotosCtrl.prototype.setSelectedGallery=function(galid){this.SelectedGallery=this.Galleries[galid],this.$state.go("profile.photos.galleries",{id:galid})},PhotosCtrl.prototype.ShowSuccess=function(note){this.toastr.info(note)},PhotosCtrl.prototype.ShowError=function(note){this.toastr.error(note)},PhotosCtrl.prototype.CreateSelectedGalleryClone=function(){this.SelectedGalleryEdit=new Gallery;for(var key in this.SelectedGallery)this.SelectedGallery.hasOwnProperty(key)&&(this.SelectedGalleryEdit[key]=this.SelectedGallery[key])},PhotosCtrl}(),breederDetails=function(){return{restrict:"E",templateUrl:"views/directives/breeder-details.html",transclude:!0,replace:!0,scope:{ctrl:"=",text:"@",func:"&"},link:function(scope){scope.IsEdit=!1,scope.Edit=function(){scope.ctrl.Clone(),scope.IsEdit=!0},scope.Cancel=function(){scope.IsEdit=!1},scope.Save=function(){scope.Save(),scope.IsEdit=!1}}}},aboutInfo=function(){return{restrict:"E",templateUrl:"views/directives/about-info.html",replace:!0,scope:{ctrl:"=",text:"@",func:"&"},link:function(scope){scope.ctrl.url="about"}}},aboutInfoEdit=function(){return{restrict:"E",templateUrl:"views/directives/about-info-edit.html",transclude:!0,replace:!0,scope:{ctrl:"=",text:"@",func:"&"},link:function(scope){scope.ResetAllFields=function(){scope.ctrl.BreederProfileEdit.KennelName="",scope.ctrl.BreederProfileEdit.Story="",scope.ctrl.BreederProfileEdit.Parents="",scope.ctrl.BreederProfileEdit.Boys="",scope.ctrl.BreederProfileEdit.Girls="",scope.ctrl.BreederProfileEdit.AddInfo="",scope.form.$setDirty()},scope.Next=function(){}}}},button=function(){return{restrict:"E",template:"<button>Test</button>",transclude:!0,replace:!0,scope:{ctrl:"=",text:"@",func:"&"},link:function(){}}},detailsInfo=function(){return{restrict:"E",templateUrl:"views/directives/details-info.html",replace:!0,scope:{ctrl:"=",text:"@",func:"&"},link:function(){}}},detailsInfoEdit=function(){return{restrict:"E",templateUrl:"views/directives/details-info-edit.html",transclude:!0,replace:!0,scope:{ctrl:"=",text:"@",func:"&"},link:function(scope){scope.ResetFields=function(){console.log("reset"),scope.ctrl.BreederProfileEdit=new BreederProfile},scope.SaveKennelName=function(){var breederProfileOriginal=scope.ctrl.GetClone();breederProfileOriginal.KennelName=scope.ctrl.BreederProfileEdit.KennelName,breederProfileOriginal.Story=scope.ctrl.BreederProfileEdit.Story,scope.ctrl.Save(breederProfileOriginal)}}}},litters=function(){return{restrict:"E",templateUrl:"views/directives/litters.html",transclude:!0,replace:!0,scope:{ctrl:"=",text:"@",func:"&"},link:function(){}}},photoGalleries=function(){return{restrict:"E",templateUrl:"views/directives/photo-galleries.html",replace:!0}},photoGallery=function(){return{restrict:"E",templateUrl:"views/directives/photo-gallery.html",replace:!0,controller:function($scope,DataService,$stateParams,$state){$scope.delGallery=function(){DataService.deleteGallery($scope.photosCtrl.SelectedGallery.Id).then(function(){var id=$stateParams.id;$scope.photosCtrl.Galleries.splice(id,1),$state.go("profile.photos",{})})}},link:function(){}}},photoGalleryEdit=function(){return{restrict:"E",templateUrl:"views/directives/photo-gallery-edit.html",replace:!0,controller:function($scope,$stateParams,$upload,DataService,toastr){$scope.photosCtrl.CreateSelectedGalleryClone();$stateParams.id;$scope.delete=function(p,index){DataService.deletePhoto($scope.photosCtrl.SelectedGallery.Id,p.Id).then(function(){$scope.photosCtrl.SelectedGallery.Photos.splice(index,1)})},$scope.update=function(p){DataService.updateCaption($scope.photosCtrl.SelectedGallery.Id,p.Id,p.Caption).then(function(){toastr.success("Changes have been successfully saved to Db")})},$scope.updateTitle=function(newTitle){DataService.updateTitle($scope.photosCtrl.SelectedGallery.Id,newTitle).then(function(){toastr.success("Changes have been successfully saved to Db")})},$scope.onFileSelect=function($files){for(var i=0;i<$files.length;i++){var file=$files[i];$scope.upload=$upload.upload({url:"/BreederPersonal/AddPicture",data:{gallery:$scope.photosCtrl.SelectedGallery.Id},file:file}).progress(function(){}).success(function(data){$scope.photosCtrl.SelectedGallery.Photos.push(data)})}}}}},photosInfo=function(){return{restrict:"E",templateUrl:"views/directives/photos-info.html",transclude:!0,replace:!0,scope:{userName:"@",newGallery:"="},controller:function($scope,$q,$stateParams,$state,$upload,DataService){$scope.newGallery.Photos=[],$scope.delete=function(p,index){DataService.deletePhoto($scope.newGallery.Id,p.Id).then(function(){$scope.newGallery.Photos.splice(index,1)})},$scope.onFileSelect=function($files){$scope.up($files,0)},$scope.up=function($files,index){if(index!=$files.length){var file=$files[index];$upload.upload({url:"/BreederPersonal/AddPictureNewGallery",data:{Title:$scope.newGallery.Title},file:file}).progress(function(){}).success(function(data){var photo={Id:data.PhotoId,Caption:"Picture",FilePath:data.FileName};$scope.newGallery.Photos.push(photo),$scope.newGallery.Id=data.GalleryId,$scope.up($files,index+1)})}}}}},previousPuppies=function(){return{restrict:"E",templateUrl:"views/directives/previous-puppies.html",transclude:!0,replace:!0,scope:{ctrl:"=",text:"@",func:"&"},link:function(){}}},profileButtons=function(){return{restrict:"E",templateUrl:"views/directives/profile-buttons.html",transclude:!0,replace:!0,link:function(){}}},spinDiv=function(){return{restrict:"E",templateUrl:"views/directives/spin-div.html",transclude:!0,replace:!0,scope:{ctrl:"=",text:"@",func:"&"},link:function(){}}},BoolString=function(){function BoolString(){}return BoolString.filter=function(value){return value===!0?"Yes":"No"},BoolString}(),SpacesToDashes=function(){function SpacesToDashes(){}return SpacesToDashes.filter=function(value){return value.replace(/ /g,"-")},SpacesToDashes}(),TitleLength=function(){function TitleLength(){}return TitleLength.filter=function(value,len){return value.length<=len?value:value.substr(0,len)+"..."},TitleLength}(),Gallery=function(){function Gallery(){}return Gallery}(),BreederProfile=function(){function BreederProfile(){}return BreederProfile}(),CopyProfileService=function(){function CopyProfileService(){this.BreederProfile=new BreederProfile}return CopyProfileService.prototype.GetProfileClone=function(){var dolly=new BreederProfile;for(var key in this.BreederProfile)this.BreederProfile.hasOwnProperty(key)&&(dolly[key]=this.BreederProfile[key]);return dolly},CopyProfileService.prototype.SetProfile=function(breederProfile){this.BreederProfile=breederProfile},CopyProfileService}(),DataService=function(){function DataService($http,$q){this.$http=$http,this.$q=$q}return DataService.prototype.getProfile=function(){var d=this.$q.defer();return this.$http.get("/BreederPersonal/GetProfile").success(function(result){d.resolve(result)}).error(function(){d.reject()}),d.promise},DataService.prototype.updateProfile=function(t){var d=this.$q.defer();return this.$http.post("/BreederPersonal/UpdateUserProfile",{BreederViewModel:t}).success(function(){d.resolve()}).error(function(){d.reject()}),d.promise},DataService.prototype.deletePhoto=function(galleryId,photoId){var d=this.$q.defer();return this.$http.post("/BreederPersonal/DeletePhoto",{deletePhoto:{GalleryId:galleryId,PhotoId:photoId}}).success(function(){d.resolve()}).error(function(){d.reject()}),d.promise},DataService.prototype.updateCaption=function(galleryId,photoId,caption){var d=this.$q.defer();return this.$http.post("/BreederPersonal/UpdateCaption",{photoCaption:{GalleryId:galleryId,PhotoId:photoId,Caption:caption}}).success(function(){d.resolve()}).error(function(){d.reject()}),d.promise},DataService.prototype.updateTitle=function(galleryId,title){var d=this.$q.defer();return this.$http.post("/BreederPersonal/UpdateTitle",{galleryTitle:{GalleryId:galleryId,Title:title}}).success(function(){d.resolve()}).error(function(){d.reject()}),d.promise},DataService.prototype.deleteGallery=function(galleryId){var d=this.$q.defer();return this.$http.post("/BreederPersonal/DeleteGallery",{galleryId:galleryId}).success(function(){d.resolve()}).error(function(){d.reject()}),d.promise},DataService.prototype.updateGallery=function(gallery){var d=this.$q.defer();return this.$http.post("/BreederPersonal/UpdateGallery",{gallery:gallery}).success(function(){d.resolve()}).error(function(){d.reject()}),d.promise},DataService.prototype.getGalleries=function(){var d=this.$q.defer();return this.$http.get("/BreederPersonal/GetGalleries").success(function(result){d.resolve(result)}).error(function(){d.reject()}),d.promise},DataService.prototype.updateGalleries=function(t){var d=this.$q.defer();return this.$http.post("/BreederPersonal/UpdateGalleries",{Galleries:t}).success(function(){d.resolve()}).error(function(){d.reject()}),d.promise},DataService}(),GalleryService=function(){function GalleryService(){}return GalleryService.prototype.GetGalleryClone=function(){var dolly=new Gallery;for(var key in this.Gallery)this.Gallery.hasOwnProperty(key)&&(dolly[key]=this.Gallery[key]);return dolly},GalleryService.prototype.SetGallery=function(gallery){this.Gallery=gallery},GalleryService}(),profile=angular.module("profile",["ui.router","angularFileUpload","ngAnimate"]);profile.filter("boolString",function(){return function(value){return BoolString.filter(value)}}),profile.filter("spacesToDashes",function(){return function(value){return SpacesToDashes.filter(value)}}),profile.filter("titleLength",function(){return function(value,len){return TitleLength.filter(value,len)}}),profile.service("CopyProfileService",CopyProfileService),profile.service("GalleryService",GalleryService),profile.directive("profileButtons",profileButtons),profile.directive("aboutInfoEdit",aboutInfoEdit),profile.directive("detailsInfo",detailsInfo),profile.directive("detailsInfoEdit",detailsInfoEdit),profile.directive("litters",litters),profile.directive("previousPuppies",previousPuppies),profile.directive("photosInfo",photosInfo),profile.directive("photoGalleries",photoGalleries),profile.directive("photoGallery",photoGallery),profile.directive("photoGalleryEdit",photoGalleryEdit),profile.directive("spinDiv",spinDiv),profile.directive("aboutInfo",aboutInfo),profile.directive("breederDetails",breederDetails),profile.controller("PhotosCtrl",PhotosCtrl),profile.value("toastr",toastr),profile.service("DataService",DataService),profile.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/profile/about"),$stateProvider.state("profile",{"abstract":!0,url:"/profile",templateUrl:"../views/profile.html"}).state("profile.about",{url:"/about",templateUrl:"../views/profile-about.html"}).state("profile.about.edit",{url:"/edit",templateUrl:"../views/profile-about-edit.html"}).state("profile.photos",{url:"/photos",controller:"PhotosCtrl",templateUrl:"../views/profile-photos.html"}).state("profile.photos.galleries",{url:"/gallery/:id",template:"<div ui-view><photo-gallery></photo-gallery></div>"}).state("profile.photos.galleries.edit",{url:"/edit",template:"<photo-gallery-edit></photo-gallery-edit>"}).state("profile.photos.edit",{url:"/edit",templateUrl:"../views/profile-photosEdit.html"}).state("profile.puppies",{url:"/puppies",templateUrl:"../views/profile-puppies.html"}).state("profile.puppies.edit",{url:"/edit",templateUrl:"../views/profile-puppiesEdit.html"}).state("profile.details",{url:"/details",templateUrl:"../views/profile-details.html"}).state("profile.details.edit",{url:"/edit",templateUrl:"../views/profile-detailsEdit.html"}).state("profile.testimonials",{url:"/testimonials",templateUrl:"../views/profile-testimonials.html"}).state("profile.testimonials.edit",{url:"/edit",templateUrl:"../views/profile-testimonialsEdit.html"})}]);