//用于记录node在每一帧的状态
function Status(node){
    this.x=node.x;
    this.y=node.y;
    this.scaleX=node.scaleX;
    this.scaleY=node.scaleY;
    this.rotation=node.rotation;
    this.width=node.width;
    this.height=node.height;
    this.colorR=node.color.getR();
    this.colorG=node.color.getG();
    this.colorB=node.color.getB();
    this.opacity=node.opacity;
    this.anchorX=node.anchorX;
    this.anchorY=node.anchorY;
    this.skewX=node.skewX;
    this.skewY=node.skewY;
    var sprite=node.getComponent(cc.Sprite);
    if(sprite){
        this.spriteFrame=sprite.spriteFrame;
    }
}

//用于对得到的increment进行校验修正
function Proofread(){
    this.keyIncrements=[];
    this.add=function(incrementIndex,proofread){
        this.keyIncrements.push({
            keyIndex:incrementIndex,
            proofread:proofread
        });
    };
    this.proofread=function(increments,propName){
        //先把静止帧定义为0
        for(var i=0;i<increments.length;i++){
            increments[i][propName]=increments[i][propName]||0;
        }
        //先计算偏差
        var keyIncrements=this.keyIncrements;
        var i=0,j=0;
        //排除静止帧
        while(i<increments.length&&increments[i][propName]===0){
            i++;
            j++;
        }
        for(var ii=0;ii<keyIncrements.length;ii++){
            var keyIndex=keyIncrements[ii].keyIndex;
            var proofread=keyIncrements[ii].proofread;
            var oldIncrement=0;
            for(;i<=keyIndex;i++){
                oldIncrement+=increments[i][propName];
            }
            var totalOffset=proofread-oldIncrement;
            //再进行线性修正,并取近似值
            var numOfIncrement=i-j;
            var eachOffset=totalOffset/numOfIncrement;
            var roundOffset=0;
            for(;j<=keyIndex;j++){
                increments[j][propName]=increments[j][propName]+eachOffset;
                var temp=increments[j][propName]+roundOffset;
                temp=temp*100000;
                temp=Math.round(temp);
                temp=temp/100000;
                roundOffset=increments[j][propName]-temp;
                increments[j][propName]=temp;
            }
        }
    };
    this.proofreadInt=function(increments,propName){
        //先把静止帧定义为0
        for(var i=0;i<increments.length;i++){
            increments[i][propName]=increments[i][propName]||0;
        }
        //先进行四舍五入
        for(var i=0;i<increments.length;i++){
            increments[i][propName]=Math.round(increments[i][propName]);
        }
        //再计算四舍五入后，与校验值的偏差
        var keyIncrements=this.keyIncrements;
        var i=0,j=0;
        //排除静止帧
        while(increments[i][propName]===0&&i<increments.length){
            i++;
            j++;
        }
        for(var ii=0;ii<keyIncrements.length;ii++){
            var keyIndex=keyIncrements[ii].keyIndex;
            var proofread=keyIncrements[ii].proofread;
            var oldIncrement=0;
            for(;i<=keyIndex;i++){
                oldIncrement+=increments[i][propName];
            }
            var totalOffset=proofread-oldIncrement;
            //将偏差的修正值线性分配到各个值中（从后先前）
            var numOfIncrement=i-j;
            if(totalOffset!=0){
                var eachOffset=totalOffset>0?1:-1;
                var absolute=totalOffset;
                if(absolute<0)
                    absolute=-absolute;
                var reduce=parseInt(numOfIncrement/absolute);
                var k=keyIndex;
                while(absolute>0){
                    increments[k][propName]=increments[k][propName]+eachOffset;
                    k-=reduce;
                    absolute--;
                }
            }
            j=i;
        }
        var increment=0;
        for(var i=0;i<increments.length;i++){
            increment+=increments[i][propName]
        }
    };
}

//针对一个node的录制实例（有时候动画会包含节点对象的多个子节点）,这里姑且称之为节点动画
function AnimNode(node,nodePath){
    this.name=nodePath;
    this.node=node;
    this.statuses=[];
    this.increments=[];

    //初始化校验，注意这里不会校验position,另外color也会分解
    this.getProofread=function(props,sample){
        this.proofreads={};
        for(var propName in props){
            if(propName=='color'){
                var rgb=['r','g','b'];
                var color=props.color;
                if(color.length>1){
                    rgb.forEach(function(suffix){
                        var proofreadobj=this.proofreads[propName+suffix.toUpperCase()]=new Proofread();
                        for(var i=1;i<color.length;i++){
                            var preKeyFrame=color[i-1];
                            var keyFrame=color[i];
                            var keyIndex=Math.round(sample*keyFrame.frame)-2;
                            var proofread=keyFrame.value[suffix]-preKeyFrame.value[suffix];
                            proofreadobj.add(keyIndex,proofread);
                        }
                    });
                }
            }else if(propName=='position'){
                var position=props.position;
                if(position.length>1){
                    var proofreadobjx=this.proofreads.x=new Proofread();
                    var proofreadobjy=this.proofreads.y=new Proofread();
                    for(var i=1;i<position.length;i++){
                        var preKeyFrame=position[i-1];
                        var keyFrame=position[i];
                        var keyIndex=Math.round(sample*keyFrame.frame)-2;
                        var proofreadx=keyFrame.value[0]-preKeyFrame.value[0];
                        var proofready=keyFrame.value[1]-preKeyFrame.value[1];
                        proofreadobjx.add(keyIndex,proofreadx); 
                        proofreadobjy.add(keyIndex,proofready);
                    }
                }
            }else{
                var prop=props[propName];
                if(prop.length>1){
                    var proofreadobj=this.proofreads[propName]=new Proofread();
                    for(var i=1;i<prop.length;i++){
                        var preKeyFrame=prop[i-1];
                        var keyFrame=prop[i];
                        var keyIndex=Math.round(sample*keyFrame.frame)-2;
                        var proofread=keyFrame.value-preKeyFrame.value;
                        proofreadobj.add(keyIndex,proofread);
                    }
                }
            }
        }
    }
}

cc.Class({
    extends: cc.Animation,
    properties: {
        //是否导出独立动画
        independent:true,
        namespace:{
            default:'Anims',
            tooltip:'导出的动画所挂载的全局变量名'
        },
    },
    onLoad:function(){
        //标记动画播完
        var that=this;
        this.on('finished',function(){
            that.last=true;
        });
    },
    getIncrements:function(){
        for(var i=0;i<this.animNodes.length;i++){
            var animNode=this.animNodes[i];
            var node=animNode.node;
            var statuses=animNode.statuses;
            var increments=animNode.increments;
            var haveSpriteFrame=false;
            for(var j=1;j<statuses.length;j++){
                var status=statuses[j];
                var preStatus=statuses[j-1];
                var increment={};
                for(var propName in preStatus){
                    var preProp=preStatus[propName];
                    var prop=status[propName];
                    if(preProp!=prop){
                        if(propName==='spriteFrame'){
                            haveSpriteFrame=true;
                            increment[propName]=prop;
                        }else{
                            var value;
                            var temp=value=prop-preProp;
                            if(temp<0)temp=-temp;
                            if(temp>0.000005)
                                increment[propName]=value;
                        }
                    }
                }
                increments.push(increment);
            }

            //矫正帧数
            var numOfFrame=this.clip.sample*this.clip._duration-1;
            if(increments.length>numOfFrame){
                var head=true;
                while(increments.length!=numOfFrame){
                    if(head){
                        increments.shift();
                        head=false;
                    }else{
                        increments.pop();
                        head=true;
                    }
                }
            }else if(increments.length<numOfFrame){
                while(increments.length!=numOfFrame){
                    increments.push({});
                }
            }

            var proofreads=animNode.proofreads;
            for(var propName in proofreads){
                var proofread=proofreads[propName];
                if(propName==='opacity'||propName==='colorR'||propName==='colorG'||propName==='colorB'){
                    proofread.proofreadInt(increments,propName);
                }else{
                    proofread.proofread(increments,propName);
                }
            }

            var totalIncrement=0;
            for(var i=0;i<increments.length;i++){
                totalIncrement+=increments[i].x;
            }
            cc.log(this.node.x+','+totalIncrement);

            if(haveSpriteFrame){
                var increment={
                    spriteFrame:statuses[0].spriteFrame
                };
                this.animNodes[i].increments.splice(0, 0, increment);
            }
        }

        for(var i=0;i<this.animNodes.length;i++){
            delete this.animNodes[i].node;
            delete this.animNodes[i].statuses;
            delete this.animNodes[i].getProofread;
            delete this.animNodes[i].proofreads;
        }
        if(this.autoRecorder){
            this.animNodes.independent=this.independent;
            this.autoRecorder.getData({
                independent:this.independent,
                animNodes:this.animNodes,
                namespace:this.namespace
            });
        }
    },
    update:function(dt){
        if(!this.recordable)
            return;
        
        if(this.frameIndex>0){
            for(var i=0;i<this.animNodes.length;i++){
                var node=this.animNodes[i].node;
                var status=new Status(node);
                this.animNodes[i].statuses.push(status);
            }
        }

        this.frameIndex++;

        //动画播完后处理录制的数据
        if(this.last){
            this.recordable=false;
            this.getIncrements();
        }
    },
    //初始化并开始录制
    startRecord:function(clip,autoRecorder){
        this.recordable=true;
        this.clip=clip;
        var clipName=clip.name;
        this.last=false;
        this.autoRecorder=autoRecorder;
        this.animNodes=[new AnimNode(this.node,'/')];
        this.animNodes[0].getProofread(clip.curveData.props,clip.sample);
        this.frameIndex=0;

        //从clip中找出涉及的动画子节点
        var paths=clip.curveData.paths;
        if(paths){
            for(var propName in paths){
                var prop=paths[propName];
                var node=cc.find(propName,this.node);
                if(node){
                    var animNode=new AnimNode(node,propName);
                    animNode.getProofread(prop.props,clip.sample);
                    this.animNodes.push(animNode);
                }
            }
        }
        this.play(clipName);
    },
    //一个动画所包含的所有节点动画的集合，也包括一些传给控制类的设置信息
    animNodes:null,
    //动画录制控制类的引用
    autoRecorder:null,
    //标记动画播放结束
    last:false,
    //动画处在第几帧
    frameIndex:0,
    //正在录制的剪辑对象
    clip:null,
    recordable:false 
});
