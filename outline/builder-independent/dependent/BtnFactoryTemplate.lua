--start main
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
                listener:setSwallowTouches(true)
                node.btn_isPressed=true
                onPressed(node)
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
        end
    end

    local function onTouchEnded(touch,event)
        listener:setSwallowTouches(false)
        if(not node:isVisible())then
            return
        end
        if(node.btn_isPressed)then
            onPressEnd(node)
            if(isTouchInSprite(node,touch,node.btn_realScaleX,node.btn_realScaleY))then
                if(node.btn_onClick)then
                    node.btn_onClick(node)
                end
            end
        end
    end

    local function onTouchMoved(touch,event)
        if(not node:isVisible())then
            return
        end
        if(node.btn_isPressed and (not isTouchInSprite(node,touch,node.btn_realScaleX,node.btn_realScaleY)))then
            onPressEnd(node)
        end
    end

    listener:registerScriptHandler(onTouchBegan,cc.Handler.EVENT_TOUCH_BEGAN)
    listener:registerScriptHandler(onTouchMoved,cc.Handler.EVENT_TOUCH_MOVED)
    listener:registerScriptHandler(onTouchCancelled,cc.Handler.EVENT_TOUCH_CANCELLED)
    listener:registerScriptHandler(onTouchEnded,cc.Handler.EVENT_TOUCH_ENDED)

    local eventDispatcher = node:getEventDispatcher()
    eventDispatcher:addEventListenerWithSceneGraphPriority(listener, node)

    function node:addTouchEventListener(onClick,tag)
        node.btn_onClick=function()
            onClick(tag)
        end
    end
end

function btnFactory.setOnClick(node,onClick)
    node.btn_onClick=onClick
end

btnFactory.BUTTONTYPE_SCALE=1
btnFactory.BUTTONTYPE_COLOR=2
btnFactory.BUTTONTYPE_SPRITE=3
btnFactory.BUTTONTYPE_SELECT=4
--end main


--start processScaleBtn
function btnFactory.processScaleBtn(node)
    local function onPressed(node)
        local action=cc.EaseExponentialInOut:create(cc.ScaleBy:create(0.16,0.75))
        node:runAction(action)
    end
    
    local function callback(args)
        node.btn_isPressed=false
        node:setScaleX(node.btn_originScaleX)
        node:setScaleY(node.btn_originScaleY)
    end

    local function onPressEnd(node)
        local action=cc.Sequence:create(
            cc.EaseExponentialInOut:create(cc.ScaleTo:create(0.16,node.btn_originScaleX,node.btn_originScaleY)),
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
        node:setColor(cc.c3b(102, 95, 75));
    end
    local function onPressEnd(node)
        node:setColor(cc.c3b(255, 255, 255));
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

    btnFactory.setOnClick(node,function(node)
        if(node.isSelected)then
            node:setUnSelect()
        else
            node:setSelect()
        end
    end)
end
--end processSelectBtn