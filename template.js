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
exports.notes = '_Database name_ must only contain lowercase characters (a-z), ' +
  'digits (0-9), and any of the characters _, $, (, ), +, -, and /. ' +
  'And it must begin with a letter.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. For more information about using grunt-couch, please see ' +
  'the grunt-couch website:' +
  '\n\n' +
  'http://jo.github.com/grunt-couch';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
  init.process({}, [
    // Prompt for these values.
    init.prompt('name'),
    {
      name: 'url',
      message: 'URL to your CouchDB server',
      validator: /^http[s]?:\/\//,
      warning: 'Must be a http or https URL.',
      default: 'http://localhost:5984'
    },
    {
      name: 'db',
      message: 'Database name',
      validator: /^[a-z][-a-z0-9_$\(\)+\/]+$/,
      warning: 'Only lowercase characters (a-z), digits (0-9), and any of the characters _, $, (, ), +, -, and / are allowed. Must begin with a letter.',
      default: function(value, data, done) {
        var db = data.name || '';
        done(null, db);
      } 
    }
  ], function(err, props) {
    props.keywords = ['couchdb'];
    props.devDependencies = {
      'grunt-contrib-jshint': '~0.3.0',
      'grunt-contrib-nodeunit': '~0.1.2',
      'grunt-contrib-watch': '~0.3.1',
      'grunt-contrib-copy': '~0.4.0',
      'grunt-contrib-clean': '~0.4.0',
      'grunt-couch': '~0.4.4'
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });
};
