// Copyright 2015, EMC, Inc.

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import RackHDRestAPIv2_0 from 'src-common/messengers/RackHDRestAPIv2_0';
import ProgressEventsMessenger from 'src-common/messengers/ProgressEventsMessenger';
import AppContainer from 'src-common/views/AppContainer';
import GraphProgressTable from './GraphProgressTable';
import {LinearProgress, AppBar} from 'material-ui';
import {
    FlatButton
} from 'material-ui';

export default class App extends Component {

    constructor() {
        super();

        let self = this;

        this.tableHeaderSent = true;

        self.graphProgressCollection = {};

        console.log("Starting to monitor websocket");
        this.events = new ProgressEventsMessenger();
        this.events.connect();
        this.events.listen(msg => {

            if(! self.state.hasFirstEvent) {
                self.setState({hasFirstEvent: true});
            }

            console.log('message received: ', msg);

            var graphId = self.getGraphIdFromMsg(msg);

            console.log('GraphId list: ', self.graphProgressCollection);

            RackHDRestAPIv2_0.then(function(client){
                client.workflowsGetByInstanceId(
                    {identifier: graphId}
                )
                    .then(function(workflows){
                        if(workflows.obj.status === 'cancelled') {
                            return;
                        }

                        self.graphProgressCollection[graphId] = self.decodeProgressMsg(msg);

                        self.graphProgressCollection[graphId].graphProgress =
                            self.calcGraphProgress(workflows.obj.tasks);

                        console.log('-----graphState', workflows.obj.status);
                        console.log('-----graphProgressCollection', self.graphProgressCollection);

                        self.setState(self.graphProgressCollection);
                    })
                    .catch(function(err){
                        console.log("fail checking status for", graphId);
                        console.log("error message", err);

                        if(self.graphIdInCollection(graphId)) {
                            delete self.graphProgressCollection[graphId];
                        }
                    })
            })
        });

        return this;
    }

    state = {
        hasFirstEvent: false,
        graphProgress : 0,
        graphDesc: '',
        graphName: '',
        graphId: '',
        taskProgress: 0,
        taskName: '',
        taskId: '',
        taskDesc: ''
    }

    static contextTypes = {
        muiTheme: PropTypes.any,
        router: PropTypes.any
    }

    graphIdInCollection = (id) => {
        if(Object.keys(this.graphProgressCollection).indexOf(id) >= 0) {
            return true;
        } else {
            return false;
        }
    }

    checkSendTableHeader = () => {
        let ret = this.tableHeaderSent;

        console.log(this.tableHeaderSent);

        if(this.tableHeaderSent) {
            this.tableHeaderSent = false;
        }

        return ret;
    }

    calcGraphProgress = (tasks) => {
        console.log('tasks: ', tasks);
        let totalTaskCount = tasks.length;

        if(totalTaskCount === 0) {
            return "0%";
        }

        let succeededTaskCount = 0;

        tasks.forEach(function(task){
            if(task.state === 'succeeded') {
                succeededTaskCount += 1;
            }
        });

        let progress = (succeededTaskCount*100/totalTaskCount);
        console.log('taskProgress Info: ', progress, totalTaskCount, succeededTaskCount);

        return progress;
    }

    getGraphIdFromMsg = (msg) => {
        return msg.data.graphId;
    }

    decodeProgressMsg = (msg) => {
        let ret = {};
        ret.graphProgress = this.formatProgress(msg.data.progress.percentage);
        ret.graphDesc = msg.data.progress.description;
        ret.graphName = msg.data.graphName;
        ret.graphId = msg.data.graphId;

        if(msg.data.taskProgress) {
            ret.taskProgress = this.formatProgress(msg.data.taskProgress.progress.percentage);
            ret.taskDesc = msg.data.taskProgress.progress.description;
            ret.taskName = msg.data.taskProgress.taskName;
            ret.taskId = msg.data.taskProgress.taskId;
        } else {
            ret.taskProgress = 0;
            ret.taskDesc = 'No active task';
            ret.taskName = 'No active task';
            ret.taskId = 'No active task';
        }

        console.log('decoded progress from Msg: ', ret);

        return ret;
    }

    formatProgress = (progressStr) => {
        var progressNum = parseInt(progressStr);
        if(isNaN(progressNum)){
            progressNum = 0;
        }

        return progressNum;
    }

    renderOneGraph = () => {
    }

    renderHeader = () => {
        return (
            <AppBar
                title="Tools for demo progress notification"
            />
        )
    }
    renderContent = () => {
        var self = this;

        if(! self.state.hasFirstEvent) {
            return (
                <div>
                    <FlatButton label="No notification arrive yet"/>
                </div>
            )
        }

        let graphProgressElements = [];

        let showHeader = true;

        Object.keys(self.graphProgressCollection).forEach(function(graphId){

            let graphState = self.state[graphId];

            graphProgressElements.push(
            <div>
                <GraphProgressTable
                    key={graphId}
                    showHeader={showHeader}
                    graphName={graphState.graphName}
                    graphId={graphState.graphId}
                    graphProgress={graphState.graphProgress}
                    graphDesc={graphState.graphDesc}
                    taskName={graphState.taskName}
                    taskId={graphState.taskId}
                    taskProgress={graphState.taskProgress}
                    taskDesc={graphState.taskDesc}
                />
            </div>
            )

            showHeader = false;
        });

        return (
            <div>
                {graphProgressElements}
            </div>
        )
    }

    render(){
        return (
            <AppContainer key="app">
                {this.renderHeader()}
                {this.renderContent()}
            </AppContainer>
        )
    }
};

