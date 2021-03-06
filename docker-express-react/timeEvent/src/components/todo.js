import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as todoActionCreators from '../actions/todo';

import AddTodo from './addTodo';

class TodoList extends Component {
    static propTypes = {
        // https://wecodetheweb.com/2015/06/02/why-react-proptypes-are-important/
        actions: React.PropTypes.object.isRequired,
        todo: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                idx: React.PropTypes.number,
                showComments: React.PropTypes.bool,
                // done: React.propTypes.bool, ????
                text: React.PropTypes.string
            })).isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        function createTasks(item) {
            return <li key={item.idx}>{item.text}</li>;
        }
        const listItems = this.props.todo.map(createTasks);
        //   Alternative:
        //   const listItems = this.props.todo.map((item) => {
        //       return <li key={item.idx}>{item.text}</li>;
        //   });

        return (
            <div className="App-MsgListMain">
                <div className="header">
                    <AddTodo addItemProp={this.props.actions.addToTodo} />
                </div>
                <ol>
                    {listItems}
                </ol>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        todo: state.todo // todo means TodoList's prop, state.todo means rootReducer.todo
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActionCreators, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
