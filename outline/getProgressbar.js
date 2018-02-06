var spriteSource=require('./getSpriteFrame');
function getProgressBar(progressbar){
    var str='';
    if(progressbar){
        str+='isProgressBar:true%o__%'
        str+='progressbar_spriteFrame:'+spriteSource.getSpriteFrame(progressbar.barSprite)+'%o__%';
        str+='progressbar_mode:'+progressbar.mode+'%o__%';
        str+='progressbar_totalLength:'+progressbar.totalLength+'%o__%';
        str+='progressbar_progress:'+progressbar.progress+'%o__%';
        str+='progressbar_reverse:'+progressbar.reverse+'%o__%';
    }
    return str;
}