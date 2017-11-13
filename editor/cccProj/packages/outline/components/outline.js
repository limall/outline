cc.Class({
    extends: cc.Component,
    properties: {
        project_name: 'firstProject',
    },
    export:function(){
        
    },
    animations:Object,
    addAnimation:function(name,animations){
        this.animations[name]=animations;
        cc.log(name);
    }
});