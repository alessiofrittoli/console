/**
 * @jest-environment jsdom
 */
import { Console } from '@/index'

describe( 'Console', () => {

	let logSpy: jest.SpyInstance

	beforeEach( () => {
		logSpy = jest.spyOn( console, 'log' )
		logSpy.mockImplementation( () => {} )
	} )

	afterEach( () => jest.restoreAllMocks().resetModules() )

	describe( 'Console.css()', () => {

		it( 'allows to easly add custom CSS definitions', () => {
			Console.css( {
				color			: 'red',
				fontFamily		: 'system-ui',
				fontSize		: '4rem',
				WebkitTextStroke: '1px black',
				fontWeight		: 'bold',
			} ).log( 'Some log data' )

			expect( logSpy )
				.toHaveBeenCalledWith(
					'%cSome log data',
					'color: red; font-family: system-ui; font-size: 4rem; -webkit-text-stroke: 1px black; font-weight: bold',
				)
		} )
	} )

} )