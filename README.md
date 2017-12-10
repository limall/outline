outline
=======
简介
-------
    一个cocos creator(以下简称creator)上的插件，用于将creator上的node和animation导出到  
 cocos2dx(以下简称2dx)中。  
    不同于官方版本，outline将支持2dx版本3.x中的较低版本，任意node都能被单独导出，并且支持自  
    定义控件。  
        另外一个特点是outline直接导出c++源码，每一次导出的node（包括子node），以及每个  
    animation clip都会存放于单个hpp文件中，开发者只需include插件提供的头文件  
    outline.h以及对应的hpp文件即可直接用。配合ide的代码提示使用起来很方便。关于如何使用，下面会  
详细介绍。
    直接导出源码的方案，优势和劣势都相当明显。优势是快，所有设计信息都会编译为机器码，不需要额  
外的io操作和字符串操作；劣势是不能进行热更新。
    正如其名，outline将会把注意力放在node的轮廓上。因为我发现，用编辑器写界面相比较于手写，最  
大的优势莫过于能够直观的设置node的position、scale、rotation等属性，这些都可以概括为node的轮  
廓。当然node的其他组件信息都会以map的形式导出，开发者可以在源码中自行使用引擎的控件，或者自定  
义控件。
