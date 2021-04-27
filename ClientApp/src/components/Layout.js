import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { Footer } from './Footer';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
            <NavMenu />
            <Container className="themed-container" fluid={true} style={{margin:"0px",padding:"0px"}}>
          {this.props.children}
            </Container>
            <Footer />

      </div>
    );
  }
}
