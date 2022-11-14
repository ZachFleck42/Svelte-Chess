module.exports = {
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
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte',
			},
		},
	],
};
