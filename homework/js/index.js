var autoplay = true;
var autoplay_Delay = 2000; // ms
var autoplayId;
var intervalId;

var slider;
var slider_item_container;
var slider_items;
var indicator_container;

var slider_item_width;
var curIndex = 0;

window.onload = function() {
    initElement();
    initEvent();
    if (autoplay) {
        startAnimation(slider_item_container);
    }
}
// 初始化元素
function initElement() {
    slider = document.getElementById("slider");
    slider_items = slider.getElementsByTagName("li");
    slider_item_container = slider.getElementsByClassName("slieder-item-container")[0];
    indicator_container = slider.getElementsByClassName("indicator-container")[0];
    
    var firstItem = slider_items[0].cloneNode(true);
    slider_item_container.appendChild(firstItem);
    
    slider_item_width = slider_items[0].offsetWidth;
}
// 初始化相关事件
function initEvent() {
    slider.addEventListener("mouseover", function () {
        clearTimeout(autoplayId);
        autoplay = false;
    });
    slider.addEventListener("mouseout", function () {
        autoplay = true;
        startAnimation(slider_item_container);
    });
    
    var indicators = indicator_container.children;
    for (var i = 0; i < indicators.length; i++) {
        indicators[i].setAttribute("index", i);
        indicators[i].addEventListener("click", function () {
            var index = parseInt(this.getAttribute("index"));
            next(index);
        });
    }
    
    var left_arrow = slider.getElementsByClassName("left-arrow")[0];
    var right_arrow = slider.getElementsByClassName("right-arrow")[0];
    left_arrow.addEventListener("click", function () {
        prev();
    });
    right_arrow.addEventListener("click", function () {
        next();
    });
}

// 动画效果，传入的形参未要移动的元素以及移动的目标值
// 默认每10ms移动10px，手动翻页时，移动事件缩短，每次移动step值增大
function animate(element, target) {
    var step = 10;
    var time = 10;
    var gap = (Math.abs(target - element.offsetLeft) / slider_item_width);
    if (gap > 1) {
        step = step * gap;
        time = time / gap;
    }
    if (element) {
        step = (element.offsetLeft > target) ? -step : step;
        clearInterval(intervalId);
        setCurrentActiveIndicator(curIndex);
        intervalId = setInterval(function () {
            if ((step < 0) && (Math.abs(element.offsetLeft + step) < Math.abs(target))) {
                element.style.left = element.offsetLeft + step + "px";
            } else {
                if (Math.abs(target - element.offsetLeft) > Math.abs(step)) {
                    element.style.left = element.offsetLeft + step + "px";
                } else {
                    clearInterval(intervalId);
                    intervalId = -1;
                    element.style.left = target + "px";
                    if (autoplay) {
                        startAnimation(element);
                    }
                }
            }
        }, time);
    }
}
/*/ 左右翻页，改变轮播图的left值，改变当前显示的图片，再进行翻页动作，使用户感受不到过明显的跳转变化，

*/
function prev() {
    var element = slider_item_container;
    var li = element.children;
    curIndex = curIndex - 1;
    if (curIndex < 0) {
        element.style.left = -((li.length-1)*slider_item_width) + "px";
        curIndex = li.length-2;
    }
    animate(element, -(curIndex*slider_item_width));
}
// 点击小圆点，也就是单词调用next()，但需要将要跳转的下标值传入
function next(nextIndex) {
    var element = slider_item_container;
    var li = element.children;
    if ((nextIndex != null) && (typeof(nextIndex) != "undefined")) {
        curIndex = nextIndex;
    } else {
        curIndex = curIndex + 1;
        if (curIndex > (li.length-1)) {
            element.style.left = 0 + "px";
            curIndex = 1;
        }
    }
    animate(element, -(curIndex*slider_item_width));
}
// 自动播放，每次轮播图移动到目标位置后，持续调用startAnimation()，内部也是调用next()
function startAnimation(element) {
    if (autoplayId) {
        clearTimeout(autoplayId);
    }
    autoplayId = setTimeout(function () {
        next();
    }, autoplay_Delay);
}

function setCurrentActiveIndicator(index) {
    var indicators = indicator_container.children;
    if (index == indicators.length) {
        index = 0;
    }
    for (var i = 0; i < indicators.length; i++) {
        if (i == index) {
            indicators[i].className = "indicator active";
        } else {
            indicators[i].className = "indicator";
        }
        // 判断当前是第几张图并对小圆点加颜色
    }
}
