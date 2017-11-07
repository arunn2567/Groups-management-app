import React,{Component} from 'react';
import {Field,reduxForm, FieldArray} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createGroup} from '../actions'

class GroupsNew extends Component{

renderField(field){
  const {meta: {touched, error}} = field;
  const className=`form-group ${touched&&error?'has-danger':''}`
  return(
    <div className={className}>
    <label>{field.label}</label>
    <input
    className='form-control'
    type="text"
    {...field.input}
    />
    <div className="text-help">
    {touched? error: '' }
    </div>
    </div>
  );
}
onSubmit(values){
  const date = new Date().getTime();
  values['created']= date;
this.props.createGroup(values);
this.props.history.push('/')
}
renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
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
render(){

  const { handleSubmit }=this.props;
  return(
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

function validate(values){

  const errors={};
if(!values.id){
  errors.id='Enter the ID';
}
if(!values.name){
  errors.name='Enter the Name';
}
if (!values.members || !values.members.length) {
   errors.members = { _error: 'At least one member must be entered' };
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

export default reduxForm({
  validate,
  form:'PostGroupForm'
}) (
  connect(null,{createGroup})(GroupsNew)
);
