class Vehicle {
	constructor(img, naming, price) {
		this.img = img;
		this.naming = naming;
		this.price = price;
	}
}

const cars = [new Vehicle('resources/car1.jpg', 'Ferrari', '500.000$'), new Vehicle('resources/car2.jpg', 'Lamborghini', '499.000$')];
const bikes = [new Vehicle('resources/bike1.jpg', 'Kawasaki', '100.000$'), new Vehicle('resources/bike2.jpg', 'Samurai', '99.000$')];
const bicycles = [new Vehicle('resources/bicycle1.jpg', 'Gucci', '5.000$'), new Vehicle('resources/bicycle2.jpg', 'Tesla', '10.000$')];
const planes = [new Vehicle('resources/plane1.jpg', 'Boeing', '1.000.000$'), new Vehicle('resources/plane2.jpg', 'S7', '900.000$')];

const allVehicles = cars.concat(bikes, bicycles, planes);

const vehicleConfig = {
	'all': () => doFilter(allVehicles),
	'cars': () => doFilter(cars),
	'bikes': () => doFilter(bikes),
	'bicycles': () => doFilter(bicycles),
	'planes': () => doFilter(planes),
  	'input': () => {
  		let filteredVehicles = allVehicles.filter(v => v.naming.toUpperCase().includes(document.getElementById('search-field').value.toUpperCase()))
		doFilter(filteredVehicles);
  	}
}

function handleKeyPress(e) {
	let key = e.keyCode || e.which;
  	if (key == 13) {
     	filter('input');
  	}
}

function placeImages() {
	filter('all');
}

function filter(param) {
	vehicleConfig[param]();
}

function doFilter(imageArray) {
	Array.from(document.querySelectorAll('.flex-grid > *')).forEach(element => element.remove());

	let grid = document.getElementById('flex-grid');

	imageArray.forEach(vehicle => {
		let frame = document.createElement('div');
		frame.classList.add('frame');
		let photo = createImage(vehicle.img);
		let title = createTitle(vehicle.naming, vehicle.price);
		frame.appendChild(photo);
		frame.appendChild(title);
		grid.appendChild(frame);
	});
}

function createImage(src) {
	let photo = document.createElement('img');
	photo.src = src;
	return photo;
}

function createTitle(name, price) {
	let title = document.createElement('div');
	title.classList.add('title');
	let naming = document.createElement('p');
	let n = document.createTextNode(name);
	naming.appendChild(n);
	let pricing = document.createElement('p');
	let p = document.createTextNode(price);
	pricing.appendChild(p);
	title.appendChild(naming);
	title.appendChild(pricing);
	return title;
}
