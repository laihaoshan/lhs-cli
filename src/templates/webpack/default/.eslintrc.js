module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'@vue/typescript/recommended',
		'plugin:prettier/recommended'
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'import/no-self-import': 'error', // 防止模块导入自身，避免无意义的循环导入
		'no-duplicate-imports': 'error', // 禁止重复导入
		'import/no-duplicates': 'error', // 检测模块导入重复
		eqeqeq: ['error', 'always'], //要求使用 === 或者 !==
		'no-extra-boolean-cast': 'off', // 关闭!!的检查
		'no-var': 'error', // 禁止使用var变量声明
		'no-multi-spaces': 'error', // 禁止使用多余的空格
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/no-mutating-props': 'off',
		'vue/valid-define-props': 'off',
		'vue/multi-word-component-names': 'off', // 关闭对多个单词组成的命名的检查
		'@typescript-eslint/no-explicit-any': 'off'
	}
};
