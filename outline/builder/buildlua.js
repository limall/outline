var outlineBuilder=require('./lua/buildOutline');
var creatorBuilder=require('./lua/buildCreator');
var relationshipBuilder=require('./lua/buildRelationship');
var animationBuilder=require('./lua/buildAnimation');
var writeFile=require('./writeFile');
var sort=require('./sort');
var util=require('./util');

var luaBuilder={};

var buildOutlines=outlineBuilder.buildOutlines;
var buildCreators=creatorBuilder.buildCreators;
var buildCreatorRelationship=relationshipBuilder.buildCreatorRelationship;
var buildOutlineRelationship=relationshipBuilder.buildOutlineRelationship;

luaBuilder.buildNode=function(nodeDataObj,dstPath){
  var outlines=sort.getArray(nodeDataObj);

  var luaCode='local Base=require"outline.outline"\n';

  var outlineCode='--outline\n';
  outlineCode+=buildOutlines(outlines);

  luaCode+=outlineCode+'\n';

  var creatorCode='--creator\n';
  creatorCode+=buildCreators(outlines);

  luaCode+=creatorCode+'\n';

  var relationCode1='--creatorRelationship\n';
  relationCode1 +=buildCreatorRelationship(outlines);

  luaCode+=relationCode1+'\n';

  var relationCode2='--outlineRelationship\n';
  relationCode2 +=buildOutlineRelationship(outlines);

  luaCode+=relationCode2+'\n';

  var rootName=util.firstCaseUp(nodeDataObj.name);
  luaCode+='O.'+rootName+'='+rootName;

  writeFile(luaCode,dstPath,rootName,'lua');

}

module.exports=luaBuilder;