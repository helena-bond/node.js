module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
     compile: {
       options: {
         //paths: ['path/to/import', 'another/to/import'],
         //urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
         use: [
           //require('fluidity') // use stylus plugin at compile time
         ],
         import: [      //  @import 'foo', 'bar/moo', etc. into every .styl file
           //'foo',       //  that is compiled. These might be findable based on values you gave
           //'bar/moo'    //  to `paths`, or a plugin you added under `use`
         ]
       },
       files: {
         'css/result.css': 'css/source.styl', // 1:1 compile
         //'path/to/another.css': ['path/to/sources/*.styl', 'path/to/more/*.styl'] // compile and concat into single file
       }
   }
}
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  
  grunt.registerTask('css', ['stylus']);

};