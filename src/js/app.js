import $ from 'jquery'
import { add, subtract } from './modules/math'
import '../scss/style.scss'

const item1Price = 400
const item2Price = 600
const coupon = 300
const totalPrice = add(item1Price, item2Price)
const priceAfterApplyCoupon = subtract(totalPrice, coupon)

$('body').text(priceAfterApplyCoupon)
console.log(msg)//未定義の変数を参照するのでエラー