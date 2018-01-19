//把所有node整理进有层次的二维数组
function sort(obj){
    var pre=[obj];
    var sorted=[pre];
    while(pre.length>0){
        var thisLevel=[];
        for(var i=0;i<pre.length;i++){
            var children=pre[i].children;
            var id=-1;
            var hasName=[];
            function getNewName(originName){
                for(var k=0;k<hasName.length;k++){
                    if(hasName[k]===originName){
                        id++;
                        return 'c'+id;
                    }
                }
                hasName.push(originName);
                return originName;
            }
            for(var j=0;j<children.length;j++){
                var child=children[j];
                child.name=getNewName(child.name);
                child.parent=pre[i];
                thisLevel.push(child);
            }
        }
        pre=thisLevel;
        if(thisLevel.length>0)
            sorted.push(thisLevel);
    }
    return sorted;
};

module.exports.sort=sort;

module.exports.getArray=function(obj){
    var sorted=sort(obj);
    var array=[];
    sorted.forEach(function(outlines){
        outlines.forEach(function(outline){
            array.push(outline);
        });
    });
    return array;
}

module.exports.bottomUp=(sorted)=>{
    var newSorted=[];
    for(var i=sorted.length-1;i>=0;i--){
        newSorted.push(sorted[i]);
    }
    return newSorted;
};