/**
 * @prettier
 * @flow
 * */

import React from 'react'
import { requireNativeComponent, PickerIOS, Picker, Text } from 'react-native'

type Props = {
  data: Array<string>,
  selectedItem?: number,
  onItemSelected?: number => void
}

type State = {
  selectedItem: number
}

export default class WheelPicker extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width ? props.width : 200,
      height: props.height ? props.height : 150,
      selectedItem: props.selectedItem
    }
  }
  
  componentDidUpdate(prevProps: Props, prevState: State){
    if (prevState.selectedItem !== this.props.selectedItem){
      this.setState({ selectedItem: this.props.selectedItem })
    }
  }

  onItemSelected = (value: any, index: number) => {
    if (this.props.onItemSelected) {
      this.props.onItemSelected(index)
    }
    this.setState({selectedItem: index})
  }

  render() {
    const data = this.props.data
    if (!data || !data.length < 0) return null
    return (
      <Picker
      {...this.props}
      selectedValue={data[this.state.selectedItem]}
      onValueChange={this.onItemSelected}>
      {this.props.data.map((i, index) => <Picker.Item key={index} label={i} value={i} />)}
    </Picker>
    )
  }
}
