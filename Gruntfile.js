module.exports = function(grunt) {

    // config
    var gruntConfig = {
            src: 'src',
            dest: 'dist',
            assets: {
                basename: 'crashpad',
                stylus:   'assets/styl',
                css:      'assets/css',
                js:       'assets/js',
                img:      'assets/img',
                fonts:    'assets/fonts'
            }
    };

    // banner
    grunt.log.writeln("");
    grunt.log.writeln("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    grunt.log.writeln("");
    grunt.log.writeln("              (o) Just what do you think you're doing?    ");
    grunt.log.writeln("");
    grunt.log.writeln("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    grunt.log.writeln("");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Clean stuff
        clean: ['<%= config.dest %>/**'],

        // Copy assets around
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.src %>/',
                    dest: '<%= config.dest %>/',
                    src: [
                        '<%= config.assets %>/**',
                        '!<%= config.assets.styl %>/**'
                    ]
                }]
            }
        },

        // Stylus
        stylus: {
            dist: {
                options: {
                    'include css': true
                },
                files: {
                    '<%= config.dest %>/<%= config.assets.css %>/crashpad.min.css': '<%= config.src %>/<%= config.assets.styl %>/<%= config.assets.basename %>.styl'
                }
            }
        },

        // CSS minification
        cssmin: {
            dist: {
                options: {
                    banner: '/* Crashpad Site | Author: Matthias Kretschmann <m@kretschmann.io> | © 2015 Crashpad Collective */'
                },
                files: {
                    '<%= config.dest %>/<%= config.assets.css %>/<%= config.assets.basename %>.min.css': ['<%= config.dest %>/<%= config.assets.css %>/<%= config.assets.basename %>.min.css']
                }
            }
        },

        // JS concatenation & minification
        uglify: {
            dist: {
                files: {
                    '<%= config.dest %>/<%= config.assets.js %>/<%= config.assets.basename %>.min.js': [
                        '<%= config.src %>/<%= config.assets.js %>/*.js'
                    ],
                    '<%= config.dest %>/<%= config.assets.js %>/jquery.min.js': [
                        'bower_components/jquery/dist/jquery.js'
                    ]
                }
            }
        },

        // Assembles html layout
        assemble: {
            options: {
                data: '<%= config.src %>/data/*.{json,yml}',
                layoutdir: '<%= config.src %>/templates/layouts',
                partials: ['<%= config.src %>/templates/includes/*.hbs'],
                flatten: true
            },
            site: {
                src: ['<%= config.src %>/pages/*.hbs'],
                dest: '<%= config.dest %>/'
            }
        },

        // image optimization
        imagemin: {
            assets: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dest %>/<%= config.assets.img %>/',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: '<%= config.dest %>/<%= config.assets.img %>/'
                }]
            }
        },

        // assets versioning
        rev: {
            files: {
                src: [
                    '<%= config.dest %>/<%= config.assets %>/{css,js,img,fonts}/*.*'
                ]
            }
        },

        // updating assets paths in html/css
        usemin: {
            html: ['<%= config.dest %>/**/*.html'],
            css: ['<%= config.dest %>/**/*.css'],
            js: ['<%= config.dest %>/**/*.js'],
            options: {
                dirs: '<%= config.dest %>',
                basedir: '<%= config.dest %>',
                assetsDirs: ['<%= config.dest %>', '<%= config.dest %>/<%= config.assets %>/{css,js,img,fonts}']
            }
        },

        // Watches for changes to css or email templates then runs grunt tasks
        watch: {
            options: {
                livereload: true
            },
            stylus: {
                files: ['<%= config.src %>/**/*.styl'],
                tasks: ['stylus']
            },
            js: {
                files: ['<%= config.src %>/**/*.js'],
                tasks: ['uglify']
            },
            templates: {
                files: ['<%= config.src %>/**/*.hbs'],
                tasks: ['assemble']
            },
            images: {
                files: ['<%= config.src %>/<%= config.assets.img %>/**'],
                tasks: ['default']
            }
        },

        // dev server
        connect: {
            server: {
                options: {
                    port: 1337,
                    hostname: '*',
                    base: '<%= config.dest %>',
                    open: {
                         target: 'http://localhost:1337'
                    }
                }
            }
        },

    });

    // Load NPM Tasks, smart code stolen from @bluemaex <https://github.com/bluemaex>
    require('fs').readdirSync('node_modules').filter(function (file) {
        return file && file.indexOf('grunt-') > -1;
    }).forEach(function (file) {
        grunt.loadNpmTasks(file);
    });

    // load additional tasks not picked up by former function
    grunt.loadNpmTasks('assemble');

    // Default task
    grunt.registerTask('default', [
        'copy',
        'stylus',
        'assemble'
    ]);

    // Dev server
    grunt.registerTask('server', [
        'clean',
        'copy',
        'stylus',
        'assemble',
        'connect',
        'watch'
    ]);

    // Final build
    grunt.registerTask('build', [
        'clean',
        'copy',
        'stylus',
        'cssmin',
        'assemble',
        'imagemin',
        'rev',
        'usemin'
    ]);

};
