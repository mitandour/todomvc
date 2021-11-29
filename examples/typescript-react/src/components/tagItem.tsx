/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */

/// <reference path="../services/interfaces.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import { ENTER_KEY, ESCAPE_KEY } from "../constants";
import { ITagItemProps, ITagItemState } from "../services/interfaces";

class TagItem extends React.Component<ITagItemProps, ITagItemState> {

  public state : ITagItemState;

  constructor(props : ITagItemProps){
    super(props);
    this.state = {
      editLabel: this.props.tag.label,
      editingTag: false
    };
  }

  public handleSubmit(event : React.FormEvent) {
    var val = this.state.editLabel.trim();
    if (val) {
      this.props.onEdit(val);
      this.setState({editLabel: val});
    } else {
      this.props.onDestroy();
    }
  }

  public handleEdit() {
    this.setState({editLabel: this.props.tag.label});
    //this.props.onChange(this.state.editLabel);
  }

  public handleKeyDown(event : React.KeyboardEvent) {
   
  }

  public handleChange(event : React.FormEvent) {
    var input: any = event.target;
    this.setState(prevState => ({...prevState, editLabel : input.value }));
  }

  public handleAddTag = () => {
    this.setState(prevState => ({ ...prevState, addingTag: true }));
  }

  public handleEditTag() {
    this.setState(prevState => ({ ...prevState, editingTag: true }));
  }
 

  public componentDidUpdate() {
    if (this.state.editingTag) {
      var node = (ReactDOM.findDOMNode(this.refs["editTagField"]) as HTMLInputElement);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  public render() {
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
      <>
        <label
          key={this.props.tag.id}
          style={badge}
          onDoubleClick={e => this.handleEditTag()}>
          {this.props.tag.label}
          {
            <button
              style={miniButtons}
              onClick={this.props.onDestroy}>
              x
            </button>}
        </label>        
        {this.state.editingTag &&
          <input
          ref="editTagField"
          style={badge}
          value={this.state.editLabel}
          onBlur={ e => this.handleSubmit(e) }
          onChange={ e => this.handleChange(e) }/> }
      </>
    )
  }
           
}

export { TagItem };
