import React, { Component } from 'react';
import LayoutContentWrapper from '@isomorphic/shared/isomorphic/components/utility/layoutWrapper';
import LayoutContent from '@isomorphic/shared/isomorphic/components/utility/layoutContent';

export default class extends Component {
  render() {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>DASHBOARD HOME</h1>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
