$(function(){
	var poker=[];
	var color=['h','s','c','d'];
	var biao={};
	while(poker.length<52)
	{
       var hua=color[Math.floor(Math.random()*4)];
       var shu=Math.ceil(Math.random()*13);
       var item={
       	color:hua,
       	num:shu
       }
	
	if(! biao[hua+'-'+ shu]){
		poker.push(item);
		biao[hua+'-'+shu]=true;
	  }
    }
    var index=0;
    var biao2={
    	1:'A',
        2:'2',
        3:'3',
        4:'4',
        5:'5',
        6:'6',
        7:'7',
        8:'8',
        9:'9',
        10:'T',
        11:'J',
        12:'Q',
        13:'K'
    }
	//发扑克
	var d=0;
	for(var i=0;i<7;i++){
		for(var j=0;j<i+1;j++){
			d+=100;
			index+=1;
			$('<div>')
			.addClass('pai shang')
			.css({
	            backgroundImage:'url(img/'+biao2[poker[index].num]+[poker[index].color]+'.png)'
             })
			.attr('id',i+'-'+j)
			.data('shuzi',poker[index].num)
			.appendTo('.zhuozi')
			.delay(d)
			.animate({
				left:(6-i)*50+j*100,
				top:i*50,
				opacity:1
			})
		}	
	}
	for(;index<poker.length;index++){
		d+=50;
		$('<div>')
			.addClass('pai zuo')
			.css({
	            backgroundImage:'url(img/'+biao2[poker[index].num]+[poker[index].color]+'.png)'
             })
			.data('shuzi',poker[index].num)
			.appendTo('.zhuozi')
			.delay(d)
			.animate({
				top:'450px',
	            left:'130px',
				opacity:1
			})
	}
  var shangyizhang=null;
	$('.pai').on('click',function(){
    $('.tishi').removeClass('jia')
    //判断有没有被压住
        if($(this).hasClass('shang')){
        	var tmp=$(this).attr('id').split('-');
        	var x=Number(tmp[0]);
        	var y=Number(tmp[1]);
        	if($('#'+(x+1)+'-'+y).length||$('#'+(x+1)+'-'+(y+1)).length){
        		return
        	}
        }
     //点击出现动画
    $(this).toggleClass('chulie');
    if($(this).hasClass('chulie')){
      $(this).animate({top:'-=30px'})
    }else{
            $(this).animate({top:'+=30px'})
    }

	//点到13的情况
	    if($(this).data('shuzi')===13){
	    	$(this).animate({
	    		top:0,
	    		left:600,
	    		opacity:0
	    	})
	    	.queue(function(){
	    		$(this).remove();
	    	})
	    	return
	    }else{

            //第一次点击
    if(!shangyizhang){
           shangyizhang=$(this)
    }else{
    //第二次点击
       if(shangyizhang.data('shuzi')+$(this).data('shuzi')===13){
               shangyizhang.delay('400').animate({
                top:0,
                left:600,
                opacity:0
               })
               .queue(function(){
                $(this).remove()
               })
               $(this).animate({
                top:0,
                left:600,
                opacity:0
               })
               .queue(function(){
                $(this).remove()
               })    
       }else{
           $('.tishi').addClass('jia')
           $(this).removeClass('chulie').animate({
            top:'+=30px'
          })
           shangyizhang.removeClass('chulie').delay('400').animate({
            top:'+=30px'
          })
       }
       shangyizhang=null
      
    }
      }

})//点击牌的括号
  	
  	//点击牌过去
  	var zindex=0;
  	var chishu=0;
  	$('.move-left').on('click',function(){
  		zindex+=1;
  		if(chishu>2){
  			return
  		}
        $('.pai.zuo').eq(-1).removeClass('zuo')
        .addClass('you')
        .animate({
        	left:'475px',
        	top:'450px'
        })
        .css({
        	zIndex:zindex
        })
  	})
    //点击牌回来
    $('.move-right').on('click',function(){
    	chishu+=1;
    	$('.pai.you').each(function(i,el){
    		$(this)
    		.delay(i*60)
    		.animate({
    			top:'450px',
	        left:'130px',
    		})
    		.css({
    			zIndex:0
    		})
    		.removeClass('you')
    		.addClass('zuo')
    	})
    })


//再来一次
    $('.again').on('click', function() {
        location.reload();
    })

})
    