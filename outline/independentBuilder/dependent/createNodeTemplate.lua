--start createEditBox
local function createEditBox(extraData)
    local back=extraData.editbox_backgroundImage
    if(back)then
        local backSprite=ccui.Scale9Sprite:createWithSpriteFrame(getFrame(back))

        local width=extraData.editbox_width
        if(nil==width)then
            width=0
        end
        local height=extraData.editbox_height
        if(nil==height)then
            height=0
        end

        local editBox=ccui.EditBox:create(cc.size(width,height),backSprite)

        local inputMode=extraData.editbox_inputMode
        if(nil~=inputMode)then
            editBox:setInputMode(inputMode)
        end

        local fontSize=extraData.editbox_fontSize
        if(nil~=fontSize)then
            editBox:setFontSize(fontSize)
        end

        local colorR=extraData.editbox_fontColorR
        local colorG=extraData.editbox_fontColorG
        local colorB=extraData.editbox_fontColorB
        local colorA=extraData.editbox_fontColorA
        if(colorR~=nil or colorG~=nil or colorB~=nil or colorA~=nil)then
            if(nil==colorB)then colorB=0 end
            if(nil==colorG)then colorG=0 end
            if(nil==colorR)then colorR=0 end
            if(nil==colorA)then colorA=255 end
            local color=cc.c4b(colorR,colorG,colorB,colorA)
            editBox:setFontColor(color)
        end

        local placeholder=extraData.editbox_placeholder
        if(nil~=placeholder)then
            editBox:setPlaceHolder(placeholder)
        end

        local placeholderFontSize=extraData.editbox_placeholderFontSize
        if(nil~=placeholderFontSize)then
            editBox:setPlaceholderFontSize(placeholderFontSize)
        end

        local maxLength=extraData.editbox_maxLength
        if(nil~=maxLength)then
            editBox:setMaxLength(maxLength)
        end

        local inputFlag=extraData.editbox_inputFlag
        if(nil~=inputFlag)then
            editBox:setInputFlag(inputFlag)
        end

        return editBox
    end
end
--end createEditBox
--start progressBar
local function createProgressBar(extraData)
    local horizontal=false
    if(extraData==0)then
        horizontal=true
    end

    local percent=extraData.progressbar_progress*100
    local reverse=extraData.progressbar_reverse
    local spriteFrame=extraData.progressbar_spriteFrame

    local sprite=cc.Sprite:createWithSpriteFrame(getFrame(spriteFrame))
    local progressbar = cc.ProgressTimer:create(sprite)
    progressbar:setType(cc.PROGRESS_TIMER_TYPE_BAR)

    if(horizontal and not reverse)then
        progressbar:setMidpoint(cc.p(0,0.5))
        progressbar:setBarChangeRate(cc.p(1,0))
    elseif(not horizontal and not reverse)then
        progressbar:setMidpoint(cc.p(0.5,0))
        progressbar:setBarChangeRate(cc.p(0,1))
    elseif(horizontal and reverse)then
        progressbar:setMidpoint(cc.p(1,0.5))
        progressbar:setBarChangeRate(cc.p(1,0))
    else
        progressbar:setMidpoint(cc.p(0.5,1))
        progressbar:setBarChangeRate(cc.p(0,1))
    end

    progressbar:setPercentage(percent)

    return progressbar
end
--end progressBar
--start createLabel
local function createLabel(outline)
    local extraData=outline.extraData
    local label
    if(extraData.isLabelAtlas)then
        local startChar=extraData.labelAtlas_startChar
        local atlas=extraData.labelAtlas_atlas
        local width=extraData.labelAtlas_itemWidth
        local height=extraData.labelAtlas_itemHeight
        label=cc.LabelAtlas:_create(outline.label_string,atlas,width,height,startChar)
    elseif(extraData.label_fontName)then
        local fontsHolder=extraData.label_fontsHolder
        local fontStr=fontsHolder.. '/' ..extraData.label_fontName
        label=cc.Label:createWithTTF(outline.label_string,fontStr,outline.label_fontSize)
    else
        label = cc.Label:createWithSystemFont(outline.label_string,'Arial',outline.label_fontSize)
    end
    return label
end
--end createLabel
--start createParticleSystem
local EMITTERMODE_GRAVITY=0
local EMITTERMODE_RADIUS=1
local function createParticleSystem(extraData)
    local ps=cc.ParticleSystemQuad:create(extraData.file)
    ps:setAutoRemoveOnFinish(true)
    if(extraData.texture)then
        local temp=display.newSprite(extraData.texture)
        ps:setTexture(temp:getTexture())
    end
    if(extraData.custom)then
        ps:setEmissionRate(extraData.emissionRate)
        ps:setLife(extraData.life)
        ps:setLifeVar(extraData.lifeVar)
        ps:setDuration(extraData.duration)
        ps:setTotalParticles(extraData.totalParticles)
        ps:setStartColor(extraData.startColor)
        ps:setStartColorVar(extraData.startColorVar)
        ps:setEndColor(extraData.endColor)
        ps:setEndColorVar(extraData.endColorVar)
        ps:setAngle(extraData.angle)
        ps:setStartSize(extraData.startSize)
        ps:setEndSize(extraData.endSize)
        ps:setStartSpin(extraData.startSpin)
        ps:setEndSpin(extraData.endSpin)
        ps:setAngleVar(extraData.angleVar)
        ps:setStartSizeVar(extraData.startSizeVar)
        ps:setEndSizeVar(extraData.endSizeVar)
        ps:setStartSpinVar(extraData.startSpinVar)
        ps:setEndSpinVar(extraData.endSpinVar)
        ps:setLifeVar(extraData.lifeVar)
        ps:setSourcePosition(cc.p(extraData.sourcePosX,extraData.sourcePosY))
        ps:setPosVar(cc.p(extraData.posVarX,extraData.posVarY))

        local temp=extraData.positionType
		local positionType = cc.POSITION_TYPE_FREE
		if (temp == 2)then
			positionType = cc.POSITION_TYPE_RELATIVE;
		elseif (temp == 3)then
			positionType = cc.POSITION_TYPE_GROUPED;
        end
		ps:setPositionType(positionType) 
		ps:setEmitterMode(extraData.emitterMode);

        if(extraData.emitterMode==EMITTERMODE_GRAVITY)then
            ps:setSpeed(extraData.speed)
            ps:setSpeedVar(extraData.speedVar)
            ps:setTangentialAccel(extraData.tangentialAccel)
            ps:setTangentialAccelVar(extraData.tangentialAccelVar)
            ps:setRadialAccel(extraData.radialAccel)
            ps:setRotationIsDir(extraData.rotationIsDir)
            ps:setGravity(cc.p(extraData.gravityX,extraData.gravityY))
        elseif(extraData.emitterMode==EMITTERMODE_RADIUS)then
            ps:setStartRadius(extraData.startRadius)
			ps:setStartRadiusVar(extraData.startRadiusVar)
			ps:setEndRadius(extraData.endRadius)
			ps:setEndRadiusVar(extraData.endRadiusVar);
			ps:setRotatePerSecond(extraData.rotatePerS);
			ps:setRotatePerSecondVar(extraData.rotatePerSVar);
        end
    end
    return ps
end
--end createParticleSystem
--start processBtn
local function processBtn(node,extraData)
    local btnFactory=require "outline.BtnFactory"
    local buttonType=extraData.buttonType

    local image_disabled=extraData.image_disabled
    if(image_disabled)then
        node.image_disabled=image_disabled
    end

    local image_normal=extraData.image_normal
    if(image_normal)then
        node.image_normal=image_normal
    end

    local image_pressed=extraData.image_pressed
    if(image_pressed)then
        node.image_pressed=image_pressed
    end

    function node:setEnabled(clickAble)
        if(clickAble)then
            self.btn_isDisabled=false
            if(self.image_normal)then
                self:setSpriteFrame(getFrame(self.image_normal))
            end
        else
            self.btn_isDisabled=true
            if(self.image_disabled)then
                self:setSpriteFrame(getFrame(self.image_disabled))
            end
        end
        return self
    end

    if(buttonType==btnFactory.BUTTONTYPE_SCALE)then
        btnFactory.processScaleBtn(node)
    elseif(buttonType==btnFactory.BUTTONTYPE_COLOR)then
        btnFactory.processColorBtn(node)
    elseif(buttonType==btnFactory.BUTTONTYPE_SPRITE)then
        btnFactory.processSpriteBtn(node)
    elseif(buttonType==btnFactory.BUTTONTYPE_SELECT)then
        btnFactory.processSelectBtn(node)
    end
end
--end processBtn
--start main
local function createSprite(outline)
    local extraData=outline.extraData
    local spriteFrame=outline.spriteFrame
    local index=string.find(spriteFrame,'splash.png')
    if(index)then
        return
    end
    local frame=getFrame(spriteFrame)
    if(not frame)then
        return
    end
    if(extraData and extraData.slice)then
        local scale9
        scale9=cc.Scale9Sprite:createWithSpriteFrame(frame)
        scale9:setInsetBottom(extraData.insetBottom)
		scale9:setInsetLeft(extraData.insetLeft)
		scale9:setInsetRight(extraData.insetRight)
		scale9:setInsetTop(extraData.insetTop)
        return scale9
    else
        return cc.Sprite:createWithSpriteFrame(frame)
    end
end

local function createNode(creator,parent)
    local outline=creator.outline
    local node
    local extraData=outline.extraData
    if(extraData)then 
        local isProgressBar=outline.extraData.isProgressBar
        if(isProgressBar)then
            node=createProgressBar(outline.extraData)
        end
    end
    local isSprite=outline.isSprite
    if(isSprite)then
        node=createSprite(outline)
    end
    local isLabel=outline.isLabel
    if(isLabel)then
        node=createLabel(outline)
    end
    if(extraData and extraData.isEditBox)then
        local createEditBox=require "outline.createEditBox"
        node=createEditBox(extraData)
    end
    if(extraData and extraData.particleSystem)then
        node=createParticleSystem(extraData)
    end
    if(not node)then
        node=display.newNode()
    end
    if(extraData and extraData.buttonType)then
        processBtn(node,extraData)
    end
    if(parent)then
        parent:addChild(node)
    end
    return node
end
--end main