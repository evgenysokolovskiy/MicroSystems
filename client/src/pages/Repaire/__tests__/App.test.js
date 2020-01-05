import React from 'react'
import { shallow } from 'enzyme'
import App from '../App'
import Header from '../containers/Header'
import Content from '../containers/Content'
import Footer from '../containers/Footer'

it('render correctly App', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.contains(<Header />)).toEqual(true)
    expect(wrapper.contains(<Content />)).toEqual(true)
    expect(wrapper.contains(<Footer />)).toEqual(true)
    expect(wrapper).toMatchSnapshot()
})
