import Inferno from 'inferno';

export default ({poll}) => {
  return (
    <article class="card">
      <header>
        <h2>{poll.title}</h2>
        <h6>by <Link to={`/users/${poll.authorUrlPart}`}>{poll.author}</Link></h6>
      </header>

      <section>
        <h6>Select your vote option:</h6>
        <form>
          <select>
            <option></option>
            {poll.opts.map(opt=> <option>{opt.title}</option>)}
          </select>
          <input value="Submit vote" type="submit" />
        </form>

      </section>
    </article>
  );
}
