import React from 'react'
import { shallow } from 'enzyme'
import { App } from '../../../components/Header/App'
import { LogoComponent } from '../../../components/Header/LogoComponent'
import { MenuComponent } from '../../../components/Header/MenuComponent'
import { SearchComponent } from '../../../components/Header/SearchComponent'

it('render correctly App', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.contains(<LogoComponent />)).toEqual(true)
    expect(wrapper.contains(<MenuComponent />)).toEqual(true)
    expect(wrapper.contains(<SearchComponent />)).toEqual(true)
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
