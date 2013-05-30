
/*
 * Create a root in the global namespace for all
 * our models, views, etc. We're not going for
 * originality here. Note that we also put the
 * application object within the global object.
 * This is only required for command line testing
 * using node.js and could be omitted in
 * production environments if desired. As it
 * does no harm, we include it to make testing
 * easy.
 */

var myApp = myApp || {};
var global = global || {};
global.myApp = myApp;
