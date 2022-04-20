// -----------------
// Gulp + Plugins
// -----------------

const { src, dest, series, parallel, watch } = require('gulp')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const del = require('del')

// -----------------
// Global config
// -----------------
const srcPath = './src/'
const destPath = '/home/daw/ftp/html'

// -----------------
// Private tasks
// -----------------

// Task A
function copySourceFiles(cb) {
    // Remove previous files
    del([destPath + '**/*.*'], cb)
    // Copy new files
    return src([srcPath + '**/*.{html,css,js,svg,png,jpg,jpeg}'])
        .pipe(dest(destPath))
}

// Task B
function minifyCss(cb) {
    return src([srcPath + 'styles/*.css'])
        .pipe(cleanCSS())
        .pipe(dest(destPath + 'styles/'))
}

// Task C
function minifyJs(cb) {
    // TO DO
    cb()
}

// -----------------
// Public tasks
// -----------------

// Task 1. Copy source files (A)
exports.update = copySourceFiles

// Task 2. Minify CSS and JS (B+C)
exports.minify = parallel(
    minifyCss, 
    minifyJs
)

// Task 3. Execute tasks when a change occurs
exports.watch = function(cb) {
    // TO DO
    cb()
}

// Task 4. Execute tasks 1 and 2
exports.default = series(
    this.update,
    this.minify
)
