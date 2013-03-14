/*
 * grunt-init-couch
 * https://github.com/jo/grunt-init-couch
 *
 * Copyright (c) 2013 Johannes J. Schmidt, TF
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a CouchDB project.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ shouldn\'t contain spaces and should ' +
  'should not start with a number.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
  init.process({}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title'),
    init.prompt('description'),
    {
      name: 'url',
      message: 'URL to your CouchDB server',
      default: 'http://localhost:5984'
    },
    {
      name: 'db',
      message: 'Database name',
      default: function(value, data, done) {
        var db = data.name || '';
        done(null, db);
      } 
    },
    init.prompt('licenses'),
    init.prompt('author_name')
  ], function(err, props) {
    props.keywords = ['couchdb'];
    props.devDependencies = {
      'grunt-contrib-jshint': '~0.3.0',
      'grunt-contrib-nodeunit': '~0.1.2',
      'grunt-contrib-watch': '~0.3.1',
      'grunt-contrib-clean': '~0.4.0',
      'grunt-couch': '~0.4.4'
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });
};
