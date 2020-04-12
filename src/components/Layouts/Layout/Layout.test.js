import React from 'react'
import {configure,shallow, mount} from 'enzyme'
import ReactAdapter from 'enzyme-adapter-react-16'
import Layout from './Layout'
import Route from 'react-router-dom'

configure({adapter: new ReactAdapter()});

describe('<Layout/>',()=>{
    it('should have All Links',()=>{
        const layoutWrapper = shallow(<Layout/>);
        expect(layoutWrapper.find('a')).toHaveLength(12);
    })
})