export const injectGitData = (data) => {
	var withGit = data.map((product) => {
		const linkRepo = product.linkRepo.replace('http', 'https')
		const rawGit = linkRepo.split('github').join('raw.githubusercontent') + '/master';
		const rawReadme = rawGit + '/README.md';

		return {
			...product,
			linkRepo,
			rawGit,
			rawReadme
		};
	});
	return withGit;
};
