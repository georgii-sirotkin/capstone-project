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
  Button,
  Box,
  Link,
} from '@material-ui/core';
import {
  Home as HomeIcon,
  Comment as CommentIcon,
  ContactSupport as ContactSupportIcon,
  Menu as MenuIcon,
  AccountCircle,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import ListItemNavLink from './ListItemNavLink';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
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
  navLink: {
    margin: theme.spacing(1, 1.5),
  },
  loginButton: {
    marginLeft: theme.spacing(1.5),
  },
  accountMenuButton: {
    marginLeft: theme.spacing(1.5),
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

export default function Layout({ onLogOut, user, children }) {
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

  const sidebar = getSidebarJsx();

  return (
    <div className={classes.root}>
      <AppBar>
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
          <Box display='flex' alignItems='center'>
            <Hidden mdDown>
              <Link
                variant='button'
                color='inherit'
                component={RouterLink}
                to='/'
                className={classes.navLink}
              >
                Hotels
              </Link>
              <Link
                variant='button'
                color='inherit'
                component={RouterLink}
                to='reviews'
                className={classes.navLink}
              >
                Reviews
              </Link>
              <Link
                variant='button'
                color='inherit'
                component={RouterLink}
                to='contact-us'
                className={classes.navLink}
              >
                Contact Us
              </Link>
            </Hidden>
            {user ? (
              <>
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={openMenu}
                  color='inherit'
                  className={classes.accountMenuButton}
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
                    to='/profile'
                    onClick={handleMenuClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to='/profile/change-password'
                    onClick={handleMenuClose}
                  >
                    Change Password
                  </MenuItem>
                  <MenuItem onClick={onLogOut}>Log Out</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color='inherit'
                variant='outlined'
                component={RouterLink}
                to='login'
                className={classes.loginButton}
              >
                Login
              </Button>
            )}
          </Box>
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
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

function getSidebarJsx() {
  return (
    <List>
      {[
        {
          text: 'Hotels',
          url: '/',
          exact: false,
          icon: <HomeIcon />
        },
        {
          text: 'Reviews',
          url: '/reviews',
          exact: false,
          icon: <CommentIcon />
        },
        {
          text: 'Contact Us',
          url: '/contact-us',
          exact: false,
          icon: <ContactSupportIcon />
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
