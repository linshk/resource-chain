# resource-chain
基于区块链技术的校内数字资源分享平台demo

## 安装和运行demo
安装前准备：
- Node: > v7
- ganache-cli

安装依赖：
```bash
$ git clone https://github.com/linshk/resource-chain
$ cd front-end
$ npm i
$ cd ..
$ cd dapp
$ npm i
```

运行demo：
```bash
# 启动以太坊客户端作为provider
$ ganache-cli -i 666
$ cd dapp
$ npm run start
$ cd ../front-end
$ npm run dev
```
在浏览器访问http://localhost:8080即可开始使用该Dapp
