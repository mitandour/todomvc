/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

/// <reference path="../interfaces.d.ts"/>

import { Utils } from "../../utils";
import { TodoModel } from "../impl/todoModel";
import { ITag, ITagModel, ITodo } from "../interfaces";
// Generic "model" object. You can use whatever
// framework you want. For this application it
// may not even be worth separating this logic
// out, but we do this to demonstrate one way to
// separate out parts of your application.
var todoModel = new TodoModel("react-todos");

class TagModel implements ITagModel {
	key: any;
	tags: ITag[];
	todo: ITodo;
  todoModel: TodoModel;
  
	constructor(key, todo, model) {
		this.key = key;
		this.todo = todo;
    this.tags = todo.tags;
    this.todoModel = model;
	}

	addTag(label: string) {
		this.tags = this.tags.concat({
			id: Utils.uuid(),
			label: label,
		});
		this.todoModel.save(this.todo, this.tags, this.todo.title);
	}
	destroy(tag: ITag) {
		this.tags = this.tags.filter(function (candidate) {
			return candidate.id !== tag.id;
		});
		this.todoModel.save(this.todo, this.tags, this.todo.title);
	}
	edit(tagToSave: any, label: any) {
		this.tags = this.tags.map(function (tag) {
			return tag !== tagToSave ? tag : Utils.extend({}, tag, { label });
		});
		this.todoModel.save(this.todo, this.tags, this.todo.title);
	}
}

export { TagModel };
