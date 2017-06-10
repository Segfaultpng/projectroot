module.exports = function(grunt){
	// Project configuration.
	grunt.initConfig({
	  concat: {
	  	// Concat all the Angular Directives in the uiComponents Folder
	    uiComponents: {
	      src: ['www/uiComponents/**/*.js'],
	      dest: 'www/js/uiComponentsBuilt.js',
	    },
	    pages: {
	      src: ['www/pages/**/*.js'],
	      dest: 'www/js/pagesBuilt.js',
	    },
	    cssComponents: {
	    	src: ['www/pages/**/*.css', 'www/uiComponents/**/*.css'],
	    	dest: 'www/css/components.css',
	    }
	  },
	  watch: {
	  	uiComponents:{
	  		files:['www/uiComponents/**/*.js'],
	  		tasks:['concat:uiComponents'],
	  	},
	  	pages:{
	  		files:['www/pages/**/*.js'],
	  		tasks:['concat:pages'],
	  	},
	  	cssComponents:{
	  		files:['www/pages/**/*.css', 'www/uiComponents/**/*.css'],
	  		task:['concat:cssComponents']
	  	}
	  	
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['concat', 'watch']);

};