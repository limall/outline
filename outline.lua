local exports={}

O={}

local Outline={}

local createNode_default=function(creator,parent)
    local node
    if(creator) then
        local outline=creator.outline
        if(outline.isSprite) then
            local imageFile=outline.imageFile
            local spriteFrameName=outline.spriteFrameName
            local cache=cc.SpriteFrameCache:getInstance()
            if(spriteFrameName)then
                local dotIndex=string.find(imageFile,'%.')
                local plistFile=string.sub(imageFile,0,dotIndex)..'plist'
                if(not cache:isSpriteFramesWithFileLoaded(plistFile))then
                    cache:addSpriteFrames(plistFile)
                end
                local frame=cache:getSpriteFrame(spriteFrameName)
                if(not frame)then
                    spriteFrameName=spriteFrameName .. '.png'
                end
            end
            if(spriteFrameName)then
                node=cc.Sprite:createWithSpriteFrameName(spriteFrameName)
            else
                node=display.newSprite(imageFile)
            end
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
    self:applyWidget(parent,node)

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

local UNITTYPE_PX=1
local UNITTYPE_RATE=2
function Outline:applyWidget(parent,child)
    local size_parent=parent:getContentSize()--getRealSize(parent)
    local size_child=child:getContentSize()--getRealSize(child)
    local anchor_child=child:getAnchorPoint()

    local verticalCenter=self.extraData.widget_VerticalCenter
    local horizontalCenter=self.extraData.widget_HorizontalCenter

    if(verticalCenter)then
        local newY=0.5*size_parent.height-(0.5-anchor_child.y)*size_child.height
        child:setPositionY(newY)
    else
        local bottom=self.extraData.widget_bottom
        local top=self.extraData.widget_top
        local unit_bottom=self.extraData.widget_unit_bottom
        if(unit_bottom==UNITTYPE_RATE)then
            bottom=size_parent.height*bottom
        end
        local unit_top=self.extraData.widget_unit_top
        if(unit_top==UNITTYPE_RATE)then
            top=size_parent.height*top
        end

        if(bottom and not top)then
            child:setPositionY(bottom+size_child.height*anchor_child.y)
        elseif(bottom and top)then
            local newHeight=size_parent.height-top-bottom
            if(newHeight>0)then
                child:setPositionY(bottom+newHeight*anchor_child.y)
                child:setScaleY(child:getScaleY()*newHeight/size_child.height)
            end
        elseif(not bottom and top)then
            child:setPositionY(size_parent.height-top-size_child.height*(1-anchor_child.y))
        end
    end

    if(horizontalCenter)then
        local newX=0.5*size_parent.width-(0.5-anchor_child.x)*size_child.width
        child:setPositionX(newX)
    else
        local left=self.extraData.widget_left
        local right=self.extraData.widget_right
        local unit_left=self.extraData.widget_unit_left
        if(unit_left==UNITTYPE_RATE)then
            left=size_parent.width*left
        end
        local unit_right=self.extraData.widget_unit_right
        if(unit_right==UNITTYPE_RATE)then
            right=size_parent.width*right
        end
        if(left and (not right))then
            child:setPositionX(left+size_child.width*anchor_child.x)
        elseif(left and right)then
            local newWidth=size_parent.width-left-right
            if(newWidth)then
                child:setPositionX(left+newWidth*anchor_child.x)
                child:setScaleX(child:getScaleX()*newWidth/size_child.width)
            end
        elseif(not left and right)then
            child:setPositionX(size_parent.width-right-size_child.width*(1-anchor_child.x))
        end
    end
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
    outline.applyWidget=Outline.applyWidget

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

function getScale(node)
    local scaleX=1
    local scaleY=1
    local parent=node
    while(parent)do
        scaleX = scaleX * parent:getScaleX()
        scaleY = scaleY * parent:getScaleY()
        parent = parent:getParent()
    end
    return scaleX,scaleY
end

function getRealSize(node)
    local realScaleX,realScaleY=getScale(node)
    local size=node:getContentSize()
    local realSize=cc.size(size.width*realScaleX,size.height*realScaleY)
    return realSize
end

return exports
