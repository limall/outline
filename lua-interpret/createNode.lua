local EMITTERMODE_GRAVITY=0
local EMITTERMODE_RADIUS=1

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

        local inputMode=extraData.editbox_inputMode or cc.EDITBOX_INPUT_MODE_SINGLELINE
        editBox:setInputMode(inputMode)

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

local function createLabel(outline)
    local extraData=outline.extraData
    local label
    local label_string
    if(nil~=extraData.label_string)then
        label_string='' .. extraData.label_string
    else 
        label_string=''
    end
    local font=extraData.label_font
    if(font)then
        local fontType=font.fontType
        if(fontType=="atlas")then
            local startChar=font.startChar
            local atlas=font.atlas
            local width=font.itemWidth
            local height=font.itemHeight
            label=cc.LabelAtlas:_create(label_string,atlas,width,height,startChar)
        elseif(fontType=="ttf")then
            label=cc.Label:createWithTTF(label_string,font.path,extraData.label_fontSize)
            if(extraData.label_overflow==1)then
                label:setMaxLineWidth(outline.width)
            end
        end
    else
        if(nil~=extraData.label_overflow)then
            local dimession=cc.size(outline.width,outline.height)
            label = cc.Label:createWithSystemFont(label_string,'Arial',extraData.label_fontSize,dimession)
        else
            label = cc.Label:createWithSystemFont(label_string,'Arial',extraData.label_fontSize)
        end
    end

    local horizontalAlign=extraData.label_horizontalAlign or 1
    if label.setHorizontalAlignment then
        label:setHorizontalAlignment(horizontalAlign)
    end
    local verticalAlign=extraData.label_verticalAlign or 1
    if label.setVerticalAlignment then
        label:setVerticalAlignment(verticalAlign)
    end

    return label
end

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

local function createListview(creator)
    local outline=creator.outline
    local extraData=outline.extraData

    local listview=ccui.ListView:create()
    function listview:pushbackBySample(para)
        if(self.getItemBySample)then
            local item=self:getItemBySample(para)
            local size=item:getContentSize()
            local anchor=item:getAnchorPoint()
            item:move(cc.p(size.width*anchor.x,size.height*anchor.y))
            local widget=ccui.Widget:create()
            widget:setContentSize(size)
            widget:addChild(item)
            self:pushBackCustomItem(widget)
        end
    end

    if(extraData.listview_background)then
        local sep=string.find(extraData.listview_background,'%:')
        if(sep and sep>0)then
            print("background of listview can not be plist")
        else
            listview:setBackGroundImage(extraData.listview_background)

            listview:setBackGroundImageScale9Enabled(true)
            local b_insetTop=extraData.listview_background_insetTop or 0
            local b_insetBottom=extraData.listview_background_insetBottom or 0
            local b_insetLeft=extraData.listview_background_insetLeft or 0
            local b_insetRight=extraData.listview_background_insetRight or 0
            local size=listview:getBackGroundImageTextureSize()
            local rect=cc.rect(b_insetLeft,b_insetBottom,size.width-b_insetRight-b_insetLeft,size.height-b_insetTop-b_insetBottom)
            listview:setBackGroundImageCapInsets(rect)
        end
    end

    listview:setScrollBarEnabled(not extraData.listview_hidebar)
    listview:setInertiaScrollEnabled(extraData.listview_inertia)
    listview:setBounceEnabled(extraData.listview_elastic)
    listview:setDirection(extraData.listview_direction)
    listview:setItemsMargin(extraData.listview_item_margin)
    listview:setGravity(extraData.listview_item_gravity)
    listview:setPadding(extraData.listview_padding_left,extraData.listview_padding_top,extraData.listview_padding_right,extraData.listview_padding_bottom)

    listview.isListview=true
    return listview
end

local function createScrollview(creator)
    local outline=creator.outline
    local extraData=outline.extraData

    local scroll=ccui.ScrollView:create()
    local viewsize = cc.size(outline.width, outline.height);
	scroll:setInertiaScrollEnabled(extraData.scrollview_inertia);
	scroll:setScrollBarEnabled(not extraData.scrollview_hidebar);
	scroll:setDirection(extraData.scrollview_direction);

    local addChild=scroll.addChild
    function scroll:addChild(content)
        local contentsize = content:getContentSize();
        content:setAnchorPoint(cc.p(0.5,0.5))
        content:setPosition(cc.p(contentsize.width / 2, contentsize.height / 2));

    	local container = self:getInnerContainer();
    	container:setContentSize(contentsize);

        local di=extraData.scrollview_direction
        if(di==1)then
	        container:setPositionX((viewsize.width - contentsize.width) / 2);
            self:scrollToTop(0.8, true);
        elseif(di==2)then
            container:setPositionY((viewsize.height-contentsize.height)/2)
            self:scrollToLeft(0.8,true)
        elseif(di==3)then
            container:setPositionY((viewsize.height-contentsize.height)/2)
            container:setPositionX((viewsize.width - contentsize.width) / 2);
        end

        addChild(self,content)
    end

    return scroll
end

function outlineprivate_createNode(creator,parent)
    local outline=creator.outline
    local node
    local extraData=outline.extraData

    if(extraData)then 
        if(extraData.isListview)then
            node=createListview(creator)
        end

        if(extraData.isScrollview)then
            node=createScrollview(creator)
        end

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

    return node
end
    

