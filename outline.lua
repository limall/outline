O={}

O.Outline={}
local Outline=O.Outline

local createNode_default=function(creator,parent)
    local node
    if(creator) then
        local outline=creator.outline
        if(outline.isSprite) then
            node=display.newSprite(outline.imageFile)
        elseif (outline.isLabel) then
            node=cc.Label:createWithSystemFont(outline.label_string, "Arial", outline.label_fontSize)
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
    if(self.children)then
        for child in pairs(self.children)do
            child:create(node)
        end
    end
    self.lastNode=node
    return node
end

function Outline:reset( node )    
    node:setPosition(self.x,self.y)
    if (self.width>0 and self.height>0)then
        node:setContentSize(self.width,self.height);
    end
    node:setAnchorPoint(self.anchorX, self.anchorY);
    node:setScaleX(self.scaleX);
    node:setScaleY(self.scaleY);
    node:setRotation(self.rotation);
    node:setOpacity(self.opacity);
    node:setVisible(self.visible);
    node:setLocalZOrder(self.zOrder);
    node:setColor(cc.c3b(self.colorR, self.colorG, self.colorB));
end

function Outline.new(nodeInfo)
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
    outline.createNode=createNode_default
    outline.create=Outline.create
    outline.reset=Outline.reset

    if(nodeInfo) then
        for k,v in pairs(nodeInfo)do
            obj[k]=v
        end
    end

    return outline
end

O.Creator={}
local Creator=O.Creator

function Creator:create(parent)
    return self.outline:create(parent)
end
function Creator:lastNode()
    return self.outline.lastNode
end
function Creator.new(outline)
    local creator={}
    creator.outline=outline
    creator.create=Creator.create
    creator.lastNode=Creator.lastNode
    return creator
end
