--start autoGray
local function autoGray(node)
    local vsh=  "attribute vec4 a_position;\n"
              .."attribute vec2 a_texCoord;\n"
              .."attribute vec4 a_color;\n"
              .."#ifdef GL_ES\n"
              .."varying lowp vec4 v_fragmentColor;\n"
              .."varying mediump vec2 v_texCoord;\n"
              .."#else\n" 
              .."varying vec4 v_fragmentColor;\n"
              .."varying vec2 v_texCoord;\n"
              .."#endif\n"
              .."void main() {\n" 
              .."    gl_Position = CC_PMatrix* a_position;\n"
              .."    v_fragmentColor= a_color;\n"
              .."    v_texCoord = a_texCoord;\n"
              .."}"
    local fsh_gray=  
                "varying vec4 v_fragmentColor;\n"
              .."varying vec2 v_texCoord;\n"
              .."void main() {\n" 
              .."    vec4 mycolor =  v_fragmentColor*texture2D(CC_Texture0, v_texCoord);\n"
              .."    float gray = dot(mycolor.rgb, vec3(0.2126, 0.7152, 0.0722));\n"
              .."    gl_FragColor =  vec4(gray);\n"
              .."    gl_FragColor.a = mycolor.a;\n"
              .."}"
    local fsh_normal=  
                "varying vec4 v_fragmentColor;\n"
              .."varying vec2 v_texCoord;\n"
              .."void main() {\n" 
              .."    gl_FragColor =  v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n"
              .."}"
    local setEnabled=node.setEnabled
    node.setEnabled=function(self,enable)
        local fsh
        if(enable)then
            fsh=fsh_normal
        else
            fsh=fsh_gray
        end
        local prog = cc.GLProgram:createWithByteArrays(vsh,fsh)
        prog:link()
        prog:updateUniforms()
        local progStat= cc.GLProgramState:getOrCreateWithGLProgram(prog)
        self:setGLProgramState(progStat)
        if(setEnabled)then
            setEnabled(self,enable)
        end
    end
end
--end autoGray
--start main
local function getScale(node)
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

local function isTouchInSprite(node,touch,scaleX,scaleY)
    local x = touch:getLocation().x;
	local y = touch:getLocation().y;

	local size = node:getContentSize();
	size.width = size.width * scaleX;
	size.height = size.height * scaleY;

	local anchorX = node:getAnchorPoint().x;
	local anchorY = node:getAnchorPoint().y;
	local pos = node:getParent():convertToWorldSpace(cc.p(node:getPositionX(),node:getPositionY()));

	local x1 = pos.x - size.width*anchorX;
	local x2 = pos.x + size.width*(1-anchorX);
	local y1 = pos.y - size.height*anchorY;
	local y2 = pos.y + size.height*(1-anchorY);
	return x >= x1 and x <= x2 and y >= y1 and y <= y2;
end

local btnFactory={}

function btnFactory.processBtn(node,onPressed,onPressEnd)
    if(not node)then
        return nil
    end

    local listener = cc.EventListenerTouchOneByOne:create()
    node.btn_isDisabled=false
    node.btn_isPressed=false
    node.btn_onClick=nil
    node.btn_originScaleX=node:getScaleX()
    node.btn_originScaleY=node:getScaleY()

    local function onTouchBegan(touch,event)
        if(not node:isVisible())then
            return false
        end
        if(node.btn_isDisabled or node.btn_isPressed)then
            return false
        else
            node.btn_realScaleX,node.btn_realScaleY=getScale(node)
            if(isTouchInSprite(node,touch,node.btn_realScaleX,node.btn_realScaleY))then
                if(node.needSwallowTouch)then
                    listener:setSwallowTouches(true)
                end
                node.btn_isPressed=true
                
                --用于确定滑动
                local pos = node:getParent():convertToWorldSpace(cc.p(node:getPositionX(),node:getPositionY()));
                local beginX=pos.x--需要先转化坐标
                local beginY=pos.y--需要先转化坐标
                local beginSize=node:getContentSize()
                local beginAnchor=node:getAnchorPoint()
                local beginLeft=beginX-beginSize.width*beginAnchor.x
                local beginBottom=beginY-beginSize.height*beginAnchor.y
                node.touchBeginRect={
                    left=beginLeft,
                    bottom=beginBottom,
                    width=beginSize.width,
                    height=beginSize.height
                }
              
                onPressed(node)
                if(node.onPressed)then
                    node.onPressed(node.btn_para1,node.btn_para2)
                end
            end
        end
		return true;
    end

    local function onTouchCancelled(touch,event)
        listener:setSwallowTouches(false)
        if(not node:isVisible())then
            return
        end
        if(node.btn_isPressed)then
            onPressEnd(node)
            if(node.onPressUp)then
                node.onPressUp(node.btn_para1,node.btn_para2)
            end
        end
    end

    local function onTouchEnded(touch,event)
        listener:setSwallowTouches(false)
        if(not node:isVisible())then
            return
        end
        if(node.btn_isPressed)then
            onPressEnd(node)
            if(node.onPressUp)then
                node.onPressUp(node.btn_para1,node.btn_para2)
            end
            if(isTouchInSprite(node,touch,node.btn_realScaleX,node.btn_realScaleY))then
                if(node.btn_onClick)then
                    node.btn_onClick(node.btn_para1,node.btn_para2)
                end
            end
        end
    end

    local function onTouchMoved(touch,event)
        if(not node:isVisible())then
            return
        end
        if(node.btn_isPressed)then
            local cancel=not isTouchInSprite(node,touch,node.btn_realScaleX,node.btn_realScaleY)
            if(node.cancelWhenScroll)then
                local x = touch:getLocation().x
	            local y = touch:getLocation().y
                local r=node.touchBeginRect
                cancel=x<r.left or x>r.left+r.width or y<r.bottom or y>r.bottom+r.height
            end
            if(cancel)then
                listener:setSwallowTouches(false)
                onPressEnd(node)
                node.btn_isPressed=false
                if(node.onPressUp)then
                    node.onPressUp(node.btn_para1,node.btn_para2)
                end
            end
        end
    end

    listener:registerScriptHandler(onTouchBegan,cc.Handler.EVENT_TOUCH_BEGAN)
    listener:registerScriptHandler(onTouchMoved,cc.Handler.EVENT_TOUCH_MOVED)
    listener:registerScriptHandler(onTouchCancelled,cc.Handler.EVENT_TOUCH_CANCELLED)
    listener:registerScriptHandler(onTouchEnded,cc.Handler.EVENT_TOUCH_ENDED)

    local eventDispatcher = node:getEventDispatcher()
    eventDispatcher:addEventListenerWithSceneGraphPriority(listener, node)

    function node:setOnClick(onClick,para1,para2)
        node.btn_onClick=onClick
        node.btn_para1=para1
        node.btn_para2=para2
    end

    function node:setOnPressed(onPressed,para1,para2)
        node.onPressed=onPressed
        node.btn_para1=para1
        node.btn_para2=para2
    end

    function node:setOnPressUp(onPressUp,para1,para2)
        node.onPressUp=onPressUp
        node.btn_para1=para1
        node.btn_para2=para2
    end
end

btnFactory.BUTTONTYPE_SCALE=1
btnFactory.BUTTONTYPE_COLOR=2
btnFactory.BUTTONTYPE_SPRITE=3
btnFactory.BUTTONTYPE_SELECT=4
btnFactory.BUTTONTYPE_NONE=5
--end main


--start processScaleBtn
function btnFactory.processScaleBtn(node)
    local function onPressed(node)
        local action=cc.EaseExponentialInOut:create(cc.ScaleBy:create(0.06,0.75))
        node:runAction(action)
    end
    
    local function callback(args)
        node.btn_isPressed=false
        node:setScaleX(node.btn_originScaleX)
        node:setScaleY(node.btn_originScaleY)
    end

    local function onPressEnd(node)
        local action=cc.Sequence:create(
            cc.EaseExponentialInOut:create(cc.ScaleTo:create(0.2,node.btn_originScaleX,node.btn_originScaleY)),
            cc.CallFunc:create(callback)
            )
        node:runAction(action)
    end

    btnFactory.processBtn(node, onPressed, onPressEnd);
end
--end processScaleBtn
--start processColorBtn
function btnFactory.processColorBtn(node)
    local function onPressed(node)
        node.btn_color=node:getColor()
        node:setColor(cc.c3b(102, 95, 75));
    end
    local function onPressEnd(node)
        node:setColor(node.btn_color or cc.c3b(255, 255, 255));
        node.btn_isPressed = false;
    end
    btnFactory.processBtn(node, onPressed, onPressEnd);
end
--end processColorBtn
--start processSpriteBtn
function btnFactory.processSpriteBtn(node)
    local function onPressed(node)
        node:setSpriteFrame(getFrame(node.image_pressed))
    end

    local function onPressEnd(node)
        node:setSpriteFrame(getFrame(node.image_normal))
        node.btn_isPressed=false
    end

    btnFactory.processBtn(node, onPressed, onPressEnd);
end
--end processSpriteBtn
--start processSelectBtn
function btnFactory.processSelectBtn(node)
    btnFactory.processScaleBtn(node)

    function node:setOnSelect(onSelect)
        self.onSelect=onSelect
        return self
    end
    function node:setOnUnSelect(onUnSelect)
        self.onUnSelect=onUnSelect
        return self
    end

    node.isSelected=false
    function node:setSelect()
        self.isSelected=true
        local child=node:getChildByName('selected')
        if(child)then
            child:setVisible(true)
        end
        if(self.onSelect)then
            self.onSelect(self)
        end
        return self
    end
    function node:setUnSelect()
        self.isSelected=false
        local child=node:getChildByName('selected')
        if(child)then
            child:setVisible(false)
        end
        if(self.onUnSelect)then
            self.onUnSelect(self)
        end
        return self
    end

    function node:setSelected(selected)
        if(selected)then
            self:setSelect()
        else
            self:setUnSelect()
        end
        return self
    end

    node:setOnClick(function()
        if(node.isSelected)then
            node:setUnSelect()
        else
            node:setSelect()
        end
    end)
end
--end processSelectBtn
--start processNoneBtn
function btnFactory.processNoneBtn(node)
    local function onPressed(node)
    end
    local function onPressEnd(node)
        node.btn_isPressed=false
    end
    btnFactory.processBtn(node, onPressed, onPressEnd);
end
--end processNoneBtn