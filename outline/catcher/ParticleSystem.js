var assetsExportor=require('../AssetsExportor');
var imageSource=require('./ImageSource');
var getValueStr=require('./ValueStr');

module.exports=function(ps,typeInfo){
    typeInfo.add('isParticleSystem',getValueStr(true));

    var file=ps.file.substring(ps.file.indexOf('/assets/')+8);
    assetsExportor.addFile(file);

    typeInfo.add('ps_file',getValueStr(file));

    if(ps.texture!=''){
        var texture=ps.texture.substring(ps.texture.indexOf('/assets/')+8);
        assetsExportor.addFile(texture);
    }

    if(ps.custom){
        typeInfo.add('ps_custom',getValueStr(true));

        var props=[
            'duration',
            'emissionRate',
            'life',
            'totalParticles',
            'startColor',
            'startColorVar',
            'endColor',
            'endColorVar',
            'angle',
            'startSize',
            'endSize',
            'startSpin',
            'endSpin',
            'angleVar',
            'startSizeVar',
            'endSizeVar',
            'startSpinVar',
            'endSpinVar',
            'lifeVar',
            'positionType',
            'emitterMode',
            'speed',
            'speedVar',
            'tangentialAccel',
            'tangentialAccelVar',
            'radialAccel',
            'radialAccelVar',
            'rotationIsDir',
            'startRadius',
            'startRadiusVar',
            'endRadius',
            'endRadiusVar',
            'rotatePerS',
            'rotatePerSVar',
            'gravity',
            'sourcePos',
            'posVar'
        ];
        props.forEach(function(propName){
            typeInfo.add('ps_'+propName,getValueStr(ps[propName]));
        });

        if(ps.texture!=''){
            var texture=ps.texture.substring(ps.texture.indexOf('/assets/')+8);
            assetsExportor.addFile(texture);
            typeInfo.add('ps_texture',getValueStr(texture));
        }
    }
}