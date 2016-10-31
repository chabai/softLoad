function hxMessage(num) {
  var msg = document.getElementById('message');
  if (num > 0) {
    msg.innerText = num;
    msg.style.display = 'block';
  } else {
    msg.style.display = 'none';
  }
}

// 如果是2.6.2版本的app打开使用

function chat() {
  var chat = document.getElementById('chat');
  if (navigator.userAgent.match(/houpixapp\/.*?\//g)) {
    var appVersion = navigator.userAgent.match(/houpixapp\/.*?\//g).toString().split('/')[1];
  } else {
    appVersion = '2.6.0';
  }
  function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
      zeroExtend = options && options.zeroExtend,
      v1parts = v1.split('.'),
      v2parts = v2.split('.');

    function isValidPart(x) {
      return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
      return NaN;
    }

    if (zeroExtend) {
      while (v1parts.length < v2parts.length) v1parts.push("0");
      while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
      v1parts = v1parts.map(Number);
      v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
      if (v2parts.length == i) {
        return 1;
      }

      if (v1parts[i] == v2parts[i]) {
        continue;
      } else if (v1parts[i] > v2parts[i]) {
        return 1;
      } else {
        return -1;
      }
    }

    if (v1parts.length != v2parts.length) {
      return -1;
    }

    return 0;
  }

  con = versionCompare(appVersion, '2.6.2');
  if (con > -1) {
    chat.setAttribute('data-url', 'houpixapp://chat/ruanzhuang1?chatTitle=%e8%bd%af%e8%a3%85%e9%a1%be%e9%97%ae');
  }
}
chat();