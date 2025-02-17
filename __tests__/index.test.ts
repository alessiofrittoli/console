import util from 'util'
import { hexToAnsiTrueColor } from '@alessiofrittoli/math-utils'

import { Console } from '@/index'
import { ansi } from '@/ansi'


describe( 'Console', () => {

	let logSpy: jest.SpyInstance

	beforeEach( () => {
		logSpy = jest.spyOn( console, 'log' )
		logSpy.mockImplementation( () => {} )
	} )

	afterEach( () => jest.restoreAllMocks().resetModules() )


	it( 'provides a set of predefined text colors', () => {

		Object.keys( ansi.foreground ).map( color => {
			Console.fg[ color as keyof typeof Console.fg ]( 'Some log data' ).apply().log()
			expect( logSpy )
				.toHaveBeenCalledWith(
					`${ ansi.foreground[ color as keyof typeof ansi.foreground ] }Some log data${ ansi.decoration.reset }`
				)
		} )

		
	} )


	it( 'provides a set of predefined background colors', () => {

		Object.keys( ansi.background ).map( color => {
			Console.bg[ color as keyof typeof Console.bg ]( 'Some log data' ).apply().log()
			expect( logSpy )
				.toHaveBeenCalledWith(
					`${ ansi.background[ color as keyof typeof ansi.background ] }Some log data${ ansi.decoration.reset }`
				)
		} )

	} )


	it( 'provides a set of predefined text decorations', () => {

		Object.keys( ansi.decoration )
			.filter( decoration => decoration !== 'reset' )
			.map( decoration => {
				Console.decoration[ decoration as keyof typeof Console.decoration ]( 'Some log data' ).apply().log()
				expect( logSpy )
					.toHaveBeenCalledWith(
						`${ ansi.decoration[ decoration as keyof typeof ansi.decoration ] }Some log data${ ansi.decoration.reset }`
					)
			} )
		
	} )


	it( 'allows custom HEX text colors', () => {

		Console
			.fg.color( '#5AC981', 'Some log data' )
			.apply().log()
		
		expect( logSpy )
			.toHaveBeenCalledWith(
				`${ hexToAnsiTrueColor( '#5AC981', 38 ) }Some log data${ ansi.decoration.reset }`
			)

	} )


	it( 'allows custom HEX background colors', () => {

		Console
			.bg.color( '#5AC981', 'Some log data' )
			.apply().log()
		
		expect( logSpy )
			.toHaveBeenCalledWith(
				`${ hexToAnsiTrueColor( '#5AC981', 48 ) }Some log data${ ansi.decoration.reset }`
			)
		
	} )
	
	
	it( 'allows non-text output in a styled statement', () => {

		const someFunction = () => {}

		Console
			.fg.red( 'Some log data', someFunction )
			.apply().log()
		
		expect( logSpy )
			.toHaveBeenCalledWith(
				util.formatWithOptions(
					Console.DEFAULT_FORMAT_OPTIONS,
					`${ ansi.foreground.red }Some log data`,
					someFunction,
					ansi.decoration.reset
				)
			)
		
	} )


	describe( 'Console.raw()', () => {

		it( 'allows to add unstyled data to stdout', () => {

			Console.raw( 'unstyled before' )
				.fg.red( 'styled data' )
				.apply().log()

			expect( logSpy )
				.toHaveBeenCalledWith(
					`unstyled before ${ ansi.foreground.red }styled data${ ansi.decoration.reset }`
				)

		} )
	} )


	describe( 'Console.info()', () => {

		it( 'allows styled stdout', () => {

			const infoSpy = jest.spyOn( console, 'info' )
			infoSpy.mockImplementation( () => {} )

			Console.fg.red( 'Some log data' ).apply().info()

			expect( infoSpy )
				.toHaveBeenCalledWith(
					`${ ansi.foreground.red }Some log data${ ansi.decoration.reset }`
				)
		} )

	} )
	
	
	describe( 'Console.group()', () => {

		it( 'allows styled stdout', () => {

			const groupSpy = jest.spyOn( console, 'group' )
			groupSpy.mockImplementation( () => {} )

			Console.fg.red( 'Some group label' ).apply().group()

			expect( groupSpy )
				.toHaveBeenCalledWith(
					`${ ansi.foreground.red }Some group label${ ansi.decoration.reset }`
				)

		} )

	} )
	
	
	describe( 'Console.groupCollapsed()', () => {

		it( 'allows styled stdout', () => {

			const groupCollapsedSpy = jest.spyOn( console, 'groupCollapsed' )
			groupCollapsedSpy.mockImplementation( () => {} )

			Console.fg.red( 'Some groupCollapsed label' ).apply().groupCollapsed()

			expect( groupCollapsedSpy )
				.toHaveBeenCalledWith(
					`${ ansi.foreground.red }Some groupCollapsed label${ ansi.decoration.reset }`
				)

		} )

	} )


	describe( 'Console.options()', () => {

		it( 'allows custom options to Node.JS stdout', () => {

			Console
				.options( { colors: true, breakLength: 2 } )
				.log( 'See object %O', { foo: 42 } )

			expect( logSpy )
				.toHaveBeenCalledWith(
					util.formatWithOptions( { colors: true, breakLength: 2 }, 'See object %O', { foo: 42 } )
				)

		} )
		
	} )
	
	
	describe( 'Console.prepare()', () => {

		it( 'early returns `Console` reference if called with no arguments', () => {

			expect( Console[ 'prepare' ]() )
				.toBe( Console )
			
			expect( Console[ 'prepare' ]()[ 'statements' ].length )
				.toBe( 0 )

		} )

	} )


	// it( '', () => {

	// 	// Console.log( 'See object %O', { foo: 42 } )

	// 	Console.fg.color( '#FFAACC', 'Ciao pink' ).apply().log()
	// 	Console.fg.color( '#212121', 'Ciao black' ).apply().log()
	// 	Console.bg.color( '#FFAACC', 'Ciao bg ping' ).apply().log()

	// 	Console.css( {
	// 		color			: 'red',
	// 		fontFamily		: 'system-ui',
	// 		fontSize		: '4rem',
	// 		WebkitTextStroke: '1px black',
	// 		fontWeight		: 'bold',
	// 	} ).log( 'Ciaao with css' )

	// 	Console.options( { colors: true } ).log( 'See object %O', { foo: 42 } )


	// 	// Console.log(
	// 	// 	'%cStop!',
	// 	// 	'color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold'
	// 	// )

	// 	return

	// 	// Console.fg.red().log( 'ciao', 'bello' )

		
	// 	// Console
	// 	// 	.decoration.underscore()
	// 	// 	.bg.black()
	// 	// 	.fg.red( 'Data 1', 'Data 2', [ 'array', 'values' ] )
	// 	// 	.apply()
	// 	// 	.bg.cyan()
	// 	// 	.fg.black( 'Data 3', 'Data 4', [ 'array', 'values' ] )
	// 	// 	.apply()
	// 	// 	.log( 'In log method' )
		
	// 	// Console
	// 	// 	.decoration.underscore()
	// 	// 	.bg.black()
	// 	// 	.fg.red( 'Ciao' )
	// 	// 	.bg.magenta()
	// 	// 	.fg.black( [ 1, 2, 3 ] )
	// 	// 	.bg.cyan( 'We lello' )
	// 	// 	.apply().log()
	// 	// Console
	// 	// 	.decoration.underscore()
	// 	// 	.bg.black()
	// 	// 	.fg.red( '%s:%s', 'foo', 'bar', 'baz' )
	// 	// 	.bg.magenta()
	// 	// 	.fg.black( [ 1, 2, 3 ] )
	// 	// 	.bg.cyan( 'aaaaWe lello' )
	// 	// 	.apply().log()


	// 	// styled console
	// 	Console.log(
	// 		'%cStop!',
	// 		'color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold'
	// 	)
	// 	Console.log( '%cb %cb ', 'color:blue;border:1px solid black', 'color:black;border:1px solid black' )

	// 	Console.fg.red().log( 'ciao', 'bello' )

	// 	// %d token
	// 	Console.log( 'count: %d', 10, 5, 'some other string value' )
	// 	// outputs: count: 10 5 some other string value
		
	// 	// %d token
	// 	Console.fg.red( 'count: %d', 10, 5, 'some other string value' ).log()
	// 	// outputs: count: 10 5 some other string value

	// 	Console.log( '%s:%s', 'foo' )
	// 	// Outputs: 'foo:%s'

	// 	Console.fg.red( '%s:%s', 'foo' ).log()
	// 	// Outputs: 'foo:%s'
			
	// 	Console.log( '%s:%s', 'foo', 'bar' )
	// 	// Outputs: 'foo:bar'

	// 	Console.fg.red( '%s:%s', 'foo', 'bar' ).log()
	// 	// Outputs: 'foo:bar'

	// 	Console.log( '%s:%s', 'foo', 'bar', 'baz' )
	// 	// Outputs: 'foo:bar baz'
		
	// 	Console.fg.red( '%s:%s', 'foo', 'bar', 'baz' ).log()
	// 	// Outputs: 'foo:bar baz'

	// 	Console.log( 1, 2, 3 )
	// 	// Outputs: '1 2 3'
		
	// 	Console.fg.red( 1, 2, 3 ).fg.red().log( 'ciao', 'bello' )
	// 	// Outputs: '1 2 3'

	// 	Console.log( '%% %s', 'test' )
	// 	// Outputs: '% test'

	// 	// InspectOptions available in node.js only
	// 	Console.options( { colors: true } ).log( 'See object %O', { foo: 42 } )
	// 	// Outputs 'See object { foo: 42 }', where `42` is colored as a number



	// 	// Console
	// 	// 	.misc.underscore()
	// 	// 	.bg.black()
	// 	// 	.fg.red( 'Ciao' )
	// 	// 	.bg.magenta()
	// 	// 	.fg.black( [ 1, 2, 3 ] )
	// 	// 	.bg.cyan( 'We lello' )
	// 	// 	.misc.reset().log()
	// 	// Console
	// 	// 	.misc.underscore()
	// 	// 	.bg.black()
	// 	// 	.fg.red( '%s:%s', 'foo', 'bar', 'baz' )
	// 	// 	.bg.magenta()
	// 	// 	.fg.black( [ 1, 2, 3 ] )
	// 	// 	.bg.cyan( 'aaaaWe lello' )
	// 	// 	.misc.reset().log()


	// 	// ----

	// 	// Console.decoration.blink( 'Hello' ).log()

	// 	// Console.log(
	// 	// 	'%cStop!',
	// 	// 	'color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold'
	// 	// )



	// 	// // Console.log()
	// 	// Console.info( 'console info example.' )
	// 	// Console.warn( 'console warn example.' )
	// 	// Console.error( 'console error example.' )
	// 	// Console.table( {
	// 	// 	index: 'value'
	// 	// } )
	// 	// Console.groupCollapsed( 'Label', 'Ciao' )
	// 	// Console.info( 'console info example.' )
	// 	// Console.info( 'console info example.' )
	// 	// Console.info( 'console info example.' )
	// 	// Console.groupEnd()

	// 	// Console
	// 	// 	.misc.underscore()
	// 	// 	.bg.black()
	// 	// 	.fg.red( '%% %s' )
	// 	// 	.bg.magenta()
	// 	// 	.fg.black( [ 1, 2, 3 ] )
	// 	// 	.bg.cyan( 'We lello' )
	// 	// 	.misc.reset().log()

	// 	/** example with custom options */
	// 	// Console.options( { colors: true } ).log( 'See object %O', { foo: 42 } )
	// 	// Console.options( { colors: true } ).log( 'See object %O', { foo: 42 } )


	// 	// Console
	// 	// 	.bg.black()
	// 	// 	.misc.blink()
	// 	// 	.fg.red( '%s:%s', 'foo' )
	// 	// 	.misc.reset()
	// 	// 	.log()
	// 	// Console
	// 	// 	.misc.underscore()
	// 	// 	.misc.reset()
	// 	// 	.log( 'ciao' )
		
	// 	// console.log( `${ background.black }${ foreground.red }Native${ background.magenta }${ foreground.black }Native${ misc.reset }` )
	// 	// console.log( `${ background.magenta }${ foreground.black }`, [ 1, 2, 3 ], misc.reset )
	// 	// console.log( `${ background.black }${ foreground.red }Native${ background.red }${ foreground.black }Native${ misc.reset }` )
		

	// 	// // const context = 'Jest'
	// 	// // Console.log( 'count: %d', 10, 5, 'some' )
	// 	// Console.log( '%s:%s', 'foo' )
	// 	// // Returns: 'foo:%s'

	// 	// Console.log('%s:%s', 'foo', 'bar', 'baz');
	// 	// // Returns: 'foo:bar baz'

	// 	// Console.log(1, 2, 3);
	// 	// // Returns: '1 2 3'

	// 	// Console.log('%% %s');
	// 	// // Returns: '%% %s'

	// 	// // Console.log({ colors: true }, 'See object %O', { foo: 42 });
	// 	// console.log( formatWithOptions( { colors: true }, 'See object %O', { foo: 42 } ) )
	// 	// console.log( 'See object %O', { foo: 42, colors: true } )
		
	// 	// // Returns 'See object { foo: 42 }', where `42` is colored as a number
	// 	// // when printed to a terminal.
	// } )

} )