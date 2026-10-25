/// <reference types='vitest/config' />

import { viteConfig } from '@alessiofrittoli/package-configs/vite'
import { Console } from './src/index.ts'

Console.fg
	.color('#FF0000', '______')
	.fg.color('#FFA500', '______')
	.fg.color('#FFFF00', '______')
	.fg.color('#008000', '______')
	.fg.color('#0000FF', '______')
	.fg.color('#4B0082', '______')
	.fg.color('#EE82EE', '______')
	.apply()
	.raw('\n')
	.raw('      ______                       __\n')
	.raw('     / ____/___  ____  _________  / /__\n')
	.raw('    / /   / __ \\/ __ \\/ ___/ __ \\/ / _ \\\n')
	.raw('   / /___/ /_/ / / / (__  ) /_/ / /  __/\n')
	.raw('   \\____/\\____/_/ /_/____/\\____/_/\\___/')
	.raw('\n')
	.fg.color('#FF0000', '______')
	.fg.color('#FFA500', '______')
	.fg.color('#FFFF00', '______')
	.fg.color('#008000', '______')
	.fg.color('#0000FF', '______')
	.fg.color('#4B0082', '______')
	.fg.color('#EE82EE', '______')
	.apply()
	.stdout('\n')

export default viteConfig()
