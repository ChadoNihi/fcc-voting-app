import Inferno, { linkEvent } from 'inferno';
import { postPoll } from '../actions/actions';
import { pollOptMaxLen, pollOptMinLen, pollTitleMaxLen, pollTitleMinLen} from '../constants';

const txtAreaRe = /textarea/i;

function onPollSubmit(poll, ev) {
  ev.preventDefault();
  //not Enter'ed
  if (txtAreaRe.test((ev.target || ev.srcElement).tagName) || (ev.keyCode || ev.which || ev.charCode || 0) !== 13) {
    let title = ev.target.elements['poll-title-inp'].value.trim(),
        opts = ev.target.elements['poll-opts-inp'].value.split('\n').map(opt=> opt.trim()).filter(opt=> opt.length > 0 && opt.length <= pollOptMaxLen);

    if (title.length>=pollTitleMinLen && title.length<=pollTitleMaxLen && opts.length>0) {
      postPoll({
        title,
        opts
      });
    }
  }
}

export default ({poll}) => {
  const isNewPoll = poll === undefined;
  return (
    <form onSubmit={ linkEvent(poll, onPollSubmit) }>
      <label><input id='poll-title-inp' type="text" pattern={`.{${pollTitleMinLen},}`} placeholder={`Title (min ${pollTitleMinLen} chars)`} required disabled={!isNewPoll} value={isNewPoll ? "" : poll.title} /></label>
      <textarea id='poll-opts-inp' placeholder="Option per line" required></textarea>
      <input value={isNewPoll ? "Publish" : "Update"} type="submit" />
    </form>
  );
}
