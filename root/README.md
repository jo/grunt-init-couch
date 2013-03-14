{%= name %}
===========
{%= description %}

## Getting Started
Install with `npm install`

Publish with `grunt publish`

Visit {%= url %}/{%= db %}/_design/{%= name %}/_rewrite

## Linting
Lint your sources with `grunt jshint`

## Testing
Run the tests with `grunt nodeunit`

## Watch
Watch for changes and lint and run tests with `grunt watch`

## Documentation
_(Coming soon)_

## License
Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}  
Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
