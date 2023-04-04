//3.定义表示记分牌的类
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

//测试代码
// const scorePanel = new ScorePanel();
// for(let i = 0;i<10;i++){
//     scorePanel.addScore();
// }

export default ScorePanel;