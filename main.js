let worker;
let positions;
const particleAmount = 2200;
const colors = {};

function setup() {

	createCanvas( windowWidth, windowHeight );
	strokeWeight( 20 );
	background( 45 );
	background( 0, 169, 202 );

	colors.from = color( 'rgb(0,169,202)' );
	colors.to = color( 'rgb(6,12,80)' );

	worker = new Worker( './worker.js' );
	worker.onmessage = ( { data } )=>{

		positions = data;

	};
	worker.postMessage( {
		tag: 'INIT',
		data: {
			gravity: {
				x: 0,
				y: 0.1
			},
			window: {
				width: windowWidth,
				height: windowHeight
			},
			particleAmount: particleAmount
		}
	} );

}

function draw() {

	if ( ! positions ) return;

	background( 0, 169, 202, 120 );

	for ( let i = 0; i < particleAmount; i ++ ) {

		const m = map( positions[ i * 3 + 2 ], 1, 30, 0, 1, true );
		const c = lerpColor( colors.from, colors.to, m );
		c.setAlpha( 220 );
		stroke( c );

		point(
			positions[ i * 3 + 0 ],
			positions[ i * 3 + 1 ],
		);

	}

}

function mousePressed() {

	sendMouse( true );

}
function mouseReleased() {

	sendMouse( false );

}
function mouseDragged() {

	sendMouse( true );

}
function sendMouse( active ) {

	worker.postMessage( {
		tag: 'MOUSE',
		data: {
			x: active ? mouseX : undefined,
			y: active ? mouseY : undefined,
		}
	} );

}
