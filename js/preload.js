function preloadImg(list, imgs) {
  var def = $.Deferred(),
    len = list.length;
  $(list).each(function(i, e) {
    var img = new Image();
    img.src = e;
    if (img.complete) {
      imgs[i] = img;
      len--;
      if (len == 0) {
        def.resolve();
      }
    } else {
      img.onload = (function(j) {
        return function() {
          imgs[j] = img
          len--;
          if (len == 0) {
            def.resolve();
          }
        };
      })(i);
      img.onerror = function() {
        len--;
      };
    }
  });
  return def.promise();
}
var list = ["//static.houpix.com/theme/2016/05/softload/images/bg.jpg", "//static.houpix.com/theme/2016/05/softload/images/yu.png", "//static.houpix.com/theme/2016/05/softload/images/p1.png", "//static.houpix.com/theme/2016/05/softload/images/p2.png", "//static.houpix.com/theme/2016/05/softload/images/p3.png", "//static.houpix.com/theme/2016/05/softload/images/p4.png", "//static.houpix.com/theme/2016/05/softload/images/p5.png"], //此处省略一万个字符
  imgs = [];
$.when(preloadImg(list, imgs)).done(
  function() {
  }
);
//dpr 设置borders
var isAndroid = window.navigator.appVersion.match(/android/gi);
var isIPhone = window.navigator.appVersion.match(/iphone/gi);
var devicePixelRatio = window.devicePixelRatio;
if (isIPhone) {
  // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
  if (devicePixelRatio >= 3) {
    dpr = 3;
  } else if (devicePixelRatio >= 2) {
    dpr = 2;
  } else {
    dpr = 1;
  }
} else {
  // 其他设备下，仍旧使用1倍的方案
  dpr = 1;
}
$('html').attr('data-dpr', dpr);