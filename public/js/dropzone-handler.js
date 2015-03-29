$(document).ready(function() {
	$("#my-awesome-dropzone").dropzone({ 
			url: "/upload-photo" ,
			paramName: "file", // The name that will be used to transfer the file
		  	maxFilesize: .5, // MB
		  	maxFiles: 1,
		  	uploadMultiple: false,
		  	accept: function  (file, done) {
		  		done();
		  	}


		});	
});
