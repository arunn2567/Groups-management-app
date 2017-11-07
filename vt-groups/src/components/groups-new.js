import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGroup } from '../actions'

//GroupsNew component to create a new group.
class GroupsNew extends Component {
  //render field function to render each and every field component.
  renderField(field) {
    //checking whether the user has touched the input fields or not to show error message
    const {meta: {touched, error}} = field;
    //creating a class to show red borders and text for errors
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    //returning the fields
    return (
      <div className={className}>
    <label>{field.label}</label>
    <input
      className='form-control'
      type="text"
      {...field.input}
      />
    <div className="text-help">
    {touched ? error : '' }
    </div>
    </div>
      );
  }
  //hading the handleSubmit of reduxform using a callback called on submit to call the create group action creator and redirect to index page
  onSubmit(values) {
    const date = new Date().getTime();
    values['created'] = date;
    this.props.createGroup(values);
    this.props.history.push('/')
  }
  //renderMembersfunction to add members in the redux form.
  //maps the fields array to two input boxes id and kind.
  renderMembers = ({fields, meta: {touched, error, submitFailed}}) => (
    <ul className="list-group bgcolo">
    <li className="list-group-item bgcolo">
      <button type="button" className="btn btn-primary" onClick={() => fields.push({})}>Add Member</button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li className="list-group-item bgcolo " key={index}>
        <button
      className="btn btn-danger pull-right"
      type="button"
      title="Remove Member"
      onClick={() => fields.remove(index)}>Remove</button>
        <h4>Member #{index + 1}</h4>
        <Field
      className="form-control"
      name={`${member}.id`}
      type="text"
      component={this.renderField}
      label="ID"
      />
        <Field
      className="form-control"
      name={`${member}.kind`}
      type="text"
      component={this.renderField}
      label="kind"
      />
      </li>
    ))}
  </ul>
  );
  //handle submit came from the form state to submit the redux form.
  //redux form to create the form.
  //save button to submit the redux form.
  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="pull-down">
    <h2>Create A Group</h2>
    <form className="form-group pull-down" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
   <Field
      className="form-control "
      label="ID For the Group"
      name="id"
      component = {this.renderField}
      />
   <Field
      className="form-control"
      label="Name for the Group"
      name="name"
      component = {this.renderField}
      />
   <FieldArray name="members" component={this.renderMembers} />
     <div>

     </div>
     <div className='pull-down'>
   <button type="submit" className="btn btn-primary">Save</button>
   <Link to="/" className="btn btn-danger" >Cancel</Link>
   </div>
   </form>
</div>
      );
  }
}

//validate function to create an errors object and add error if the values of the input is null and touched.
function validate(values) {

  const errors = {};
  if (!values.id) {
    errors.id = 'Enter the ID';
  }
  if (!values.name) {
    errors.name = 'Enter the Name';
  }
  if (!values.members || !values.members.length) {
    errors.members = {
      _error: 'At least one member must be entered'
    };
  } else {
    const membersArrayErrors = [];
    values.members.forEach((member, memberIndex) => {
      const memberErrors = {};
      if (!member || !member.id) {
        memberErrors.id = 'Required';
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (!member || !member.kind) {
        memberErrors.kind = 'Required';
        membersArrayErrors[memberIndex] = memberErrors;
      }
    });
    if (membersArrayErrors.length) {
      errors.members = membersArrayErrors;
    }
  }
  return errors;



}
// reduxForm can be used as connect method to connect reduxForm to the Component.
export default reduxForm({
  validate,
  form: 'PostGroupForm'
})(connect(null, {
  createGroup
})(GroupsNew)
);
