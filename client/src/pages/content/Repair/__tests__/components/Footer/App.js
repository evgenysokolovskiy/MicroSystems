import React from 'react'
import { shallow } from 'enzyme'
import { App } from '../../../components/Footer/App'
import { CopyrightComponent } from '../../../components/Footer/CopyrightComponent'

it('render correctly App', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.contains(<CopyrightComponent />)).toEqual(true)
    expect(wrapper).toMatchSnapshot()
})

/*
it ('check static props Button', () => {
	const props = {
	    value: 'closed',
	    styles: 'closed'
	}
	const component = shallow(<Button {...props} />)

	//expect(component.find({ value: 'hey' }).length).toEqual(1)
	expect(component.find('button').hasClass('closed')).toEqual(true)
	expect(component.find('button').text()).toEqual('closed')
})

it ('check callback props Button', () => {
	const _click = jest.fn()
	const props = {
		getHandleClick: _click
	}
	const component = shallow(<Button {...props} />)
	component.find('button').simulate('click')
	expect(_click).toHaveBeenCalled()
})
*/
