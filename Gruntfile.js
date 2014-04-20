/**
 * Gruntfile.js
 *
 * changelog
 * 2014-04-15[21:21:21]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.173.56,js,/Volumes/yinyong/gamesubject/anheitulong
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
var fs = require('fs');

module.exports = function(grunt) {

    const STATIC_DIR = 'static/';
    const BUILD_DIR = 'web/';

    const toulun = grunt.file.readJSON('_data/index.json');

    grunt.initConfig({
        jshint: {
            check: {
                src: STATIC_DIR + 'js/**/*.js',
            }
        },
        uglify: {
            compress: {
                files: [{
                    expand: true,
                    cwd: STATIC_DIR,
                    src: ['**/*.js'],
                    dest: BUILD_DIR + STATIC_DIR
                }]
            }
        },
        less: {
            development: {
                options: {
                    cleancss: true
                },
                files: [{
                    expand: true,
                    cwd: STATIC_DIR,
                    src: ['**/*.less'],
                    ext: '.css',
                    dest: BUILD_DIR + STATIC_DIR
                }]
            }
        },
        cssmin: {
            merge: {
                files: [{
                    expand: true,
                    cwd: BUILD_DIR,
                    src: ['**/*.css'],
                    dest: BUILD_DIR
                }]
            }
        },
        'regex-replace': {
            stamp: {
                src: [BUILD_DIR + '**/*.html'],
                actions: [{
                    name: '@',
                    search: /@([\w\-]+?)@/mg,
                    replace: function(n) {
                        return toulun[RegExp.$1] || ''
                    }
                }]
            }

        },
        copy: {},
        imagemin: {
            images: {
                files: [{
                    expand: true,
                    cwd: STATIC_DIR,
                    src: '**/*.{gif,png,jpg}',
                    dest: BUILD_DIR + STATIC_DIR
                }]
            }
        },
        watch: {
            build: {
                files: ['static/js/*.js', 'static/css/*.{less,css}', 'template/**/*.md', '_data/*.json', "lib/**/*"],
                tasks: ['default']
            }
        },
        clean: {
            options: {
                force: true
            },
            built: [BUILD_DIR + "*", "**/._*"]
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            html: {
                files: [{
                    expand: true,
                    cwd: BUILD_DIR,
                    src: '**/*.html',
                    ext: '.html',
                    dest: BUILD_DIR
                }]
            }
        },
        stamp: {
            options: {
                baseDir: BUILD_DIR,
            },
            index: {
                files: [{
                    expand: true,
                    cwd: BUILD_DIR,
                    src: ['**/*.{html,css}'],
                    dest: BUILD_DIR
                }]
            }
        },
        express: {
            test: {
                options: {
                    script: 'app.js',
                    background: false,
                    port: 3008,
                    node_env: 'development',
                    debug: true
                }
            }
        },
        title:{
            all:{
                files:[{
                    expand:true,
                    cwd:BUILD_DIR,
                    src:'**/*.html',
                    dest:BUILD_DIR
                }]
            }
        },
        markdown: {
            options: {
                template: 'lib/markdown-template.html'
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'template',
                    src: '**/*.md',
                    dest: BUILD_DIR,
                    ext: '.html'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-regex-replace');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-web-stamp');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerMultiTask('title', 'add title', function() {

        this.files.forEach(function(f) {
            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                var content = grunt.file.read(filepath);
                var matches = content.match(/<h(\d) .*?>([\s\S]+?)<\/h\1>/);
                if(!matches||!matches[2])return content
                return content.replace(/<title>[\s\S]+?<\/title>/,'<title>'+matches[2]+'    ——yanni4night.com</title>');
            }).join('');

            grunt.file.write(f.dest, src);
        });

    });


    grunt.registerTask('default', ['clean', 'less', 'imagemin', 'markdown', 'stamp', 'regex-replace', 'htmlmin','title']);
    grunt.registerTask('server', ['express']);
};