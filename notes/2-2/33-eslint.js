/**
 * esLint
 *
 * extends: 继承常规的配置 不用自己去手写
 *
 * prettier 手动修复
 * npx prettier xx.file --write
 *
 * git hooks
 * 通过shell脚本编写 钩子进行触发
 * .git-->hooks-->.sample 文件
 *
 *
 *
 *
 * husky 提交之前会自动的要求你格式化你的代码
 *
 * "husky": {
 *  "hooks": {
 *    "pre-commit": "lint-staged // or 自定义 npm script"
 *  }
 * },
 *
 *
 * lint-staged // 可以执行其他的命令行命令
 * "lint-staged": {
 *  "src/**.{js,vue}": [
 *  "eslint --fix",
 *  "git add"
 *      ]
 *  },
 *
 *
 *
 * */

