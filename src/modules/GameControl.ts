//引入其他类
import Snack from './Snack'
import Food from './Food'
import ScorePanel from './ScorePanel'


//游戏控制器：控制其他所有类
class GameControl {
    //定义三个属性
    snake: Snack;
    food: Food;
    scorePanel: ScorePanel;

    //创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = '';
    //创建一个属性用来记录游戏是否结束
    isLive = true

    constructor() {
        this.snake = new Snack();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10,2);

        this.init();
    }

    //游戏的初始化方法，调用后游戏即开始
    init() {
        //绑定键盘按键按下的事件 ->当事件触发的时候会调用keydownHandler这个函数
        //bind给谁，this就是谁
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        //调用run方法使蛇移动 -> 放在这里蛇不能动
        this.run()
    }
    //创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        //需检查event.key的值是否合法（用户是否按了正确的按键）
        // if(){
        //修改direction属性 (当用户按下按键的时候存储键盘值)
        this.direction = event.key;
        // }

    }

    //创建一个控制蛇移动的方法
    run() {
        //根据方向（this.direction）来使蛇的位置改变
        /*
            向上 top 减少
            向下 top 增加
            向左 left 减少
            向右 left 增加
        */

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
        try{
            this.snake.X = X
            this.snake.Y = Y
        }catch(e:any){
            //进入catch说明出现了异常，游戏结束，弹出一个提示信息
            alert(e.message+'Game Over!');
            //将isLive设置为false
            this.isLive = false
        }

        //开启一个定时调用run方法 (this.isLive为true的时候才开启定时器)
        this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30);

        //检查蛇是否吃到了食物
        this.cheeckEat(X,Y);
    }
    

    //定义一个方法，用来检查蛇是否吃到了食物
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
}

export default GameControl