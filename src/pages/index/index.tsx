import { View } from '@tarojs/components'
import { Button } from '@antmjs/vantui'
import './index.less'

export default function Index() {
  return (
    <View className='index'>
      <View><Button type='primary'>Hello world!</Button></View>
      <View>上面的按钮的颜色已经通过全局主题重写覆盖了，参见src/styles/index.less</View>
    </View>
  )
}

// export default class Index extends Component {

//   componentWillMount () { }

//   componentDidMount () { }

//   componentWillUnmount () { }

//   componentDidShow () { }

//   componentDidHide () { }

//   render () {
//     return (
//       <View className='index'>
//         <View><Button type='primary'>Hello world!</Button></View>
//         <View>上面的按钮的颜色已经通过全局主题重写覆盖了，参见src/style/index.less</View>
//       </View>
//     )
//   }
// }
