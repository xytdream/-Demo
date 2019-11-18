/**
 * 兼容IE8及以下浏览器的获取元素样式的方法
 * 
 * 参数：
 *  obj: 获取样式的对象
 *  name： 获取样式的样式名
 */
function getStyle(obj,name){
    if(window.getComputedStyle){
        // return getComputedStyle(obj,null)[name]
        //在新版中，已经抛弃了伪类元素的使用，所以可以不用写第二个参数null
        return getComputedStyle(obj)[name]
    }else{
        return obj.currentStyle[name]
    }
}

//创建一个用来和执行移动动画效果的函数
/**
 * 参数：
 *  1.obj:动画执行的对象
 *  2.attr:执行动画的样式 
 *  3.target:动画执行的目标位置
 *  4.speed:移动速度
 *  5.callback: 回调函数，在动画执行完毕后执行（该参数可传可不传）
 */
function move(obj , attr , target , speed , callback){
    //关闭上一个开启的定时器
    clearInterval(obj.timer)

    //获取对象执行动画样式的当前值
    var current = parseInt(getStyle(obj,attr))
    // 判断speed的正负值
    if(target < current){
        speed = -speed;
    }

    // 开启一个定时器，用来执行动画效果
    //给执行动画对象obj添加一个timer属性，用来保存它自己的定时器标识。避免不同的元素共用一个定时器标识
    obj.timer = setInterval(function(){
        //获取对象执行动画样式的当前值
        var oldValue = parseInt(getStyle(obj,attr))
        
        //在旧值的基础上生成一个新值
        var newValue = oldValue + speed;
        
        if( (speed > 0 && newValue >= target) || (speed < 0 && newValue <= target) ){
            newValue = target;
        }

        //将新值赋值给box1的left
        obj.style[attr] = newValue + "px";

        if(newValue == target){
            //到达目标位置，关闭当前定时器
            clearInterval(obj.timer);

            //调用回调函数
            callback && callback();
        }
    },30)   
}