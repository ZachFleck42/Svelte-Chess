module.exports = {
	tailwindConfig: './tailwind.config.cjs',
	arrowParens: 'always',
	bracketSameLine: true,
	bracketSpacing: false,
	printWidth: 120,
	proseWrap: 'always',
	semi: true,
	trailingComma: 'all',
	singleQuote: true,
	tabWidth: 2,
	useTabs: true,
	importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	// https://github.com/sveltejs/prettier-plugin-svelte/issues/155#issuecomment-831166730
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte',
			},
		},
	],
};
