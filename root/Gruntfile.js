'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      couch: {
        options: {
          unused: false,
          globals: {
            emit: true,
            getRow: true,
            send: true,
            start: true,
          }
        },
        src: ['couch/**/!(vendor|_attachments)/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      couch: {
        files: '<%= jshint.couch.src %>',
        tasks: ['jshint:couch', 'clean:couch', 'copy:couch', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'clean:couch', 'copy:couch', 'nodeunit']
      }
    },
    'couch-compile': {
      '{%= name %}': {
        options: {
          merge: 'couch/shared'
        },
        files: {
          'tmp/app.json': 'couch/*'
        }
      }
    },
    'couch-push': {
      '{%= name %}': {
        files: {
          '{%= url %}/{%= db %}': 'tmp/app.json'
        }
      }
    },
    'couch-configure': {
      '{%= name %}': {
        files: {
          '{%= url %}': 'config'
        }
      }
    },
    copy: {
      couch: {
        expand: true,
        rename: function(dest, src) {
          var parts = src.split('/');
          parts.splice(2, 0, 'node_modules');
          return dest + parts.join('/');
        },
        src: 'couch/*/lib/**/*.js',
        dest: 'test/'
      }
    },
    clean: {
      couch: ['tmp', 'test/couch/*/node_modules']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-couch');

  // Default task.
  grunt.registerTask('default', ['clean:couch', 'jshint', 'copy:couch', 'nodeunit']);
};
