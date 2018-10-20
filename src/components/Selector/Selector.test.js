import React from 'react';
import renderer from 'react-test-renderer';
import Selector from './Selector';

it('renders selector correctly', () => {
    const tree = renderer
        .create(<Selector selected={3} change={(something) => something}></Selector>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});