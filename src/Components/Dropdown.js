/**
 * <DropdownList value="010">
 *   <DropdownItem value="010" label="Beijing"/>
 *   <DropdownItem value="027" label="Wuhan"/>
 * </DropdownList>
 */

import React, {PropTypes} from 'react'

var DropdownItem = React.createClass({
  propTypes: {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func
  },

  getDefaultProps: function() {
    return {
      label: null,
      value: null,
      onChange: null
    }
  },

  getInitialState: function() {
    return {
      selected: false
    }
  },

  handleClick: function(e) {
    this.setState({
      selected: true
    })

    this.props.onChange.call(this, e, {
      label: this.props.label,
      value: this.props.value
    })
  },

  render: function() {
    var className = this.state.selected ? 'selected-dropdown-menu' : ''
    return (
      <li className={className} onClick={this.handleClick}>
        <a tabIndex="-1" href="javascript:;">
          {this.props.label}
        </a>
      </li>
    )
  }
})

var DropdownList = React.createClass({
  getInitialState: function() {
    // 从items中读取或者从child element
    var childList = this.props.items || React.Children.toArray(this.props.children)
    var value = this.props.value || childList[0].props.value
    var selectedItems = childList.filter((item) => {
      return item.props ? item.props.value === value : item.value === value
    })
    var selectedItem = selectedItems && selectedItems.length ? selectedItems[0] : childList[0]
    if (!selectedItem) {
      throw new Error('DropdownList need at least a DropdownItem')
    }

    var items = childList.map((item) => {
      return {
        label: item.props ? item.props.label : item.label,
        value: item.props ? item.props.value : item.value
      }
    })

    return {
      label: selectedItem.props.label,
      value: selectedItem.props.value,
      items: items,
      isExpanded: false
    }
  },

  toggle: function() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  },

  handleChange: function(e, item) {
    this.setState({
      label: item.label,
      value: item.value,
      isExpanded: false
    })

    this.props.onChange.call(this, e, item)
  },

  render: function() {
    var liList = this.state.items.map((item) => {
      return <DropdownItem label={item.label} value={item.value} key={item.value} onChange={this.handleChange} />
    })

    return (
      <div className="btn-group dropdown dropdown-select">
        <button className="btn btn-select dropdown-toggle" type="button" onClick={this.toggle}>
          {this.state.label}
          <span className="caret"></span>
        </button>

        <ul className={this.state.isExpanded ? '' : 'hidden'}>{liList}</ul>
      </div>
    )
  }
})

export {DropdownList, DropdownItem}
