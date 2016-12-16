// Copyright 2015, EMC, Inc.

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import radium from 'radium';

import {
    LinearProgress,
    Badge,
    Table,
    TableHeaderColumn,
    TableRow,
    TableHeader,
    TableRowColumn,
    TableBody,
    Divider
} from 'material-ui';

import TaskProgress from './TaskProgress';

@radium
export default class GraphProgressTable extends Component {

    defaultProps = {
        indent: 1,
        name: 'Progress',
        value: 0
    }

    renderHeader = () => {
        if(this.props.showHeader) {
            return (
                <TableHeader
                    displaySelectAll={false}
                    enableSelectAll={false}
                    adjustForCheckbox={false}
                >
                    <TableRow>
                        <TableHeaderColumn></TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Id</TableHeaderColumn>
                        <TableHeaderColumn>Description</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                        <TableHeaderColumn>Progress</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
            )
        }
    }

    renderTasks = () => {
        let self = this;

        let taskIds = Object.keys(this.props.graphData.tasks);

        console.log('----in GraphProgressTable', this.props.graphData);

        let taskProgressElementList = [];

        taskIds.forEach(function(taskId){
            let taskData = self.props.graphData.tasks[taskId];

            console.log('----in GraphProgressTable, taskData', taskData);

            taskProgressElementList.push(
                <TaskProgress
                    key={taskId}
                    type=""
                    name={taskData.taskName}
                    id={taskId}
                    value={taskData.taskProgress}
                    status={taskData.taskStatus}
                    description={taskData.taskDesc}
                />
            );
        });

        return taskProgressElementList;
    }

    render(){
        return (
            <div>
                <Table style={{tableLayout: 'fixed', align: 'left'}}>
                    {this.renderHeader()}
                    <TableBody displayRowCheckbox={false}>
                        <TaskProgress
                            key={this.props.graphData.graphId}
                            type="Graph"
                            name={this.props.graphData.graphName}
                            id={this.props.graphData.graphId}
                            value={this.props.graphData.graphProgress}
                            status={this.props.graphData.graphStatus}
                            description={this.props.graphData.graphDesc}
                        />
                        {this.renderTasks()}
                    </TableBody>
                </Table>
                <Divider />
            </div>
        )
    }
};

