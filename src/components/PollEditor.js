import Inferno, { linkEvent } from 'inferno';

const pollTitleMinLength = 3;
const txtAreaRe = /textarea/i;

function onPollSubmit(poll, ev) {
  ev.preventDefault();
  //not Enter'ed
  if (txtAreaRe.test((ev.target || ev.srcElement).tagName) || (ev.keyCode || ev.which || ev.charCode || 0) !== 13) {
    let title = ev.target.elements['poll-title-inp'].value.trim(),
        opts = ev.target.elements['poll-opts-inp'].value.split('\n').map(opt=> opt.trim());

    if (opts.length>1 && opts.every(opt=>opt.length>0)) {
      postPoll({
        title,
        opts
      });
      this.setState({isEditing: false});
    }
  }
}

export default ({poll}) => {
  const isNewPoll = poll === undefined;
  return (
    <form onSubmit={ linkEvent(poll, onPollSubmit) }>
      <label><input id='poll-title-inp' type="text" pattern={`.{${pollTitleMinLength},}`} placeholder={`Title (min ${pollTitleMinLength} chars)`} required disabled={!isNewPoll} value={isNewPoll ? "" : poll.title} /></label>
      <textarea id='poll-opts-inp' placeholder="Option per line" required></textarea>
      <input value={isNewPoll ? "Publish" : "Update"} type="submit" />
    </form>
  );
}
