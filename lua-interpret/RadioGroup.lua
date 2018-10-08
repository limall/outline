--传入的btn类型只能为SpriteButton
--ButtonGroup包括多选按钮组和单选按钮组，把button的pressed状态作为选中状态，normal状态为未选中状态
local function newRadioGroup()
    local btnGroup={
        _btns={},
        _selectedBtn=nil
    }

    --如果addMember后再调用btn:setOnClick，btnGroup将失去效果
    function btnGroup:addMember(btn)
        local this=self
        table.insert(self._btns,btn)
        local oldOnClick=btn.btn_onClick
        local newOnClick=function(para1,para2)
            setSPF(btn,btn.image_pressed)
            if btn==this._selectedBtn then
                return
            end
            this:onClickMember(btn)
            oldOnClick(btn,para1,para2)
        end
        btn:setOnClick(newOnClick,btn.btn_para1,btn.btn_para2)
        return btnGroup
    end

    function btnGroup:onClickMember(btn)
        if self._selectedBtn then
            setSPF(self._selectedBtn,self._selectedBtn.image_normal)
        end
        self._selectedBtn=btn
    end

    function btnGroup:getSelect()
        return self._selectedBtn
    end

    return btnGroup
end

return newRadioGroup
