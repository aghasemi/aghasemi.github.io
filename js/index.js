
renderMD = async () => {

	const hash = window.location.hash
	const pgHash = hash.length===0 ? 'Home':  hash.substring(1)

	const config = await (await fetch(`/config.json`)).json()
	const my_name = config['title']
	const pages = config['pages']
	
	document.getElementById('my-name').innerHTML = my_name
	document.getElementById('copyright-holder').innerHTML = my_name
	document.getElementById('pages').innerHTML =''

	let current_page_path = `/content/${pgHash}.md` //Default path. Will be used if an array is given as list
	const page_titles = Array.isArray(pages) ? pages : Object.keys(pages)  
	
	page_titles.forEach(page_title => {
		const page_anchor = page_title.replace(/ /g, '_'); //Remove all whitespaces

		current_page_path = (page_anchor===pgHash && (typeof pages[page_title] !== 'undefined') ) ? pages[page_title] : current_page_path
		document.getElementById('pages').innerHTML += `<li class="nav-item"><a class="nav-link" href="#${page_anchor}">${page_title}</a></li>`
	});

	
	document.title =  `${my_name} - ${pgHash}`;
	const result   = await (await fetch(current_page_path) ).text()
	document.getElementById('content').innerHTML = marked(result);
	
	
}

window.addEventListener('hashchange', () => renderMD())

window.onload = () => renderMD()