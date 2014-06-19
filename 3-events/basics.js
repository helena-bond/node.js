var EventEmitter = require("events").EventEmitter;
 
var ee = new EventEmitter();
ee.on("someEvent", function () {
    console.log("event has occured");
});
 
ee.emit("someEvent");

//this event will be emited only once
ee.once("firstConnection", function () { console.log("You'll never see this again"); });
ee.emit("firstConnection");
ee.emit("firstConnection");

//removing listener
function onlyOnce () {
    console.log("You'll never see this again");
    ee.removeListener("firstConnection", onlyOnce);
}
 
ee.on("firstConnection", onlyOnce)
ee.emit("firstConnection");
ee.emit("firstConnection");

//get all listeners
function onlyOnceListeners () {
    console.log(ee.listeners("firstConnection"));
    ee.removeListener("firstConnection", onlyOnceListeners);
    console.log(ee.listeners("firstConnection"));
}
 
ee.on("firstConnection", onlyOnceListeners)
ee.emit("firstConnection");
ee.emit("firstConnection");

//events of event emitter
ee.on("newListener", function (evtName, fn) {
    console.log("New Listener: " + evtName);
});
 
ee.on("removeListener", function (evtName) {
    console.log("Removed Listener: " + evtName);
});
 
function foo () {}
 
ee.on("save-user", foo);
ee.removeListener("save-user", foo);