var outlineBuilder=require('./buildOutline');
var creatorBuilder=require('./buildCreator');
var relationshipBuilder=require('./buildRelationship');
var buildAnimation=require('./buildAnimation');
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

  var luaCode='local Base=require "outline.outline"\n';

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

luaBuilder.buildAnimations=function(anims,dst){
  anims.forEach(function(anim){
    var luaCode=buildAnimation(anim);
    writeFile(luaCode,dst,anim.clipName,'lua',true);
  });
}

module.exports=luaBuilder;