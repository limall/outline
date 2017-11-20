var fs=require('fs');
function Builder(){
    this.text=fs.readFileSync('./templete_struct.hpp').toString();
    this.setName=(name)=>{
        this.text=this.text.replace(/\/\*outline_nodeName\*\//g,name);
    };
    this.setChildren=(children)=>{
        var childrenText='';
        children.forEach((child)=>{
            childrenText+='    '+child.struct+' *'+child.name+';\n';
        });
        this.text=this.text.replace(/\/\*children\*\//g,childrenText);
    };
}