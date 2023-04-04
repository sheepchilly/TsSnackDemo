//4.定义一个蛇类
class Snack{
    //表示蛇头的元素
    head:HTMLElement;
    //蛇的身体 ->HTMLCollection 对象类似一个包含 HTML 元素的数组列表(实时刷新)
    bodies:HTMLCollection;
    //获取蛇的容器
    element:HTMLElement;

    constructor(){
        //蛇实际上是由snack内部的div构成的，所以操作蛇就是在操作div
        //                                              as是类型断言
        this.element = document.getElementById('snack')!;
        this.head = document.querySelector('#snack > div') as HTMLElement; //#snack >div'直接去获取#snack里的所有div
        this.bodies = this.element.getElementsByTagName('div');
        
    }
    
    //获取蛇的坐标（蛇头的坐标）
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }

    //设置蛇头的坐标
    set X(value:number){
        this.head.style.left = value + 'px';
    }
    set Y(value:number){
        this.head.style.top = value + 'px';
    }

    //蛇增加身体的方法 =>往#snack里面添加新的div
    addBody(){
        //向element中添加一个div
        //insertAdjacentHTML:将文本解析为Element元素，并将结果节点插入到DOM树中的指定位置
        //（position,text）
        this.element.insertAdjacentHTML('beforeend',"<div></div>");
    }
}

export default Snack;