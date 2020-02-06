import React from 'react'
import { shallow } from 'enzyme'
import { App } from '../../../components/Content/App'
import { BreadcrumbComponent } from '../../../components/Content/BreadcrumbComponent'
import { MenuComponent } from '../../../components/Content/MenuComponent'
import { TableComponent } from '../../../components/Content/TableComponent'

it('render correctly App', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.contains(<BreadcrumbComponent />)).toEqual(true)
    expect(wrapper.contains(<MenuComponent />)).toEqual(true)
    expect(wrapper.contains(<TableComponent />)).toEqual(true)
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
