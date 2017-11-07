import React, { Component } from 'react';
import { fetchGroup, deleteGroup } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//GroupsShow component to show detailed view of the component
class GroupsShow extends Component {
  //lifecycle method to fetch a single group, if it is not present in the local storage or the state
  componentDidMount() {
    if (!this.props.group) {
      const {id} = this.props.match.params;
      this.props.fetchGroup(id);
    }
  }
  //renderGroup call back to map through each and every member of the a single group and render it in the table.
  renderGroup() {
    return _.map(this.props.group.members, member => {
      return (
        <tr key={member.id}>
       <td>
     {member.id}</td><td >{member.kind}</td>

       </tr>
        );
    })
  }
  //calling the deleteGroup action creator on delete button press.
  onDeleteGroup() {
    const {id} = this.props.match.params
    this.props.deleteGroup(id);
    this.props.history.push('/')
  }
  //render method to render the detailed view of the group
  render() {
    //if there is problem rendering the group, showing loading div.
    const {group} = this.props;
    if (!group) {
      return <div>Loading</div>
    }
    //returing the table html and buttons to handle navigation of the page.
    return (
      <div>
      <div className='pull-down'>
      <Link to="/" className="btn btn-primary">Back To Groups List</Link>
      <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteGroup.bind(this)}> Delete the Group</button>
      </div>
      <h2 className="pull-down" >{group.name}</h2>
      <p> No of Members: {group.members.length} </p>
          <h4>Members List</h4>
      <table className="table table-bordered table-inverse">
      <thead>
      <tr>
      <th className="row">
      Member ID
      </th>
      <th className="row">
      Kind of Member
      </th>
      </tr>
      </thead>
      <tbody>

      {this.renderGroup()}
      </tbody>


</table>
      </div>
      );
  }
}
//mapStateToProps to  map state with props and also getting the id using ownProps param.
function mapStateToProps({groups}, ownProps) {
  return {
    group: groups[ownProps.match.params.id]
  }
}
//connect method to connect state and actions.
export default connect(mapStateToProps, {
  fetchGroup,
  deleteGroup
})(GroupsShow);
