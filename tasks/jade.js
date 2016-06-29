var gulp = require('gulp');
var Elixir = require('laravel-elixir');
var $ = require('gulp-load-plugins')();

var config = Elixir.config;
var options = {};

Elixir.extend('jade', function(options) {

    var source = {
        jade: (options.source) ? options.source : config.viewPath + '/**/!(_)*.jade',
        watch: config.viewPath + '/**/*.jade'
    };
    var output = (options.output) ? options.output : config.publicPath;

    new Elixir.Task('jade', function() {
        return gulp.src(source.jade)
            .pipe($.jade(options.config))
            .on('error', function(e) {
                new Elixir.Notification().error(e, ' Compilation Failed');
                this.emit('end');
            })
            .pipe(gulp.dest(output))
            .pipe(new Elixir.Notification('Jade Compiled!'));
    })
    .watch(source.watch)
    .ignore(output);

});
