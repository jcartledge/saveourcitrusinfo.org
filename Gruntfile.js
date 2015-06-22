module.exports = function(grunt) {

  require('time-grunt')(grunt);

  var Autoprefix = require('less-plugin-autoprefix');
  var autoprefixPlugin = new Autoprefix({browsers: ["last 2 versions"]});

  var copyFiles = ["**", "!**/_*", "!**/_**/*", "!**/*.{js,jade,less}"];

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
          src: copyFiles,
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
          plugins: [autoprefixPlugin, require('less-plugin-glob')]
        }
      }
    },
    watch: {
      options: {
        livereload: true,
        livereloadOnError: false,
        cwd: 'src'
      },
      jade: {
        files: ['**/*.{jade,md}'],
        tasks: ['jade']
      },
      browserify: {
        files: ['**/*.js'],
        tasks: ['browserify']
      },
      less: {
        files: ['**/*.less'],
        tasks: ['less']
      },
      copy: {
        files: copyFiles,
        tasks: ['copy']
      },
      grunt: {
        files: ['Gruntfile.js'],
        options: {
          cwd: '.'
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('build', ['jade', 'browserify', 'less', 'copy']);
  grunt.registerTask('deploy', ['clean', 'build', 'gh-pages']);
  grunt.registerTask('default', ['clean', 'build', 'connect', 'watch']);

};
