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
// Elimina els fitxers anteriors i copia els nous fitxers a la nova ruta
function copySourceFiles(cb) {
    // Remove previous files
    del([destPath + '**/*.*'], cb)
    // Copy new files
    return src([srcPath + '**/*.{html,css,js,svg,png,jpg,jpeg}'])
        .pipe(dest(destPath))
}

// Task B
// Minimifica els fitxers css
function minifyCss(cb) {
    return src([srcPath + 'styles/*.css'])
        .pipe(cleanCSS())
        .pipe(dest(destPath + 'styles/'))
}

// Task C
function minifyJs(cb) {
    // TO DO
    return src([srcPath + 'scripts/*.js')
        .pipe(uglify())
        .pipe(dest(destPath + 'scripts/'))
}

// -----------------
// Public tasks
// -----------------

// Task 1. Copy source files (A)
// Referencia a la funcio privada copySourceFiles
exports.update = copySourceFiles

// Task 2. Minify CSS and JS (B+C)
// Executa una funcio en paralel en la qual crida a les funciones privades minifyCss i minifyJs
exports.minify = parallel(
    minifyCss,
    minifyJs
)

// Task 3. Execute tasks when a change occurs
exports.watch = function(cb) {
    // TO DO
    return watch([srcPath],series(this.update,this.minify))
}

// Task 4. Execute tasks 1 and 2
// Executa una darrera de l'altre les tasques 1 i 2
exports.default = series(
    this.update,
    this.minify
)
