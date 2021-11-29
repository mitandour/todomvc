/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

/// <reference path="../interfaces.d.ts"/>

import { Utils } from "../../utils";
import { ITag, ITodo, ITodoModel } from "../interfaces";

// Generic "model" object. You can use whatever
// framework you want. For this application it
// may not even be worth separating this logic
// out, but we do this to demonstrate one way to
// separate out parts of your application.
class TodoModel implements ITodoModel {
	public key: string;
	public todos: Array<ITodo>;
	public onChanges: Array<any>;

	constructor(key) {
		this.key = key;
		this.todos = Utils.store(key);
		this.onChanges = [];
	}

	public subscribe(onChange) {
		this.onChanges.push(onChange);
	}

	public inform() {
		Utils.store(this.key, this.todos);
		this.onChanges.forEach(function (cb) {
			cb();
		});
	}

	public addTodo(title: string) {
		const tags = Utils.extractTags(title);
		this.todos = this.todos.concat({
			id: Utils.uuid(),
			title: Utils.extractTodo(title),
			completed: false,
			tags:
				tags.length != 0
					? tags.map((tag) => {
							return { id: Utils.uuid(), label: tag.substring(1) };
					  })
					: null,
		});
		console.log("from add", this.todos);
		this.inform();
	}

	public toggleAll(checked: Boolean) {
		// Note: It's usually better to use immutable data structures since they're
		// easier to reason about and React works very well with them. That's why
		// we use map(), filter() and reduce() everywhere instead of mutating the
		// array or todo items themselves.
		this.todos = this.todos.map<ITodo>((todo: ITodo) => {
			return Utils.extend({}, todo, { completed: checked });
		});

		this.inform();
	}

	public toggle(todoToToggle: ITodo) {
		this.todos = this.todos.map<ITodo>((todo: ITodo) => {
			return todo !== todoToToggle
				? todo
				: Utils.extend({}, todo, { completed: !todo.completed });
		});

		this.inform();
	}

	public destroy(todo: ITodo) {
		this.todos = this.todos.filter(function (candidate) {
			return candidate !== todo;
		});

		this.inform();
	}

	public save(todoToSave: ITodo, tagsToSave: ITag[], text: string) {
		this.todos = this.todos.map(function (todo) {
			return todo.id !== todoToSave.id
				? todo
				: Utils.extend({}, todo, { title: text, tags: [...tagsToSave] });
		});
		this.inform();
	}

	public clearCompleted() {
		this.todos = this.todos.filter(function (todo) {
			return !todo.completed;
		});

		this.inform();
	}
}

export { TodoModel };
