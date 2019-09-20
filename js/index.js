$(document).ready(function(){
    // 页眉右侧管理中心鼠标显示效果
    $(".mav-li").hover(function(){
       $(".mav-li-box").show();
    },function(){
        $(".mav-li-box").hide();
    });
    // 搜索左侧类别鼠标显示效果
    $(".classify-bt").hover(function(){
        $(".classify-box").show();
     },function(){
         $(".classify-box").hide();
     });
    //  类别tab效果
    $(".classify-box ul li").hover(function(){
        var index = $(this).index();
        $(this).addClass("hover").siblings().removeClass("hover");
        $(".classify-box-right .classify-list-box").eq(index).addClass("hoDynamic").siblings().removeClass("hoDynamic");
    });
    //  类别推荐商品点赞效果
    $(".classify-a").find(".classify-img").mouseenter(function(){
        $(this).next(".praise-box").show(100);
        $(this).next(".praise-box").mouseleave(function(){
            $(this).hide();
        });
    });
    // 搜索框顶部类型切换
    $('.search-option .commodity-a').click(function(){
        $(this).css("background",'#eb3349').css('color','#fff');
        $('.search-option .shop-a').css('background','#fff').css('color','#eb3349');
        $(this).addClass('click-a');
        $('.search-option .shop-a').removeClass('click-a');
        $("#search-input").val("请输入要搜索的商品");
    });
    $('.search-option .shop-a').click(function(){
        $(this).css("background",'#eb3349').css('color','#fff');
        $('.search-option .commodity-a').css('background','#fff').css('color','#eb3349');
        $(this).addClass('click-a');
        $('.search-option .commodity-a').removeClass('click-a');
        $("#search-input").val("请输入要搜索的店铺");
    });
    // 搜索框输入后显示下方结果
    $("#search-input").focus(function(){
        $("#search-recently").show();
        $(this).on("input propertychange",function(){
            setTimeout(function(){
                if($("#search-input").val()==''){
                    $("#search-analogy").hide();
                    $("#search-recently").show();
                }
            },100)
            $("#search-analogy").show();
            $("#search-recently").hide();
            $("#search-input").siblings().on("mouseleave",function(){
                $("#search-recently").hide();
                $("#search-analogy").hide();
            });
            
        });
        $(this).focusout(function(){
            setTimeout(function(){
                $("#search-recently").fadeOut().hide();
                $("#search-analogy").fadeOut().hide();
            },100);
        });
    });
    // 搜索框下拉点击赋值搜索框封装
    function search_fun(){
        $("#search-input").val($(this).attr("value").trim().replace(/\s/g,""));
    }
    $(document).on('click','.recently-a-list a',search_fun);
    $(document).on('click','.search-bottom-lista a',search_fun);
    // 菜单栏
    $(".menu-ul-left ul li").click(function(){
        $(".mav-ico").prependTo($(this));
    });
    /*定义位置：由于图片个数与下侧顺序按钮数量一致，可通过位置进行关联*/
    var index=0;
    var length = $(".slideshow-ul ul li").length;
     /*当鼠标放到顺序按钮上时：
     1.将当前这个顺序按钮增加样式为红色背景
     2.移除周围其他同级元素红色背景样式
     3.获取当前顺序按钮的index
     4.通过index获取该位置图片
     5.一秒钟渐入该图片
     6.一秒钟渐出其他相邻图片
     7.防止移动过快导致的效果闪现，使用stop方法
     */
    for(var i=1;i<length;i++){
        $(".switchover-bt-mag").append('<a href="javascript:;"></a>');
    }
    $(".switchover-bt-mag a").mousemove(function () {
            $(this).addClass("location").siblings().removeClass("location");
            index=$(this).index();
            $(".slideshow-ul li").eq(index).stop().fadeIn(3000).siblings().stop().fadeOut(3000);
    });
     /*设置每一秒钟自动轮播：
     1.获取当前位置序号：自加操作；当超过图片最大序号时序号设置为0
     2.设置下侧顺序按钮及轮播图显示
     */
    var time=setInterval(move,3000);
    function move() {
        index++;
        if (index==4){
            index=0
        }
        $(".switchover-bt-mag a").eq(index).addClass("location").siblings().removeClass("location");
        $(".slideshow-ul li").eq(index).stop().fadeIn(3000).siblings().stop().fadeOut(3000);
    };
    /*当鼠标划入、划出轮播图区域时：
    1.划入时停止自动轮播
    2.划出时继续自动轮播
    */
    $(".slideshow-box").hover(function () {
        $(".switchover-a a").show();
        clearInterval(time);
    },
    function () {
        $(".switchover-a a").hide();
        time=setInterval(move,3000);
    });
    // 鼠标进入左右切换按钮
     /*点击右侧按钮时执行*/
    $(".next-ico").click(function () {
       move();
    });
     /*点击左侧按钮时执行*/
    function moveL() {
        index--;
        if (index==-1){
            index=3
        }
        $(".switchover-bt-mag a").eq(index).addClass("location").siblings().removeClass("location");
        $(".slideshow-ul li").eq(index).stop().fadeIn(3000).siblings().stop().fadeOut(3000);
    }
    $(".last-ico").click(function () {
        moveL();
    });
    // 轮播图右侧tab功能
    $(".guarantee-c a").click(function(){
        var a_i = $(this).index();
        $(this).addClass('now').siblings().removeClass('now');
        $('.guarantee-text .guarantee-conter').eq(a_i).css('display','-webkit-box').siblings().hide();
    });
    // 轮播图右侧tab功能2
    $(".notice-option .option-table a").click(function(){
        var a_i = $(this).index();
        $(this).addClass('mov').siblings().removeClass('mov');
        $('.option-list .option-tab').eq(a_i).show().siblings().hide();
    });
    // 滚动效果函数封装
    // 滚动元素ID,子元素的数量，滚动长度
    function roll(id,len,wid){
        var times = 0;
        var message = setInterval(message_a,2000);
        function message_a(){
            times++;
            if(times == len){
                $(id).css({"top":"0px"});
                times=0;
            }else{
                $(id).animate({top:"-="+wid+"px"});
            }
        }
        $(id).hover(function(){
            clearInterval(message);
        },function(){
            setInterval(message_a,2000);
        })
    }
    // 轮播图右侧资讯滚动
    $(function(){
        var id = $(".message-a");
        var len = $(".message-a a").length;
        roll(id,len,19);
    });

    // 最新交易滚动
    $(function(){
        var id_jy = $(".newest-deal");
        var len_jy = $(".newest-deal li").length;
        roll(id_jy,len_jy,45);
    });
    // 欢迎商家入驻滚动
    $(function(){
        var id_rz = $(".dynamic-centre ul");
        var len_rz = $(".dynamic-centre ul li").length;
        roll(id_rz,len_rz,45);
    });
    // 店铺广播滚动
    $(function(){
        var id_dp = $(".dynamic-right ul");
        var len_dp = $(".dynamic-right ul li").length;
        roll(id_dp,len_dp,45);
    });
    // 商品tab切换
    $(function(){
        $(".option a").click(function(){
            var index = $(this).index();
            console.log(index);
            $(this).addClass("click").siblings().removeClass("click");
            $(this).parent().parent().parent().find('.hot-right .hot-right-bottom').eq(index).addClass("show").siblings().removeClass("show");
        }); 
    })
    // 数字递加动画效果函数封装
    // 元素ID，
    // function figure(id){
    //     var size = id;
    //     console.log(size);
    // }
    // 数字递加动画效果
    $(function(){
        figure($(".figure_bargain").text());
    })
    // 层次自动添加数量
    $(function(){
        $($(".sequence").toArray().reverse()).each(function(){
            $("#anchor").prepend('<li value="'+$(this).html().trim().replace(/\s/g,"")+'">'+$(this).html().trim().replace(/\s/g,"")+'</li>');
        });
        $("#anchor").find('li:eq(0)').append('<i class="selected-left-ico"></i>');
        $("#anchor").find('li:eq(0)').append('<i class="selected-right-ico"></i>');
        $("#anchor").find('li:eq(0)').addClass('selected');
        // <i class="selected-left-ico"></i>
        // <i class="selected-right-ico"></i>
    })
    // 层次选择
    $(document).on('click','#browser-left-fixed ul li',onclick);
    function onclick(){
        var top_po = true;
        if(top_po == false){
            top_po = true;
            $(".selected-left-ico").prependTo($(this));
            $(".selected-right-ico").prependTo($(this));
            $(this).addClass("selected").siblings().removeClass("selected");
            $("html, body").animate({
                scrollTop: $('#'+ $(this).attr("value")).offset().top + 'px'
            },1000);
            console.log("正在滚动"+top_po);
        }else{
            top_po.isPrizeIng = false;
            console.log("不可重复滚动"+top_po);
        }
    }
    
    // 右侧功能
    $(".browser-hide-ico").click(function(){
        $("#browser-right-fixed").removeClass('browser-right-fixed-b');
        $("#browser-right-fixed").css("width","44px");
        $(this).hide();   
    });

    $(".browser-right-fixed-list .browser-a").click(function(){
        var index = $(this).index();
        $(".browser-hide-ico").show();
        $("#browser-right-fixed").addClass('browser-right-fixed-b');
        $("#browser-right-fixed").css("width","374px");
        $(this).addClass("hover").siblings().removeClass("hover");
        $(".browser-right-fixed-list-box .boxl").eq(index).addClass("hoDynamic").siblings().removeClass("hoDynamic");
    });
    $(".service-a").hover(function(){
       $(this).find('.service-box').show(); 
    },function(){
        $(this).find('.service-box').hide(); 
    })
    // 点赞效果
    var praiseSize = false;
    $(".praise_a").click(function(){
        praiseSize = true;
        $(this).find('.praise-ico').addClass('praise-ico2').removeClass('praise-ico');
    });
    $(".WeChat-QR").hover(function(){
        $(this).find('.WeChat-QR-box').show(); 
     },function(){
         $(this).find('.WeChat-QR-box').hide(); 
     })
    //  底部合作轮播
    $(function(){
        var index = 0;
        var length = $('.collaborate-list li').length;
        function funtime(){
            index++;
            if(index==1){
                $(".collaborate-list ul").append($(".collaborate-list ul li").eq(0).clone());
                $(".collaborate-list ul li").eq(0).remove();
                $(".collaborate-list ul").animate({left:'-='+'240px'});
            }else{
                $(".collaborate-list ul").css({'left':'0px'});
                index=0;
            }
        }
        if(length > 5){
            var time = setInterval(funtime,2000);
        }
        // // 鼠标焦点
        // $('.collaborate').hover(function(){
        //     $('.cooperation-bt').show();
        //     clearInterval(time);
        // },function(){
        //     $(".cooperation-bt").hide();
        //     setInterval(funtime,2000);
        // });  
    })
    //  底部合作友情tab切换效果
    $(".blogroll-tab ul li").click(function(){
        var index = $(this).index();
        $(this).addClass("pitchon").siblings().removeClass("pitchon");
        $(".blogroll-box div").eq(index).addClass("link").siblings().removeClass("link");
    });
    // 返回顶部
    $("#top-a").click(function(){
        $('body,html').animate({scrollTop:0},3000);
    });
});