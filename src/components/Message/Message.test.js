import React from 'react';
import renderer from 'react-test-renderer';
import Message from './Message';

it('renders message correctly', () => {
    const tree = renderer
        .create(<Message text='Dummy text for testing'></Message>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});