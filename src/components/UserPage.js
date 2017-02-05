import Inferno from 'inferno';

import Polls from './Polls';
import PollEditor from './PollEditor';

export default ({polls}) => {
  return (
    <div>
      <PollEditor />
      <Polls polls={polls} />
    </div>
  );
}
