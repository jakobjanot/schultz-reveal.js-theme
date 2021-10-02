const pkg = require('./package.json')
const path = require('path')
const through = require('through2');
const sass = require('sass')
const gulp = require('gulp')

// a custom pipeable step to transform Sass to CSS
function compileSass() {
    return through.obj( ( vinylFile, encoding, callback ) => {
      const transformedFile = vinylFile.clone();
  
      sass.render({
          data: transformedFile.contents.toString(),
          includePaths: ['template']
      }, ( err, result ) => {
          if( err ) {
              console.log( vinylFile.path );
              console.log( err.formatted );
          }
          else {
              transformedFile.extname = '.css';
              transformedFile.contents = result.css;
              callback( null, transformedFile );
          }
      });
    });
  }
  
  gulp.task('build', () => gulp.src(['./source/*.{sass,scss}'])
          .pipe(compileSass())
          .pipe(gulp.dest('./dist')))