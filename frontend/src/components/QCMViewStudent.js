import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { findLastActive as findLastActiveRep } from '../repository/questions.repository';
import socket from '../services/sockets';

const styles = {
  centerMe: {
    textAlign: 'center',
  },
  spaceMe: {
    padding: 20
  },
  answerButton: {
    margin: 10,
  },
  flexButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
  questionBox: {
    margin: 'auto',
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    maxWidth: 800,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
};

class QCMViewStudent extends PureComponent {

  state = {
    question: null
  };

  componentDidMount() {
    this.findLastActiveQuestion();
    socket.on('QUESTIONS_CHANGED', this.findLastActiveQuestion);
  }

  findLastActiveQuestion = () => {
    findLastActiveRep()
      .then(question => {
        this.setState({
          question: question
        })
      }).catch(e => console.error(e));
  };

  noQuestionView() {
    return (
      <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
        Il n'y a pas de question pour le moment
      </div>
    )
  };

  questionView() {
    return (
      <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>

        <div className={this.props.classes.questionBox}>

          <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
            <Typography variant="headline">
              {this.state.question.question}
            </Typography>
          </div>

          <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>

            <div className={this.props.classes.flexButtons}>
              <Button
                variant="raised"
                color="primary"
                size="large"
                className={this.props.classes.answerButton}>
                {this.state.question.goodAnswer}
              </Button>
              <Button
                variant="raised"
                color="primary"
                size="large"
                className={this.props.classes.answerButton}>
                {this.state.question.badAnswer1}
              </Button>
              <Button
                variant="raised"
                color="primary"
                size="large"
                className={this.props.classes.answerButton}>
                {this.state.question.badAnswer2}
              </Button>
              <Button
                variant="raised"
                color="primary"
                size="large"
                className={this.props.classes.answerButton}>
                {this.state.question.badAnswer3}
              </Button>
            </div>

          </div>

        </div>

      </div>
    )
  };

  render() {
    return (
      <div>
        {this.state.question ? this.questionView() : this.noQuestionView()}
      </div>
    )
  }
}

export default withStyles(styles)(QCMViewStudent);