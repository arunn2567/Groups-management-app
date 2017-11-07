import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchGroups} from '../actions/index'
import {Link} from 'react-router-dom';
import _ from 'lodash';

class GroupsIndex extends Component{

  componentDidMount(){
    console.log(this.props.groups)
    const {groups} = this.props;
    if(_.isEmpty(groups)){
      console.log("called");
    this.props.fetchGroups();
  }
  }

  renderlist(){


    const {groups} = this.props;


    if(_.isEmpty(groups)){
      return <tr>
      <td>Loading...</td>
      <td> If it takes more than 5 seconds, try to refresh the browser</td>
      </tr>
    }
  return  _.map(this.props.groups, group=>{
    const date = new Date(group.created).toLocaleString();
    return(

      <tr key={group.id}>
      <td><Link className='changefont' to={`/groups/${group.id}`}>{group.id}</Link></td>
      <td><Link className='changefont' to={`/groups/${group.id}`}>{date}</Link></td>
      <td><Link className='changefont' to={`/groups/${group.id}`}>{group.name}</Link></td>
      </tr>
    );
  })
  }
sortColumn(value){
  const list = this.props.groups
  const keysSorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]});
  console.log("called");
}
  render(){
    return(
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
      <th scope="row" onClick={this.sortColumn( 'date')}>Creation Date</th>
      <th scope="row" onClick={this.sortColumn( 'Name')}>Group Name</th>
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

function mapStateToProps(state){
  return {groups: state.groups};
}
export default connect(mapStateToProps, {fetchGroups})(GroupsIndex);
