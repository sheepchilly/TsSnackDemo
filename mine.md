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

