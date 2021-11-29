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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var TagItem = (function (_super) {
    __extends(TagItem, _super);
    function TagItem(props) {
        var _this = _super.call(this, props) || this;
        _this.handleAddTag = function () {
            _this.setState(function (prevState) { return (__assign({}, prevState, { addingTag: true })); });
        };
        _this.state = {
            editLabel: _this.props.tag.label,
            editingTag: false
        };
        return _this;
    }
    TagItem.prototype.handleSubmit = function (event) {
        var val = this.state.editLabel.trim();
        if (val) {
            this.props.onEdit(val);
            this.setState({ editLabel: val });
        }
        else {
            this.props.onDestroy();
        }
    };
    TagItem.prototype.handleEdit = function () {
        this.setState({ editLabel: this.props.tag.label });
        this.props.onChange(this.state.editLabel);
    };
    TagItem.prototype.handleKeyDown = function (event) {
    };
    TagItem.prototype.handleChange = function (event) {
        var input = event.target;
        this.setState(function (prevState) { return (__assign({}, prevState, { editLabel: input.value })); });
    };
    TagItem.prototype.handleEditTag = function () {
        this.setState(function (prevState) { return (__assign({}, prevState, { editingTag: true })); });
    };
    TagItem.prototype.componentDidUpdate = function (prevProps) {
        if (!prevProps.editing && this.props.editing && this.state.editingTag) {
            var node = ReactDOM.findDOMNode(this.refs["editTagField"]);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    };
    TagItem.prototype.render = function () {
        var _this = this;
        var badge = {
            color: "inherit",
            margin: "3px",
            padding: "3px 7px",
            textDecoration: "none",
            border: "1px solid #bbb",
            borderRadius: "10px",
            fontSize: "15px",
            with: "auto"
        };
        var miniButtons = {
            width: "25px",
            border: "1px solid black",
            borderRadius: "50px",
            cursor: "pointer"
        };
        return (React.createElement(React.Fragment, null,
            React.createElement("label", { key: this.props.tag.id, style: badge, onDoubleClick: function (e) { return _this.handleEditTag(); } },
                this.props.tag.label,
                React.createElement("button", { style: miniButtons, onClick: this.props.onDestroy }, "x")),
            this.state.editingTag &&
                React.createElement("input", { ref: "editTagField", style: badge, value: this.state.editLabel, onBlur: function (e) { return _this.handleSubmit(e); }, onChange: function (e) { return _this.handleChange(e); } })));
    };
    return TagItem;
}(React.Component));
exports.TagItem = TagItem;
