class Vector {

	constructor( ...args ) {

		this.x = 0;
		this.y = 0;
		if ( args && args.length > 0 ) this.set( args );

	}

	set( args ) {

		if ( Array.isArray( args ) && args.length == 2 ) {

			this.x = args[ 0 ];
			this.y = args[ 1 ];

		} else if ( typeof args == 'object' ) {

			this.x = args.x;
			this.y = args.y;

		}
		return this;

	}

	add( v ) {

		this.x += v.x;
		this.y += v.y;
		return this;

	}

	sub( v ) {

		this.x -= v.x;
		this.y -= v.y;
		return this;

	}

	mult( n ) {

		this.x *= n;
		this.y *= n;
		return this;

	}

	mag() {

		return Math.sqrt( this.magSq() );

	}

	magSq() {

		const x = this.x, y = this.y;
		return x * x + y * y;

	}

	setMag( n ) {

		return this.normalize().mult( n );

	}

	normalize() {

		const len = this.mag();
		if ( len !== 0 ) this.mult( 1 / len );
		return this;

	}

	limit( n ) {

		const mSq = this.magSq();
		if ( mSq > n * n ) {

			this.mult( 1 / Math.sqrt( mSq ) )
				.mult( n );

		}
		return this;

	}

}
