import Inferno from 'inferno';

const Polls = ({polls}) => {
  return (
    <div>
      {polls.map(poll=> {
        return <span class="button stack">{poll.title}</span>;
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    polls: state.polls
  };
}

const ThePolls = connect(
    mapStateToProps
)(Polls);

export default ThePolls;
