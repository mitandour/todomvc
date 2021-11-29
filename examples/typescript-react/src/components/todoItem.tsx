/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */

/// <reference path="../services/interfaces.d.ts"/>

import * as classNames from "classnames";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ENTER_KEY, ESCAPE_KEY } from "../constants";
import { ITag, ITodoItemProps, ITodoItemState } from "../services/interfaces";
import { TagItem } from "./tagItem";

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {

  public state : ITodoItemState;

  constructor(props : ITodoItemProps){
    super(props);
    this.state = {
      editText: this.props.todo.title,
      newLabel: "",
      addingTag: false
    };
  }

  public handleSubmit(event : React.FormEvent) {
    var val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState(prevState => ({ ...prevState,editText: val}));
    } else {
      this.props.onDestroy();
    }
  }

  public handleEdit() {
    this.props.onEdit();
    this.setState(prevState => ({ ...prevState,editText: this.props.todo.title}));
  }

  public handleKeyDown(event : React.KeyboardEvent) {
    if (event.keyCode === ESCAPE_KEY) {
      this.setState(prevState => ({ ...prevState,editText: this.props.todo.title}));
      this.props.onCancel(event);
    } else if (event.keyCode === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  public handleChange(event : React.FormEvent) {
    var input: any = event.target;
    this.setState(prevState => ({ ...prevState,  editText : input.value }));
  }

  public handleAddFieldChange(event : React.FormEvent) {
    var input: any = event.target;
    this.setState(prevState => ({ ...prevState, newLabel : input.value }));
  }

  public handleAddTag = () => {
    this.setState(prevState => ({ ...prevState, addingTag: true }));
  }


  public aggTag = (val: string) => {
    this.props.tagModel.addTag(val);
  }

  public editTag (tag:ITag, val:string)  {
    this.props.tagModel.edit(tag, val);
  }

  public destroyTag = (tag: ITag) => {
    this.props.tagModel.destroy(tag);
  }

  public onTagChange = (values) => {
    // this.setState({editText: this.props.todo.title + values});
  }

  /**
   * This is a completely optional performance enhancement that you can
   * implement on any React component. If you were to delete this method
   * the app would still work correctly (and still be very performant!), we
   * just use it as an example of how little code it takes to get an order
   * of magnitude performance improvement.
   */
  public shouldComponentUpdate(nextProps : ITodoItemProps, nextState : ITodoItemState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    );
  }

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  public componentDidUpdate(prevProps : ITodoItemProps, prevState: ITodoItemState) {
    if (!prevProps.editing && this.props.editing) {
      var node = (ReactDOM.findDOMNode(this.refs["editField"]) as HTMLInputElement);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }

    if (this.state.addingTag) {
      var node = (ReactDOM.findDOMNode(this.refs["addField"]) as HTMLInputElement);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  public render() {
    const item = {
      display: "flex",
      FlexDirectionProperty: "row",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "450px"
    }
    const labels = {
      display: "flex",
      FlexDirectionProperty: "row",
      justifyContent:"flex-end"
    }
     const badge = {
      color: "inherit",
      margin: "3px",
      padding: "3px 7px",
      textDecoration: "none",
      border: "1px solid #bbb",
      borderRadius: "10px",
      fontSize: "15px",
      with:"auto"
    }

    const miniButtons = {
      width: "25px",
      border: "1px solid black",
      borderRadius: "50px",
      cursor:"pointer"
    }

    return (
      <li className={classNames({
        completed: this.props.todo.completed,
        editing: this.props.editing
      })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle}
          />
          <label style={item} onDoubleClick={ e => this.handleEdit() }>
            <span > {this.props.todo.title} </span>
            <span style={labels}>
              {this.props.todo.tags && this.props.todo.tags.map(tag => (
                <TagItem
                  key={tag.id}
                  tag={tag}
                  onDestroy={this.destroyTag.bind(this, tag)}
                  onEdit={this.editTag.bind(this,tag)}
                />
              ))}
              <button
                    style={miniButtons}
                    onClick={this.handleAddTag} >
                    +
                  </button>
              {this.state.addingTag &&
                <input
                ref="addField"
                style={badge}
                value={this.state.newLabel}
                onBlur={ e => this.aggTag.bind(this, e.target.value) }
                onChange={e => this.handleAddFieldChange(e)} />}
            </span>
          </label>
          <button className="destroy" onClick={this.props.onDestroy} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onBlur={ e => this.handleSubmit(e) }
          onChange={ e => this.handleChange(e) }
          onKeyDown={ e => this.handleKeyDown(e) }
        />
      </li>
    );
  }

}


export { TodoItem };
