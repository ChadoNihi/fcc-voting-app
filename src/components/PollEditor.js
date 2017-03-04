import Inferno, { linkEvent } from 'inferno';
import { connect } from 'inferno-redux';

import {pollOptMaxLen, pollOptMinLen, pollTitleMaxLen, pollTitleMinLen} from '../constants';
import {isDuplicatePoll, isValidPoll_Title_Opts} from '../utils';

import {addPollToPolls, addPollToUser} from '../actions/actions';

const txtAreaRe = /textarea/i;

function onPollSubmit({poll, props}, ev) {
  ev.preventDefault();
  //ensure not submitted by ENTER
  if (txtAreaRe.test((ev.target || ev.srcElement).tagName) || (ev.keyCode || ev.which || ev.charCode || 0) !== 13) {
    const poll = {
      'title': ev.target.elements['poll-title-inp'].value.trim(),
      'opts': ev.target.elements['poll-opts-inp'].value.split('\n').map(opt=> opt.trim()).filter(opt=> opt.length > pollOptMinLen && opt.length <= pollOptMaxLen)
    };

    if (isValidPoll_Title_Opts(poll) && !isDuplicatePoll(poll)) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", '/poll', true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function() {
          if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200 && xhr.responseText) {
            const poll = JSON.parse(xhr.responseText);
            props.addPollToPolls(poll);
            props.addPollToUser(poll);
          }
      }

      xhr.send(JSON.stringify(poll));
    }
  }
}

const PollEditor = ({poll, pollEditorModalId}) => {
  const isNewPoll = poll === undefined;
  return (
    <form onSubmit={ linkEvent({poll, props}, onPollSubmit) }>
      <label><input id='poll-title-inp' type="text" pattern={`.{${pollTitleMinLen},}`} placeholder={`Title (min ${pollTitleMinLen} chars)`} required disabled={!isNewPoll} value={isNewPoll ? "" : poll.title} /></label>
      <textarea id='poll-opts-inp' placeholder="Option per line" required></textarea>
      <input value={isNewPoll ? "Publish" : "Update"} type="submit" />
      {pollEditorModalId ?
        <label for={pollEditorModalId} className="button warning">Cancel</label> : undefined}
    </form>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPollToPolls: (poll) => dispatch(addPollToPolls(poll)),
    addPollToUser: (poll) => dispatch(addPollToUser(poll))
  }
}

const mapStateToProps = (state) => {
  return {
    polls: state.polls,
    user: state.user
  };
}

const ThePollEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(PollEditor);

export default ThePollEditor;
