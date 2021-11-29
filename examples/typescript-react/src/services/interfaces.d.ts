import { TodoModel } from "./impl/todoModel";

interface ITodo {
	id: string;
	title: string;
	completed: boolean;
	tags: ITag[];
}

interface ITag {
	id: string;
	label: string;
}

interface ITodoItemProps {
	key: string;
	todo: ITodo;
	tagModel: ITagModel;
	editing?: boolean;
	onSave: (val: any) => void;
	onDestroy: () => void;
	onEdit: () => void;
	onCancel: (event: any) => void;
	onToggle: () => void;
}

interface ITodoItemState {
	editText: string;
	addingTag: boolean;
	newLabel: string;
}

interface ITagItemProps {
	key: string;
	tag: ITag;
	onDestroy: () => void;
	onEdit: (val: string) => void;
}

interface ITagItemState {
	editLabel: string;
	editingTag: boolean;
}

interface ITodoFooterProps {
	completedCount: number;
	onClearCompleted: any;
	nowShowing: string;
	count: number;
}

interface ITodoModel {
	key: any;
	todos: Array<ITodo>;
	onChanges: Array<any>;
	subscribe(onChange);
	inform();
	addTodo(title: string);
	toggleAll(checked);
	toggle(todoToToggle);
	destroy(todo);
	save(todoToSave, tagsToSave, text);
	clearCompleted();
}

interface ITagModel {
	key: any;
	tags: Array<ITag>;
	todo: ITodo;
	addTag(title: string);
	destroy(tag: ITag);
	edit(tag: ITag, label: string);
}

interface IAppProps {
	model: ITodoModel;
}

interface IAppState {
	editing?: string;
	nowShowing?: string;
}
