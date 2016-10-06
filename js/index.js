$(function(){
	function makePoker(){
		var poker=[];
		var colors=['h','s','c','d'];
		var table={};
		while(poker.length!=52){
			var n=Math.ceil(Math.random()*13)
			var c=colors[Math.floor(Math.random()*4)]
			var v={color:c,
					number:n}
			if(!table[c+n]){
				table[c+n]=true;
				poker.push(v)

			}
			}return poker;
	}
	var poker=makePoker();

	function setPoker(poker){
		var dict={1:'A',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'T',11:'J',12:'Q',13:'K'}
		var index=0;
		for(var i=0,poke;i<7;i++){
			for(var j=0;j<i+1;j++){
				poke=poker[index]
				index+=1;

			$('<div>').addClass('pai')
						.attr('data_number',poke.number)
						.attr('id',i+'_'+j)
						.css('background-image','url(./image/'+dict[poke.number]+poke.color+'.png)')
						.appendTo('.scene')
						.delay(index*30)
						.animate({
							top:i*40,
							left:(6-i)*40+j*130
						})
			}		
		}
		for(var v;index<poker.length;index++){
			v=poker[index]
			$('<div>').addClass('pai left')
					.attr('data_number',v.number)
					// .attr('id',i+'_'+j)
					.css('background-image','url(./image/'+dict[v.number]+v.color+'.png)')
					.appendTo('.scene')
					.delay(index*30)
					.animate({
						top:410,
						left:190
					})
		}
	
	}
	// setPoker(poker)
	
//弹窗

	var s=0;
	var m=0;
	var f=0;
	var x=0;
		$('.move_left').css({opacity:0})
		$('.move_right').css({opacity:0})
		$('.start').css({opacity:0})
		$('.over1').css({opacity:0})
		$('.score').css({opacity:0})
		$('.time').css({opacity:0})
		$('.defen').css({opacity:0})

	$('.yes').on('click',function(){
		$('.move_left').css({opacity:1})
		$('.move_right').css({opacity:1})
		$('.start').css({opacity:1})
		$('.over1').css({opacity:1})
		$('.score').css({opacity:1})
		$('.time').css({opacity:1})
		$('.defen').css({opacity:1})

		$('.pro').animate({opacity:0})
		setPoker(poker)
			t=setInterval(function(){
				s+=1;
				if(s>9){s=0;m+=1;}
				if(m>5){m=0;f+=1;}
				if(f>9){f=0;x+=1;}
				$(".time").text(""+x+f+":"+""+m+s+"")
			},1000)
	})
	$('.yes').on('click',false)

	$('.no').on('click',function(){

		$('.start').css({opacity:1})
		$('.over1').css({opacity:1})
		$('.score').css({opacity:1})
		$('.time').css({opacity:1})
		$('.defen').css({opacity:1})

		$('.pro').animate({opacity:0})
		return
	})
	$('.no').on('click',false)
	
	var score;
	$('.start').on('click',function(){
		$('.move_left').css({opacity:1})
		$('.move_right').css({opacity:1})
		$('.pai').remove()
		setPoker(poker)
		score=0;
		$('.score').text(score)
		// $(".time").text(" "+0+0+" :  "+0+0+" ")
		clearInterval(t)
			var s=0;
			var m=0;
			var f=0;
			var x=0;
			t=setInterval(function(){
				s+=1;
				if(s>9){s=0;m+=1;}
				if(m>5){m=0;f+=1;}
				if(f>9){f=0;x+=1;}
				$(".time").text(""+x+f+":"+m+s+"")
			},1000)
	
	})
	
//向右移动
	var moveRight=$('.scene .move_right')
	var zIndex=1;
	moveRight.on('click',function(){
		if($('.left').length){
			$('.left').last()
						.css('z-index',zIndex++)
						.animate({left:690})
						.queue(function(){
							$(this).dequeue()
							.removeClass('left')
							.addClass('right')
						})
		}
		
	})
	moveRight.on('mousedown',false)
//向左移动
	var moveLeft=$('.scene .move_left')
	var number=0;
	moveLeft.on('click',function(){
		number++;
		if(number>3){
			alert('移动次数已经达到上限次数')
			return;
			
		}
		if($('.left').length){return}
		$('.right').each(function(i,v){
			$(this)
				.delay(i*130)
				.css('z-index',0)
				.animate({left:190})
		})
		.queue(function(){
			$(this).dequeue()
			.removeClass('right')
			.addClass('left')
		})
	})

	moveLeft.on('mousedown',false)
//运算
	function getNumber(el){
		return parseInt($(el).attr('data_number'))
	}
	function isCanClick(el){
		var x=parseInt($(el).attr('id').split('_')[0]);
		var y=parseInt($(el).attr('id').split('_')[1]);
		if($('#'+(x+1)+'_'+y).length || $('#'+(x+1)+'_'+(y+1)).length){
			return false;
		}else{
			return true;
		}
	}


	var prev=null;var score=0;
	$('.scene').on('click','.pai',function(){
		var num=parseInt($(this).attr('data_number'))

		if($(this).attr('id')&& !isCanClick(this)){
			return;
		}
		$(this).css({'border':'5px solid red'})
		$(this).animate({marginTop:20})
		
		//如果是13，直接消除，函数返回；
		if(num===13){
			score+=10;
			var s=$('.score').text(score)
			$('.over1').on('click',function(){
				// alert('成绩还不错哦！'+score+'分')
				clearInterval(t)
				$('.pai').detach()
				$('.move_left').css({opacity:0})
				$('.move_right').css({opacity:0})

			})
			$('.over1').on('click',false)
			$(this).animate({top:0,left:700})
					.queue(function(){
						$(this).detach().dequeue();
					})
					return;
		}
		if(prev){
			if(getNumber(prev)+getNumber(this)===13){
			score+=10;
			var s=$('.score').text(score)
			if(score==280){
			alert('过关了！')
			}
			$('.over1').on('click',function(){
				// alert('成绩还不错哦！'+score+'分')
				clearInterval(t)
				$('.pai').detach()
				$('.move_left').css({opacity:0})
				$('.move_right').css({opacity:0})

			// return
			})
			$('.over').on('click',false)
				prev.add(this).animate({
					top:0,
					left:700
				}).queue(function(){
						$(this).detach().dequeue();
					})
			}else{
				prev.add(this).css({'border':'0px'})
				prev.add(this).animate({marginTop:0})
			}prev=null;

		}else{prev=$(this)}

	})
	$('.over1').on('click',function(){
		alert("成绩还不错哦!"+$('.score').text()+'分')
	})

})