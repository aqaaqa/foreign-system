## Build Setup

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev

# 项目打包
#注意事项 vue-cli打包成dist后默认是必须在http服务器环境下才能正常运行
npm run build:prod
npm run build:stage

#数组里的属性改变，视图不渲染解决办法
https://blog.csdn.net/dong8508/article/details/80734528
```
