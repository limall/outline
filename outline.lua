local exports={}

O={}

local Outline={}

local createNode_default=function(creator,parent)
    local node
    if(creator) then
        local outline=creator.outline
        if(outline.isSprite) then
            node=display.newSprite(outline.imageFile)
        elseif (outline.isLabel) then
            node=cc.Label:createWithSystemFont(outline.label_string, "Arial", outline.label_fontSize)
        else
            node=display.newNode()
        end
    else
        node=display.newNode()
    end
    if(parent) then
        parent:addChild(node)
    end
    return node
end

function Outline:create( parent )
    local node=self.createNode(self.creator,parent)
    node:setName(self.name)
    self:reset(node)
    if(self.children)then
        for index,child in pairs(self.children)do
            child:create(node)
        end
    end
    self.lastNode=node
    return node
end

function Outline:reset( node )    
    node:setPosition(self.x,self.y)
    if (self.width>0 and self.height>0)then
        node:setContentSize(self.width,self.height);
    end
    node:setAnchorPoint(self.anchorX, self.anchorY);
    node:setScaleX(self.scaleX);
    node:setScaleY(self.scaleY);
    node:setRotation(self.rotation);
    node:setOpacity(self.opacity);
    node:setVisible(self.visible);
    node:setLocalZOrder(self.zOrder);
    node:setColor(cc.c3b(self.colorR, self.colorG, self.colorB));
end

exports.createOutline=function(nodeInfo)
    local outline={
        name="undefine",
        x=0,
        y=0,
        scaleX=1,
        scaleY=1,
        width=0,
        height=0,
        anchorX=0.5,
        anchorY=0.5,
        rotation=0,
        opacity=255,
        visible=true,
        zOrder=0,
        colorR=255,
        colorG=255,
        colorB=255
    }

    outline.lastNode=nil
    outline.createNode=createNode_default
    outline.create=Outline.create
    outline.reset=Outline.reset

    if(nodeInfo) then
        for k,v in pairs(nodeInfo)do
            outline[k]=v
        end
    end

    return outline
end

local Creator={}

function Creator:create(parent)
    return self.outline:create(parent)
end
function Creator:lastNode()
    return self.outline.lastNode
end
exports.createCreator=function(outline)
    local creator={}
    creator.outline=outline
    outline.creator=creator
    creator.create=Creator.create
    creator.lastNode=Creator.lastNode
    return creator
end

Anims={}

local function getIntPart(x)
    if x <= 0 then
        return math.ceil(x)
    end

    if math.ceil(x) == x then
        x = math.ceil(x)
    else
        x = math.ceil(x) - 1
    end
    return x
end

--private
local function addOpacity(self,node,opacityi,key)
    opacityi=opacityi+self.offsets_opacity[key]
    local trueAdd=getIntPart(opacityi)

    local opacity=node:getOpacity()
    local newOpacity=opacity+trueAdd
    if(newOpacity>255)then
        newOpacity=255
    elseif(newOpacity<0)then
        newOpacity=0
    end
    trueAdd=newOpacity-opacity
    self.offsets_opacity[key]=opacityi-trueAdd
    node:setOpacity(newOpacity)
end

--private
local function getChild(parent,...)
    local child=parent
    for index,name in ipairs{...}do
        child=child:getChildByName(name)
    end
    return child
end

local function pause(self)
    cc.Director:getInstance():getScheduler():unscheduleScriptEntry(self.scheduleId)
end

local function stop(self)
    self:pause()
    self=nil
end

--private
local function play(self,node,loop,callback,key)
    self.callback=callback
    self.node=node
    self.loop=loop
    self.frameIndex=0
    self.key=key
    if(node)then
        self.played=true
        self:resume()
    end
end

local function whenFrameEnd(self)
    if(self.loop)then
        self.frameIndex=0
    else
        self:pause()
    end
    if(self.callback)then
        self.callback(self.key)
        if(not self.loop)then
            self.callback=nil
        end
    end
end

exports.createAnim=function()
    local anim={}
    anim.offsets_opacity={}
    anim.frameIndex=0
    anim.scheduleId=nil
    anim.mainNode=nil
    anim.played=false
    anim.loop=false
    anim.callback=nil

    anim.addOpacity=addOpacity
    anim.getChild=getChild
    anim.whenFrameEnd=whenFrameEnd;
    anim.pause=pause
    anim.play=play
    anim.stop=stop
    return anim
end

Vec2=cc.p;

return exports
