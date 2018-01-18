var util={};

/**
 * @method util.getPath 由creator中的资源路径转为2dx的资源路径
 * @param {string} path creator中的资源路径
 * @returns {string} 适用于2dx的资源路径
 */
util.getPath=function(path){
    return path.substring(path.indexOf('/assets/')+8)
}

/**
 * @method util.getPName 获取该节点自导出节点开始的节点路径，从而获得一个唯一的名称
 * @param {"Object"} nodeData 节点数据
 * @returns {string} 包含自导出节点的完整路径的节点名称
 */
util.getPName=function(nodeData){
    var name=nodeData.name;
    while(nodeData.parent){
      name=nodeData.parent.name+'_'+name;
      nodeData=nodeData.parent;
    }
    return name;
}

module.exports=util