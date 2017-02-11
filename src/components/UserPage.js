import Inferno from 'inferno';
import { connect } from 'inferno-redux';

import Polls from './Polls';
import PollEditor from './PollEditor';

const UserPage = ({polls}) => {
  return (
    <div>
      <PollEditor />
      <Polls polls={polls} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    polls: state.polls,
    user: state.user
  };
}

const TheUserPage = connect(
    mapStateToProps
)(UserPage);

export default TheUserPage;
