import { defineConfig } from 'tsdown'
import tsconfig from './tsconfig.json' with { type: 'json' }

export default defineConfig( options => ( {
	entry		: [ 'src/**/index.ts' ],
	format		: [ 'cjs', 'esm' ],
	target		: tsconfig.compilerOptions.target,
	dts			: true,
	splitting	: false,
	shims		: true,
	clean		: true,
	treeshake	: true,
	minify		: ! options.watch,
	sourcemap	: !! options.watch,
	deps		: {
		skipNodeModulesBundle: true,
	}
} ) )