local Base=require "outline.outline"
local Test={}
Anims.Test=Test

local function smaller(node)
    node:setScale(node:getScale()-0.03)
end

local function resume(self)
    self.c1=self.getChild(self.node,"defaultbtn")
    self.c2=self.getChild(self.node,"dizhu")
    self.offsets_opacity[self.c1:getName()]=0
    self.offsets_opacity[self.c2:getName()]=0

    local that=self
    function update(dt)
        if(that.frameIndex==0)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==1)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==2)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==3)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==4)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==5)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==6)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==7)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==8)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==9)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==10)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==11)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==12)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==13)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==14)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==15)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==16)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==17)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==18)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==19)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==20)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==21)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==22)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==23)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==24)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==25)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==26)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==27)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        elseif(that.frameIndex==28)then
            if(that.c1)then smaller(that.c1) end
            if(that.c2)then smaller(that.c2) end
        --...
        else
            if(that.loop)then
                that.frameIndex=0
            else
                that:pause()
            end
            if(that.callback)then
                that.callback(that.key)
                if(not that.loop)then
                    that.callback=nil
                end
            end
            return
        end
        that.frameIndex=that.frameIndex+1
    end

    self.scheduleId=cc.Director:getInstance():getScheduler():scheduleScriptFunc(update,0,false)   
end

function Test:create()
    local anim=Base.createAnim()
    anim.resume=resume
    return anim
end
