import React from 'react'
import { NavLink } from 'react-router-dom'

class PreferencesForm extends React.Component {
  state = {
    guest: '',
    shouldPrefType: '',
    should: '',
    shoulds: [],
    shouldNotPrefType: '',
    shouldNot: '',
    shouldNots: [],
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  setSelectInputStyleForShould = () => {
    if (this.state.shouldPrefType === 'guest') {
      return { display: 'inline' }
    }
    return { display: 'none' }
  }

  setTextInputStyleForShould = () => {
    if (this.state.shouldPrefType === 'description') {
      return { display: 'inline' }
    }
    return { display: 'none' }
  }

  setSelectInputStyleForShouldNot = () => {
    if (this.state.shouldNotPrefType === 'guest') {
      return { display: 'inline' }
    }
    return { display: 'none' }
  }

  setTextInputStyleForShouldNot = () => {
    if (this.state.shouldNotPrefType === 'description') {
      return { display: 'inline' }
    }
    return { display: 'none' }
  }

  handleSubmit = (e) => {
    this.props.addPreference(this.state)
    this.setState({ guest: '', shoulds: [], shouldNots: [] })
  }



  render() {
    return (
      <div id='pref-form' className='card'>
        <NavLink id='exit' to='/'>&times;</NavLink>
        <form>
          <p><b>ADD SEATING PREFERENCES</b></p>
          <p>
            <label>
              Those Sitting Beside&nbsp;
              <select name='guest' autoFocus required>
                <option value="" hidden>Choose A Guest</option>
                <option value="">Charlie Brown</option>
                <option value="">Sally Brown</option>
              </select>
            </label>:
          </p>
          <div id='pref-area'>
            <div className='pref-box'>
              Should Be...<br/>
              <label>
                <input
                  type="radio"
                  name='shouldPrefType'
                  value='guest'
                  onChange={this.handleChange}
                />&nbsp;
                <i>choose a guest</i>
              </label>&nbsp;&nbsp;
              <select name='should' style={this.setSelectInputStyleForShould()}>
                <option value="" hidden>Guest</option>
                <option value="">Charlie Brown</option>
                <option value="">Sally Brown</option>
              </select><br/>
              <label>
                <input
                  type="radio"
                  name='shouldPrefType'
                  value='description'
                  onChange={this.handleChange}
                />&nbsp;
                <i>enter a description</i>
              </label>&nbsp;&nbsp;
                <input
                  type="text"
                  name='should'
                  onChange={this.handleChange}
                  value={this.state.should}
                  placeholder='Description'
                  style={this.setTextInputStyleForShould()}
                />
            </div>
            <div className='pref-box'>
              Should Not Be...<br/>
              <label>
                <input
                  type="radio"
                  name='shouldNotPrefType'
                  value='guest'
                  onChange={this.handleChange}
                />&nbsp;
                <i>choose a guest</i>
              </label>&nbsp;&nbsp;
              <select name='shouldNot' style={this.setSelectInputStyleForShouldNot()}>
                <option value="" hidden>Guest</option>
                <option value="">Charlie Brown</option>
                <option value="">Sally Brown</option>
              </select><br/>
              <label>
                <input
                  type="radio"
                  name='shouldNotPrefType'
                  value='description'
                  onChange={this.handleChange}
                />&nbsp;
                <i>enter a description</i>
              </label>&nbsp;&nbsp;
              <input
                type="text"
                name='shouldNot'
                onChange={this.handleChange}
                value={this.state.should}
                placeholder='Description'
                style={this.setTextInputStyleForShouldNot()}
              />
            </div>
          </div>
          <br/>
          <NavLink className='button form' to='/guest-form' onClick={this.handleSubmit}>ADD ANOTHER</NavLink>
          <NavLink className='button form' to='/'>NEXT STEP</NavLink>
        </form>
      </div>
    )
  }
}

export default PreferencesForm
