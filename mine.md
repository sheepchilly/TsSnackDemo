# 1.下载依赖

npm i

# 2.打包

npm run build

# 3.安装less

npm i -D less less-loader css-loader style-loader

# 4.安装postcss

npm i -D postcss postcss-loader postcss-preset-env



# 5.设置less文件的处理

```js
{
	test:/\.less$/,
    use:[
        "style-loader",
        "css-loader",
        // 引入postcss
        {
            loader: "postcss-loader",
            options: {
                postcssOptions:{
                    plugins:[
                        [
                            "postcss-preset-env",
                            {
                                browsers: 'last 2 versions'
                            }
                        ]
                    ]
                }
            }
        },
        "less-loader"
    ]
}
```

# 6.静态页面的搭建已经上传github

# 7.类

## 1.定义食物类

1.定义一个属性表示食物对应的元素 => element.HTMLElement;

2.让这个element等于页面中的food元素 => this.element = document.getElementById('food')!; => 加上！表示对一个变量断言其非空，也就是说可以使用！来告诉Ts编译器，某个变量在某个时候一定有值，从而避免出现空引用的错误。

3.如何判断蛇是否吃到了食物？

- 如果蛇的上偏移量和左偏移量和食物的一样，就证明蛇吃到了食物。
- 所以需要有一个方法可以获取到食物的坐标。

4.定义获取食物X轴坐标的方法

```js
//定义获取食物X轴坐标的方法
get X(){
        return this.element.offsetLeft;
}
//Y轴方法
get Y(){
    return this.element.offsetTop;
}
```

5.用随机数修改食物的位置

```js
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
```

## 2.定义得分类

1.设置变量来记录分数和等级 => score = 0; level =1;

2.记录分数和等级所在的元素，在构造函数中进行初始化 => scoreEle:HTMLElement; =>levelEle:HTMLElement;

3.在构造器里面获得元素对应的DOM元素

```js
this.scoreELe=document.getElementById('score')!;
this.levelEle=document.getElementById('level')!;
```

4.设置变量来限制等级和记录多少分时升级 => maxLevel:number; => upScore:number; =>在构造器里给他们默认值，同时也可以由外界修改变量值

```js
constructor(maxLevel:number=10,upScore:number=10){
    this.scoreELe=document.getElementById('score')!;
    this.levelEle=document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
}
```

5.设置一个加分方法，在方法内判断分数为多少时候Level提升

6.设置提升等级的方法

```js
class ScorePanel{
    //score和level用来记录分数和等级
    score= 0;
    level=1;
    //分数和等级所在的元素，在构造函数中进行初始化
    scoreELe:HTMLElement;
    levelEle:HTMLElement;

    //设置变量限制等级
    maxLevel:number;
    //表示多少分时升级
    upScore:number;

    constructor(maxLevel:number=10,upScore:number=10){
        this.scoreELe=document.getElementById('score')!;
        this.levelEle=document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    
    //设置一个加分的方法
    addScore(){
        this.score++;
        this.scoreELe.innerHTML = this.score + ''; //加上空字符串''代表将Number类型转为字符串类型
        //判断分数是多少
        if(this.score%this.upScore===0){ //如果分数除以10的时候等于0，就升一级
            this.levelUp()
        }
    }

    //提升等级的方法
    levelUp(){
        if(this.level<this.maxLevel){
            this.levelEle.innerHTML = ++this.level + '';
        }
    }
}
```

## 3.定义蛇类

**insertAdjacentHTML()**：

- 方法是将文本解析为 **element** 元素，并将结果节点插入到DOM树中的指定位置。它不会重新解析它正在使用的元素，因此它不会破坏元素内的现有元素。这避免了额外的序列化步骤，使其比直接使用innerHTML操作更快。
- **使用**：element.insertAdjacentHTML(position,text)
- **1.'beforebegin'：**元素element自己的前面。
  **2.'afterbegin'**：插入到元素element里面的第一个子节点之前（也就是总是会插入到最前面，例如我插入5个节点，顺序是1、2、3、4、5，那么我就需要以5、4、3、2、1的顺序插入，有一种栈结构先进后出的感觉）。
  **3.'beforeend'**：插入元素element里面的最后一个子节点之后（这个比较容易理解，就是插入到最后一个节点后，例如我插入5个节点，顺序是1、2、3、4、5，那就正常的1、2、3、4、5就好啦，但是注意是在已有节点的后面哦）。
  **4.'afterend'**：元素element自己的后面。

**1.思路**：蛇实际上是由snack内部的div构成的，所以操作蛇就是在操作div

2创建元素head、bodies、element分别表示蛇头、蛇身、蛇的容器。

3.在构造器里获取元素的HTML节点

```js
constructor(){
    //蛇实际上是由snack内部的div构成的，所以操作蛇就是在操作div
    //                                              as是类型断言
    this.element = document.getElementById('snack')!;
    this.head = document.querySelector('#snack > div') as HTMLElement; //#snack >div'直接去获取#snack里的所有div
    this.bodies = this.element.getElementsByTagName('div');

}
```

4.获取蛇头的坐标

```js
get X(){
    return this.head.offsetLeft;
}
get Y(){
    return this.head.offsetTop;
}
```

5.设置蛇头的坐标

```js
set X(value:number){
    this.head.style.left = value + 'px';
}
set Y(value:number){
    this.head.style.top = value + 'px';
}
```

6.蛇增加身体的方法

```js
addBody(){
    //向element中添加一个div
    //insertAdjacentHTML:将文本解析为Element元素，并将结果节点插入到DOM树中的指定位置
    //（position,text）
    this.element.insertAdjacentHTML('beforeend',"<div></div>");
}
```

## 4.游戏控制器类： 控制其他所有类

**上下左右按键**的返回：ArrowUp、ArrowDown、ArrowLeft、ArrowRight => keydownHandler函数里的event.key取得的返回值

1.在modules里新建一个文件GameControl，并引入其他类（snack、food、scorepanel）

2.在控制器类里面定义三个属性，在constructor中new出来实例对象

4.初始化init方法，调用后游戏开始 => init(){} => 在constructor里 this.init() => 在init方法中监听keydown事件，调用keydownHandler函数（注意：要修改回调函数的this指向，不让他指向window）

5.创建键盘按下的响应函数keydownHandler => 传入一个参数event，event.key就是键盘对应的值，把他赋值给变量direction，让类知道用户当前按下的是哪个按键。

```js
class GameControl{
    //定义三个属性
    snake:Snack;
    food:Food;
    scorePanel:ScorePanel;
    //创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction:string = '';
    constructor(){
        this.snake = new Snack();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }

    //游戏的初始化方法，调用后游戏即开始
    init(){
        //绑定键盘按键按下的事件 ->当事件触发的时候会调用keydownHandler这个函数
        //bind给谁，this就是谁 
        document.addEventListener('keydown',this.keydownHandler.bind(this))
    }
    //创建一个键盘按下的响应函数
    keydownHandler(event:KeyboardEvent){
        //需检查event.key的值是否合法（用户是否按了正确的按键）
        // if(){
            //修改direction属性 (当用户按下按键的时候存储键盘值)
            this.direction = event.key;}
    }
}
```

## 5.控制蛇移动的方法

**如何让蛇移动？**（如何反复调用run方法？）

**解决：**用**定时器**

1.创建让蛇移动的方法run()

2.根据方向this.direction来使蛇的位置改变

3.获取蛇的坐标 => 蛇的坐标在snack类中，所以用this.snack.X和this.snack.Y来获取 => 用switch判断用户按下的方向键，来控制蛇移动 => 修改蛇的X和Y值，也就是令this.snack.X和this.snack.Y 等于X和Y

4.开启一个定时器调用run方法，用isLive变量来判断蛇是否撞墙或者用户退出了，如果isLive为false就不开启定时器 => 定时器的事件随着等级Level而变化

```js
run() {
        //获取蛇当前坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        //根据按键方向来修改X值和Y值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                //向上移动top减少
                Y-=10;
                break;
            case "ArrowDown":
            case "Dwon":
                //向下移动top增加
                Y+=10;
                break;
            case "ArrowLeft":
            case "Left":
                //向左移动Left减少
                X -=10;
                break;
            case "ArrowRight":
            case "Right":
                //向右移动Left增加
                X +=10;
                break;
        }
        //修改蛇的X和Y值
        this.snake.X = X
        this.snake.Y = Y
    
        //开启一个定时调用run方法 (this.isLive为true的时候才开启定时器)
        this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30);

    }
```

## 6.检查蛇是否吃到了食物的方法

**思路：**判断蛇和食物的位置是否重合，如果重合了就证明吃到了食物 => 放在GameControl类中，这样就能得到蛇和食物的位置

1.定义一个方法checkEat()，用来检查蛇是否吃到了食物

```js
cheeckEat(X:number,Y:number){
    if(X ===this.food.X && Y ===this.food.Y){
        //1.食物的位置要进行重置
        this.food.change();
        //2.分数增加
        this.scorePanel.addScore();
        //3.蛇要增加一节
        this.snake.addBody()
    }
}
```

2.在run方法中检查蛇是否吃到了食物

```js
//检查蛇是否吃到了食物
this.cheeckEat(X,Y);
```



# 8.待处理的问题

## 1.蛇穿墙的问题

1.限制蛇的移动位置（在snack类的set X中）

```js
set X(value:number){
        //如果新值和旧值相同，则直接返回不再修改
        if(this.X === value){
            return;
        }
        //X的值的合法范围0-290之间
        if(value<0 || value>290){
            //蛇撞墙了抛出异常
            throw new Error('蛇撞墙了！');
        }
        this.head.style.left = value + 'px';
    }
    set Y(value:number){
        //如果新值和旧值相同，则直接返回不再修改
        if(this.Y === value){
            return;
        }
        //Y的值的合法范围0-290之间
        if(value<0 || value>290){
            throw new Error('蛇撞墙了！');
        }
        this.head.style.top = value + 'px';
    }
```

2.在GameControl中修改蛇的X和Y值，用try...catch捕获异常

```js
try{
    this.snake.X = X
    this.snake.Y = Y
}catch(e:any){
    //进入catch说明出现了异常，游戏结束，弹出一个提示信息
    alert(e.message+'Game Over!');
    //将isLive设置为false
    this.isLive = false
}
```

## 2.蛇的头和身体没有连起来

**思路：**将后一截的身体设置为前一截身体的位置，eg.第四节 = 第三节的位置，第三节=第二节的位置，第二节=蛇头的位置

1.在snack类中增加一个蛇身体移动的方法

```js
moveBody(){
    //遍历获取所有的身体（从后往前）
    for(let i = this.bodies.length-1; i>0 ;i--){
        //获取前面身体的位置
        let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
        let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

        //将值设置到当前身体上
        (this.bodies[i] as HTMLElement).style.left=X+'px';
        (this.bodies[i] as HTMLElement).style.top=Y+'px';
    }
}
```

2.什么时候调用方法？ 在头移动的时候就要移动身体

```js
//移动身体
this.moveBody();
```



## 3.禁止蛇掉头

**思路：**蛇头跟第二截身体的坐标一样的时候，就说明在掉头。所以要判断蛇头的X坐标和第二节身子的X坐标是否一样，判断的时候要判断是否有第二截身体

```js
//修改x时，是在修改水平坐标，蛇在左右移动（限制蛇在向左移动时，不能向右掉头）
if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
    //如果发生了掉头，让蛇向反方向继续移动
    if(value>this.X){
        //如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
        value = this.X-10;
    }else{
        value = this.X+10;
    }
}
```



## 4.蛇撞自己的问题

**思路：**检查蛇头的坐标和每一个身体的坐标有没有发生重复，如果重复了就证明撞到自己了。

- 需要获取到蛇头的最新坐标

1.新增一个方法

```js
//检查头和身体有没有相撞
checkHeadBody(){
    //获取所有的身体，检查其是否和蛇头坐标发生重叠
    for(let i =1;i<this.bodies.length;i++){
        let bd = this.bodies[i] as HTMLElement
        if(this.X === bd.offsetLeft && this.Y === bd.offsetTop ){
            //进入判断说明蛇头撞到了身体，游戏结束
            throw new Error('撞到自己了~~');
        }
    }
}
```

2.在每次坐标发生变化的时候检查有没有撞到自己 => 在set X()和set Y()中

```js
this.checkHeadBody();
```

