module.exports = function(grunt) {

  var Autoprefix = require('less-plugin-autoprefix');
  var autoprefixPlugin = new Autoprefix({browsers: ["last 2 versions"]});

  function files(inExt, outExt) {
    var _files = {
      expand: true,
      src: ["**/*." + inExt, "!**/_*." + inExt, "!**/_**/*." + inExt],
      dest: "build/",
      cwd: "src/"
    };
    if(outExt) _files.ext = '.' + outExt;
    return [_files];
  }

  grunt.initConfig({

    browserify: {
      compile: {
        options: {
          browserifyOptions: {
            debug: true
          }
        },
        files: files('js')
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
          src: [
            "**",
            "!**/_*",
            "!**/_**/*",
            "!**/*.js",
            "!**/*.jade",
            "!**/*.less"
          ],
          dest: "build/",
          cwd: "src/"
        }]
      }
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    },

    jade: {
      compile: {
        files: files('jade', 'html')
      }
    },

    less: {
      compile: {
        files: files('less', 'css'),
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
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('build', [
    'clean:build',
    'jade:compile',
    'browserify:compile',
    'less:compile',
    'copy:assets']);

  grunt.registerTask('deploy', ['build', 'gh-pages']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);

};
