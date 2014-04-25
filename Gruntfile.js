// Gruntfile.js
// osx-x64,UTF-8,192.168.1.101,js,/Users/yinyong/work/yanni4night.com
// by yanni4night@gmail.com,http://yanni4night.com
//
// Changelog
// 2014-04-26[00:37:30]:created
//
// Version 0.1.0

var fs = require('fs');
var swig = require('swig');

module.exports = function(grunt) {

    const STATIC_DIR = 'static/';
    const BUILD_DIR = 'web/';
    swig.setDefaults({
        loader: swig.loaders.fs(__dirname + '/' + BUILD_DIR)
    });
    const toulun = grunt.file.readJSON('_data/index.json');


    var blogList = [];

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
        copy: {
            html: {
                //flatten: true,
                expand: true,
                cwd: 'template',
                src: ['common/*.html', '*-parent.html', "index.html"],
                dest: BUILD_DIR
            }
        },
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
                files: ['static/js/*.js', 'static/css/*.{less,css}', 'template/**/*.{md,html}', '_data/*.json', "lib/**/*"],
                tasks: ['default']
            }
        },
        clean: {
            options: {
                force: true
            },
            built: [BUILD_DIR + "*", "**/._*"],
            useless: ['web/common', 'web/*-parent.html']
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
        title: {
            all: {
                files: [{
                    expand: true,
                    cwd: BUILD_DIR,
                    src: '**/*.html',
                    dest: BUILD_DIR
                }]
            }
        },
        list: {
            all: {
                src: [BUILD_DIR + 'blog/**/*.html']
            }
        },
        swig: {
            blog: {
                files: [{
                    expand: true,
                    cwd: BUILD_DIR,
                    src: 'blog/**/*.html',
                    dest: BUILD_DIR
                }]
            },
            index: {
                src: BUILD_DIR + "index.html",
                dest: BUILD_DIR + "index.html",
                data: function() {
                    return {
                        blogs: blogList
                    };
                }
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
                    src: 'blog/**/*.md',
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
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                var content = grunt.file.read(filepath);
                var matches = content.match(/<h(\d) .*?>([\s\S]+?)<\/h\1>/);
                if (!matches || !matches[2]) return content;
                return content.replace(/<title>[\s\S]+?<\/title>/, '<title>' + matches[2] + '    ——yanni4night.com</title>');
            }).join('');

            grunt.file.write(f.dest, src);
        });

    });


    grunt.registerMultiTask('list', 'get blog list', function() {
        this.files.forEach(function(f) {
            blogList = blogList.concat(f.src.map(function(filepath) {

                var content = grunt.file.read(filepath);

                var title = date = '';

                var matches = content.match(/<h(\d) .*?>([\s\S]+?)<\/h\1>/);
                if (!matches || !matches[2]) {
                    grunt.log.warn(filepath + ' has not TITLE.');
                } else {
                    title = matches[2];
                }

                matches = content.match(/@(201\d\-\d{1,2}\-\d{1,2})/);
                if (!matches || !matches[1]) {
                    grunt.log.warn(filepath + ' has not DATE.');
                } else {
                    date = matches[1];
                }

                return {
                    path: filepath.replace(/^web/, ''),
                    title: title,
                    date: date
                };
            }));
        });
    });


    grunt.registerMultiTask('swig', 'twig', function() {
        var data = this.data.data;
        if ('function' === typeof data) {
            data = data();
        }
        this.files.forEach(function(f) {

            var src = f.src.map(function(filepath) {
                var template = swig.compileFile(filepath.replace(BUILD_DIR, ''));
                return template(data || {});
            }).join('');

            grunt.file.write(f.dest, src);

        });

    });

    grunt.registerTask('server', ['express']);
    grunt.registerTask('default', ['clean:built', 'less', 'imagemin', 'copy', 'markdown', 'swig:blog', 'list', 'swig:index', 'clean:useless', 'stamp', 'htmlmin', 'title']);
    grunt.registerTask('listfiles', ['list']);
};