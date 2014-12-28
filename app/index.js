'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var TeslaGenerator = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the simple static blog generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'author',
            message: 'Please enter the author\'s full name',
            default: 'My Name'        
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter the author\'s email address',
            default: 'user@example.com'
        },
        {
            type: 'input',
            name: 'title',
            message: 'Please enter the name of the blog',
            default: 'My Blog'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please enter the description of the blog',
            default: 'All about me'
        },
        {
            type: 'input',
            name: 'url',
            message: 'Please enter the full URL where the blog will be hosted',
            default: 'http://example.com/'
        },
        {
            type: 'input',
            name: 'domainname',
            message: 'Please enter the domain name where the blog will be hosted',
            default: 'example.com'
        },
        {
            type: 'input',
            name: 'disqus',
            message: 'If you wish to use Disqus for comments, please enter your Disqus username. Otherwise, please press enter',
            default: false
        },
        {
            type: 'input',
            name: 'facebookcomments',
            message: 'If you wish to use Facebook for comments, please enter your Facebook app ID. Otherwise, please press enter',
            default: false
        }];

        this.prompt(prompts, function (props) {
            this.author = props.author;
            this.title = props.title;
            this.description = props.description;
            this.url = props.url;
            this.disqus = props.disqus;
            this.facebookcomments = props.facebookcomments;
            this.email = props.email;
            this.domainname = props.domainname;

            // Existing config
            this.www = 'www';
            this.build = 'build';
            this.static_files = 'static';

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            this.dest.mkdir('app');
            this.dest.mkdir('app/templates');
            this.dest.mkdir('app/templates/partials');

            // Config files
            this.src.copy('_bower.json', 'bower.json');
            this.src.copy('_bowerrc', '.bowerrc');
            this.template('_Gruntfile.js', 'Gruntfile.js');
            this.template('_package.json', 'package.json');
            this.template('_CNAME', 'CNAME');

            // Underscore template
            this.src.copy('archive.hbs', 'app/templates/archive.hbs');
            this.src.copy('index.hbs', 'app/templates/index.hbs');
            this.src.copy('page.hbs', 'app/templates/page.hbs');
            this.src.copy('post.hbs', 'app/templates/post.hbs');
            this.src.copy('partials/header.hbs', 'app/templates/partials/header.hbs');
            this.src.copy('partials/footer.hbs', 'app/templates/partials/footer.hbs');

            // Content folders
            this.dest.mkdir('content');
            this.dest.mkdir('content/posts');
            this.dest.mkdir('content/pages');
        },

        projectfiles: function () {
            this.src.copy('editorconfig', '.editorconfig');
            this.src.copy('jshintrc', '.jshintrc');
        }
    },

    end: function () {
        this.installDependencies();
    }
});

module.exports = TeslaGenerator;
