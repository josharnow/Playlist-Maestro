import { useState, useEffect } from 'react';
import { getTopArtists } from '../spotify';
import { catchErrors } from '../utils';
import ArtistsGrid from './ArtistsGrid';
import SectionWrapper from './SectionWrapper';
import { TimeRangeButtons } from './buttons';

const TopArtistsComponent = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState('short');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopArtists(`${activeRange}_term`); // Calls getTopArtists() from spotify.js, passing ${activeRange}_term as an argument. This controls the time range toggle buttons.
      setTopArtists(data);
    };

    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <main>
      <SectionWrapper title="Top Artists" breadcrumb={ true }>
        <TimeRangeButtons
          activeRange={ activeRange }
          setActiveRange={ setActiveRange }
        />

        { topArtists && topArtists.items && (
          <ArtistsGrid artists={ topArtists.items } />
        ) }
      </SectionWrapper>
    </main>
  );
};

export default TopArtistsComponent;