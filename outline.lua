local exports={}

O={}

local Outline={}

function getFrame(framePath)
    local frame
    local sep=string.find(framePath,'%:')
    if(sep and sep>0)then
        local imageFile=string.sub(framePath,0,sep-1)
        local spriteFrameName=string.sub(framePath,sep+1)

        local cache=cc.SpriteFrameCache:getInstance()
        local dotIndex=string.find(imageFile,'%.')
        local plistFile=string.sub(imageFile,0,dotIndex)..'plist'
        if(not cache:isSpriteFramesWithFileLoaded(plistFile))then
            cache:addSpriteFrames(plistFile)
        end
        frame=cache:getSpriteFrame(spriteFrameName)
        if(not frame)then
            spriteFrameName=spriteFrameName .. '.png'
            frame=cache:getSpriteFrame(spriteFrameName)
        end
    else
        local temp=display.newSprite(framePath)
        frame=temp:getSpriteFrame()
    end
    return frame    
end

local createNode_default=function(creator,parent)
    local node
    if(creator) then
        local outline=creator.outline
        local extraData=outline.extraData
        if(extraData and extraData.isSprite)then
            local spriteFrame=extraData.spriteFrame
            local frame=getFrame(spriteFrame)
            if(frame)then
                node=cc.Sprite:createWithSpriteFrame(frame)
            else
                node=display.newNode()
            end
        elseif (extraData and extraData.isLabel) then
            node=cc.Label:createWithSystemFont("" .. extraData.label_string, "Arial", extraData.label_fontSize)
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

local UNITTYPE_PX=1
local UNITTYPE_RATE=2
local function getApplyWidget(outline)
    if(not outline.extraData)then return end
    if(not outline.extraData.hasWidget)then return end

    local function applyWidget(self,cascade)
        local parent=self:getParent()
        local child=self

        local size_parent=parent:getContentSize()--getRealSize(parent)
        local size_child=child:getContentSize()--getRealSize(child)
        local anchor_child=child:getAnchorPoint()

        local aLeft=outline.extraData.widget_ALeft
        local aRight=outline.extraData.widget_ARight
        local aBottom=outline.extraData.widget_ABottom
        local aTop=outline.extraData.widget_ATop

        local AHCenter=outline.extraData.widget_AHCenter
        local HCenter=outline.extraData.widget_HCenter
        local UHCenter=outline.extraData.widget_UHCenter

        local AVCenter=outline.extraData.widget_AVCenter
        local VCenter=outline.extraData.widget_VCenter
        local UVCenter=outline.extraData.widget_UVCenter

        if(AVCenter)then
            anchor_child.y=0.5
            child:setAnchorPoint(anchor_child)
            if(UVCenter==UNITTYPE_RATE)then
                VCenter=size_parent.height*VCenter
            end
            child:setPositionY(0.5*size_parent.height+VCenter)
        else
            local bottom=outline.extraData.widget_bottom
            local top=outline.extraData.widget_top
            local unit_bottom=outline.extraData.widget_unit_bottom
            if(unit_bottom==UNITTYPE_RATE)then
                bottom=size_parent.height*bottom
            end
            local unit_top=outline.extraData.widget_unit_top
            if(unit_top==UNITTYPE_RATE)then
                top=size_parent.height*top
            end

            if(aBottom and not aTop)then
                anchor_child.y=0
                child:setAnchorPoint(anchor_child)
                child:setPositionY(bottom)
            elseif(aBottom and aTop)then
                local newHeight=size_parent.height-top-bottom
                if(newHeight>0 and not outline.isLabel)then
                    child:setPositionY(bottom+newHeight*anchor_child.y)
                    if(outline.isSprite and not outline.extraData.slice)then
                        size_child.height=outline.extraData.widget_originHeight
                        child:setContentSize(size_child)
                        child:setScaleY(newHeight/size_child.height)
                    else
                        size_child.height=newHeight
                        child:setContentSize(size_child)
                    end
                end
            elseif(not aBottom and aTop)then
                anchor_child.y=1
                child:setAnchorPoint(anchor_child)
                child:setPositionY(size_parent.height-top)
            end
        end

        if(HCenter)then
            anchor_child.x=0.5
            child:setAnchorPoint(anchor_child)
            if(UHCenter==UNITTYPE_RATE)then
                HCenter=size_parent.height*HCenter
            end
            child:setPositionX(0.5*size_parent.width+HCenter)
        else
            local left=outline.extraData.widget_left
            local right=outline.extraData.widget_right
            local unit_left=outline.extraData.widget_unit_left
            if(unit_left==UNITTYPE_RATE)then
                left=size_parent.width*left
            end
            local unit_right=outline.extraData.widget_unit_right
            if(unit_right==UNITTYPE_RATE)then
                right=size_parent.width*right
            end
            if(aLeft and (not aRight))then
                anchor_child.x=0
                child:setAnchorPoint(anchor_child)
                child:setPositionX(left)
            elseif(aLeft and aRight)then
                local newWidth=size_parent.width-left-right
                if(newWidth>0 and not outline.isLabel)then
                    child:setPositionX(left+newWidth*anchor_child.x)
                    if(outline.isSprite and not outline.extraData.slice)then
                        size_child.width=outline.extraData.widget_originWidth
                        child:setContentSize(size_child)
                        child:setScaleX(newWidth/size_child.width)
                    else
                        size_child.width=newWidth
                        child:setContentSize(size_child)
                    end
                end
            elseif(not aLeft and aRight)then
                anchor_child.x=1
                child:setAnchorPoint(anchor_child)
                child:setPositionX(size_parent.width-right)
            end
        end

        if(cascade)then
            local children=self:getChildren()
            for k,v in pairs(children)do
                if(v.applyWidget)then
                    v:applyWidget(true)
                end
            end
        end
    end
    return applyWidget
end

function Outline:create( parent )
    local node=self.createNode(self.creator,parent)
    node:setName(self.name)
    self:reset(node)
    node.applyWidget=getApplyWidget(self)
    if(node.applyWidget)then
        node:applyWidget()
    end

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
exports.createCreator=function(outline,creator)
    creator.outline=outline
    outline.creator=creator
    creator.create=Creator.create
    creator.lastNode=Creator.lastNode
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
