import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import connectedContent, { Content } from '../../containers/Content'
import { App } from '../../components/Content/App'

const mockStore = configureMockStore()
const store = mockStore({})

it('render correctly Content', () => {
    const wrapper = shallow(<Content />)
    expect(wrapper.contains(<App />)).toEqual(true)
    expect(wrapper).toMatchSnapshot()
})

it('render correctly Content with store', () => {
    const wrapper = shallow(
        <Provider store={store}>
            <connectedContent />
        </Provider>
    )

    expect(wrapper.contains(<connectedContent />)).toEqual(true)
})

/*
it('check props Content', () => {
	const props = {
	    value: 'closed',
	    styles: 'closed'
	}
	const component = shallow(<Content {...props} />)

	expect(component.prop('value')).toEqual('closed')
	expect(component.prop('styles')).toEqual('closed')
})
*/
