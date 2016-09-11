import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, logout } from 'src/actions';

import NavBar from './NavBar';

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  onLoginClick: bindActionCreators(login, dispatch),
  onLogoutClick: bindActionCreators(logout, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
