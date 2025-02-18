import util, { type InspectOptions } from 'util'
import { hexToAnsiTrueColor } from '@alessiofrittoli/math-utils/conversion'
import { toKebabCase } from '@alessiofrittoli/web-utils/strings'
import { ansi } from './ansi'

/** Common console arguments */
type ConsoleArguments = [ message?: unknown, ...params: unknown[] ]


/** Styleable `console` methods that prints to stdout. */
type StyleableConsoleMethod = (
	'log' | 'info' | 'group' | 'groupCollapsed'
)


/**
 * The `Console` Class provides a simple debugging console that is similar to the
 * JavaScript console mechanism provided by web browsers and adds utility methods to add custom styling
 * to printed stdout.
 *
 * Example using the `Console`:
 * ```ts
 * Console.fg.red( 'Hello there!' ).apply().log()
 * // Prints: 'Hello there!' in red.
 * Console.fg.red().apply().log( 'Same as above' )
 * // Prints: 'Same as above' in red.
 * ```
 * 
 * Printing with multiple colors:
 * ```ts
 * Console
 * 	.fg.red( 'Red ' )
 * 	.fg.green( 'Green ' )
 * 	.fg.blue( 'Blue' )
 * 	.apply().log()
 * // Prints: 'Red Green Blue' in red, green and blue respectively.
 * ```
 * 
 * Printing with multiple colors and backgrounds:
 * ```ts
 * Console
 * 	.fg.red( 'Red ' )
 * 	.bg.black()
 * 	.fg.green( 'Green' )
 * 	.apply() // apply so `black` bg is applied to the `Green` text only.
 * 	.fg.blue( ' Blue' )
 * 	.apply().log()
 * // Prints: 'Red Green Blue' in red, green with black background and blue respectively.
 * ```
 * 
 * Text decorations:
 * ```ts
 * Console
 * 	.fg.red( 'Red ' )
 * 	.bg.black()
 * 	.fg.green( 'Green' )
 * 	.apply() // apply so `black` bg is applied to the `Green` text only.
 * 	.fg.blue( ' Blue' )
 * 	.apply().log()
 * // Prints: 'Red Green Blue' in red, green with black background and blue respectively.
 * ```
 */
export class Console
{
	/**
	 * Stdout styled statements.
	 * 
	 */
	private static statements: unknown[] = []


	/**
	 * Stdout css statements.
	 * 
	 */
	private static cssStatements: string[] | null = null

	/**
	 * Default Console `InspectOptions`.
	 * 
	 */
	static readonly DEFAULT_FORMAT_OPTIONS: InspectOptions = { colors: true }


	/**
	 * Console `InspectOptions`.
	 * 
	 */
	private static formatOptions: InspectOptions | null = Console.DEFAULT_FORMAT_OPTIONS


	/**
	 * Set custom `InspectOptions`.
	 * 
	 * @param options The `InspectOptions` object or `null` to clear options.
	 * @returns The current Console reference for chaining purposes.
	 */
	static options( options: InspectOptions | null )
	{
		this.formatOptions = options
		return this
	}


	/**
	 * Handles styled stdout.
	 * 
	 * @param	method	The console method to use.
	 * @param	message	The primary message.
	 * @param	params	Additional parameters.
	 */
	private static stdOut(
		method	: StyleableConsoleMethod,
		...args	: ConsoleArguments
	)
	{
		const print = console[ method ]

		if ( args.length > 0 ) {
			this.prepare( undefined, ...args )
		}

		if ( this.cssStatements && this.cssStatements.length > 0 ) {
			this.statements.unshift( '%c' )
			this.statements.push( this.cssStatements.join( '; ' ) )
		}

		const parsed		= this.mergeAnsi( this.statements )
		const formatOptions	= this.formatOptions
		
		this.reset()
		
		if (
			formatOptions &&
			'formatWithOptions' in util &&
			Object.keys( formatOptions ).length > 0
		) {
			return print( util.formatWithOptions( formatOptions, ...parsed ) )
		}

		return print( ...parsed )
	}


	/**
	 * Merges ANSI sequences with other log data.
	 * 
	 * @param	data The array of messages and ANSI sequences.
	 * @returns	The formatted array.
	 */
	private static mergeAnsi( data: unknown[] )
	{
		const result: unknown[] = []
		let accumulator = ''

		for ( const item of data ) {
			if ( typeof item === 'string' ) {
				// eslint-disable-next-line no-control-regex
				if ( /^\x1B\[[0-9;]*m$/.test( item ) || item === '%c' ) {
					// It's an ANSI escape sequence, accumulate it
					accumulator += item
				} else {
					// It's a normal string, prepend the accumulated ANSI sequences and reset
					result.push( accumulator + item )
					accumulator = ''
				}
			} else {
				// Push arrays as they are
				result.push( item )
			}
		}

		if ( accumulator ) {
			result.push( accumulator )
		}

		if ( result.at( -1 ) === ansi.decoration.reset && typeof result.at( -2 ) === 'string' ) {
			result.pop()
			const lastStatement = result.pop() as string
			result.push( lastStatement + ansi.decoration.reset )
		}
		

		return result
	}


	/**
	 * Convert HEX text/background color to ANSI true-color.
	 * 
	 * @param	hex		A valid HEX color code.
	 * @param	type	The type of ANSI code to use.
	 * 
	 * @return	The ANSI true-color.
	 */
	private static hexToAnsi( hex: string, type: 'fg' | 'bg' )
	{	
		return hexToAnsiTrueColor( hex, type === 'bg' ? 48 : 38 )
	}

	
	/**
	 * Resets the console styled statements.
	 * 
	 */
	private static reset()
	{
		this.statements		= []
		this.cssStatements	= null
		this.formatOptions	= this.DEFAULT_FORMAT_OPTIONS
	}


	/**
	 * Add un-styled data to stdout statements.
	 * 
	 * @param	args Additional parameters.
	 * @returns	The current Console reference for chaining purposes.
	 */
	static raw( ...args: ConsoleArguments )
	{
		return this.prepare( undefined, ...args )
	}


	/**
	 * Prepares a message with ANSI styles before outputting.
	 * 
	 * @param	style	The ANSI style to apply.
	 * @param	message	The message to style.
	 * @param	args	Additional parameters.
	 * @returns	The current Console reference for chaining purposes.
	 */
	private static prepare( style?: string, ...args: ConsoleArguments )
	{
		const params: unknown[] = []

		if ( style ) params.push( style )
		if ( args.length > 0 ) params.push( ...args )
		if ( params.length <= 0 ) return this

		Console.statements.push( ...params )
		
		return this

	}


	/** Apply and ends ANSI styles. */
	static apply()
	{
		return Console.prepare( ansi.decoration.reset )
	}


	/**
	 * Text decoration ANSI styling methods.
	 * 
	 */
	static decoration = {
		/** Applies bright styling. */
		bright( ...args: ConsoleArguments )
		{
			return Console.prepare( ansi.decoration.bright, ...args )
		},
		/** Applies dim styling. */
		dim( ...args: ConsoleArguments )
		{
			return Console.prepare( ansi.decoration.dim, ...args )
		},
		/** Applies underscore styling. */
		underscore( ...args: ConsoleArguments )
		{
			return Console.prepare( ansi.decoration.underscore, ...args )
		},
		/** Applies blink styling. */
		blink( ...args: ConsoleArguments )
		{
			return Console.prepare( ansi.decoration.blink, ...args )
		},
		/** Applies reverse styling. */
		reverse( ...args: ConsoleArguments )
		{
			return Console.prepare( ansi.decoration.reverse, ...args )
		},
		/** Applies hidden styling. */
		hidden( ...args: ConsoleArguments )
		{
			return Console.prepare( ansi.decoration.hidden, ...args )
		},
	}


	/**
	 * Foreground ANSI color methods.
	 * 
	 */
	static fg = {
		/** Sets custom text color. */
		color: ( color: string, ...args: ConsoleArguments ) => (
			this.prepare( this.hexToAnsi( color, 'fg' ), ...args )
		),
		/** Sets text color to black. */
		black: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.foreground.black, ...args )
		),
		/** Sets text color to red. */
		red: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.foreground.red, ...args )
		),
		/** Sets text color to green. */
		green: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.foreground.green, ...args )
		),
		/** Sets text color to yellow. */
		yellow: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.foreground.yellow, ...args )
		),
		/** Sets text color to blue. */
		blue: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.foreground.blue, ...args )
		),
		/** Sets text color to magenta. */
		magenta: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.foreground.magenta, ...args )
		),
		/** Sets text color to cyan. */
		cyan: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.foreground.cyan, ...args )
		),
		/** Sets text color to white. */
		white: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.foreground.white, ...args )
		),
		/** Sets text color to gray. */
		gray: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.foreground.gray, ...args )
		),
		/** Sets text color to crimson. */
		crimson: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.foreground.crimson, ...args )
		),
	}


	/**
	 * Background ANSI color methods.
	 * 
	 */
	static bg = {
		/** Sets custom background color. */
		color: ( color: string, ...args: ConsoleArguments ) => (
			this.prepare( this.hexToAnsi( color, 'bg' ), ...args )
		),
		/** Sets background to black. */
		black: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.background.black, ...args )
		),
		/** Sets background to red. */
		red: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.background.red, ...args )
		),
		/** Sets background to green. */
		green: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.background.green, ...args )
		),
		/** Sets background to yellow. */
		yellow: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.background.yellow, ...args )
		),
		/** Sets background to blue. */
		blue: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.background.blue, ...args )
		),
		/** Sets background to magenta. */
		magenta: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.background.magenta, ...args )
		),
		/** Sets background to cyan. */
		cyan: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.background.cyan, ...args )
		),
		/** Sets background to white. */
		white: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.background.white, ...args )
		),
		/** Sets background to gray. */
		gray: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.background.gray, ...args )
		),
		/** Sets background to crimson. */
		crimson: ( ...args: ConsoleArguments ) => (
			this.prepare( ansi.background.crimson, ...args )
		),
	}


	/**
	 * Set custom CSS declarations. Available in client environments only.
	 * 
	 * @param css A key-value object with valid CSS declarations.
	 * @returns The current Console reference for chaining purposes.
	 */
	static css( css: Record<string, string | number> )
	{
		const declarations: string[] = []

		for ( const property in css ) {
			const value = css[ property ]
			declarations.push( [ toKebabCase( property ), value ].join( ': ' ) )
		}
		
		this.cssStatements ||= []
		this.cssStatements.push( declarations.join( '; ' ) )
		
		return this
	}


	/**
	 * Prints to `stdout` with newline. Multiple arguments can be passed, with the
	 * first used as the primary message and all additional used as substitution
	 * values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html)
	 * (the arguments are all passed to [`util.format()`](https://nodejs.org/docs/latest-v22.x/api/util.html#utilformatformat-args)).
	 *
	 * ```ts
	 * const count = 5
	 * Console.log( 'count: %d', count )
	 * // Prints: count: 5, to stdout
	 * Console.log( 'count:', count )
	 * // Prints: count: 5, to stdout
	 * ```
	 *
	 * See [`util.format()`](https://nodejs.org/docs/latest-v22.x/api/util.html#utilformatformat-args) for more information.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/log_static)
	 */
	static log( ...args: ConsoleArguments )
	{
		return Console.stdOut( 'log', ...args )
	}


	/**
	 * The `Console.info()` function is an alias for {@link Console.log()}.
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/info_static)
	 */
	static info( ...args: ConsoleArguments )
	{
		return Console.stdOut( 'info', ...args )
	}


	/**
	 * Increases indentation of subsequent lines by spaces for `groupIndentation` length.
	 *
	 * If one or more `label`s are provided, those are printed first without the
	 * additional indentation.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/group_static)
	 */
	static group( ...label: unknown[] )
	{
		return Console.stdOut( 'group', ...label )
	}


	/**
	 * An alias for {@link Collapse.group()}.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/groupCollapsed_static)
	 */
	static groupCollapsed( ...label: unknown[] )
	{
		return Console.stdOut( 'groupCollapsed', ...label )
	}

	/* --- Standard console methods. --- */

	static assert = console.assert
	static clear = console.clear
	static count = console.count
	static countReset = console.countReset
	static debug = console.debug
	static dir = console.dir
	static dirxml = console.dirxml
	static error = console.error
	static groupEnd = console.groupEnd
	static profile = console.profile
	static profileEnd = console.profileEnd
	static table = console.table
	static time = console.time
	static timeEnd = console.timeEnd
	static timeLog = console.timeLog
	static timeStamp = console.timeStamp
	static trace = console.trace
	static warn = console.warn
}