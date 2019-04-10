# CSS遮罩CSS3 mask/masks详细介绍

## 一、CSS mask遮罩的过往和现状

[CSS mask](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask)遮罩属性的历史非常久远，差不多可以追溯到09年。</br>
除了IE和Edge浏览器不支持，Firefox，Chrome以及移动端等都已经全线支持。</br>
![css mask 浏览器支持情况](https://image.zhangxinxu.com/image/blog/201711/2017-11-11_194826.png)

## 二、CSS mask属性

### `mask-image` 遮罩图片

基本概念
> 定义: 遮罩使用的图片资源，遮罩原始图片只显示遮罩图片非透明部分（🤔这个让人很费解） 。</br>
> 遮罩: 遮罩层必须至少有两个图层，上面的一个图层为“遮罩层”，下面的称“被遮罩层”；这两个图层中只有相重叠的地方才会被显示。也就是说在遮罩层中有对象的地方就是“透明”的，可以看到被遮罩层中的对象，而没有对象的地方就是不透明的，被遮罩层中相应位置的对象是看不见的。 。</br>
> 默认: none 。</br>
> mask-image支持`多`遮罩图片 。</br>

支持资源
> 支持资源地址: url()、element()、动态生成的图片(如：css3渐变绘制的图片)、base64、image-set()、cross-fade()、image() 。</br>

1. image(): 由于目前Chrome和Firefox尚未支持image()功能符 。
2. image-set()、cross-fade(): 它功能符的兼容性要好很多，虽然目前Edge, Firefox都不支持，但Chrome/Safari/Android都可以无障碍使用，意味着`移动端`可以放心使用。</br>
3. element()功能符: 仅仅firefox浏览器支持。</br>

> 支持资源类型: jpg、png、svg等 。</br>

image-set()
> 主要作用是可以让不同屏幕密度设备加载不同的图片资源（之前有[文章](http://www.zhangxinxu.com/wordpress/2015/11/anatomy-of-responsive-images/)提及过）。
> 1x；1倍屏幕密度；[设备像素](http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/)比1

svg
> 其遮罩模式默认和普通图片的遮罩是不一样的，其遮罩类型是luminance，也就是基于亮度来进行遮罩的。
> 我们可以通过mask-type或mask-mode来设置SVG中mask的遮罩类型是alpha，用法为：mask-type:alpha。

### `mask-mode` 遮罩模式

基本概念
> 默认值: match-source，根据资源的类型自动采用合适的遮罩模式 。</br>
> 属性值: alpha(透明度)、luminance(亮度)、alpha(自适应) 。</br>
> 仅Firefox浏览器支持、Chrome等浏览器并不支持。它是针对所有元素的CSS3属性 。</br>

### `mask-repeat`

基本概念
> 默认值: repeat 。</br>
> 属性值: repeat-x、repeat-y、repeat、no-repeat、space、round 。</br>
> Chrome和Firefox浏览器都支持x轴y轴2两轴同时表示 。</br>
> 由于mask-image支持多遮罩图片，因此，mask-repeat也支持多属性值 。</br>

space
> 遮罩图片尽可能的平铺同时不发生任何剪裁

round
> 表示遮罩图片尽可能靠在一起没有任何间隙，同时不发生任何剪裁。这就意味着图片可能会有比例的缩放

### `mask-position` 遮罩位置

基本概念
> 默认值: 0% 0%，相对左上角定位 。</br>
> 属性值: top、bottom、left、right、center 。</br>
> 支持单个关键字（缺省关键字的解析为center）、支持垂直和水平方向两个关键字、支持各类数值 。</br>
> 由于mask-image支持多遮罩图片，因此，mask-position也支持多属性值 。</br>

### `mask-clip` 🤔 设置区域，会被遮罩图片影响

基本概念
> 默认值: border-box 。</br>
> 属性值: content-box、padding-box、border-box、fill-box、stroke-box、view-box、no-clip 。</br>
> 支持多属性值 。虽然支持的属性值挺多，但是对于普通元素而言，生效的其实就前面3个，Firefox浏览器还支持no-clip 。</br>
> fill-box，stroke-box，view-box要与SVG元素关联才有效果，目前还没有任何浏览器对其进行支持 。</br>

### `mask-origin` 🤔

基本概念
> 默认值: border-box 。</br>
> 属性值: content-box、padding-box、border-box、fill-box、stroke-box、view-box 。</br>
> 支持多属性值 。虽然支持的属性值挺多，但是对于普通元素而言，生效的其实就前面3个，Firefox浏览器还支持no-clip 。</br>
> fill-box，stroke-box，view-box要与SVG元素关联才有效果，目前还没有任何浏览器对其进行支持 。</br>

### `mask-size` 🤔

基本概念
> 默认值: auto 。</br>
> 属性值: auto、cover、contain 。</br>
> 支持各类数值（缺省高度会自动计算为auto）、同样支持多属性值 。</br>

### `mask-type` 遮罩模式

基本概念
> 默认值: luminance 。</br>
> 属性值: alpha、luminance 。</br>
> 只能作用在SVG元素上。

### `mask-composite` 🤔 设置遮罩图层的组合操作

基本概念
> 定义: 表示当同时使用多个图片进行遮罩时候的混合方式 。</br>
> 属性值(仅Firefox浏览器支持): add(累加)、subtract、intersect、exclude 。</br>
> 属性值(Chrome浏览器): source-over(Chrome默认)、source-in、source-out、source-atop、destination-over、destination-in、destination-out、destination-atop、plus-lighter、copy、clear、xor 。</br>

subtract
> 遮罩相减。也就是遮罩图片重合的地方不显示。意味着遮罩图片越多，遮罩区域越小。

intersect
> 遮罩相交。也就是遮罩图片重合的地方才显示遮罩。

exclude
> 遮罩排除。也就是后面遮罩图片重合的地方排除，当作透明处理。

source-over
> 遮罩累加。

source-in
> 重叠的位置是遮罩，不重叠的位置表现为透明。

source-out
> 重叠的位置是不遮罩，表现为透明。

source-atop
> 略。参见这个[链接](https://www.canvasapi.cn/CanvasRenderingContext2D/globalCompositeOperation)。