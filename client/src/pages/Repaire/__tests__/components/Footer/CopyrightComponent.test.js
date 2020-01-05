import React from 'react'
import { shallow } from 'enzyme'
import { CopyrightComponent } from '../../../components/Footer/CopyrightComponent'

it('render correctly FooterComponent', () => {
    const component = shallow(<CopyrightComponent />)
    expect(component).toMatchSnapshot()
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
