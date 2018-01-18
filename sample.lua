local outline_root_c1=O.Outline.new({
    x=display.cx,
    y+display.cy,
    isLabel=true,
    label_string="hello,world!",
    label_fontSize=40
})

local C1=O.Creator.new(outline_root_c1)

local outline_root=O.Outline.new({
    x=display.cx,
    y=display.cy,
    isSprite=true,
    imageFile="background_1.jpg"
})

O.Root=O.Creator.new(outline_root)
O.Root.C1=C1
