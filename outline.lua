Outline={}

local createNode_default=function(creator,parent)
    local node
    if(creator) then
        local outline=creator.outline
        if(outline.isSprite) then
            node=display.newSprite(outline.imageFile)
        elseif (outline.isLabel) then
            node=display.newTTFLabel({
                text=outline.label_string,
                size=outline.label_fontSize
            })
        else
            node=display.newNode()
        end
    else
        node=display.newNode()
    end
    if(parent) then
        parent:addChild(node)
    end
    return node
end

function Outline:create( parent )
    local node=self.createNode(self.creator,parent)
    node:setName(self.name)
    self:reset(node)
    for child in pairs(self.children)do
        child:create(node)
    end
    self.lastNode=node
end

function Outline:reset( node )    
    node:setPosition(self.x,self.y)
    if (self.width>0 && self.height>0)
        node:setContentSize(self.width,self.height);
    node:setAnchorPoint(self.anchorX, self.anchorY);
    node:setScaleX(self.scaleX);
    node:setScaleY(self.scaleY);
    node:setRotation(self.rotation);
    node:setOpacity(self.opacity);
    node:setVisible(self.visible);
    node:setLocalZOrder(self.zOrder);
    node:setColor(self.colorR, self.colorG, self.colorB);
end

function Outline:new(nodeInfo)
    local obj={
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

    obj.lastNode=nil
    obj.createNode=createNode_default
    obj.create=Outline.create
    obj.reset=Outline.reset

    if(nodeInfo) then
        for k,v in pairs(nodeInfo)do
            obj[k]=v
        end
    end

    return obj
end
