module.exports = function(grunt) {
    'use strict';

    // config
    var gruntConfig = {
        src: 'src',
        dest: 'dist',
        assets: {
            basename: 'crashpad',
            stylus: 'assets/styl',
            css: 'assets/css',
            js: 'assets/js',
            img: 'assets/img',
            fonts: 'assets/fonts'
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
        c: gruntConfig,

        // Clean stuff
        clean: ['<%= c.dest %>/**'],

        // Copy assets around
        copy: {
            assets: {
                files: [{
                    expand: true,
                    cwd: '<%= c.src %>/',
                    dest: '<%= c.dest %>/',
                    src: [
                        'assets/**',
                        '!<%= c.assets.stylus %>/**',
                        '!<%= c.assets.js %>/**',
                        '!<%= c.assets.img %>/team/**'
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
                    '<%= c.dest %>/<%= c.assets.css %>/<%= c.assets.basename %>.min.css': '<%= c.src %>/<%= c.assets.stylus %>/<%= c.assets.basename %>.styl'
                }
            }
        },

        // Post process css
        postcss: {
            options: {
                processors: [
                    // autoprefixer
                    require('autoprefixer-core')({browsers: 'last 2 versions'}),
                    // combine media queries
                    require('css-mqpacker'),
                    // rem fallbacks
                    require('pixrem'),
                    // css minification
                    require('csswring')
                ]
            },
            dist: {
                src: '<%= c.dest %>/<%= c.assets.css %>/<%= c.assets.basename %>.min.css'
            }
        },

        // JS concatenation & minification
        uglify: {
            dist: {
                files: {
                    '<%= c.dest %>/<%= c.assets.js %>/<%= c.assets.basename %>.min.js': [
                        'node_modules/jquery/dist/jquery.js',
                        'node_modules/parsleyjs/dist/parsley.js',
                        'node_modules/svg4everybody/svg4everybody.js',
                        '<%= c.src %>/<%= c.assets.js %>/*.js'
                    ]
                }
            }
        },

        // SVG sprite creation
        svgstore: {
            options: {
                cleanup: ['fill', 'stroke']
            },
            default: {
                files: {
                    '<%= c.dest %>/<%= c.assets.img %>/sprite.svg': ['<%= c.src %>/<%= c.assets.img %>/*.svg'],
                }
            }
        },

        // Assembles html layout
        assemble: {
            options: {
                data: '<%= c.src %>/data/*.{json,yml}',
                layoutdir: '<%= c.src %>/templates/layouts',
                partials: ['<%= c.src %>/templates/includes/*.hbs'],
                flatten: true
            },
            site: {
                src: ['<%= c.src %>/pages/*.hbs'],
                dest: '<%= c.dest %>/'
            }
        },

        // team images resizing
        image_resize: {
            team: {
                options: {
                    width: 240, // double the size as set in the css for lazy retina
                    height: 240,
                    overwrite: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= c.src %>/<%= c.assets.img %>/team/',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: '<%= c.dest %>/<%= c.assets.img %>/team/'
                }]
            }
        },

        // image optimization
        imagemin: {
            assets: {
                files: [{
                    expand: true,
                    cwd: '<%= c.dest %>/<%= c.assets.img %>/',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: '<%= c.dest %>/<%= c.assets.img %>/'
                }]
            }
        },

        // assets versioning
        rev: {
            files: {
                src: [
                    '<%= c.dest %>/<%= c.assets %>/{css,js,img,fonts}/*.*'
                ]
            }
        },

        // updating assets paths in html/css
        usemin: {
            html: ['<%= c.dest %>/**/*.html'],
            css: ['<%= c.dest %>/**/*.css'],
            js: ['<%= c.dest %>/**/*.js'],
            options: {
                dirs: '<%= c.dest %>',
                basedir: '<%= c.dest %>',
                assetsDirs: ['<%= c.dest %>', '<%= c.dest %>/<%= c.assets %>/{css,js,img,fonts}']
            }
        },

        // Watches for changes to css or email templates then runs grunt tasks
        watch: {
            options: {
                livereload: true
            },
            stylus: {
                files: ['<%= c.src %>/**/*.styl'],
                tasks: ['stylus', 'postcss']
            },
            js: {
                files: ['<%= c.src %>/**/*.js'],
                tasks: ['uglify']
            },
            templates: {
                files: ['<%= c.src %>/**/*.{hbs,json,yml}'],
                tasks: ['assemble']
            },
            images: {
                files: ['<%= c.src %>/<%= c.assets.img %>/**/*.{png,jpg,jpeg,gif}'],
                tasks: ['default']
            },
            svg: {
                files: ['<%= c.src %>/<%= c.assets.img %>/*.svg'],
                tasks: ['svgstore']
            }
        },

        // dev server
        connect: {
            server: {
                options: {
                    port: 1337,
                    hostname: '*',
                    base: '<%= c.dest %>',
                    open: {
                        target: 'http://localhost:1337'
                    }
                }
            }
        },

    });

    // Load NPM Tasks, smart code stolen from @bluemaex <https://github.com/bluemaex>
    require('fs').readdirSync('node_modules').filter(function(file) {
        return file && file.indexOf('grunt-') > -1;
    }).forEach(function(file) {
        grunt.loadNpmTasks(file);
    });

    // load additional tasks not picked up by former function
    grunt.loadNpmTasks('assemble');

    // Default task
    grunt.registerTask('default', [
        'copy',
        'stylus',
        'assemble',
        'image_resize'
    ]);

    // Dev server
    grunt.registerTask('server', [
        'clean',
        'copy',
        'stylus',
        'postcss',
        'uglify',
        'assemble',
        'svgstore',
        'image_resize',
        'connect',
        'watch'
    ]);

    // Final build
    grunt.registerTask('build', [
        'clean',
        'copy',
        'stylus',
        'postcss',
        'uglify',
        'assemble',
        'svgstore',
        'image_resize',
        'imagemin',
        'rev',
        'usemin'
    ]);

};
