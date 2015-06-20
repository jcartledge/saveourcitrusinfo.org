module.exports = function(grunt) {

  var Autoprefix = require('less-plugin-autoprefix');
  var autoprefixPlugin = new Autoprefix({browsers: ["last 2 versions"]});

  console.log(autoprefixPlugin);

  grunt.initConfig({

    jade: {
      compile: {
        files: [{
          expand: true,
          src: ["**/*.jade", "!**/_*.jade"],
          dest: "build/",
          cwd: "src/",
          ext: '.html'
        }]
      }
    },

    less: {
      compile: {
        files: [{
          expand: true,
          src: ["**/*.less", "!**/_*.less"],
          dest: "build/",
          cwd: "src/",
          ext: '.css'
        }],
        options: {
          plugins: [autoprefixPlugin],
        }
      }
    },

    watch: {
      build: {
        files: ['src/**'],
        tasks: ['build']
      },
      grunt: {
        files: ['Gruntfile.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['jade:compile', 'less:compile']);
  grunt.registerTask('default', ['build', 'watch']);

};

