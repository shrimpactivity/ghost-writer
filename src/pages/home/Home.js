import React from 'react';
import PropTypes from 'prop-types';
import Notification from '../../components/Notification';
import Navbar from '../../components/Navbar';
import SourceSelectionContainer from './sourceSelection/SourceSelectionContainer';
import CompositionContainer from './composition/CompositionContainer';
import MenuContainer from './menu/MenuContainer';
import { CssBaseline } from '@mui/material';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const Home = (props) => {
  return (
    <>
      <CssBaseline />
      <Navbar
        onLoginClick={props.onLoginClick}
        userLoggedIn={props.userLoggedIn}
        onAboutClick={props.onAboutClick}
        onLogoClick={props.onLogoClick}
      />
      <div className="home-container" style={style}>
        <Notification text={props.notification.text} />
        <SourceSelectionContainer
          value={props.sources.current.id}
          onChange={props.onSourceSelectionChange}
          allSources={props.sources.all}
        />
        <CompositionContainer
          composition={props.composition}
          suggestion={props.suggestion.value}
          isSuggestionLoading={props.suggestion.isTimedOut()}
          options={props.options}
          onProposalSubmit={props.onProposalSubmit}
          onContainerClick={props.onCompositionContainerClick}
          onContentClick={props.onContentWordClick}
          onAddNewLine={() => composition.addNewLine()}
          onDeleteComposition={props.onDeleteComposition}
          proposalInputRef={props.proposalInputRef}
        />
        <MenuContainer
          options={props.options}
          showOptions={props.showOptions}
          onOptionsClick={props.onOptionsClick}
          onOpenSearchClick={props.onOpenSearchClick}
        />
      </div>
    </>
  );
};

Home.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  userLoggedIn: PropTypes.bool.isRequired,
  onAboutClick: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  sources: PropTypes.object.isRequired,
  onSourceSelectionChange: PropTypes.func.isRequired,
  composition: PropTypes.object.isRequired,
  suggestion: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  onProposalSubmit: PropTypes.func.isRequired,
  onCompositionContainerClick: PropTypes.func.isRequired,
  onContentWordClick: PropTypes.func.isRequired,
  onDeleteComposition: PropTypes.func.isRequired,
  proposalInputRef: PropTypes.object,
  showOptions: PropTypes.bool.isRequired,
  onOptionsClick: PropTypes.func.isRequired,
  onOpenSearchClick: PropTypes.func.isRequired,
};

export default Home;
