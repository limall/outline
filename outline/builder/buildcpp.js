var fileBuilder=require('./cpp/templete.js');       //加载主模板的构造模块
var structBuilder=require('./cpp/templete_struct'); //加载结构体的定义的构造模块
var rootBuilder=require('./cpp/templete_rootDeclare');//加载根节点的定义的构造模块
var instanceBuilder=require('./cpp/templete_initInstance');//加载所有子节点的定义的构造模块
var relationBuilder=require('./cpp/templete_initOutlineRelation');//加载处理所有子节点outliene关系的构造模块
var sort=require('./sort');                         //加载筛选节点到相应层级的模块
var animationBuilder=require('./cpp/templete_animation');//加载构造动画的模块
var extraStructBuilder=require('./cpp/template_extraStruct');//加载构造自定义组件数据的模块
var writeFile=require('./writeFile');               //用来写文件
var util=require('./util');

//构造导出文件的主体内容部分
function buildNode(nodeDataObj,dstPath){
    var node_outline=nodeDataObj;
    //一个二维数组，每个子数组按顺序依次存放0、1、2...层的节点的数据
    var sorted=sort.sort(node_outline);
    //上述数组颠倒过来的数组
    var bottomUped=sort.bottomUp(sorted);
    //主模板
    var text=fileBuilder.getContentTemplate();
  
    //下面的代码开始构造节点源码，他们的主要工作都是为每个构造模块生成需要的参数
  
    //构造结构体的定义
    var defArr=[];
    for(var i=0;i<bottomUped.length;i++){
      var objs=bottomUped[i];
      for(var j=0;j<objs.length;j++){
        var obj=objs[j];
        var def={};
        def.name=obj.name;
        def.PName=getPName(obj);
        var childrenName=[];
        var children=obj.children;
        if(children)
            for(var k=0;k<children.length;k++){
                childrenName.push({name:children[k].name,PName:getPName(children[k])});
            }
        def.children=childrenName;
        def.components=obj.extraData;
        defArr.push(def);
      }
    }
    var text_struct1=structBuilder.getStructDefinition1(defArr);
    var text_struct2=structBuilder.getStructDefinition2(defArr);
    text=fileBuilder.insertStructDefinition(text,text_struct1,text_struct2);
    var Name=node_outline.name.substring(0,1).toUpperCase()+node_outline.name.substring(1);
    text=text.replace(/\/\*nodeName\*\//g,Name); 
  
    //根节点的定义
    var para={name:node_outline.name};
    var attrNames=['x','y','width','height','anchorX','anchorY','scaleX','scaleY','rotation','opacity','visible','zOrder','key','value','colorR','colorG','colorB','name'];
    function isAttrName(attrName){
      for(var i=0;i<attrNames.length;i++)
          if(attrNames[i]===attrName)
              return true;
      return false;
    }          
    var attrs=[];
    for(var attrName in node_outline){
      if(isAttrName(attrName))
        if(attrName==='name')
          attrs.push({
            name:attrName,
            value:'"'+node_outline.name+'"',
            nodeName:node_outline.name,
          });
        else
          attrs.push({
            name:attrName,
            value:node_outline[attrName],
            nodeName:node_outline.name,
          });
    }
    para.attrs=attrs;
    para.extraDatas=node_outline.extraData;
    var text_rootDeclare=rootBuilder.getRootDeclare(para);
    text=fileBuilder.insertRootDeclare(text,text_rootDeclare);
  
    //所有子节点的定义
    var paras=[];
    for(var i=1;i<sorted.length;i++){
      for(var j=0;j<sorted[i].length;j++){
        var obj=sorted[i][j];
        var para={name:obj.name,parent:getPName(obj.parent),PName:getPName(obj)};       
        var attrs=[];
        for(var attrName in obj){
          if(attrName==='name')
            attrs.push({
              name:attrName,
              value:'"'+obj.name+'"',
              PnodeName:getPName(obj),
            });
          else
            if(isAttrName(attrName))
              attrs.push({
                name:attrName,
                value:obj[attrName],
                PnodeName:getPName(obj),
              });
        }
        para.attrs=attrs;
        para.extraDatas=obj.extraData;
        paras.push(para);
      }
    }
    var text_initInstance=instanceBuilder.getInstanceInit(paras);
    text=fileBuilder.insertInstanceInit(text,text_initInstance);
  
    //所有节点的父子关系
    var relations=[];
    for(var i=1;i<bottomUped.length;i++){
      for (var j=0;j<bottomUped[i].length;j++){
        var obj=bottomUped[i][j];
        var relation={name:getPName(obj)};
        var childrenName=[];
        var children=obj.children;
        for(var k=0;k<children.length;k++){
          childrenName.push(getPName(children[k]));
        }
        relation.children=childrenName;
        relations.push(relation);
      }
    }
    var text_initRelation=relationBuilder.getRelation(relations);
    text=fileBuilder.insertRelation(text,text_initRelation);
    
    var rootName=util.firstCaseUp(nodeDataObj.name);
    writeFile(text,dstPath,rootName,'cpp');
}

module.exports.buildNode=buildNode;