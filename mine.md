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

