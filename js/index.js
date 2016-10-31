$(function() {
  var ua = window.navigator.userAgent;
  var apiUrl = "";
  if (ua.indexOf("houpixapp") != -1) {
    apiUrl = 'https://api.houpix.com/';
  } else {
    apiUrl = 'https://api.houpix.com/v2.6/';
  }
  var pageIndex = 1;
  var flag = 1;
  var arr = new Array();
  interaction();
  $(window).scroll(function() {
      var scrollTop = $(window).scrollTop();
      var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
      if (scrollBottom === 0 && flag) {
        interaction();
      };
    })
    //ajax读数据
  function interaction() {
    var dataUrl = apiUrl + 'community/topic/topiclist?categoryid=1014&page=' + pageIndex;
    $.get(dataUrl, function(data) {
      if (ua.indexOf("houpixapp/") != -1) {
        var info = data;
      } else {
        info = JSON.parse(data);
      }
      var len = $(info.data.homepageTopics).length;
      if (arr.indexOf(dataUrl) == -1) {
        arr.push(dataUrl);
        $(".container").append("<ul class=ul" + pageIndex + "></ul>");
        for (var i = 0; i < len; i++) {
          $(".ul" + pageIndex).append('<li><div class="flow"><a href="" data-url="houpixapp://topic/"><img src="" alt="" class="img1"></a></div><div class="clearfix count"><p class="label"></p><p class="message"> <i class="yuyue icon-pinglun ic"></i><span class="num"></span><i class="yuyue icon-liulan ic"></i><span class="view"></span></p></div></li>');
        }
        $(".ul" + pageIndex + " li").each(function() {
          var i = $(this).index();
          $(this).find(".flow img").attr("src", "https://image.houpix.com/" + info.data.homepageTopics[i].cover_img);
          $(this).find("a").attr("data-url", "houpixapp://topic/" + info.data.homepageTopics[i].topic_id);
          $(this).find(".label").text("# " + info.data.homepageTopics[i].module_name + " #");
          $(this).find(".num").text(info.data.homepageTopics[i].reply_count);
          $(this).find(".view").text(info.data.homepageTopics[i].viewed_count);
        });
        main();
        pageIndex += 1;
        $(".load").html("上拉加载更多...");
        if (pageIndex > 3) {
          flag = 0;
          $(".load").html("到底啦！");
        }
      }
    })
  }
})

//活动说明，关闭按钮
$(function() {
  $(".close").click(function() {
      $(".intro").css("display", "none");
      $(this).css("display", "none");
    })
    //百度统计

  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?f5b545b97a553520be943ba860a3aebe";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
})