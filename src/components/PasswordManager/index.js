import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: [],
    searchInput: '',
    isShowPasswords: false,
  }

  componentDidMount() {
    const savedData = localStorage.getItem('passwords')
    if (savedData) {
      this.setState({passwordList: JSON.parse(savedData)})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.passwordList !== this.state.passwordList) {
      localStorage.setItem('passwords', JSON.stringify(this.state.passwordList))
    }
  }

  onChangeWebsite = e => this.setState({website: e.target.value})
  onChangeUsername = e => this.setState({username: e.target.value})
  onChangePassword = e => this.setState({password: e.target.value})

  onAddPassword = e => {
    e.preventDefault()
    const {website, username, password} = this.state

    if (website && username && password) {
      const newItem = {
        id: uuidv4(),
        website,
        username,
        password,
      }

      this.setState(prev => ({
        passwordList: [...prev.passwordList, newItem],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  onDeletePassword = id => {
    this.setState(prev => ({
      passwordList: prev.passwordList.filter(each => each.id !== id),
    }))
  }

  onSearch = e => this.setState({searchInput: e.target.value})

  toggleShowPasswords = () => {
    this.setState(prev => ({isShowPasswords: !prev.isShowPasswords}))
  }

  render() {
    const {
      website,
      username,
      password,
      passwordList,
      searchInput,
      isShowPasswords,
    } = this.state

    const filteredList = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />

        <div className="top-container">
          <form onSubmit={this.onAddPassword} className="form">
            <h1 className="main-header">Add New Password</h1>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>

            <button type="submit" className="add-btn">
              Add
            </button>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="top-img"
          />
        </div>

        <div className="bottom-container">
          <div className="header">
            <div className="title">
              <h1>Your Passwords</h1>
              <p className="count">{passwordList.length}</p>
            </div>

            <div className="search-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.onSearch}
              />
            </div>
          </div>

          <hr />

          <div className="checkbox-container">
            <input
              type="checkbox"
              onChange={this.toggleShowPasswords}
              className="checkbox"
            />
            <label className="checkbox-label">Show Passwords</label>
          </div>

          {filteredList.length === 0 ? (
            <div className="no-passwords">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-img"
              />
              <p>No Passwords</p>
            </div>
          ) : (
            <ul className="list">
              {filteredList.map(each => (
                <PasswordItem
                  key={each.id}
                  details={each}
                  isShowPasswords={isShowPasswords}
                  onDelete={this.onDeletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
