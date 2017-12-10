outline
=======
简介
-------
* **creator插件：** outline是一个cocos creator(以下简称creator)上的插件，用于将creator上的node和animation导出到cocos2dx(以下简称2dx)项目中。
* **特点：** 不同于官方版本，outline将支持2dx版本3.x中的较低版本，任意node都能被单独导出，并且支持自定义控件。
* **导出源码：** outline直接导出c++源码，每一次导出的node（包括子node），或者每个animation clip都会存放于单个hpp文件中，开发者只需include插件提供的头文件outline.h以及对应的hpp文件即可直接使用。配合ide的代码提示使用起来很方便。关于如何使用，下面会详细介绍。直接导出源码的方案，优势和劣势都相当明显。优势是快，所有设计信息都会编译为机器码，不需要额外的io操作和字符串操作，也不易被同行copy；劣势是不能进行热更新。
* **设计思路：** 正如其名，outline将会把注意力放在node的轮廓上。因为我发现，用编辑器写界面相比较于手写，最大的优势莫过于能够直观的设置node的position、scale、rotation等属性，这些都可以概括为node的轮廓。当然node的其他组件信息都会以map的形式导出，开发者可以在源码中自行使用引擎的控件，或者自定义控件。
* **动画设计思路：** outline使用了运行时演绎复制的方式来导出animation clip，原理是自定义一个继承自Animation组件的AnimationRecord组件，在播放animation的同时记录宿主node的每帧动画状态，然后在Canvas节点上添加AutoRecord脚本，使其能在运行时时自动扫描所有node，找到所有AnimationRecord组件并逐个单独播放，完成后通过网络接口将演绎的数据导出。目前理论上已经可以完美导出针对于单个node的所有动画类型，针对多个子node也参加动画的情况还在开发中。
