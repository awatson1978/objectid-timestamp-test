objectid-timestamp-test
================

Meteor applet demonstrating ``{idGeneration: "TIMESTAMP"}`` in action.

**Note:  This application requires a development branch of Meteor.**  

````json
"meteor": {
  "branch": "objectid-timestamp",
  "git": "https://github.com/awatson1978/meteor.git"
}
````

Installation
------------------------

````sh
# Should be as simple as cloning the repository...
git clone https://github.com/awatson1978/objectid-timestamp-test.git

# And then running it...
sudo mrt
````

Purpose
------------------------

This applet is meant to demonstrate that the following addition to mongo-livedata works as expected.

````js
// packages/mongo-livedata/collection.js
// line 47

case 'TIMESTAMP':
  self._makeNewID = function () {
    var src = name ? DDP.randomStream('/collection/' + name) : Random;
    var timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
    return new Meteor.Collection.ObjectID(timestamp.toString() + src.hexString(16));
  };
  break;
````



Licensing
------------------------

MIT License. Use as you wish, including for commercial purposes.
