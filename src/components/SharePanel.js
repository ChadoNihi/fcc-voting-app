import Inferno from 'inferno';

export default ({text}) => {
  return (
    <div>
      <a className="button"
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
        target='_blank'>
        Tweet</a>

      <div className="fb-share-button" data-layout="link" data-mobile-iframe="true">
        <a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u&amp;src=sdkpreparse">
          Share</a>
      </div>
    </div>
  );
}
