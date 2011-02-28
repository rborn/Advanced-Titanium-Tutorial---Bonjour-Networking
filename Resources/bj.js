// © Dan Tamas  - http://dan-tamas.me
// More tutorials on http://cssgallery.info/category/titanium-appcelerator/
// This code is MIT licensed.



var bjnet = function(name,fn_receive) {

	var services = null;


	var bonjourSocket = Titanium.Network.createTCPSocket({
		hostName:Titanium.Network.INADDR_ANY,
		port:40401,
		mode:Titanium.Network.READ_WRITE_MODE
	});
	
	// bonjourSocket.addEventListener('read', function(_ev) {
	// DO WE NEED THIS ?
	// )};

	var localService = Titanium.Network.createBonjourService({
		name:name,
		type:'_utest._tcp',
		domain:'local.'
	});

	// Searcher for finding other services
	var serviceBrowser = Titanium.Network.createBonjourBrowser({
		serviceType:'_utest._tcp',
		domain:'local.'
	});

	var update_services = function(e) {

		Titanium.API.info(JSON.stringify(e));
		services = e['services'];

		for (var i=0; i < services.length; i++) {
			var service = services[i];

			if ( (service.name != name) && (service.socket == null || !service.socket.isValid) ) {
				service.resolve();
				service.socket.addEventListener('read', function(x) {
					fn_receive(x['data'].text);
				});
				service.socket.connect();
			}

		}

	};

	serviceBrowser.addEventListener('updatedServices', update_services);


	return {
		start: function(){
			bonjourSocket.listen();

			try
			{
				localService.publish(bonjourSocket);
				serviceBrowser.search();
			}
			catch (e) {
				Titanium.API.info( JSON.stringify(e) );
			}
		},
		write: function(data) {
			bonjourSocket.write(data);
		},
		stop: function(){
			if (serviceBrowser.isSearching) {
				serviceBrowser.stopSearch();
			}
			Titanium.API.info('Stopped search...');
			localService.stop();
			Titanium.API.info('Stopped service...');
			if (bonjourSocket.isValid) {
				bonjourSocket.close();
			}
			Titanium.API.info('Closed socket...');
			for (var i=0; i < services.length; i++) {
				var service = services[i];
				if (service.socket.isValid) {
					service.socket.close();
				}
				Titanium.API.info('Closed socket to service '+service.name+"...");
			}
		}
	}
	
};
