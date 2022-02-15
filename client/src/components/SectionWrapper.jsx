// This is a component that will wrap around the <ArtistsGrid> component

import { Link } from 'react-router-dom';
import { StyledSection } from '../styles';

const SectionWrapper = ({ children, title, seeAllLink, breadcrumb }) => {
  // const { id } = useParams();

  return (
    <StyledSection>
      <div className="section__inner">
        <div className="section__top">
          <h2 className="section__heading">
            { breadcrumb && (
              <span className="section__breadcrumb">
                <Link to={`/profile`}>Profile</Link>
              </span>
            ) }
            { title && (
              <>
                { seeAllLink ? (
                  <Link to={ seeAllLink }>{ title }</Link>
                ) : (
                  <span>{ title }</span>
                ) }
              </>
            ) }
          </h2>
          { seeAllLink && (
            <Link to={ seeAllLink } className="section__see-all">See All</Link>
          ) }
        </div>

        { children }
      </div>
    </StyledSection>
  );
};
export default SectionWrapper;