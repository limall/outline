var outlineBuilder=require('./lua/buildOutline');
var creatorBuilder=require('./lua/buildCreator');
var sort=require('./sort')

var luaBuilder={};

var buildOutlines=outlineBuilder.buildOutlines;
var buildCreators=creatorBuilder.buildCreators;

luaBuilder.build=function(nodeDataObj,dstPath){
  var outlines=sort.getArray(nodeDataObj);

  var luaCode='';

  var outlineCode='--outline\n';
  outlineCode+=buildOutlines(outlines);

  luaCode+=outlineCode+'\n';

  var creatorCode='--creator\n';
  creatorCode+=buildCreators(outlines);

  luaCode+=outlineCode+'\n';

}

module.exports=luaBuilder;