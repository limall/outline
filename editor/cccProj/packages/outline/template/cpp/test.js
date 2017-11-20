var aFunc=require('./templete_rootDeclare').getRootDeclare;
console.log(aFunc({
    name:'aScene',
    attrs:[{
        name:'width',
        value:'960',
        nodeName:'aScene',
    },{
        name:'height',
        value:'640',
        nodeName:'aScene',
    }],
}));

aFunc=require('./templete_struct').getStructDefinition;
console.log(aFunc([{
    name:'aNode',
    children:[{struct:'ANode',name:'aNode'},{struct:'BNode',name:'bNode'}],
},{
    name:'aNode',
    children:[{struct:'ANode',name:'aNode'},{struct:'BNode',name:'bNode'}],
}]));

aFunc=require('./templete_initInstance').getInstanceInit;
var para=[{
    name:'aNode',
    parent:'anotherNode',
    attrs:[{
        name:'x',
        value:'1.1f',
        nodeName:'aNode',
    },{
        name:'y',
        value:'1.2f',
        nodeName:'aNode',
    }],
},{
    name:'bNode',
    parent:'bbNode',
    attrs:[{
        name:'x',
        value:'1.3f',
        nodeName:'bNode',
    },{
        name:'y',
        value:'1.4f',
        nodeName:'bNode',
    }],
}];
console.log(aFunc(para));

var aFunc=require('./templete_initOutlineRelation').getRelation;
console.log(aFunc([{
    name:'parent1',
    children:['child1','child2'],
},{
    name:'parent2',
    children:['child3','child4'],
}]));