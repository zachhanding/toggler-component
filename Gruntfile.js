/*
 * Generated on 2015-03-10
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2015 Hariadi Hinta
 * Licensed under the MIT license.
 *
 *
 */

'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/**/*.{md,hbs,yml,json}'],
        tasks: ['assemble', 'neuter:application']
      },
      sass: {
        files: ['<%= config.src %>/assets/styles/**/*.scss'],
        tasks: ['sass:dist', 'postcss']
      },
      scripts: {
        files: ['<%= config.src %>/assets/scripts/*.js','<%= config.src %>/assets/scripts/{,*/}*/{,*/}*.js', '<%= config.dist %>/assets/scripts/*.js'],
        tasks: ['copy:js', 'neuter:application'],
        options: {
          spawn: false,
        }
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['build']
      }
    },

    browserSync: {
      serve: {
        bsFiles: { src: [ '<%= config.dist %>/**/*.*' ] },
        options: {
          watchTask: true,
          server: '<%= config.dist %>',
          // tunnel: true,
          open: 'external',
          notify: false,
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
          }
        }
      }
    },

    assemble: {
      options: {
        flatten: true,
        assets: '<%= config.dist %>/assets',
        layoutdir: '<%= config.src %>/templates/layouts/',
        data: '<%= config.src %>/data/**/*.{json,yml}',
        helpers: ['<%= config.src %>/assets/scripts/template_helpers.js'],
        partials: '<%= config.src %>/templates/partials/**/*.hbs'
      },
      pages_site: {
        options: {
          layout: 'default.hbs',
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>/templates/pages',
          src: ['**/*.hbs'],
          dest: '<%= config.dist %>/'
        }]
      }
    },

    copy: {
      js: {
        expand: true,
        cwd: '<%= config.src %>/assets/scripts/',
        src: '*.js',
        dest: '<%= config.dist %>/assets/scripts/',
        flatten: true,
        filter: 'isFile'
      },
      jquery: {
        expand: true,
        cwd: 'bower_components/jquery/dist/',
        src: 'jquery.min.js',
        dest: '<%= config.dist %>/assets/scripts/lib/',
        flatten: true,
        filter: 'isFile'
      }
    },

    sass: { // Task
      dist: { // Target
        options: {
          style: 'compressed'
        },
        files: { // Dictionary of files
          "<%= config.dist %>/assets/styles/main.css": "<%= config.src %>/assets/styles/main.scss",
       }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: ['last 1 version']})
        ]
      },
      dist: {
        src: '<%= config.dist %>/assets/styles/**/*.css'
      }
    },

    neuter: {
      options: {
        basePath: '<%= config.src %>/assets/scripts/require/'
      },
      application: {
        src: '<%= config.src %>/assets/scripts/main.js',
        dest: '<%= config.dist %>/assets/scripts/main.js'
      }
    },

    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('build', [
    'clean',
    'assemble',
    'sass',
    'postcss',
    'copy',
    'neuter'
  ]);


  grunt.registerTask('default', ['build']);
  grunt.registerTask('serve',  ['build', 'browserSync', 'watch']);

};
