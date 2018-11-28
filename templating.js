const interpolateString = string =>
	new Function('data', `return \`${string}\``);

var parseTemplate = (fragment, data, parseTextNodes = true) => {
	if (parseTextNodes) {
		// let n;
		const iter = document.createNodeIterator(fragment, NodeFilter.SHOW_TEXT, null)
		const textNodes = {
			*[Symbol.iterator]() {
				const current = iter.nextNode()
				return current ? {next: current, done: false} : {done: true}
			}
		}
		for (let node of textNodes) {
			console.log(node.nodeValue)
		}
	}
	fragment.querySelectorAll('*').forEach(el => {
		el.getAttributeNames().forEach(attrName => {
			if (attrName.startsWith(':')) {
				el.setAttribute(attrName.substring(1), interpolateString(el.getAttribute(attrName))(data))
				el.removeAttribute(attr.name)
			}
			else if (attrName.startsWith('@')) {
				el.addEventListener(attrName.substring(1), data[el.getAttribute(attrName)])
				el.removeAttribute(attrName)
			}
			else if (attrName.startsWith('?')) {
				const attr = attrName.substring(1)
				if (data[attr]) {
					el.setAttribute(attr, '')
				}
				el.removeAttribute(attrName)
			}
			else if (attrName == 'if') {
				if (!data[el.getAttribute('if')]) {
					el.remove()
				}
			}
		})
	})
}

var template = id => {
	const tmpl = document.getElementById(id);
	return data => {
		const clone = tmpl.content.cloneNode(true);
		parseTemplate(clone, data)
		return clone;
	};
};

// export {template, parseTemplate}

