'use strict';

var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var del = require('del');

gulp.task('delete', function () {
    return del(['images/fulls/*.*', 'images/thumbs/*.*']);
});

gulp.task('resize-images', function () {
    return gulp.src('images/*.*') // Reemplaza con el nombre de una imagen válida
        .pipe(imageResize({
            width: 1024,
            upscale: false // Evita que se escale hacia arriba
        }))
        .pipe(gulp.dest('images/fulls')) // Carpeta de salida
        .on('error', function(err) {
            console.error('Error during image resize:', err.message);
        });
});

gulp.task('resize-thumbnails', function () {
    return gulp.src('images/*.*') // Ruta a tus imágenes
        .pipe(imageResize({
            width: 512,
            upscale: false // Evita que se escale hacia arriba
        }))
        .pipe(gulp.dest('images/thumbs')) // Carpeta de salida
        .on('error', function(err) {
            console.error('Error during thumbnail resize:', err.message);
        });
});

// Tarea de redimensionar imágenes
gulp.task('resize', gulp.series('delete', gulp.parallel('resize-images', 'resize-thumbnails')));

// Tarea por defecto
gulp.task('default', gulp.series('resize'));
