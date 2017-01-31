import Inferno from 'inferno';

export default ({polls}) => {
  return (
    <div>
      {polls.map(poll=> {
        return <span class="button stack">{poll.title}</span>;
      })}
    </div>
  );
}
