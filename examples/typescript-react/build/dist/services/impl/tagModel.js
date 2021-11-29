"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var todoModel_1 = require("../impl/todoModel");
var todoModel = new todoModel_1.TodoModel("react-todos");
var TagModel = (function () {
    function TagModel(key, todo, model) {
        this.key = key;
        this.todo = todo;
        this.tags = todo.tags;
        this.todoModel = model;
    }
    TagModel.prototype.addTag = function (label) {
        this.tags = this.tags.concat({
            id: utils_1.Utils.uuid(),
            label: label,
        });
        this.todoModel.save(this.todo, this.tags, this.todo.title);
    };
    TagModel.prototype.destroy = function (tag) {
        this.tags = this.tags.filter(function (candidate) {
            return candidate.id !== tag.id;
        });
        this.todoModel.save(this.todo, this.tags, this.todo.title);
    };
    TagModel.prototype.edit = function (tagToSave, label) {
        this.tags = this.tags.map(function (tag) {
            return tag !== tagToSave ? tag : utils_1.Utils.extend({}, tag, { label: label });
        });
        this.todoModel.save(this.todo, this.tags, this.todo.title);
    };
    return TagModel;
}());
exports.TagModel = TagModel;
