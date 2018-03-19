--start anim-x
local function addX(node,addx)
    if(node)then
        node:setPositionX(node:getPositionX()+addx)
    end
end
--end anim-x

--start anim-y
local function addY(node,addy)
    if(node)then
        node:setPositionY(node:getPositionY()+addy)
    end
end
--end anim-y

--start anim-scaleX
local function addScaleX(node,addscalex)
    if(node)then
        node:setScaleX(node:getScaleX()+addscalex)
    end
end
--end anim-scaleX

--start anim-scaleY
local function addScaleY(node,addscaley)
    if(node)then
        node:setScaleY(node:getScaleY()+addscaley)
    end
end
--end anim-scaleY

--start anim-size
local function addSize(node,addwidth,addheight)
    if(node)then
        local size=node:getContentSize()
        size.width=size.width+addwidth
        size.height=size.height+addheight
        node:setContentSize(size)
    end
end
--end anim-size

--start anim-anchor
local function addAnchor(node,x,y)
    if(node)then
        local anchor=node:getAnchorPoint()
        anchor.x=anchor.x+x
        anchor.y=anchor.y+y
        node:setAnchorPoint(anchor)
    end
end
--end anim-anchor

--start anim-rotation
local function addRotation(node,addrotation)
    if(node)then
        node:setRotation(node:getRotation()+addrotation)
    end
end
--end anim-rotation

--start anim-color
local function addColor(node,r,g,b)
    if(node)then
        local color=node:getColor()
        color.r=color.r+r
        color.g=color.g+g
        color.b=color.b+b
        node:setColor(color)
    end
end
--end anim-color

--start anim-frame
local function getFrame(framePath)
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
local function setSpriteFrame(node,frame)
    if(node)then
        frame=getFrame(frame)
        node:setSpriteFrame(frame)
    end
end
--end anim-frame

--start anim-opacity
local function addOpacity(node,addOpacity)
    local newOpacity=node:getOpacity()+addOpacity
    if(newOpacity>255)then
        newOpacity=255
    elseif(newOpacity<0)then
        newOpacity=0
    end
    if(node) then node:setOpacity(newOpacity) end
end
--end anim-opacity

--start anim-base
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

local createAnim=function()
    local anim={}
    anim.frameIndex=0
    anim.getChild=getChild
    anim.whenFrameEnd=whenFrameEnd;
    anim.pause=pause
    anim.play=play
    anim.stop=stop
    return anim
end
--end anim-base