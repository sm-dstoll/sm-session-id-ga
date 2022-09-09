import ReactGA from 'react-ga';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import DPChat from './routes/DPChat';
import Landing from './routes/Landing';
import Loading from './routes/Loading';
import Feedback from './routes/FeedbackRoute';
import ContentCardTest from './routes/ContentCardTest';

// only init google analytics if a tracking ID is defined in env
const { REACT_APP_GA_TRACKING_ID } = process.env;
if (REACT_APP_GA_TRACKING_ID) ReactGA.initialize(REACT_APP_GA_TRACKING_ID);

// make GA aware of what pages people navigate to in react router
const LinkGAtoRouter = withRouter(({ history }) => {
  console.log('Link GA to Router Called');
  history.listen((location) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });
  return <div />;
});

function App({ sessionId }) {
  console.log(`Session ID from router: ${sessionId}`);
  if (sessionId) {
    console.log({ sessionId }, 'found');
  } else {
    console.log('````` NO SESSION ID');
  }
  return (
    <Router>
      <Switch>
        <Route path="/content-card-test">
          <ContentCardTest />
        </Route>
        <Route path="/loading">
          <Loading />
        </Route>
        <Route path="/video">
          <DPChat />
        </Route>
        <Route path="/feedback">
          <Feedback />
        </Route>
        {/* / goes at the bottom */}
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
      <LinkGAtoRouter />
    </Router>
  );
}

App.propTypes = {
  sessionId: PropTypes.string.isRequired,
};

const mapStateToProps = ({ sm }) => ({
  sessionId: sm.sessionId,
});

export default connect(mapStateToProps)(App);
