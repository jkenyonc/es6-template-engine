import {template, parseTemplate} from './templating.js'

const taskTemplate = template('task');
const task = (text, checked = false) => {
	return taskTemplate({
		text,
		checked,
		bool: false,
		handleDelete(event) {
			event.target.parentElement.remove()
		},
		handleCheck(event) {
			event.target.parentElement.parentElement.toggleAttribute('data-checked')
		},
	})
};

const taskList = document.querySelector('ul');
function addTask() {
	taskList.appendChild(task(...arguments));
}


parseTemplate(document.body, {
	handleSubmit() {
		event.preventDefault()
		const form = event.target
		const elements = form.elements
		addTask(elements.text.value)
		form.reset()
	},
	legendExists: 'bleh'
}, false)