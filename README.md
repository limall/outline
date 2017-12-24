outline &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
=======
简介
-------
* **creator插件：** outline是一个cocos creator(以下简称creator)上的插件，用于将creator上的node和animation导出到cocos2dx(以下简称2dx)项目中。
* **特点：** outline致力于为2dx引入组件化工作流的同时，保持较高的兼容性、易用性和易迁移性。不同于官方版本，outline支持2dx3.14以下版本(我的项目3.10可以使用，具体最低支持到哪个版本还未测试)，任意node都能被单独导出，并且支持导出自定义组件。
* **导出源码：** outline直接导出c++源码，每一次导出的node整体，或者每个animation clip都会存放于单个hpp文件中，开发者只需include对应的hpp文件即可直接使用。导出节点时，导出的源码将会包含整个导出节点的模板树，这里我把它称为creator树，creator树上的每个creator实例与导出节点一一对应，都可以生产对应的节点。creator树以结构体指针嵌套构成，利用ide的代码提示可以快速找到树上的任一creator实例，调用这个实例的create便能生产想要的节点。直接导出源码的方案，优势和劣势都很明显。优势是快，所有设计信息都会编译为机器码，不需要额外的io操作和字符串操作，也不易被同行copy，使用起来更灵活；劣势是不能进行热更新（后续如有lua版本应该就能支持了）。
* **设计思路：** 正如其名，outline将会把注意力放在node的轮廓上。因为我发现，用编辑器写界面相比较于手写，最大的优势莫过于能够直观的设置node的position、scale、rotation等属性，这些都可以概括为node的轮廓。
* **动画设计思路：** outline使用了运行时演绎录制的方式来导出animation clip，原理是自定义一个继承自Animation组件的AnimationRecord组件，在播放animation的同时记录宿主node的每帧动画状态，然后在Canvas节点上添加AutoRecord脚本，使其能在运行时时自动扫描所有node，找到所有AnimationRecord组件并逐个单独播放记录，完成后通过网络接口将演绎的数据导出。目前支持针对position,rotation,scale,opacity属性的动画，帧动画还未测试。另外针对多个子node也参与动画的情况还在开发中。

导出node
--------
* **将资源面板outline-components目录下的ExportRule脚本拖至Canvas节点中** 
* **设置export rule:** <br>
　　　　rule name:　　　　　export rule的名称,如"effectNode"; <br>
　　　　dst_hpp_path:　　　　导出的文件的全局路径（包含文件名），如"E:/cocospro/Classes/effectNode/view.hpp"; <br>
　　　　src_node:　　　　　　需要导出的node，在creator直接把node拖过来即可; <br>
　　　　exclude_nodes:　　　导出node中需要剔除的子node; <br>
　　　　use_world_position:　导出的node的position是世界坐标系，还是node坐标系。 <br>
* **点击outline菜单子菜单export node，就会弹出选择export rule的对话框，勾选需要套用的export rule，然后点导出即可** . 

添加自定义组件
-------------
hello

导出动画
--------
        首先拖动AnimationRecorder.js脚本至合适的node中，将需要导出的animation clip拖到脚本的clips数组中。接着将AutoRecorder脚本拖入Canvas节点中，设置好导出的目录，再把需要导出动画的node拖到exportNode数组中。在浏览器中运行项目。所有设置的动画都会在运行时自动逐个播放，都播完后会导出到指定目录。 
            
2dx中使用outline
----------------
        首先将需要的Resources文件夹中的资源文件（保持目录结构）复制到2dx项目的资源根目录下，在导入了outline.h头文件和对应的节点的hpp文件后，就可以直接通过命名空间O来访问导出节点的结构体，调用结构体的pIt函数获取单例，再调用它的create函数就可以创建需要的节点。如下 
        
        O::MyNode::pIt()->create(NULL);  
        
        以上代码创建并返回创建了的节点的指针。如果传给create函数的是一个节点，那么将会调用这个节点的addChild函数把新创建的节点加入进来。通过这个单例还可以访问子节点的结构体实例。 每个单例都可以创建若干个节点，也可以调用reset函数将导出的节点的性状赋给传入的现有节点。更多api详见outline.h头文件  
        
播放动画
--------
        导入相应hpp文件和资源文件后，可通过命名空间Anims来访问导出clip的结构体，调用create函数即可创建实例，调用play函数即可让传入的节点播放动画，如  
        
        Anims::MyAnimation::create()->play(mynode,"myAnimation1",false)  
        
        其中mynode为需要播放动画的节点，"myAnimation1"为该播放行为的标记（会作为回调函数的参数传入）,第三个参数为是否重复播放，重载的第四个参数为播放完成后的回调函数,使用lambda形式 
        
使用前必读
---------
        1、第一次使用前需要设置，将creator中偏好设置-常规-导入图片时自动裁剪选项取消掉，才能保证2dx和creator的显示效果一致 
        
        2、所有node的名字首字母只能是小写 
        
        3、导出node前必须先要保存scene 
        
        4、弹出的export rule选择界面可能会比较小，把窗口拉大即可
