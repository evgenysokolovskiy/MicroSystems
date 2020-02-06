import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import connectedHeader, { Header } from '../../containers/Header'
import { App } from '../../components/Header/App'

const mockStore = configureMockStore()
const store = mockStore({})

it('render correctly Header', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.contains(<App />)).toEqual(true)
    expect(wrapper).toMatchSnapshot()
})

it('render correctly Header with store', () => {
    const wrapper = shallow(
        <Provider store={store}>
            <connectedHeader />
        </Provider>
    )

    expect(wrapper.contains(<connectedHeader />)).toEqual(true)
})

/*
it('check props Header', () => {
	const props = {
	    value: 'closed',
	    styles: 'closed'
	}
	const component = shallow(<Header {...props} />)

	expect(component.prop('value')).toEqual('closed')
	expect(component.prop('styles')).toEqual('closed')
})
*/
