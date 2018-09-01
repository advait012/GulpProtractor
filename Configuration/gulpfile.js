var gulp = require('gulp');
var gulpProtractorAngular = require('gulp-angular-protractor');
 gulpStart = gulp.Gulp.prototype.start;
 var currentStartTaskName=undefined;

 gulp.Gulp.prototype.start = function (task) {
    currentStartTaskName = task;
    gulpStart.apply(this, arguments);
};
function executeWebTests( appName) {
    return gulp.src([])
        .pipe(gulpProtractorAngular({
            'configFile': './conf.js',
            'debug': false,
            'webDriverUpdate':{
            	args:['--versions.chrome','2.41']
            },
           
          
            'autoStartStopServer': true,
            args: [
                
                '--capabilities.browserName', 'chrome',
                '--params.APPNAME', appName,
                '--params.SUITENAME', currentStartTaskName,
                '--capabilities.platformName', 'Windows',
                ],
            keepAlive: false
        }))
        .on('error', function (e) {
            console.log('Ended with below ERROR::',e);
            process.exit(1);
        })
        .on('end', function () {
            console.log('Test complete');
            process.exit();
        });
}

gulp.task('RegressionSuiteTask', function () {
    executeWebTests('Application_Name');
});