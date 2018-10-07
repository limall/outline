outline-lua &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
=======
特性
-------
* **组件化：** outline-lua(以下简称outline)致力于为cocos2d-x lua(以下简称2dx)引入组件化工作流。组件化的主要依据在于，outline导出的是节点而非场景，并且支持导出creator中的自定义组件，这些都为程序员把节点封装成组件带来了便利。
* **导出源码：** outline直接导出lua源码，配合BabelLua的代码提示，检索节点变得十分便利。导出源码还有个好处就是控件的适配更加灵活
* **节点模板：** outline导出的是节点模板，除了直接由根模板生成一个页面外，程序员也可以索引到特定的某个节点模板，然后创建多个节点，甚至创建一批节点后，通过设置模板，还能再创建变了形状的节点。在保持整体性的同时，使用上更加灵活。 
* **较高的向后兼容性：** 使用outline导出无依赖文件，即使以后outline进行大规模升级，原来导出的文件可以直接使用，多个版本共同运行，互不影响

相关文章
--------
* 思路及Hello,world，可参考文章[outline-组件化cocos2dx的插件](https://www.jianshu.com/p/aba7d1deebcd)  
* 关于如何导出节点，可参考文章[outline-导出节点](https://www.jianshu.com/p/2b1766662498)  
* 关于如何导出动画，可参考文章[outline-导出动画](https://www.jianshu.com/p/a7a9e2a972f5)  

  
注意
---------
*  使用前需取消cocos creator的自动裁剪功能，这在《outline-导出节点》中会介绍步骤  
*  导出node前须先要保存scene 
*  creator项目资源目录中，不可出现名为"assets"的目录  
*  节点和图片名称除了"_"号，不可以出现其他符号
*  在使用res_dst导出图片等资源时，由于windows文件不区分大小写，所以要避免资源或资源文件夹在不区分大小写时相同的情况。比较好的避免方法是资源文件或资源文件首字母统一使用大写或小写。
        
        
