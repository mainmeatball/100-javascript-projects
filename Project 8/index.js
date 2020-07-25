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
	switch (param) {
		case 'all':
			doFilter(allVehicles);
			break;
		case 'cars':
			doFilter(cars);
			break;
		case 'bikes':
			doFilter(bikes);
			break;
		case 'bicycles':
			doFilter(bicycles);
			break;
		case 'planes':
			doFilter(planes);
			break;
		case 'input':
			let filteredVehicles = allVehicles.filter(v => v.naming.toUpperCase().includes(document.getElementById('search-field').value.toUpperCase()))
			doFilter(filteredVehicles);
			break;
		default:
			throw new Error('Illegal Argument Exception');
			break;
	}
}

function doFilter(imageArray) {
	let col1 = document.getElementById('col1');
	let col2 = document.getElementById('col2');
	let col3 = document.getElementById('col3');

	let columns = [col1, col2, col3];
	let index = 0;

	columns.forEach(col => {
		while (col.lastChild) {
  			col.removeChild(col.lastChild);
		}
	})

	imageArray.forEach(vehicle => {
		let frame = document.createElement('div');
		frame.classList.add('frame');
		let photo = document.createElement('img');
		photo.src = vehicle.img;
		let title = document.createElement('div');
		title.classList.add('title');
		let naming = document.createElement('p');
		let name = document.createTextNode(vehicle.naming);
		naming.appendChild(name);
		let price = document.createElement('p');
		let p = document.createTextNode(vehicle.price);
		price.appendChild(p);
		title.appendChild(naming);
		title.appendChild(price);
		frame.appendChild(photo);
		frame.appendChild(title)
		columns[index++ % columns.length].appendChild(frame);
	});
}
