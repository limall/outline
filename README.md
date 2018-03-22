outline-lua &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
=======
简介
-------
* **组件化：** outline-lua(以下简称outline)致力于为cocos2d-x lua(以下简称2dx)引入组件化工作流。组件化的主要依据在于，outline导出的是节点而非场景，并且支持导出creator中的自定义组件，这些都为程序员把节点封装成组件带来了便利。
* **导出源码：** outline直接导出lua源码，配合BabelLua的代码提示，使得检索节点变得十分便利。导出源码还有个好处就是控件的创建更加灵活
* **节点模板：** outline导出的是节点模板，除了直接由根模板生成一个页面外，程序员也可以索引到某个节点模板，然后创建多个节点。例如：  
```
local card1=O.MainNode.Card:create()
local card2=O.MainNode.Card:create()
```  
* **较高的向后兼容性：** 使用outline导出无依赖文件，即使以后outline进行大规模升级，原来导出的文件可以直接使用，多个版本共同运行，互不影响

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
       export_independent_file:  如果选为true，则导出的代码不再依赖outline.lua。具有很强的兼容性的同时，文件体积会变大
       res_dst:            同时导出的资源文件，包括plist、图片、字体等。这里需填写导出的目录位置，空着则不导出
```
* 点击outline菜单子菜单export node，就会弹出选择export rule的对话框，勾选需要套用的export rule，然后点导出即可  

添加自定义组件
-------------
* 当需要为一个节点添加额外信息时，可以通过添加组件脚本的方式来进行。这和在普通creator项目中添加组件脚本并无二样。 <br>
* 导出的组件的属性名称，需要作特殊标记，标记分两种，以"o__"为前缀和以"o_"为前缀(嫌前缀碍眼可以通过display属性来修饰)。 <br>
* 属性名以"o_"为前缀的，会被嵌入到对应的节点模板中，直接作为它的成员（属性导出后会自动剔除前缀标记，下同）。 <br>
* 以"o__"为前缀的，则会以key-value对的形式导出到节点模板的outline属性的extraData表中。 <br>
　　（注：目前支持导出的数据类型为int,float,string,bool,cc.SpriteFrame，vec2（图片文件的路径））

导出动画
--------
* 拖动AnimationRecorder.js脚本至播放的node中，将需要导出的animation clip拖到它的clips数组中。 <br>
* 接着将AutoRecorder脚本拖入Canvas节点中，设置好导出的目录，再把需要导出动画的node拖到exportNode数组中。 <br>
* 在浏览器中运行项目。所有设置的动画都会在运行时自动逐个播放，都播完后会导出到指定目录。 
              
              
lua中使用outline
----------------
* **注意** 记得要将assets中用到的资源（保持目录结构），复制到2dx项目的资源根目录下。可以在ExportRule设置res_dst来自动导出 <br>
* 需要先导入outline.lua文件，并保证其他文件能通过```require("outline.outline")```找到它 <br>
* 创建node的代码如下：   
```
  require "_yourPath_.view"
  local exportNode=O.ExportNode:create()
  parent:addChild(exportNode)
```  
  也可以这样写：  
```
  require "_yourPath_.view"
  O.ExportNode:create(parent)
```

* 每个单例都可以创建若干个节点，也可以调用reset方法将导出的节点的性状赋给作为参数传入的节点...。 <br>
* outline支持Widget组件，不过如果想在父节点size变化后能适配，记得在变化后调用node:applyWidget方法 <br>
* outline.lua目前只有三百多行，支持的ui控件很少，有兴趣的朋友可以看看我的另一个项目outline-idea，里面有我写的几个控件 <br>
          
          
播放动画
--------
* 让node播放动画的代码如下：  
```
require("_yourPath_.exportClip")
local animation=Anims.ExportClip:create()
animation:play(node)
```        
* 用法与cpp版相近  
  
  
注意
---------
        1、第一次使用前需要设置，将creator中偏好设置-常规-导入图片时自动裁剪选项取消掉，才能保证2dx和creator的显示效果一致  
        
        2、导出node前必须先要保存scene 
        
        
