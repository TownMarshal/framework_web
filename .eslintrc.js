/*
 * @LastEditTime: 2021-06-16 14:53:30
 * @Description: Eslint配置
 * @Tags: @eslint
 * @FilePath: /vue-antd-admin/.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  // 解析器选项
  parserOptions: {
    parser: "babel-eslint",
    // ES版本
    ecmaVersion: 2020
  },
  rules: {
    // off   | 0 :表示关闭规则。
    // warn  | 1 :表示将该规则转换为警告。
    // error | 2 :表示将该规则转换为错误
    // 缩进风格 错误提醒 默认两个空格
    "indent": ["warn", 2, {
      SwitchCase: 1
    }],
    // 尽可能使用双引号
    "quotes": ["error", "double"],
    // 对象属性命名时 使用双引号包裹 
    // --always始终 
    // --consistent-as-needed 根据需要保持块级一致
    "quote-props": ["error", "consistent-as-needed"],
    // 语句强制分号结尾
    "semi": [2, "always"],
    // 禁止比较时使用NaN，只能用isNaN()
    "use-isnan": 2,
    // 禁止使用alert confirm prompt
    "no-alert": "error",
    // 检查未使用变量
    "no-unused-vars": ["warn", {
      // all检查所有变量是否使用，包括全局变量/局部变量。默认设置为all。
      // local 仅检查是局部声明是否使用，但可以存在不使用的全局变量。
      vars: "all",
      // 不检查形参
      args: "none"
    }],
    // 注释后需要一个空格
    "spaced-comment": ["error", "always"],
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
}