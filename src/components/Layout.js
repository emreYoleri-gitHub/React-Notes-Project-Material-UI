import React from "react";
import { makeStyles } from "@material-ui/core";
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";
import { AppBar, Toolbar } from "@material-ui/core";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: 20,
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      textAlign: "center",
      padding: 20,
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolBar: theme.mixins.toolbar,
  };
});
const Layout = ({ children }) => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlined color="secondary" />,
      path: "/create",
    },
  ];
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography>Welcome to My Notes Project</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        className={classes.drawer}
      >
        <div>
          <Typography className={classes.title} variant="h5">
            Notes
          </Typography>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              className={
                item.path === location.pathname ? classes.active : null
              }
              key={item.text}
              button
              onClick={() => history.push(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolBar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
