--outline
local outline_test=O.Outline.new({
    x=640,
    y=360,
    name="test",
})

local outline_test_daodan=O.Outline.new({
    x=640,
    y=360,
    width=163,
    height=96,
    scaleY=3,
    isSprite=true,
    imageFile="daodan.png",
    name="daodan",
})

local outline_test_container=O.Outline.new({
    name="container",
})

local outline_test_container_daodan=O.Outline.new({
    x=-414,
    y=29,
    width=163,
    height=96,
    scaleY=3,
    isSprite=true,
    imageFile="daodan.png",
    name="daodan",
})

local outline_test_container_hengfu=O.Outline.new({
    name="hengfu",
})

local outline_test_container_hengfu_cc=O.Outline.new({
    x=-18,
    y=-215,
    width=666,
    height=150,
    isSprite=true,
    imageFile="banner_win.png",
    name="cc",
})


--creator
local Test=O.Creator.new(outline_test)
Test.test2={
    cba="cc",
}

Test.test22={
    cba="dsfasgasdf3124qm,./ ",
}

Test.test33={
    abc=1,
    jjj=1.6,
    aaa=false,
}


local Test_daodan=O.Creator.new(outline_test_daodan)

local Test_container=O.Creator.new(outline_test_container)

local Test_container_daodan=O.Creator.new(outline_test_container_daodan)
Test_container_daodan.test1={
    file="shunzi.png",
}


local Test_container_hengfu=O.Creator.new(outline_test_container_hengfu)

local Test_container_hengfu_cc=O.Creator.new(outline_test_container_hengfu_cc)


--creatorRelationship
Test.Daodan=Test_daodan
Test.Container=Test_container

Test_container.Daodan=Test_container_daodan
Test_container.Hengfu=Test_container_hengfu

Test_container_hengfu.Cc=Test_container_hengfu_cc


--outlineRelationship
outline_test.children={outline_test_daodan,outline_test_container,}
outline_test_container.children={outline_test_container_daodan,outline_test_container_hengfu,}
outline_test_container_hengfu.children={outline_test_container_hengfu_cc,}

O.Test=Test
