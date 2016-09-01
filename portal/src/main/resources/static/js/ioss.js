// on ready
$(function(){
	$(document).keydown(function (event) {
		switch(event.which){
			
			　　case 38:
				console.log('38');
				pickVal(38);
				break;
			
			　　case 40: 
				pickVal(40);
				console.log('40');
				break;
				
			　　default: break;
			}
	});
	$(document).keyup(function (event) {
		switch(event.which){
			
			　　case 12:
				console.log('13');
				hidelist();
				break;
				
		}
	});
	
	function hidelist(){
		$('#tips').hide();
	}
	
	$('#input').bind('input propertychange', function() {
		// todo 补充监听300ms的操作
		 console.log($(this).val());
		 $.ajax({
	          url: '/ioss/knowledge/queryhotwords?keyword='+$(this).val(),
	          type:'GET',
	          dataType: "json",
	          success: function( data ) {
	        	  // todo 判断数据的合法性
	        	  console.log(data);
	              setDom(data.data);
	          }
	        });
		});
	
	
	
	// input元素失去焦点事件发生时，清空list元素
	$('#input').blur(function(){
		var obj = $('#tips');
		setTimeout(function(){
			obj.html('');
		},300)
	});
	
	$('#searchbtn').click(function(){
		var inputContent = $('#input').val();
		if("" == inputContent){
			SimplePop.alert("请输入搜索内容...",{
		        drag: true,       // 是否可拖动图层
		    });
		}
		else{
			var url = encodeURI("/html/search_result.html?content="+inputContent);
			window.open(url);
			}
		});
			
		$(document).onkeydown=function(event){
		    var e = event || window.event || arguments.callee.caller.arguments[0];
		    
		    if(e && e.keyCode==13){ // enter 键
		    	// 要做的事情
		    	$('#searchbtn').click();}
		};

	
});

function setDom(data){
	var obj = $('#tips'),str='<div style="width:50%;display:inline-block;margin-left:20%;border:0.5px solid gainsboro;"><ul id="ul-list" style = "margin-bottom:0px;font-size:18px;line-height:2em;margin-left:-7%;">';
// obj.attr({
// "style":"display:flex;align-content:center;"
// });
	obj.html('');
	for(var i=0;i<data.length;i++){
		str+='<a href = "javascript:void(0)"><li style="list-style-type:none;padding-left:10px;">'+data[i]+'</li></a>';
	}
	str+='</ul></div>'
	obj.html(str);
	
	
	// 点击选择联想词
	obj.find('a').unbind();
	obj.find('a').on('click',function(){
		var regexstr = new RegExp("<[^<]*>", "gi");
		var content = $(this).find('li').html().replace(regexstr,"");
		$('#input').val(content);
		obj.html('');
	})
}
	
var curIndex = -1;
function pickVal(type){
	var obj = $('#tips ul li');
	var length = obj.length;
	console.log(length);
	if(length){
		obj.removeClass('l-on');
		if(type>39){
			if(curIndex<0||curIndex==length-1){
				curIndex=0;
			}else{
				curIndex++;
			}
			console.log('给第'+curIndex+'个li添加样式');
			var html = $("ul li").eq(curIndex).html()
			var regexstr = new RegExp("<[^<]*>", "gi");
			var html = html.replace(regexstr,"");
			$("#input").val(html); 
			console.log(obj.eq(curIndex).text());
			obj.eq(curIndex).addClass('l-on');
		}else{
			console.log('U');
			if(curIndex<=0||curIndex>=length){
			curIndex=length-1;
			
		}else{
			curIndex--;
		}
		console.log('给第'+curIndex+'个li添加样式');
		var html = $("ul li").eq(curIndex).html();
		var regexstr = new RegExp("<[^<]*>", "gi");
		var html = html.replace(regexstr,"");
		$("#input").val(html); 
		console.log(obj.eq(curIndex).text());
		obj.eq(curIndex).addClass('l-on');
		}
		
	}
}
