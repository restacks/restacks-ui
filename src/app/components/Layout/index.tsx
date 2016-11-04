import * as React from 'react';
import { Link } from 'react-router';
import { AppBar, Drawer, List } from 'material-ui';
const ListItem = require('material-ui/List').ListItem;
const makeSelectable = require('material-ui/List').makeSelectable;
let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends React.Component<any, any> {
    public static propTypes = {
      children: React.PropTypes.node.isRequired,
      defaultValue: React.PropTypes.number.isRequired,
    };

    public componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    private handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    public render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

class Layout extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {drawerMenuOpen: false};
  }

  private handleToggle = () => this.setState({drawerMenuOpen: !this.state.drawerMenuOpen});

  private handleClose = () => this.setState({drawerMenuOpen: false});

  public render() {
    return (
        <div>
            <AppBar
                title={this.props.title}
                onLeftIconButtonTouchTap={this.handleToggle}
             />
            <Drawer
                docked={false}
                width={200}
                open={this.state.drawerMenuOpen}
                onRequestChange={(open) => this.setState({drawerMenuOpen: open})}
                >
                 <SelectableList value={0} location="/" defaultValue={0}>
                    <ListItem primaryText="Home" value={0}
                      containerElement={<Link to="/"/>}
                      onTouchTap={this.handleClose}/>
                    <ListItem primaryText="About" value={1}
                      containerElement={<Link to="about"/>}
                      onTouchTap={this.handleClose}/>
                    <ListItem primaryText="Counter" value={2}
                      containerElement={<Link to="counter"/>}
                      onTouchTap={this.handleClose}/>
                    <ListItem primaryText="Stars" value={3}
                      containerElement={<Link to="stars"/>}
                      onTouchTap={this.handleClose}/>
                 </SelectableList>
            </Drawer>
        </div>
    );
  }
}

export { Layout }
