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
        src: ['couch/**/*.js']
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
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      }
    },
    couch: {
      '{%= name %}': {
        files: {
          'tmp/{%= name %}.json': 'couch/*'
        }
      }
    },
    push: {
      '{%= name %}': {
        files: {
          '{%= url %}/{%= db %}': 'tmp/{%= name %}.json'
        }
      }
    },
    clean: {
      couch: 'tmp'
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-couch');

  // Default task.
  grunt.registerTask('default', ['clean', 'jshint', 'nodeunit', 'couch']);

  // Publish task.
  grunt.registerTask('publish', ['couch', 'push']);
};
