//Gulpfile.js

var gulp = require("gulp");
var watch = require("gulp-watch");

var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var del = require("del");
var minifyCSS = require("gulp-minify-css");
var copy = require("gulp-copy");
var bower = require("gulp-bower");
var sourcemaps = require("gulp-sourcemaps");
var pump = require('pump');
var zip = require('gulp-zip');
var htmlreplace = require('gulp-html-replace');
var fs = require('fs');

var path = {
    src: "bower_components/",
    lib: "lib/"
}

var config = {
    jquerysrc: [
        path.src + "jquery/dist/jquery.js",
        path.src + "jquery-validation/dist/jquery.validate.js",
        path.src + "jquery-validation/dist/jquery.validate.unobtrusive.js"
    ],
    jquerybundle: path.lib + "jquery-bundle.js",
    ngsrc: [
        path.src + "angular/angular.js",
        path.src + "angular-route/angular-route.js",
        path.src + "angular-resource/angular-resource.js"
    ],
    ngbundle: path.lib + "ng-bundle.js",
    bgf: path.lib + "",
    //JavaScript files that will be combined into a Bootstrap bundle
    bootstrapsrc: [
        path.src + "bootstrap/dist/js/bootstrap.js"
    ],
    bootstrapbundle: path.lib + "bootstrap-bundle.js"
}

var taskFolder = "zip/";
var version = "";
var bundleFilename = "";


//Create a jquery bundled file
gulp.task("jquery-bundle", ["clean-scripts", "bower-restore"], function() {
    return gulp.src(config.jquerysrc)
        .pipe(concat("jquery-bundle.js"))
        .pipe(gulp.dest("lib"));
});

//Create a angular bundled file
gulp.task("ng-bundle", ["clean-scripts", "bower-restore"], function() {
    return gulp.src(config.ngsrc)
        .pipe(concat("ng-bundle.js"))
        .pipe(gulp.dest("lib"));
});

//Create a bootstrap bundled file
gulp.task("bootstrap-bundle", ["clean-scripts", "bower-restore"], function() {
    return gulp.src(config.bootstrapsrc)
        .pipe(concat("bootstrap-bundle.js"))
        .pipe(gulp.dest("lib"));
});

gulp.task("engine-bundle", function() {
    return gulp.src('./js/engine/*.js')
        .pipe(concat("engine-bundle.js"))
        .pipe(gulp.dest("bundles"));
});

gulp.task("libs-bundle", function() {
    return gulp.src(['./lib/EventEmitter.js', './lib/jquery-3.1.0.min.js', , './lib/jquery-ui.js', './lib/lodash.min.js', './lib/glows.js', './lib/orientationchangeend.js', './lib/platform.js', './lib/scream.js', './lib/brim.js'])
        .pipe(concat("libs-bundle.js"))
        .pipe(gulp.dest("bundles"));
});

//Create a bootstrap bundled file
gulp.task("bgf-bundle", function() {
    return gulp.src('./js/bgf/*.js')
        .pipe(concat("bgf-bundle.js"))
        .pipe(gulp.dest("bundles"));
});


gulp.task("classes-bundle", function() {
    return gulp.src('./js/classes/*.js')
        .pipe(concat("classes-bundle.js"))
        .pipe(gulp.dest("bundles"));
});

gulp.task("parsers-bundle", function() {
    return gulp.src('./js/parsers/*.js')
        .pipe(concat("parsers-bundle.js"))
        .pipe(gulp.dest("bundles"));
});

gulp.task("prefabs-bundle", function() {
    return gulp.src('./js/prefabs/*.js')
        .pipe(concat("prefabs-bundle.js"))
        .pipe(gulp.dest("bundles"));
});

gulp.task("tools-bundle", function() {
    return gulp.src('./js/*.js')
        .pipe(concat("tools-bundle.js"))
        .pipe(gulp.dest("bundles"));
});


// Combine and the vendor files from bower into bundles (output to the Scripts folder)
gulp.task("bundle-scripts", ["engine-bundle", "libs-bundle", "tools-bundle", "bgf-bundle", "classes-bundle", "parsers-bundle", "prefabs-bundle"], function() {

});

//Restore all bower packages
gulp.task("bower-restore", function() {
    return bower();
});

//build lib scripts
gulp.task("compile", ["bundle-scripts"], function() {
    return gulp.src(["bundles/engine-bundle.js", "bundles/tools-bundle.js", "bundles/parsers-bundle.js", "bundles/classes-bundle.js", "bundles/prefabs-bundle.js", "bundles/bgf-bundle.js"])
        .pipe(sourcemaps.init())
        .pipe(concat("compiled-bundle.js"))
        .pipe(gulp.dest(taskFolder + "/js"))
        .pipe(rename("compiled-bundle.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(taskFolder + "/js"));
});

//build lib scripts
gulp.task("rename", function() {
    return gulp.src("./" + taskFolder + "/js/compiled-bundle.js")
        .pipe(rename("compiled-bundle.min.js"))
        .pipe(gulp.dest(taskFolder + "/js"));
});

gulp.task("copy-lib-files", function() {
    return gulp.src(['./lib/EventEmitter.js', './lib/jquery-3.1.0.min.js', , './lib/jquery-ui.js', './lib/lodash.min.js', './lib/glows.js', './lib/orientationchangeend.js', './lib/platform.js', './lib/scream.js', './lib/brim.js', './lib/blurX.js', './lib/blurY.js'])
        .pipe(copy(taskFolder))
});

gulp.task("copy-compiled", function() {
    return gulp.src('./compiled/compiled-bundle.*')
        .pipe(gulp.dest('./' + taskFolder + '/js/'));
});

gulp.task("copy-assets", function() {
    return gulp.src('./assets/**/*')
        .pipe(gulp.dest('./' + taskFolder + '/assets'));
});

gulp.task("copy-css", function() {
    return gulp.src('./css/**/*')
        .pipe(gulp.dest('./' + taskFolder + '/css'));
});

gulp.task("copy-theme1", function() {
    return gulp.src('./themes/' + process.argv[4] + '_desktop/**/*')
        .pipe(gulp.dest('./' + taskFolder + '/themes/' + process.argv[4] + '_desktop'));
});

gulp.task("copy-theme2", function() {
    return gulp.src('./themes/' + process.argv[4] + '_mobile/**/*')
        .pipe(gulp.dest('./' + taskFolder + '/themes/' + process.argv[4] + '_mobile/'));
});

gulp.task("copy-index", function() {
    return gulp.src('./index.min.html')
        .pipe(rename("index.html"))
        .pipe(gulp.dest('./' + taskFolder + '/'));
});

gulp.task("copy-demo-plays", function() {
    return gulp.src('./demo_plays.js')
        .pipe(gulp.dest('./' + taskFolder + '/'));
});

gulp.task("copy-config", function() {
    return gulp.src('./config.json')
        .pipe(gulp.dest('./' + taskFolder + '/'));
});

gulp.task("copy-lobbyproxy", function() {
    return gulp.src('./LobbyProxy.js')
        .pipe(gulp.dest('./' + taskFolder + '/'));
});

gulp.task("copy-manifest", function() {
    return gulp.src('./manifest.json')
        .pipe(gulp.dest('./' + taskFolder + '/'));
});


// gulp.task("copy-all", ["copy-lib-files", "copy-assets", "copy-css", "copy-theme1", "copy-theme2", "copy-index", "copy-config", "copy-demo-plays", "copy-lobbyproxy"], function() {});
gulp.task("copy-all", ["copy-lib-files", "copy-assets", "copy-css", "copy-theme1", "copy-theme2", "htmlmin", "copy-config", "copy-demo-plays", "copy-lobbyproxy", "copy-manifest"], function() {});

gulp.task("compile-copy", ["compile", "copy-all"], function() {
    gulp.src('./themes/' + process.argv[4] + '_desktop/config/config.json')
        .pipe(gulp.dest('./' + taskFolder + '/'));

    gulp.src('./themes/' + process.argv[4] + '_desktop/config/bedbug_config.json')
        .pipe(gulp.dest('./' + taskFolder + '/assets/data/'));

    return gulp.src('./zip/**/*') // +'/**/*'
        .pipe(zip(bundleFilename + '.zip'))
        .pipe(gulp.dest('dist'));

});

gulp.task("setFolder", function() {
    // taskFolder = "zip/" + process.argv[6];
    console.log("Sertting task folder to: " + taskFolder);
    return;
});

gulp.task("checkvars", function() {

    console.log('./themes/' + process.argv[4] + '_desktop/game_specs.json');
    var versionFile = JSON.parse(fs.readFileSync('./themes/version.json'));
    var jsonDesktop = JSON.parse(fs.readFileSync('./themes/' + process.argv[4] + '_desktop/game_specs.json'));
    var jsonMobile = JSON.parse(fs.readFileSync('./themes/' + process.argv[4] + '_mobile/game_specs.json'));

    jsonDesktop.version = versionFile.version;
    jsonMobile.version = versionFile.version;

    version = versionFile.version;

    fs.writeFile('./themes/' + process.argv[4] + '_desktop/game_specs.json', JSON.stringify(jsonDesktop, null, 2), function(err) {
        if (err) {
            return console.log(err);
        }

        fs.writeFile('./themes/' + process.argv[4] + '_mobile/game_specs.json', JSON.stringify(jsonMobile, null, 2), function(err) {
            if (err) {
                return console.log(err);
            }
        });
    });

    bundleFilename = jsonDesktop.title.toLowerCase().replace(" ", ".") + '.' + version;
    taskFolder = "zip/" + jsonDesktop.version;
    return console.log(process.argv[4]);
})

gulp.task("distro", ["checkvars", "setFolder", "compile-copy"], function() {
    // if(process.argv[8] && process.argv[8] == false){
    return del(["bundles", "zip"]);
    // return del(["bundles"]);
    // }else{
    //     console.log("No cleaning requested.");
    //   return;  
    // } 
})

var exec = require('child_process').exec;

gulp.task("buildall", function(cb) {
    exec('gulp distro --theme weather', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (err)
            return cb(err);
        exec('gulp distro --theme tesla', function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            if (err)
                return cb(err);
            exec('gulp distro --theme midnight', function(err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                if (err)
                    return cb(err);
                exec('gulp distro --theme soulgems', function(err, stdout, stderr) {
                    console.log(stdout);
                    console.log(stderr);
                    if (err)
                        return cb(err);
                    exec('gulp distro --theme monsters', function(err, stdout, stderr) {
                        console.log(stdout);
                        console.log(stderr);
                        if (err)
                            return cb(err);
                        exec('gulp distro --theme deluxe', function(err, stdout, stderr) {
                            console.log(stdout);
                            console.log(stderr);
                            if (err)
                                return cb(err);
                        });
                    });
                });
            });
        });
    });
})

// Synchronously delete the output script file(s)
gulp.task("clean", function(cb) {
    del(["bundles", "zip"], cb);
});

gulp.task("zip", function() {
    return gulp.src('./' + taskFolder + '/**/*', {
            base: taskFolder + '/'
        })
        .pipe(zip(bundleFilename + '.zip'))
        .pipe(gulp.dest('dist'));
});


gulp.task('compress', function(cb) {
    pump([
            gulp.src("./dist/compiled-bundle.min.js"),
            uglify(),
            gulp.dest('dist')
        ],
        cb
    );
});

gulp.task('htmlmin', function(cb) {
    return gulp.src('index.html')
        .pipe(htmlreplace({
            'engine': 'js/compiled-bundle.min.js',
        }))
        .pipe(gulp.dest('./' + taskFolder + '/'));
});


// E.g. Create develeopment build [name: zip filanme, folder:name of the folder to unzip, theme: theme to package]
//  gulp distro --theme tesla
//  gulp buildall
