const interpolateString = string =>
	new Function('data', `return \`${string}\``);

const parseTemplate = (fragment, data, parseTextNodes=true) => {
	if (parseTextNodes) {
		let n;
		let walk = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT, null, false);
		while ((n = walk.nextNode())) {
			if(n.nodeValue.trim()) {
				n.nodeValue = interpolateString(n.nodeValue)(data);
			}
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

const template = id => {
	const tmpl = document.getElementById(id);
	return data => {
		const clone = tmpl.content.cloneNode(true);
		parseTemplate(clone, data)
		return clone;
	};
};

export {template, parseTemplate}

