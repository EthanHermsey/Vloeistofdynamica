importScripts( './particle.js' );
importScripts( './vector.js' );

const TIMEOUT_MS = 1000 / 60;
let positions;
const particles = [];
const G = new Vector( 0, 0 );
const M = new Vector( undefined, undefined );

self.onmessage = ( { data: { tag, data: { gravity, window, particleAmount, x, y } } } )=>{

	switch ( tag ) {

		case 'INIT':

			if ( gravity ) G.set( gravity );

			positions = new Float32Array( particleAmount * 3 ).fill( 0 );

			const d = window.height * 0.4;
			for ( let i = 0; i < particleAmount; i ++ ) {

				const r = Math.random() * Math.PI;
				const rL = Math.random();
				const x = rL * d * Math.cos( r );
				const y = Math.abs( rL * d * Math.sin( r ) );

				particles.push( new Particle(
					window.width * 0.75 + x,
					window.height * 0.1 + y,
					window
				) );

			}

			loop();
			break;

		case 'MOUSE':

			M.x = x;
			M.y = y;
			break;

	}

};

const loop = ()=>{

	setTimeout( () => {

		loop();

	}, TIMEOUT_MS );

	simulate();

};

const simulate = ()=>{

	particles.map( ( particle, index ) =>{

		particle.update( M );
		positions[ index * 3 + 0 ] = particle.position.x;
		positions[ index * 3 + 1 ] = particle.position.y;
		positions[ index * 3 + 2 ] = particle.inRange;

	} );

	postMessage( positions );

};
