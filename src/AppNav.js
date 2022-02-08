import React, { Component } from 'react';
import {Nav, Navbar, NavItem, NavbarBrand, NavLink} from 'reactstrap'

class AppNav extends Component {
    state = {  } 
    render() { 
        return (
          <div>
            <Navbar color="dark" expand="md" dark>
              <NavbarBrand href="/">Expense Tracker Application</NavbarBrand>
                <Nav className="me-auto" navbar>
                  <NavItem>
                    <NavLink href="/">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/categories">Categories</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/expenses">Expenses</NavLink>
                  </NavItem>
                </Nav>
            </Navbar>
          </div>
        );
    }
}
 
export default AppNav;