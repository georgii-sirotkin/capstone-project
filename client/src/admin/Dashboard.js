import React, { useState } from 'react';
import {
  List,
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  IconButton,
  Hidden,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  Home as HomeIcon,
  PeopleAlt as PeopleAltIcon,
  Menu as MenuIcon,
  AccountCircle,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  Link as RouterLink,
} from 'react-router-dom';
import ListItemNavLink from '../ListItemNavLink';
import Hotels from './Hotels';
import Users from './Users';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Dashboard({ onLogOut, user }) {
  const { url, path} = useRouteMatch();
  const classes = useStyles();
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  function toggleMobileNavbar() {
    setIsMobileNavbarOpen(open => !open);
  }

  function openMenu(event) {
    setMenuAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setMenuAnchorEl(null);
  }

  if (!user) {
    return <Redirect to='/login' />
  }

  if (!user.isAdmin) {
    return <Redirect to='/' />
  }

  const sidebar = getSidebarJsx(url);

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={toggleMobileNavbar}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title} noWrap>
            Hotel Listing
          </Typography>
          <div>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={openMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={menuAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                component={RouterLink}
                to={`${url}/profile`}
                onClick={handleMenuClose}
              >
                Profile
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to={`${url}/profile/change-password`}
                onClick={handleMenuClose}
              >
                Change Password
              </MenuItem>
              <MenuItem onClick={onLogOut}>Log Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden mdUp implementation='css'>
          <Drawer
            anchor='left'
            open={isMobileNavbarOpen}
            onClose={toggleMobileNavbar}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div className={classes.toolbar} />
            <div onClick={toggleMobileNavbar}>
              {sidebar}
            </div>
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer
            variant='permanent'
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {sidebar}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path={`${path}/hotels`}>
            <Hotels />
          </Route>
          <Route path={`${path}/users`}>
            <Users />
          </Route>
          <Route path={path}>
            <Redirect to={`${path}/hotels`} />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

function getSidebarJsx(matchedUrl) {
  return (
    <List>
      {[
        {
          text: 'Hotels',
          url: `${matchedUrl}/hotels`,
          exact: false,
          icon: <HomeIcon />
        },
        {
          text: 'Users',
          url: `${matchedUrl}/users`,
          exact: false,
          icon: <PeopleAltIcon />
        },
      ].map(({ text, url, icon, exact }) => (
        <ListItemNavLink
          key={text}
          to={url}
          primary={text}
          icon={icon}
          exact={exact} />
      ))}
    </List>
  )
}
