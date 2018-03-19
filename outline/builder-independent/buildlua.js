var outlineBuilder=require('../builder/buildOutline');
var creatorBuilder=require('../builder/buildCreator');
var relationshipBuilder=require('../builder/buildRelationship');
var writeFile=require('../builder/writeFile');
var sort=require('../builder/sort');
var util=require('../builder/util');
var dependentGettor=require('./dependent/getDependent');
var buildAnimation=require('../builder/buildAnimation');

var luaBuilder={};

var buildOutlines=outlineBuilder.buildOutlines;
var buildCreators=creatorBuilder.buildCreators;
var buildCreatorRelationship=relationshipBuilder.buildCreatorRelationship;
var buildOutlineRelationship=relationshipBuilder.buildOutlineRelationship;

luaBuilder.buildNode=function(nodeDataObj,dstPath,namespace){
  var outlines=sort.getArray(nodeDataObj);
  var dependent={
    isCreator:true
  };

  var outlineCode='--outline\n';
  outlineCode+=buildOutlines(outlines,dependent);

  var luaCode=outlineCode+'\n';

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

  luaCode=luaCode.replace(/Base.createOutline/g,'createOutline');
  luaCode=luaCode.replace(/Base.createCreator/g,'createCreator');

  luaCode+=namespace+'='+namespace+' or {}\n';
  luaCode+=namespace+'.'+rootName+'='+rootName;

  var dependentCode=dependentGettor.getDependent(dependent);
  luaCode=dependentCode+luaCode;

  writeFile(luaCode,dstPath,rootName,'lua');
}

module.exports=luaBuilder;