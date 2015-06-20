module.exports = function(grunt) {

  grunt.initConfig({

    jade: {
      compile: {
        files: {
          'build/index.html': ['src/index.jade']
        }
      }
    },

    watch: {
      files: ['src/**'],
      tasks: ['build']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['jade:compile']);
  grunt.registerTask('default', ['build', 'watch']);

};
