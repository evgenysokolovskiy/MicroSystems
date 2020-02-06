import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import connectedFooter, { Footer } from '../../containers/Footer'
import { App } from '../../components/Footer/App'

const mockStore = configureMockStore()
const store = mockStore({})

it('render correctly Footer', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper.contains(<App />)).toEqual(true)
    expect(wrapper).toMatchSnapshot()
})

it('render correctly Footer with store', () => {
    const wrapper = shallow(
        <Provider store={store}>
            <connectedFooter />
        </Provider>
    )

    expect(wrapper.contains(<connectedFooter />)).toEqual(true)
})

/*
it('check props Footer', () => {
	const props = {
	    value: 'closed',
	    styles: 'closed'
	}
	const component = shallow(<Footer {...props} />)

	expect(component.prop('value')).toEqual('closed')
	expect(component.prop('styles')).toEqual('closed')
})
*/
