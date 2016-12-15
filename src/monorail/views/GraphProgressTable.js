// Copyright 2015, EMC, Inc.

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

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

export default class GraphProgressTable extends Component {

    defaultProps = {
        indent: 1,
        name: 'Progress',
        value: 0
    }

    renderHeader = () => {
        if(this.props.showHeader) {
            return (
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Graph/Task</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Id</TableHeaderColumn>
                        <TableHeaderColumn>Description</TableHeaderColumn>
                        <TableHeaderColumn>Progress</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
            )
        }
    }

    render(){
        return (
            <div>
                <Table>
                    {this.renderHeader()}
                    <TableBody displayRowCheckbox={false}>
                        <TaskProgress
                            key={this.props.graphId}
                            type="Graph"
                            name={this.props.graphName}
                            id={this.props.graphId}
                            value={this.props.graphProgress}
                            description={this.props.graphDesc}
                        />
                        <TaskProgress
                            key={this.props.taskId}
                            type="Task"
                            name={this.props.taskName}
                            id={this.props.taskId}
                            value={this.props.taskProgress}
                            description={this.props.taskDesc}
                        />
                    </TableBody>
                </Table>
                <Divider />
            </div>
        )
    }
};

