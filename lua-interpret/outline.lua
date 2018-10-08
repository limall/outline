outline_global={}

function outline_global.init(src)
    local btnsrc=src..'BtnFactory'
    require (btnsrc)
    local createNodeSrc=src..'createNode'
    require (createNodeSrc)
end

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

        frame=cache:getSpriteFrame(spriteFrameName)
        if(not frame)then
            if(string.find(spriteFrameName,'%.png')==nil)then
                spriteFrameName=spriteFrameName .. '.png'
                frame=cache:getSpriteFrame(spriteFrameName)
            end
            if(not frame)then
                cache:addSpriteFrames(plistFile)
                frame=cache:getSpriteFrame(spriteFrameName)
            end
        end
    else
        local texture=cc.Director:getInstance():getTextureCache():addImage(framePath)
        local rect=cc.rect(0,0,texture:getPixelsWide(),texture:getPixelsHigh())
        frame=cc.SpriteFrame:createWithTexture(texture,rect)
    end
    return frame    
end

local UNITTYPE_PX=1
local UNITTYPE_RATE=2
local function getApplyWidget(outline)
    if(not outline.extraData)then return end
    if(not outline.extraData.hasWidget)then return end

    local function applyWidget(self,cascade)
        local parent=self:getParent()
        local child=self

        local size_parent=parent:getContentSize()
        local size_child=child:getContentSize()
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

local function processBtn(node,extraData)
    node.needSwallowTouch=extraData.btn_needSwallowTouch
    node.cancelWhenScroll=extraData.btn_cancelWhenScroll

    local buttonType=extraData.btn_buttonType

    local image_disabled=extraData.btn_image_disabled
    if(image_disabled)then
        node.image_disabled=image_disabled
    end

    local image_normal=extraData.btn_image_normal
    if(image_normal)then
        node.image_normal=image_normal
    end

    local image_pressed=extraData.btn_image_pressed
    if(image_pressed)then
        node.image_pressed=image_pressed
    end

    function node:setEnabled(enable)
        if(enable)then
            self.btn_isDisabled=false
            if(self.image_normal)then
                setSPF(self,self.image_normal)
            end
        else
            self.btn_isDisabled=true
            if(self.image_disabled)then
                setSPF(self,self.image_disabled)
            end
        end
        return self
    end

    if(buttonType==outlineprivate_btnFactory.BUTTONTYPE_SCALE)then
        outlineprivate_btnFactory.processScaleBtn(node)
    elseif(buttonType==outlineprivate_btnFactory.BUTTONTYPE_COLOR)then
        outlineprivate_btnFactory.processColorBtn(node)
    elseif(buttonType==outlineprivate_btnFactory.BUTTONTYPE_SPRITE)then
        outlineprivate_btnFactory.processSpriteBtn(node)
    elseif(buttonType==outlineprivate_btnFactory.BUTTONTYPE_SELECT)then
        outlineprivate_btnFactory.processSelectBtn(node)
    elseif(buttonType==outlineprivate_btnFactory.BUTTONTYPE_NONE)then
        outlineprivate_btnFactory.processNoneBtn(node)
    end

    if(extraData.btn_enableAutoGrayEffect)then
        outlineprivate_btnFactory.autoGray(node)
    end
end

function Outline:create( parent )
    local node=self.createNode(self.creator,parent)
    node:setName(self.name)
    self:reset(node)
    if(parent)then
        parent:addChild(node)
    end

    node.applyWidget=getApplyWidget(self)
    if(node.applyWidget)then
        node:applyWidget()
    end

    if(self.extraData and self.extraData.btn_buttonType)then
        processBtn(node,self.extraData)
    end

    if(self.children and not node.isListview)then
        for index,child in pairs(self.children)do
            child:create(node)
        end
    end
    self.lastNode=node

    return node
end

function Outline:reset( node , cascade )    
    node:setPosition(self.x,self.y)
    if (self.width>0 and self.height>0)then
        node:setContentSize(self.width,self.height);
    end
    node:setAnchorPoint(cc.p(self.anchorX, self.anchorY));
    node:setScaleX(self.scaleX);
    node:setScaleY(self.scaleY);
    node:setRotation(self.rotation);
    node:setOpacity(self.opacity);
    node:setVisible(self.visible);
    node:setLocalZOrder(self.zOrder);
    node:setSkewX(self.skewX)
    node:setSkewY(self.skewY)
    node:setColor(cc.c3b(self.colorR, self.colorG, self.colorB));
    if(cascade)then
        if(self.children)then
            for index,child in pairs(self.children)do
                if(child.lastNode)then
                    child:reset(child.lastNode,cascade)
                end
            end
        end
    end
end


outline_global.createOutline=function(nodeInfo)
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
        skewX=0,
        skewY=0,
        opacity=255,
        visible=true,
        zOrder=0,
        colorR=255,
        colorG=255,
        colorB=255
    }

    outline.lastNode=nil
    outline.createNode=outlineprivate_createNode
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

function Creator:create(parent,withComponents)
    local node=self.outline:create(parent)
    if(withComponents)then
        if(self._components)then
            for k,v in pairs(self._components)do
                node[v]={}
                for key,value in pairs(self[v])do
                    node[v][key]=value
                end
            end
        end
    end
    return node
end
function Creator:lastNode()
    return self.outline.lastNode
end
outline_global.createCreator=function(outline,creator)
    creator.outline=outline
    outline.creator=creator
    creator.create=Creator.create
    creator.lastNode=Creator.lastNode
end

function addX(node,addx)
    if(node)then
        node:setPositionX(node:getPositionX()+addx)
    end
end

function addY(node,addy)
    if(node)then
        node:setPositionY(node:getPositionY()+addy)
    end
end

function addScaleX(node,addscalex)
    if(node)then
        node:setScaleX(node:getScaleX()+addscalex)
    end
end

function addScaleY(node,addscaley)
    if(node)then
        node:setScaleY(node:getScaleY()+addscaley)
    end
end

function addSize(node,addwidth,addheight)
    if(node)then
        local size=node:getContentSize()
        size.width=size.width+addwidth
        size.height=size.height+addheight
        node:setContentSize(size)
    end
end

function addAnchor(node,x,y)
    if(node)then
        local anchor=node:getAnchorPoint()
        anchor.x=anchor.x+x
        anchor.y=anchor.y+y
        node:setAnchorPoint(anchor)
    end
end

function addRotation(node,addrotation)
    if(node)then
        node:setRotation(node:getRotation()+addrotation)
    end
end

function addColor(node,r,g,b)
    if(node)then
        local color=node:getColor()
        color.r=color.r+r
        color.g=color.g+g
        color.b=color.b+b
        node:setColor(color)
    end
end

function setSpriteFrame(node,frame)
    if(node)then
        setSPF(node,frame)
    end
end

function addOpacity(node,addOpacity)
    local newOpacity=node:getOpacity()+addOpacity
    if(newOpacity>255)then
        newOpacity=255
    elseif(newOpacity<0)then
        newOpacity=0
    end
    if(node) then node:setOpacity(newOpacity) end
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

outline_global.createAnim=function()
    local anim={}
    anim.frameIndex=0
    anim.getChild=getChild
    anim.whenFrameEnd=whenFrameEnd;
    anim.pause=pause
    anim.play=play
    anim.stop=stop
    return anim
end

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

function setSPF(sp,spf)
    local spType=tolua.type(sp)
    if(spType=="ccui.Scale9Sprite")then
        sp:setSpriteFrame(getFrame(spf),sp:getCapInsets())
    else
        sp:setSpriteFrame(getFrame(spf))
    end
end

Vec2=cc.p;
Color=cc.c4b;
Size=cc.size;
