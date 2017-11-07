import React, {Component} from 'react';
import {fetchGroup, deleteGroup} from '../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class GroupsShow extends Component{
  componentDidMount(){
    if(!this.props.group){
    const { id } = this.props.match.params;
       this.props.fetchGroup(id);
     }
  }
  renderGroup(){
   return _.map(this.props.group.members, member=>{
     return(
<tr key={member.id}>
       <td>
     {member.id}</td><td >{member.kind}</td>

       </tr>
     );
   })
  }
  onDeleteGroup(){
    const {id} = this.props.match.params
    this.props.deleteGroup(id);
    this.props.history.push('/')
  }
  render(){
    console.log(this.props.group);
    const { group } = this.props;
    if(!group){
      return <div>Loading</div>
    }
    return(
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
function mapStateToProps({groups}, ownProps){
  return {group: groups[ownProps.match.params.id]}
}
export default connect(mapStateToProps,{fetchGroup, deleteGroup})(GroupsShow);
