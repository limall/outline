--start createEditBox
local function createEditBox(outline)
    local extraData=outline.extraData

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

        local color=extraData.editbox_fontColor
        if(nil ~=color )then
            editBox:setFontColor(color)
        end

        local str=extraData.editbox_string
        if(nil ~= str)then
            editBox:setText('' .. str)
        end

        local placeholder=extraData.editbox_placeholder
        if(nil~=placeholder)then
            editBox:setPlaceHolder('' .. placeholder)
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
local function createProgressBar(outline)
    local extraData=outline.extraData

    local horizontal=false
    if(extraData.progressbar_mode==0)then
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
    local label_string
    if(nil~=extraData.label_string)then
        label_string='' .. extraData.label_string
    else 
        label_string=''
    end
    if(extraData.isLabelAtlas)then
        local startChar=extraData.labelAtlas_startChar
        local atlas=extraData.labelAtlas_atlas
        local width=extraData.labelAtlas_itemWidth
        local height=extraData.labelAtlas_itemHeight
        label=cc.LabelAtlas:_create(label_string,atlas,width,height,startChar)
    elseif(extraData.label_fontName)then
        local fontsHolder=extraData.label_fontsHolder
        local fontStr
        if(nil ~= fontsHolder)then
            fontStr=fontsHolder.. '/' ..extraData.label_fontName
        else
            fontStr=extraData.label_fontName
        end
        label=cc.Label:createWithTTF(label_string,fontStr,extraData.label_fontSize)
    else
        label = cc.Label:createWithSystemFont(label_string,'Arial',extraData.label_fontSize)
    end
    return label
end
--end createLabel
--start createParticleSystem
local EMITTERMODE_GRAVITY=0
local EMITTERMODE_RADIUS=1
local function createParticleSystem(outline)
    local extraData=outline.extraData

    local ps=cc.ParticleSystemQuad:create(extraData.ps_file)
    ps:setAutoRemoveOnFinish(true)
    if(extraData.ps_texture)then
        local temp=display.newSprite(extraData.ps_texture)
        ps:setTexture(temp:getTexture())
    end
    if(extraData.ps_custom)then
        ps:setEmissionRate(extraData.ps_emissionRate)
        ps:setLife(extraData.ps_life)
        ps:setLifeVar(extraData.ps_lifeVar)
        ps:setDuration(extraData.ps_duration)
        ps:setTotalParticles(extraData.ps_totalParticles)
        ps:setStartColor(extraData.ps_startColor)
        ps:setStartColorVar(extraData.ps_startColorVar)
        ps:setEndColor(extraData.ps_endColor)
        ps:setEndColorVar(extraData.ps_endColorVar)
        ps:setAngle(extraData.ps_angle)
        ps:setStartSize(extraData.ps_startSize)
        ps:setEndSize(extraData.ps_endSize)
        ps:setStartSpin(extraData.ps_startSpin)
        ps:setEndSpin(extraData.ps_endSpin)
        ps:setAngleVar(extraData.ps_angleVar)
        ps:setStartSizeVar(extraData.ps_startSizeVar)
        ps:setEndSizeVar(extraData.ps_endSizeVar)
        ps:setStartSpinVar(extraData.ps_startSpinVar)
        ps:setEndSpinVar(extraData.ps_endSpinVar)
        ps:setLifeVar(extraData.ps_lifeVar)
        ps:setSourcePosition(extraData.ps_sourcePos)
        ps:setPosVar(extraData.ps_posVar)

        local temp=extraData.ps_positionType
		local positionType = cc.POSITION_TYPE_FREE
		if (temp == 2)then
			positionType = cc.POSITION_TYPE_RELATIVE;
		elseif (temp == 3)then
			positionType = cc.POSITION_TYPE_GROUPED;
        end
		ps:setPositionType(positionType) 
		ps:setEmitterMode(extraData.ps_emitterMode);

        if(extraData.ps_emitterMode==EMITTERMODE_GRAVITY)then
            ps:setSpeed(extraData.ps_speed)
            ps:setSpeedVar(extraData.ps_speedVar)
            ps:setTangentialAccel(extraData.ps_tangentialAccel)
            ps:setTangentialAccelVar(extraData.ps_tangentialAccelVar)
            ps:setRadialAccel(extraData.ps_radialAccel)
            ps:setRotationIsDir(extraData.ps_rotationIsDir)
            ps:setGravity(extraData.ps_gravity)
        elseif(extraData.ps_emitterMode==EMITTERMODE_RADIUS)then
            ps:setStartRadius(extraData.ps_startRadius)
			ps:setStartRadiusVar(extraData.ps_startRadiusVar)
			ps:setEndRadius(extraData.ps_endRadius)
			ps:setEndRadiusVar(extraData.ps_endRadiusVar);
			ps:setRotatePerSecond(extraData.ps_rotatePerS);
			ps:setRotatePerSecondVar(extraData.ps_rotatePerSVar);
        end
    end
    return ps
end
--end createParticleSystem
--start processBtn
local function processBtn(node,extraData)
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
    local spriteFrame=extraData.sprite_spriteFrame

    local index=string.find(spriteFrame,'splash.png')
    if(index)then
        return
    end

    local frame=getFrame(spriteFrame)
    if(not frame)then
        return
    end

    if(extraData.sprite_isSliced)then
        local scale9
        scale9=cc.Scale9Sprite:createWithSpriteFrame(frame)
        scale9:setInsetBottom(extraData.sprite_insetBottom)
		scale9:setInsetLeft(extraData.sprite_insetLeft)
		scale9:setInsetRight(extraData.sprite_insetRight)
		scale9:setInsetTop(extraData.sprite_insetTop)
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
        if(extraData.isProgressBar)then
            node=createProgressBar(outline)
        end

        if(extraData.isSprite)then
            node=createSprite(outline)
        end

        if(extraData.isLabel)then
            node=createLabel(outline)
        end

        if(extraData.isEditBox)then
            node=createEditBox(outline)
        end

        if(extraData.isParticleSystem)then
            node=createParticleSystem(outline)
        end
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