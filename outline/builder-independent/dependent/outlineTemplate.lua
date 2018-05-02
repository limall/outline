--start widget
local UNITTYPE_PX=1
local UNITTYPE_RATE=2
local function getApplyWidget(outline)
    if(not outline.extraData)then return end

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
--end widget

--start head
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
--end head
--start main
local Outline={}
function Outline:create( parent )
    local node=self.createNode(self.creator,parent)
    node:setName(self.name)
    self:reset(node)
    if(getApplyWidget)then
        node.applyWidget=getApplyWidget(self)
    end
    if(node.applyWidget)then
        node:applyWidget()
    end

    if(self.extraData and self.extraData.buttonType)then
        processBtn(node,self.extraData)
    end

    if(self.children and not node.isListView)then
        for index,child in pairs(self.children)do
            child:create(node)
        end
    end
    self.lastNode=node

    if(parent)then
        parent:addChild(node)
    end

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

local createOutline=function(nodeInfo)
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
    outline.createNode=createNode
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
local createCreator=function(outline,creator)
    creator.outline=outline
    outline.creator=creator
    creator.create=Creator.create
    creator.lastNode=Creator.lastNode
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
--end main