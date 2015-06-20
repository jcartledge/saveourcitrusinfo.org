module.exports = function(grunt) {

  var Autoprefix = require('less-plugin-autoprefix');
  var autoprefixPlugin = new Autoprefix({browsers: ["last 2 versions"]});

  function srcFiles(ext) {
    return ["**/*." + ext, "!**/_*." + ext, "!**/_**/*." + ext];
  }

  grunt.initConfig({

    browserify: {
      compile: {
        options: {
          browserifyOptions: {
            debug: true
          }
        },
        files: [{
          expand: true,
          src: srcFiles('js'),
          dest: "build/",
          cwd: "src/"
        }]
      }
    },

    clean: {
      build: ['build']
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'build',
          livereload: true,
          open: true
        }
      }
    },

    copy: {
      assets: {
        files: [{
          expand: true,
          src: ["images/**"],
          dest: "build/",
          cwd: "src/"
        }]
      }
    },

    jade: {
      compile: {
        files: [{
          expand: true,
          src: srcFiles('jade'),
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
          src: srcFiles('less'),
          dest: "build/",
          cwd: "src/",
          ext: '.css'
        }],
        options: {
          plugins: [autoprefixPlugin]
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      build: {
        files: ['src/**'],
        tasks: ['build']
      },
      grunt: {
        files: ['Gruntfile.js']
      }
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', [
    'clean:build',
    'jade:compile',
    'browserify:compile',
    'less:compile',
    'copy:assets']);

  grunt.registerTask('default', ['build', 'connect', 'watch']);

};

