module.exports = function (grunt) {

    grunt.registerTask('serve', 'Compile then start a connect web server', function () {
        grunt.task.run([
            'clean:server',
            'copy:server',
            'ngtemplates:server',
            'template:server',
            'connect:livereload',
            'watch'
        ]);
    });
};