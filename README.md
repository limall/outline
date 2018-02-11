outline-lua &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
=======
简介
-------
* **特点：** outline-lua(以下简称outline)致力于为cocos2d-x lua(以下简称2dx，不知道是否支持quick，未作测试)引入组件化工作流。不同于官方版本，outline支持2dx3.14以下版本(我的项目3.10可以使用，具体最低支持到哪个版本还未测试)，并且支持导出自定义组件。
* **导出源码：** outline直接导出lua源码，每一次导出的node整体，或者每个animation clip都会存放于单个lua文件中，开发者只需require对应的lua文件即可直接使用。
* **节点模板：** require文件后，并非直接生成节点，而是生成每个节点的模板(名称是该节点名称的首字母改为大写)，通过节点模板的create方法便可生产该节点实例。例如：  
```local node1=O.Node1:create()```  

* **完整的节点模板索引：** 导出的节点模板，将会保持父子关系，并且所有根节点模板都挂在全局变量O中。例如，导出了节点root1,要访问其子节点child1的模板的代码：```O.Root1.Child1```,如果已经生产过节点实例，则可以通过lastNode方法获取到最新生产的节点实例，例如：```O.Root1.Child1:lastNode():setVisible(false)```  
  **获取节点模板的过程是很快的，因为它支持babel的代码提示。**  

导出node
--------
* 将资源面板outline-components目录下的ExportRule脚本拖至Canvas中的任意子节点中。 
* 设置export rule: <br>
```
       rule name:　　　　　export rule的名称,如"effectNode"; 
　　　　dst_path:　　　　导出的文件的全局路径（包含文件名），如"E:/cocospro/Classes/effectNode/view.lua"; 
　　　　src_node:　　　　　　需要导出的node，在creator直接把node拖过来即可; 
　　　　exclude_nodes:　　　导出node中需要剔除的子node; 
　　　　use_world_position:　导出的node的position是世界坐标系，还是node坐标系。
       res_dst:            同时导出的资源文件，包括plist、图片、字体等。这里需填写导出的目录位置，空着则不导出
```
* 点击outline菜单子菜单export node，就会弹出选择export rule的对话框，勾选需要套用的export rule，然后点导出即可  

添加自定义组件
-------------
* 当需要为一个节点添加额外信息时，可以通过添加组件脚本的方式来进行。这和在普通creator项目中添加组件脚本并无二样。 <br>
* 导出的组件的属性名称，需要作特殊标记，标记分两种，以"o__"为前缀和以"o_"为前缀。 <br>
* 属性名以"o_"为前缀的，会被嵌入到对应的creator结构体中，直接作为它的成员变量（属性导出后会自动剔除前缀标记，下同）。 <br>
* 以"o__"为前缀的，同一个node上的属性都会以"key:value%o__%"的形式组合成一个字符串，导出到对应creator的outline成员的mapAble成员变量中。其中key为  属性名，value为它的值，"%o__%"为每个属性的分隔符。 <br>
　　（注：目前支持导出的数据类型为int,float,string,bool,cc.SpriteFrame（图片文件的路径））

导出动画
--------
* 拖动AnimationRecorder.js脚本至播放的node中，将需要导出的animation clip拖到它的clips数组中。 <br>
* 接着将AutoRecorder脚本拖入Canvas节点中，设置好导出的目录，再把需要导出动画的node拖到exportNode数组中。 <br>
* 在浏览器中运行项目。所有设置的动画都会在运行时自动逐个播放，都播完后会导出到指定目录。 
            
2dx中使用outline
----------------
* **注意** 记得要将assets中用到的资源（保持目录结构），复制到2dx项目的资源根目录下。 <br>
* 创建node的代码如下：   
        
        
        #include "view.hpp"
        ...
        auto pNode=O::MyNode::pIt()->create(NULL); 
        
* 以上代码创建并返回创建了的节点的指针。 <br>
* "view.hpp"为导出node的hpp文件 <br>
* 如果传给create函数的是一个节点，那么将会调用这个节点的addChild函数把新创建的节点加入进来。 <br>
* 通过这个单例还可以访问子节点的结构体实例。 每个单例都可以创建若干个节点，也可以调用reset函数将导出的节点的性状赋给传入的现有节点...。 <br>
        
播放动画
--------
* 让pNode播放动画的代码如下：  
        
        #include "clip_someAnim.hpp"
        ...
        auto anim=Anims::SomeAnim::create();
        anim->play(pNode,"someAnim",false);  
        
* "myAnimation1"为该播放行为的标记（会作为回调函数的参数传入） <br>
* 第三个参数为是否重复播放 <br>
* 可以传入第四个参数作为播放完的回调函数：
          
        
        anim->play(pNode,"someAnim",false,[=](string key){
            if(key=="someAnim"){
                ...
            }
        });
使用前必读
---------
        1、第一次使用前需要设置，将creator中偏好设置-常规-导入图片时自动裁剪选项取消掉，才能保证2dx和creator的显示效果一致 
        
        2、所有node的名字首字母只能是小写 
        
        3、导出node前必须先要保存scene 
        
        4、弹出的export rule选择界面可能会比较小，把窗口拉大即可
