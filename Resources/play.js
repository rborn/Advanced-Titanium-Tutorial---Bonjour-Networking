// © Dan Tamas  - http://dan-tamas.me
// More tutorials on http://cssgallery.info/category/titanium-appcelerator/
// This code is MIT licensed.



var win = Titanium.UI.currentWindow;


Titanium.include('bj.js');


function connected_player(name) {
	alert(name);
}

var connection = bjnet(win.player.name, function(data){
	var json_data = JSON.parse(data);
	make_blob(json_data.player,json_data.coords);
});

connection.start();



var tr = Titanium.UI.create2DMatrix();
tr = tr.scale(1.5);


		
make_blob = function(player,coords) {
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
	make_blob( win.player, _ev.globalPoint);
	connection.write(JSON.stringify({coords:_ev.globalPoint,player:win.player}));
})





win.addEventListener('close', function(e) {
	connection.stop();
});