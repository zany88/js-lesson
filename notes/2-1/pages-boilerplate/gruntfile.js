const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
  pkg: grunt.file.readJSON('package.json'),
  grunt.initConfig({
    sass:{
      options:{
        sourceMap: true,
        implementation:sass
      },
      main:{
        files: {
            'dist/assets/styles/main.css':'src/assets/styles/main.scss',
          },
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/assets/scripts/app.js': './src/assets/scripts/main.js'
        }
      }
    },
    swigtemplates: {
      options: {
        defaultContext: {
          pageTitle: 'My Title'
        },
        templatesDir: 'src'
      },
      production: {
        dest: 'dist/',
        src: ['src/**/*.html']
      },
    },
    useref: {
      html: 'dist/*.html',
      temp: 'dist'
    },
    copy: {
       images:{
         expand: true,
         src:'src/assets/images/*.png',
         dest:'dist',
       },
      fonts:{
         expand: true,
         src:'fonts/*',
         dest:'dist',
       }
    }

      })

  loadGruntTasks(grunt)
  // grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', ['sass','babel','swigtemplates','useref','concat','uglify','cssmin','copy'])
  // grunt.registerTask('default', ['copy'])

}
