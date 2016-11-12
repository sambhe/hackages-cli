#! /usr/bin/env node

const git = require('git-rev');
const npm = require('npm');

git.branch(function(branch){
  if (branch === 'develop') {
    doPublish();
  } else {
    console.log('hey, you cannot push on something else than the develop branch');
  }
});

function doPublish(){
  npm.load({}, function(err) {
    npm.commands.publish([], function(err) {
      // npm.config.set("email", me.data.email, "user");
      console.log(err || "Published to registry");
      //done(!err);
    });
    // npm.registry.adduser(me.data.username, me.data.password, me.data.email, function(err) {
    //   if (err) {
    //     console.log(err);
    //     done(false);
    //   } else {
    //   }
    // });
  });
}
