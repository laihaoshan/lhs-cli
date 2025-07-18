export function stringifyLoader(loader: any): string {
	if (typeof loader === 'string') {
		return `'${loader}'`;
	} else if (loader && typeof loader === 'object') {
		const optionsStr = loader.options
			? `,
              options: ${JSON.stringify(loader.options, null, 2)
								.replace(/"([^"]+)":/g, '$1:')
								.replace(/\n/g, '\n              ')}`
			: '';
		return `{
              loader: '${loader.loader}'${optionsStr}
            }`;
	}
	return '';
}
