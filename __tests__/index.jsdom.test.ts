/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { Console } from '@/index'

/** Declare an empty `util` object since `util` methods are not available in client environments. */
vi.mock('util', () => ({ util: {}, default: { util: {} } }))

describe('Console', () => {
	let logSpy: Mock

	beforeEach(() => {
		logSpy = vi.spyOn(console, 'log')
		logSpy.mockImplementation(() => {})
	})

	describe('Console.css()', () => {
		it('allows to easly add custom CSS definitions', () => {
			Console.css({
				color: 'red',
				fontFamily: 'system-ui',
				fontSize: '4rem',
				WebkitTextStroke: '1px black',
				fontWeight: 'bold',
			}).log('Some log data')

			expect(logSpy).toHaveBeenCalledWith(
				'%cSome log data',
				'color: red; font-family: system-ui; font-size: 4rem; -webkit-text-stroke: 1px black; font-weight: bold',
			)
		})
	})
})
