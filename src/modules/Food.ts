//1.定义食物类
class Food{
    //定义一个属性表示食物所对应的元素
    element:HTMLElement;
    constructor(){
        // ! 表示对一个变量断言其非空。也就是说，
        //你可以使用!来告诉 TypeScript 编译器,某个变量在某个时候一定有值,从而避免出现空引用的错误。
        this.element = document.getElementById('food')!; //获取页面中的food元素并将其赋值给element
    }
    
    //定义获取食物X轴坐标的方法
    get X(){
        return this.element.offsetLeft;
    }
    //Y轴方法
    get Y(){
        return this.element.offsetTop;
    }
    //修改食物的位置
    change(){
        //生成随机的位置
        //食物的位置最小是0，最大是290
        //蛇移动一次就是一格，一格的大小就是10，所以就要求食物的坐标是整10
        let top = Math.round(Math.random()*29)*10;
        let left = Math.round(Math.random()*29)*10;


        this.element.style.top=top+'px';
        this.element.style.left=left+'px';
    }
}

//测试代码
// const food = new Food();
// console.log(food.X,food.Y);
// food.change();
// console.log(food.X,food.Y)

export default Food;