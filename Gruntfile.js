module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify:     {
			options:{
				transform:  [ require('grunt-react').browserify ]
			},
			app: {
				src: 'ext/src/js/app/app.js',
				dest: 'ext/build/app.js'
			}
		},
		compass: {
			dist: {
				options: {
					basePath:'ext/src/',
					sassDir:'styles',
					cssDir:'../build',
					outputStyle:'compressed'
				}
			}
		},
		watch: {
			browserify: {
				files: ['ext/src/js//**/*.js'], 
				tasks: ['browserify'] 
			},
			compass: {
				files: ['ext/src/styles/**/*.scss'], 
				tasks: ['compass']
			}
		}
 
	});
 
	//погружаем все необходимые модули
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify')
	grunt.loadNpmTasks('grunt-contrib-compass')
	//забиваем в задачу по умолчению все наши задачи
	grunt.registerTask('default', ['browserify','compass', 'watch']);
};