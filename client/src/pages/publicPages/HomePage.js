import Banner from 'components/Banner/Banner';
import FeaturedRow from 'components/Row/FeaturedRow';
import PosterRow from 'components/Row/PosterRow';
import { homePageRowInfo } from 'dataConfig/homePageData';

export default function HomePage() {
  return (
    <>
      <Banner />
      <FeaturedRow />
      {homePageRowInfo.map((row, index) => (
        <PosterRow
          key={index}
          title={row.row_title}
          sagaFunction={row.sagaFunction}
          selector={row.selector}
          genre={row.genre}
        />
      ))}
    </>
  );
}
