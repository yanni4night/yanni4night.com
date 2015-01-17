// Gruntfile.js
// osx-x64,UTF-8,192.168.1.101,js,/Users/yinyong/work/yanni4night.com
// by yanni4night@gmail.com,http://yanni4night.com
//
// Changelog
// 2014-04-26[00:37:30]:created
// 2014-04-29[21:48:57]:more clear grunt task flow
//
// Version 0.1.1

var fs = require('fs');
var swig = require('swig');

module.exports = function(grunt) {

    const toulun = grunt.file.readJSON('_data/index.json');
    const STATIC_DIR = 'static/';
    const BUILD_DIR = 'web/';
    const TPL_DIR = 'template/';
    const TMP_DIR = 'tmp/';

    const HEAD_REG = /<h(\d) .*?>([\s\S]+?)<\/h\1>/;
    const META_KEYWORDS_REG = /<meta\s+?name="keywords"\s+content="(.+?)"\/?>/;

    const METRO_COLORS = ["greenlight", "green", "greendark", "magenta", "purplelight", "purple", "purpledark", "darken", "teal", "blue", "bluedark", "yellow", "orange", "orangedark", "red", "redlight"];

    swig.setDefaults({
        loader: swig.loaders.fs(__dirname + '/' + TMP_DIR)
    });

    (require('time-grunt'))(grunt);
    (require('load-grunt-tasks'))(grunt);

    var metroIndex = 0;

    function randomMetroColor() {
        return METRO_COLORS[metroIndex++ % METRO_COLORS.length];
    }

    //Generate blog list
    var blogList = [];

    grunt.initConfig({
        jshint: {
            check: {
                src: STATIC_DIR + 'js/**/*.js',
            }
        },
        browserify: {
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
                    dest: TMP_DIR + STATIC_DIR
                }]
            }
        },
        'regex-replace': {
            variables: {
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
            tpl: {
                expand: true,
                cwd: TPL_DIR,
                src: ["**/*"],
                dest: TMP_DIR
            },
            fonts: {
                expand: true,
                cwd: '.',
                src: [STATIC_DIR + "fonts/*"],
                dest: BUILD_DIR
            },
            blogs: {
                expand: true,
                cwd: TMP_DIR,
                src: ['index.html', '{blog,example}/**/*.html', 'static/**/*'],
                dest: BUILD_DIR
            }
        },
        imagemin: {
            images: {
                files: [{
                    expand: true,
                    cwd: STATIC_DIR,
                    src: '**/*.{gif,png,jpg}',
                    dest: TMP_DIR + STATIC_DIR
                }]
            }
        },
        watch: {
            build: {
                files: ['static/js/**/*.js', 'static/css/**/*.{less,css}', TPL_DIR + '**/*.{md,html}', '_data/*.json', "lib/**/*"],
                tasks: ['default']
            }
        },
        clean: {
            options: {
                force: true
            },
            tmp: [TMP_DIR],
            built: [BUILD_DIR]
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            html: {
                files: [{
                    expand: true,
                    cwd: TMP_DIR,
                    src: '**/*.html',
                    ext: '.html',
                    dest: TMP_DIR
                }]
            }
        },
        stamp: {
            options: {
                baseDir: BUILD_DIR,
            },
            html: {
                options: {
                    pattern: 'l|i|s'
                },
                files: [{
                    expand: true,
                    cwd: BUILD_DIR,
                    src: ['**/*.html'],
                    dest: BUILD_DIR
                }]
            },
            css: {
                options: {
                    pattern: 'u'
                },
                files: [{
                    expand: true,
                    cwd: TMP_DIR,
                    src: ['**/*.css'],
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
                    cwd: TMP_DIR,
                    src: 'blog/**/*.html',
                    dest: TMP_DIR
                }]
            }
        },
        keywords: {
            all: {
                files: [{
                    expand: true,
                    cwd: TMP_DIR,
                    src: 'blog/**/*.html',
                    dest: TMP_DIR
                }]
            }
        },
        list: {
            all: {
                src: [TMP_DIR + 'blog/**/*.html']
            }
        },
        swig: {
            blog: {
                data: function() {
                    return {
                        metro: randomMetroColor()
                    };
                },
                files: [{
                    expand: true,
                    cwd: TMP_DIR,
                    src: 'blog/**/*.html',
                    dest: TMP_DIR
                }]
            },
            example: {
                files: [{
                    expand: true,
                    cwd: TMP_DIR,
                    src: 'example/**/*.html',
                    dest: TMP_DIR
                }]
            },
            index: {
                src: TMP_DIR + "index.html",
                dest: TMP_DIR + "index.html",
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
                    cwd: TMP_DIR,
                    src: 'blog/**/*.md',
                    dest: TMP_DIR,
                    ext: '.html'
                }]
            }
        }
    });

    //Find the first head element(h1-h6) and inject to title
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
                var matches = content.match(HEAD_REG);
                if (!matches || !matches[2]) return content;
                return content.replace(/<title>[\s\S]+?<\/title>/, '<title>' + matches[2] + '</title>');
            }).join('');

            grunt.file.write(f.dest, src);
            grunt.log.writeln('File "' + f.dest + '" titled.');
        });
    });

    //Find keywords and append to meta
    grunt.registerMultiTask('keywords', 'add keywords to meta', function() {

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
                var matches = content.match(/@keywords?:([^\s<>]+)/);
                if (!matches || !matches[1]) return content;
                var words = matches[1].split(',').filter(function(n) {
                    return !!n.length;
                });
                matches = content.match(META_KEYWORDS_REG);
                if (!matches || !matches[1]) {
                    return content;
                }
                return content.replace(META_KEYWORDS_REG, '<meta name="keywords" content="' + matches[1] + ',' + words.join() + '"/>');
            }).join('');

            grunt.file.write(f.dest, src);
            grunt.log.writeln('File "' + f.dest + '" keyworded.');
        });
    });


    grunt.registerMultiTask('list', 'get blog list', function() {
        this.files.forEach(function(f) {
            blogList = blogList.concat(f.src.map(function(filepath) {

                var content = grunt.file.read(filepath);

                var title = date = '';

                var matches = content.match(HEAD_REG);
                if (!matches || !matches[2]) {
                    grunt.log.warn(filepath + ' has no TITLE.');
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
                    path: filepath.replace(new RegExp('^' + TMP_DIR), ''),
                    title: title,
                    date: date
                };
            }));
        });
        //sort by date
        blogList.sort(function(q1, q2) {
            var d1 = q1.date || "";
            var d2 = q2.date || "";
            if (d1 > d2) {
                return -1;
            } else if (d1 < d2) {
                return 1;
            } else {
                return 0;
            }
        });
        grunt.log.writeln('list got ' + blogList.length);
    });


    grunt.registerMultiTask('swig', 'render html by twig', function() {
        var data = this.data;

        this.files.forEach(function(f) {

            var src = f.src.map(function(filepath) {
                var payload = data.data;
                if ('function' === typeof payload) {
                    payload = payload(filepath);
                }
                var template = swig.compileFile(filepath.replace(TMP_DIR, ''));
                return template(payload || {});
            }).join('');

            grunt.file.write(f.dest, src);

        });

    });

    grunt.registerTask('server', ['express']);
    grunt.registerTask('default', ['clean',
        'less', //css to tmp
        'imagemin', //images to tmp
        'browserify',
        'copy:tpl', //tpls to tmp
        'markdown', //md to html
        'list', //get list
        'swig', //render index&blog
        'title', //title
        'keywords', //keywords
        'htmlmin', //min
        'copy:blogs', //copy to build dir
        'copy:fonts',
        'stamp', //stamp for html&css
        'clean:tmp' //remove tmp
    ]);

};