module.exports = '第一次练习webpack0222'
require('@babel/polyfill') // 高级语法重新实现低级语法
class B {

}
function * gen(params) {
 yield 1
}
console.log(gen().next())

console.log('aaa'.includes('a'))