# Toy Vue

> 《深入浅出Vue.js》学习记录

相较于旧版本的改进:

1. 优化了`rollup`打包配置
    1. 增加`terser`压缩混淆配置
    2. 增加`alias`路径代理配置
    3. 增加`commonjs`转译`Commonjs Module`为`ES module`配置
    4. 增加`babel`配置
    5. 增加`node-resolve`配置
2. `toy-vue`根目录结构优化
    1. 增加`utils`目录存放工具类
    2. 增加`src/index.js`设置统一入口
