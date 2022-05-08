class Particle {

	constructor( x, y, window ) {

		this.window = window;
		this.position = new Vector( x, y );
		this.velocity = new Vector();
		this.acc = new Vector();
		this.dir = new Vector();
		this.halfWidth = window.width * 0.5;
		this.midPoint = new Vector( this.halfWidth, 0 );
		this.size = 10;
		this.bounce = 0.4;
		this.dampning = 0.93;
		this.repelRange = 20;
		this.attractRange = 45;
		this.repelForce = 5;
		this.attractForce = 0.0051;
		this.maxSpeed = 1.4;

	}

	update( mouse ) {

		this.inRange = 0;
		particles.map( otherParticle =>{

			const d = this.distSq( otherParticle.position );
			if ( d < this.repelRange * this.repelRange ) {

				//repel
				this.dir.set( this.position ).sub( otherParticle.position );
				this.dir.setMag( this.repelForce );
				this.acc.add( this.dir );
				this.inRange ++;

			} else if ( d < this.attractRange * this.attractRange ) {

				//attract
				this.dir.set( otherParticle.position ).sub( this.position );
				const dMult = ( 1.0 - ( d / 2500 ) ) * ( 1.0 - ( d / 2500 ) );
				this.dir.setMag( this.attractForce * dMult );
				this.acc.add( this.dir );
				this.inRange ++;

			}

		} );

		if ( mouse.x != undefined ) {

			const d = this.distSq( mouse );
			if ( d < 25000 ) {

				this.dir.set( this.position ).sub( mouse );
				this.dir.setMag( this.repelForce * 4 );
				this.acc.add( this.dir );

			}

		}

		this.acc.limit( this.maxSpeed );
		this.velocity.add( this.acc );

		this.position.add( this.velocity );
		this.velocity.mult( this.dampning );
		this.velocity.add( G );
		this.acc.mult( 0 );

		this.fullBounds();
		// this.bounds();

	}

	distSq( position ) {

		const dx = this.position.x - position.x, dy = this.position.y - position.y;
		return dx * dx + dy * dy;

	}

	bounds() {

		const d = this.distSq( this.midPoint );
		if ( d >= this.halfWidth * this.halfWidth ) {

			const diff = this.position.sub( this.midPoint );
			diff.setMag( this.halfWidth * 0.999 );
			this.position.set( diff ).add( this.midPoint );
			this.velocity.mult( - 1 );

		}

	}

	fullBounds() {

		const halfSize = this.size * 0.5;
		const edge = 0;
		if ( this.position.x < edge + halfSize ) {

			this.position.x = halfSize + edge;
			this.velocity.x *= - this.bounce;

		}
		if ( this.position.x > this.window.width - edge - halfSize ) {

			this.position.x = this.window.width - halfSize - edge;
			this.velocity.x *= - this.bounce;

		}

		if ( this.position.y < edge + halfSize ) {

			this.position.y = halfSize + edge;
			this.velocity.y *= - this.bounce;

		}
		if ( this.position.y > this.window.height - edge + halfSize ) {

			this.position.y = this.window.height - halfSize - edge;
			this.velocity.y *= - this.bounce;

		}

	}

}
