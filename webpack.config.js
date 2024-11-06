const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.ts", // 将入口文件修改为 TypeScript 文件
  context: process.cwd(),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"), // 输出目录
    filename: "monitor.js", // 输出文件名
    library: "MyLibrary", // 将库导出为 `MyLibrary`
    libraryTarget: "umd" // 导出格式为 UMD 以支持多种模块加载系统
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"), // devServer 的静态文件根目录
    before(router) {
      router.get("/success", (req, res) => {
        res.json({ id: 1 }) // 返回 200 状态的 JSON 响应
      })
      router.post("/error", (req, res) => {
        res.sendStatus(500) // 返回 500 状态
      })
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // 匹配 TypeScript 文件
        use: "ts-loader", // 使用 ts-loader 加载 TypeScript 文件
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"] // 支持解析 .ts 和 .js 文件
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 自动生成的 HTML 模板
      inject: "head" // 将脚本注入到 head 标签中
    })
  ]
}
