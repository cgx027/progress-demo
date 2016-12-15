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
    TableBody
} from 'material-ui';
// import LinearProgress from 'material-ui/lib/linear-progress';
// import emcTheme from 'src-common/lib/emcTheme';

export default class TaskProgress extends Component {

    defaultProps = {
        indent: 1,
        name: 'Progress',
        value: 0
    }

    render(){
        return (
            <TableRow>
                <TableRowColumn>{this.props.type}</TableRowColumn>
                <TableRowColumn>{this.props.name}</TableRowColumn>
                <TableRowColumn>{this.props.id}</TableRowColumn>
                <TableRowColumn>{this.props.description}</TableRowColumn>
                <TableRowColumn>
                    <Badge badgeContent={this.props.value} primary={true}/>
                    <LinearProgress mode="determinate" value={this.props.value} />
                </TableRowColumn>
            </TableRow>
        )
    }
};

