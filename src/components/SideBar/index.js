import React, { Component } from 'react';
import PropTypes from 'prop-types';

// React Router Dom
import { Link } from 'react-router-dom';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';

// Material-UI Icons
import AddIcon from '@material-ui/icons/AddBox';
import VODIcon from '@material-ui/icons/OndemandVideo';

// My Assets
import direcTv from 'assets/images/direcTv.png';

// My Styles
const styles = {
  drawerPaper: {
    position: 'relative',
    width: 250,
    backgroundColor: '#262f3d',
    color: '#fff',
  },
  wrapperItems: {
    backgroundColor: '#19212b',
  },
  itemNested: {
    paddingLeft: 32,

    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
  },
  iconGrey: {
    marginRight: 0,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  iconWhite: {
    marginRight: 0,
    color: '#fff',
  },
  divider: {
    backgroundColor: '#404854',
  },
  itemText: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '400',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    lineHeight: '1.5em',
  },
  nestedText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  itemList: {
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
  },
  headerActive: {
    backgroundColor: '#19212b',

    '&:hover': { backgroundColor: '#19212b' },
  },
  direcTvIcon: {
    width: 24,
    height: 24,
    borderRadius: 2,

    '& img': { objectFit: 'contain' },
  },
  actionLink: {
    textDecoration: 'none',
    color: 'white',
  },
};

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandLocations: false,
      expandProducts: false,
    };
  }

  onExpandLocations = () => {
    this.setState(state => ({
      expandLocations: !state.expandLocations,
      expandProducts: false,
    }));
  };

  onExpandProducts = () => {
    this.setState(state => ({
      expandProducts: !state.expandProducts,
      expandLocations: false,
    }));
  };

  render() {
    const { classes, onShowDrawer, showDrawer } = this.props;
    const { expandLocations, expandProducts } = this.state;

    return (
      <Drawer
        open={showDrawer}
        onClose={onShowDrawer(false)}
        classes={{ paper: classes.drawerPaper }}>
        <div tabIndex={0} role="button" onKeyDown={onShowDrawer(false)}>
          <List>
            <ListItem
              button
              disableRipple
              onClick={this.onExpandLocations}
              className={[classes.itemList, (expandLocations ? classes.headerActive : '')].join(' ')}>
              <ListItemText disableTypography className={classes.itemText} primary="Locations" />
              {expandLocations ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={expandLocations}
              timeout="auto"
              unmountOnExit
              classes={{ wrapper: classes.wrapperItems }}>
              <List component="div" disablePadding>
                <ListItem button className={classes.itemNested} onClick={onShowDrawer(false)}>
                  <ListItemIcon className={classes.iconGrey}>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText disableTypography className={[classes.itemText, classes.nestedText].join(' ')} inset primary="Add" />
                </ListItem>

                <ListItem button className={classes.itemNested} onClick={onShowDrawer(false)}>
                  <ListItemIcon className={classes.iconGrey}>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText disableTypography className={[classes.itemText, classes.nestedText].join(' ')} inset primary="Manage" />
                </ListItem>
              </List>
            </Collapse>

            <Divider className={classes.divider} />

            <ListItem
              button
              disableRipple
              onClick={this.onExpandProducts}
              className={[classes.itemList, (expandProducts ? classes.headerActive : '')].join(' ')}>
              <ListItemText disableTypography className={classes.itemText} primary="Products" />
              {expandProducts ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={expandProducts}
              timeout="auto"
              unmountOnExit
              classes={{ wrapper: classes.wrapperItems }}>
              <List component="div" disablePadding>
                <ListItem button className={classes.itemNested} onClick={onShowDrawer(false)}>
                  <ListItemIcon className={classes.iconGrey}>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText disableTypography className={[classes.itemText, classes.nestedText].join(' ')} inset primary="Add" />
                </ListItem>

                <ListItem button className={classes.itemNested} onClick={onShowDrawer(false)}>
                  <ListItemIcon className={classes.iconGrey}>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText disableTypography className={[classes.itemText, classes.nestedText].join(' ')} inset primary="Manage" />
                </ListItem>
              </List>
            </Collapse>

            <Divider className={classes.divider} />

            <Link to="/" className={classes.actionLink} onClick={onShowDrawer(false)}>
              <ListItem button className={classes.itemList}>
                <ListItemIcon className={classes.iconWhite}>
                  <VODIcon />
                </ListItemIcon>
                <ListItemText disableTypography className={classes.itemText} inset primary="VOD" />
              </ListItem>
            </Link>

            <Link to="/login" className={classes.actionLink} onClick={onShowDrawer(false)}>
              <ListItem button className={classes.itemList}>
                <Avatar className={classes.direcTvIcon} alt="DirecTV" src={direcTv} />
                <ListItemText disableTypography className={classes.itemText} inset primary="DirecTV" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onShowDrawer: PropTypes.func.isRequired,
  showDrawer: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SideBar);
