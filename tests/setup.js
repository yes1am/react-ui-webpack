// tests/setup.js
import { configure } from 'enzyme'
// adapter 的版本需要与 react 版本对应，当前没有官方的 react17 版本的 adapter，参考: https://github.com/enzymejs/enzyme/issues/2429
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({ adapter: new Adapter() })
