outline &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
=======
简介
-------
* **creator插件：** outline是一个cocos creator(以下简称creator)上的插件，用于将creator上的node和animation导出到cocos2dx(以下简称2dx)项目中。
* **特点：** 不同于官方版本，outline支持2dx3.14以下版本(具体最低支持到哪个版本还未测试)，任意node都能被单独导出，并且支持自定义控件。
* **导出源码：** outline直接导出c++源码，每一次导出的node（包括子node），或者每个animation clip都会存放于单个hpp文件中，开发者只需include插件提供的头文件outline.h以及对应的hpp文件即可直接使用。配合ide的代码提示使用起来很方便。关于如何使用，下面会详细介绍。直接导出源码的方案，优势和劣势都相当明显。优势是快，所有设计信息都会编译为机器码，不需要额外的io操作和字符串操作，也不易被同行copy，使用起来具有灵活的扩展性；劣势是不能进行热更新。
* **设计思路：** 正如其名，outline将会把注意力放在node的轮廓上。因为我发现，用编辑器写界面相比较于手写，最大的优势莫过于能够直观的设置node的position、scale、rotation等属性，这些都可以概括为node的轮廓。当然node的其他组件信息都会以map的形式导出，开发者可以在源码中自行使用引擎的控件，或者自定义控件。
* **动画设计思路：** outline使用了运行时演绎录制的方式来导出animation clip，原理是自定义一个继承自Animation组件的AnimationRecord组件，在播放animation的同时记录宿主node的每帧动画状态，然后在Canvas节点上添加AutoRecord脚本，使其能在运行时时自动扫描所有node，找到所有AnimationRecord组件并逐个单独播放记录，完成后通过网络接口将演绎的数据导出。目前理论上已经可以完美导出针对于单个node的所有动画类型，针对多个子node也参与动画的情况还在开发中。

导出node
--------
        假设已经安装了outline（如果还不清楚如何安装creator 扩展，可以移步官网），那么打开creator时，会发现菜单栏多了outline选项，点击后会出现export node子菜单；另外在资源面板中会出现outline-components目录，里面包含ExportRule.js、AnimationRecorder.js、AutoRecorder.js、TypeInfo.js、Status.js五个脚本。ExportRule用来描述一个导出规则，直接拖动ExportRule脚本至Canvas节点中，接着为它取个名称(rule name字段)，再设置导出的位置及名称(dst hpp path字段)，导出哪个node(surc_node字段)。保存一下项目，接着点击outline菜单子菜单export node，就会弹出输入export rule name的对话框，输入刚刚设置好的export rule name后点击导出便可导出hpp文件。可以在Canvas节点中添加多个ExportRule脚本，以分别导出需要的node。 
    
导出动画
--------
        首先拖动AnimationRecorder.js脚本至合适node中，将需要导出的animation clip拖到脚本的clips数组中。这样就完成了一个clip的设置，接着将AutoRecorder脚本拖入Canvas节点中，设置好导出的目录，保存项目，点击运行在浏览器中运行项目。所有设置的动画都会在运行时自动逐个运行，都完成后会导出到指定目录。 
    
2dx中使用outline
----------------
        首先将需要的Resources文件夹中的资源文件复制到2dx项目的资源根目录下，在导入了outline.h头文件和对应的节点的hpp文件后，就可以直接通过命名空间O来访问导出节点的结构体，调用结构体的pIt函数获取单例，再调用它的create函数就可以创建需要的节点。如下 
        
        `O::MyNode::pIt()->create(NULL);`  
        
        创建并返回创建节点的指针。如果传给create函数的是一个节点，那么将会调用这个节点的addChild函数把新创建的节点加入进来。通过这个单例还可以访问子节点的结构体实例。 每个单例都可以创建若干个节点，也可以调用reset函数将导出的节点的性状付给传入的现有节点。更多api请参见outline.h头文件  
        
播放动画
--------
        导入相应hpp文件和资源文件后，可通过命名空间Anims来访问导出clip的结构体，调用pIt函数即可获得实例，调用play函数即可让传入的节点播放动画，如  
        
        `Anims::MyAnimation::create()->play(mynode,"myAnimation1",false)`  
        
        其中mynode为需要播放动画的节点，"myAnimation1"为该播放行为的标记（会作为回调函数的参数传入）,第三个参数为是否重复播放，重载的第四个参数为回调函数,使用lambda形式 
        
使用前必读
---------
        * 第一次使用前需要设置，将creator中偏好设置-常规-导入图片时自动裁剪选项取消掉，才能保证2dx和creator的显示效果一致
        * 所有node的名字首字母只能是小写
        * 导出node前先要保存scene必须先保存再导出
        * 编辑同一个node的多个animation clip时除了本来就是要动态初始位置的，记得每个clip第一帧将node恢复到初始状态
