$.ajax({url: "https://api.github.com/users/neolwc/repos"}).done(function (repos) {
	var avatar = new Image();
	avatar.src = repos[0].owner.avatar_url;
	$('.avatar').append(avatar);
	var sorted = repos.sort(function (a, b) {return new Date(b.pushed_at) - new Date(a.pushed_at);});
	sorted.forEach(function (repo) {
		var a = document.createElement('a');
		$(a).attr('href', repo.html_url).attr('target', '_blank').text(repo.full_name);
		$('.list').append(a);
	});
});
