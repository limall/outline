function addX(x){
    return 'node->setPositionX(node->getPositionX()+'+x+');\n';
}

function addY(y){
    return 'node->setPositionY(node->getPositionY()+'+y+');\n';
}

function addScaleX(scaleX){
    return 'node->setScaleX(node->getScaleX()+'+scaleX+');\n';
}

function addScaleY(scaleY){
    return 'node->setScaleY(node->getScaleY()+'+scaleY+');\n';
}

function addRotation(rotation){
    return 'node->setRotation(node->getRotationn()+'+rotation+');\n';
}

function addOpacity(opacity){
    return 'node->setOpacity(node->getOpacity()+'+opacity+');\n';
}

function addSpriteFrame(file){
    var p1='auto temp=Sprite::create("'+file+'");\n';
    var p2='Size size=temp->getContentSize();\n';
    var p3='Rect rect=Rect(0,0,size.width,size.height);\n';
    var p4='frame["'+file+'"]=SpriteFrame::create("'+file+'",rect);\n';
    return p1+p2+p3+p4;
}

function addSprite(file){
    var p1='auto sprite=dynamic_cast<Sprite*>(node);\n';
    var p2='sprite->setSpriteFrame(frame["'+file+'"]);\n';
    return p1+p2;
}