import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from '../actions/index'
import { Link } from 'react-router-dom';
import _ from 'lodash';

//Index component to show the total groups which are provided by the groups reducer which came maybe from the localStorage or through axios if localStorage doesn't have it.
class GroupsIndex extends Component {
  //lifecycle method to fetch the data by creating an action called fetchGroups.
  componentDidMount() {
    const {groups} = this.props;
    //if the groups are already present then we may cache the records.
    if (_.isEmpty(groups)) {
      this.props.fetchGroups();
    }
  }
  renderlist() {
    const {groups} = this.props;
    //if they is a network problem, providing message to user to refresh.
    if (_.isEmpty(groups)) {
      return (<tr>
      <td>Loading...</td>
      <td> If it takes more than 5 seconds, try to refresh the browser</td>
      </tr>)
    }
    return _.map(this.props.groups, group => {
      const date = new Date(group.created).toLocaleString();
      return (
        <tr key={group.id}>
      <td><Link className='changefont' to={`/groups/${group.id}`}>{group.id}</Link></td>
      <td><Link className='changefont' to={`/groups/${group.id}`}>{date}</Link></td>
      <td><Link className='changefont' to={`/groups/${group.id}`}>{group.name}</Link></td>
      </tr>
        );
    })
  }
  //sorting the records
  sortColumn(value) {
    const list = this.props.groups
    const keysSorted = Object.keys(list).sort(function(a, b) {
      return list[a] - list[b]
    });
  }
  //render method to render the index page
  //table to show the groups.
  render() {
    return (
      <div className="maindiv">
      <div className="text-xs-right pull-down">
      <Link className="btn btn-primary" to="/groups/new">
      Add a Group
      </Link>
      </div>
      <h2>Groups</h2>
      <table className="table table-hover table-inverse">
      <thead>
      <tr>
      <th scope="row" onClick={this.sortColumn('id')}>Group id</th>
      <th scope="row" onClick={this.sortColumn('date')}>Creation Date</th>
      <th scope="row" onClick={this.sortColumn('Name')}>Group Name</th>
      </tr>
      </thead>
      <tbody>
       {this.renderlist()}
      </tbody>
      </table>
      </div>
      );
  }
}
//map state to props function to connect the state of the application to props of the component.
function mapStateToProps(state) {
  return {
    groups: state.groups
  };
}
//connect method used to connec the mapStateToProps and mapdispathToProps functions.
export default connect(mapStateToProps, {
  fetchGroups
})(GroupsIndex);
