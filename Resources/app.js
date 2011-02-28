// © Dan Tamas  - http://dan-tamas.me
// More tutorials on http://cssgallery.info/category/titanium-appcelerator/
// This code is MIT licensed.



// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

Titanium.include('bj.js');

var win = Titanium.UI.createWindow({  
	backgroundColor:'#000',
	layout:'vertical'
});


win.add( Titanium.UI.createLabel({
	text:'Choose your weapon!',
	color:'#fff',
	textAlign:'center',
	font:{
		fontWeight:'bold',
		fontSize:28
	},
	height:40,
	top:0
}));


var red = Titanium.UI.createView({
	top:33,
	height:100,
	width:100,
	backgroundColor:'#f00',
	backgroundGradient:{
		type:'radial',
		colors:['#f99','#f00'],
		startPoint:{x:33,y:33},
		endPoint:{x:33,y:33},
		backFillStart:true
	},
	borderRadius:50,
	borderColor:'#fff',
	borderWidth:2,
	player:{
		name:'red',
		color:'#f00'
	}	
});



var green = Titanium.UI.createView({
	top:33,
	height:100,
	width:100,
	backgroundColor:'#0f0',
	backgroundGradient:{
		type:'radial',
		colors:['#9f9','#0f0'],
		startPoint:{x:33,y:33},
		endPoint:{x:33,y:33},
		backFillStart:true
	},
	borderRadius:50,
	borderColor:'#fff',
	borderWidth:2,
	player:{
		name:'green',
		color:'#0f0'
	}
});


var blue = Titanium.UI.createView({
	top:33,
	height:100,
	width:100,
	backgroundColor:'#00f',
	backgroundGradient:{
		type:'radial',
		colors:['#99f','#00f'],
		startPoint:{x:33,y:33},
		endPoint:{x:33,y:33},
		backFillStart:true
	},
	borderRadius:50,
	borderColor:'#fff',
	borderWidth:2,
	player:{
		name:'blue',
		color:'#00f'
	}	
});

win.add(red);
win.add(green);
win.add(blue);

win.open();


var play_win =  Titanium.UI.createWindow({
	url:'play.js',
	width:320,
	height:480,
	backgroundColor:'#000'
});


var tr = Titanium.UI.create2DMatrix();
tr = tr.scale(1.5);


function make_blob(player,coords) {
	var the_blob = Titanium.UI.createView({
		center:coords,
		height:30,
		width:30,
		backgroundColor:player.color,
		backgroundGradient:{
			type:'radial',
			colors:[player.color.replace(/0/g,9),player.color],
			startPoint:{x:10,y:10},
			endPoint:{x:10,y:10},
			backFillStart:true
		},
		borderRadius:15,
		borderColor:'#fff',
		borderWidth:1
	}); 
	
	win.add(the_blob);
	
	the_blob.animate({
		transform:tr,
		repeat:3,
		autoreverse:true,
		duration:100,
		curve:Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
}



win.addEventListener('click', function(_ev) {
	if ( _ev.source.player ){
		play_win.player = _ev.source.player;
		play_win.open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	}
});


