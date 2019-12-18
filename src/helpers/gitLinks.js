export const injectGitData = (data) => {
	var withGit = data.map((product) => {
		const rawGit = product.linkRepo.split('github').join('raw.githubusercontent') + '/master';
		const rawReadme = rawGit + '/README.md';

		return {
			...product,
			rawGit,
			rawReadme
		};
	});
	return withGit;
};
