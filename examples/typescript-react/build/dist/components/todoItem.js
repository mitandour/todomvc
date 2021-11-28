"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var classNames = require("classnames");
var React = require("react");
var ReactDOM = require("react-dom");
var constants_1 = require("../constants");
var TodoItem = (function (_super) {
    __extends(TodoItem, _super);
    function TodoItem(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { editText: _this.props.todo.title };
        return _this;
    }
    TodoItem.prototype.handleSubmit = function (event) {
        var val = this.state.editText.trim();
        if (val) {
            this.props.onSave(val);
            this.setState({ editText: val });
        }
        else {
            this.props.onDestroy();
        }
    };
    TodoItem.prototype.handleEdit = function () {
        this.props.onEdit();
        this.setState({ editText: this.props.todo.title });
    };
    TodoItem.prototype.handleKeyDown = function (event) {
        if (event.keyCode === constants_1.ESCAPE_KEY) {
            this.setState({ editText: this.props.todo.title });
            this.props.onCancel(event);
        }
        else if (event.keyCode === constants_1.ENTER_KEY) {
            this.handleSubmit(event);
        }
    };
    TodoItem.prototype.handleChange = function (event) {
        var input = event.target;
        this.setState({ editText: input.value });
    };
    TodoItem.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return (nextProps.todo !== this.props.todo ||
            nextProps.editing !== this.props.editing ||
            nextState.editText !== this.state.editText);
    };
    TodoItem.prototype.componentDidUpdate = function (prevProps) {
        if (!prevProps.editing && this.props.editing) {
            var node = ReactDOM.findDOMNode(this.refs["editField"]);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    };
    TodoItem.prototype.render = function () {
        var _this = this;
        var badge = {
            color: "inherit",
            margin: "3px",
            padding: "3px 7px",
            textDecoration: "none",
            border: "1px solid #bbb",
            borderRadius: "10px",
            fontSize: "15px"
        };
        var item = {
            display: "flex",
            FlexDirectionProperty: "row",
            justifyContent: "space-between",
            alignItems: "center"
        };
        var labels = {
            display: "flex",
            FlexDirectionProperty: "row",
            justifyContent: "flex-end"
        };
        return (React.createElement("li", { className: classNames({
                completed: this.props.todo.completed,
                editing: this.props.editing
            }) },
            React.createElement("div", { className: "view" },
                React.createElement("input", { className: "toggle", type: "checkbox", checked: this.props.todo.completed, onChange: this.props.onToggle }),
                React.createElement("label", { style: item, onDoubleClick: function (e) { return _this.handleEdit(); } },
                    React.createElement("span", null,
                        " ",
                        this.props.todo.title,
                        " "),
                    React.createElement("span", { style: labels }, this.props.todo.tags && this.props.todo.tags.map(function (tag) { return (React.createElement("label", { style: badge },
                        tag.label.substring(1),
                        " ")); }))),
                React.createElement("button", { className: "destroy", onClick: this.props.onDestroy })),
            React.createElement("input", { ref: "editField", className: "edit", value: this.state.editText, onBlur: function (e) { return _this.handleSubmit(e); }, onChange: function (e) { return _this.handleChange(e); }, onKeyDown: function (e) { return _this.handleKeyDown(e); } })));
    };
    return TodoItem;
}(React.Component));
exports.TodoItem = TodoItem;
