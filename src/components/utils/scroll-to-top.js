import React from 'react'

export default class ScrollToTop extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return this.props.children
  }
}
