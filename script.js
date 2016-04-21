$(function() {
	$('.hamburger').click(function() {
		$(this).toggleClass('is-active');
		$('#wrap').toggleClass('open');
	});
	$('nav a').click(function() {
		var target = $(this).attr('href');
		$('.hamburger').removeClass('is-active');
		$('#wrap').removeClass('open');
		$('section.active').animated('fadeOutUpBig');
		$(target).animated('fadeInUpBig');
	});

	/// 3js
	var hash3 = $('#three');
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, hash3.innerWidth()/hash3.innerHeight(), 0.1, 1000 );

	var renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( hash3.innerWidth(), hash3.innerHeight() );
	hash3.append( renderer.domElement );

	var material = new THREE.MeshPhongMaterial({color:'#F44336', emissive:'#B71C1C', shading: THREE.FlatShading, side:THREE.DoubleSide});
	var neo = new THREE.Object3D();

	var lights = [];
	var n = 3;
	for (var i = 0; i < n; i++) {
		lights.push(new THREE.PointLight(0xffffff, 1, 0));
		scene.add(lights[i]);
	}
	lights[0].position.set(0,500,0);
	lights[1].position.set(250,500,250);
	lights[2].position.set(-250,-500,-250);

	var loader = new THREE.STLLoader();
	loader.load('assets/neo.stl', function (geometry) {
		var obj = new THREE.Mesh(geometry, material);
		obj.receiveShadow = true;
		obj.castShadow = true;
		neo.add(obj);
	});
	scene.add( neo );

	camera.position.z = 20;

	var render = function () {
		requestAnimationFrame( render );

		neo.rotation.x += 0.0005;
		neo.rotation.y += 0.005;
		neo.rotation.z -= 0.0005;

		renderer.render(scene, camera);
	};

	render();

	window.addEventListener('resize', function() {
		camera.aspect = hash3.innerWidth() / hash3.innerHeight();
		camera.updateProjectionMatrix();
		renderer.setSize(  hash3.innerWidth(), hash3.innerHeight() );
	}, false);
});

$.fn.extend({
	animated: function (animationName) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		var isActive = $(this).hasClass('active');
		if (!isActive) $(this).addClass('active');
		$(this).addClass('animated ' + animationName).one(animationEnd, function() {
			$(this).removeClass('animated ' + animationName);
			if (isActive) $(this).removeClass('active');
		});
	}
});
