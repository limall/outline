Editor.Ipc.sendToMain('outline:getRuleName',function(data){
    var ruleNames=JSON.parse(data);
    let btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
        let ruleName = document.getElementById('input-ruleName').value;
        var hasRule=false;
        for(var i=0;i<ruleNames.length;i++){
            Editor.log(ruleNames[i]);
            if(ruleNames[i]==ruleName){
                hasRule=true;
                break;
            }
        }
        if(hasRule)
            Editor.Ipc.sendToMain('outline:export-node',ruleName);
        else
            Editor.error('can not find the export rule with name "'+ruleName+'"');
    });
});