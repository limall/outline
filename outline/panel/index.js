var ids=[];
var ruleNames=[];
function getId(ruleName){
    var id=ids.length;
    ids.push(id);
    ruleNames.push(ruleName);
    return id;
}
function getHtml(ruleName,src,dst){
    var html='<p><input type="checkbox" id="'+getId(ruleName)+'">'+ruleName+'&nbsp src='+src+'&nbsp dst='+dst+'</input></p>';
    console.log(html);
    return html;
}
var rulesNode=document.getElementById('rules');

function initData(data){
    ids=[];
    ruleNames=[];
    var html='';
    for(var i=0;i<data.length;i++){
        var obj=data[i];
        html+=getHtml(obj.ruleName,obj.src,obj.dst);
    }
    rulesNode.innerHTML=html;
}

function getData(){
    Editor.Ipc.sendToMain('outline:getRuleName',function(data){
        if(data){
            data=JSON.parse(data);
            initData(data);
        }
    });
}

getData();
window.onfocus=function(){
    window.onfocus=function(){
        getData();
    }
}

var btn_export = document.getElementById('export');
btn_export.addEventListener('click', () => {
    var selected=[];
    for(var i=0;i<ids.length;i++){
        var id=ids[i];
        var checkboxNode=document.getElementById(id);
        if(checkboxNode.checked)
            selected.push(ruleNames[i]);
    }
    if(selected.length>0)
        Editor.Ipc.sendToMain('outline:export-node',JSON.stringify(selected));
    else
        Editor.error('pelease select an export rule');
});

var btn_selectAll=document.getElementById('selectAll');
btn_selectAll.addEventListener('click', () => {
    for(var i=0;i<ids.length;i++){
        var id=ids[i];
        var checkboxNode=document.getElementById(id);
        checkboxNode.checked=true;
    }
});