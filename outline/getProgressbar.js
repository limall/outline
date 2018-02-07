var spriteSource=require('./spriteSource');
function getProgressBar(progressbar){
    var str='';
    if(progressbar){
        str+='isProgressBar:true%o__%';
        var spriteFrame=spriteSource.getSpriteFrame(progressbar.barSprite.spriteFrame);
        str+='progressbar_spriteFrame:'+spriteFrame+'%o__%';
        str+='progressbar_mode:'+progressbar.mode+'%o__%';
        str+='progressbar_progress:'+progressbar.progress+'%o__%';
        if(progressbar.reverse)
            str+='progressbar_reverse:'+progressbar.reverse+'%o__%';
    }
    return str;
}
module.exports=getProgressBar;