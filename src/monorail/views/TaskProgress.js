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
    TableBody
} from 'material-ui';
// import LinearProgress from 'material-ui/lib/linear-progress';
// import emcTheme from 'src-common/lib/emcTheme';

@radium
export default class TaskProgress extends Component {

    tableStyle = {
        background: {
            backgroundColor: '#282a2a'
        },
        header: {
            backgroundColor: '#000000'
        },
        running: {
            backgroundColor: '#000099'
        },
        succeeded: {
            backgroundColor: '#00b300'
        },
        pending: {
            backgroundColor: '#808000'
        },
        failed: {
            backgroundColor: '#991f00'
        },
    }

    getTableStyle = () => {
        return this.tableStyle[this.props.status];
    }

    render(){
        let style = this.getTableStyle();
        let graphStyle = this.props.type === 'Graph'? style: this.tableStyle.background;

        return (
            <TableRow>
                <TableRowColumn style={graphStyle}>{this.props.type}</TableRowColumn>
                <TableRowColumn style={style}>{this.props.name}</TableRowColumn>
                <TableRowColumn style={style}>{this.props.id}</TableRowColumn>
                <TableRowColumn style={style}>{this.props.description}</TableRowColumn>
                <TableRowColumn style={style}>{this.props.status}</TableRowColumn>
                <TableRowColumn style={style}>
                    <Badge badgeContent={this.props.value} primary={true}/>
                    <LinearProgress mode="determinate" value={this.props.value} />
                </TableRowColumn>
            </TableRow>
        )
    }
};

