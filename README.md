# myshoppingcart(仿淘宝购物车页面)

[演示链接](http://htmlpreview.github.io/?https://github.com/lynachen/myshoppingcart/blob/master/myshoppingcart.html)


# 总体思路：

1.分析需要实现的功能：选择需要购买的商品，设置数量，计算价格，删除数据，结算等等；

2.其中计算价格为其中的重点，价格计算应该满足;
（1）当选中某条商品时，购物车的总价随之更新；当选择至少一条商品时，结算按钮颜色变化同时变为可点击事件；
（3）当选中几条商品时，遍历选中的几行，将每行的数值相加，并赋给总金额显示出来；当取消勾选或加减数量时，单选事件或全选事件，总金额联动变化。
