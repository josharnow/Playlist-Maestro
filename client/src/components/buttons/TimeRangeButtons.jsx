import { StyledRangeButtons } from '../../styles';

const TimeRangeButtons = ({ activeRange, setActiveRange }) => { // The activeRange prop is a string that's either short, medium, or long; this will be used to set the active button and fetch the correct data from the Spotify API. The setActiveRange prop is a function that is used to update the activeRange state variable when a user clicks the buttons.
  return (
    <StyledRangeButtons>
      <li>
        <button
          className={ activeRange === 'short' ? 'active' : '' }
          onClick={ () => setActiveRange('short') }>
          This Month
        </button>
      </li>
      <li>
        <button
          className={ activeRange === 'medium' ? 'active' : '' }
          onClick={ () => setActiveRange('medium') }>
          Last 6 Months
        </button>
      </li>
      <li>
        <button
          className={ activeRange === 'long' ? 'active' : '' }
          onClick={ () => setActiveRange('long') }>
          All Time
        </button>
      </li>
    </StyledRangeButtons>
  );
};
export default TimeRangeButtons;