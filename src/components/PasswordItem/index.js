import './index.css'

const PasswordItem = props => {
  const {details, isShowPasswords, onDelete} = props
  const {id, website, username, password} = details

  const firstLetter = website[0].toUpperCase()

  const onDeleteItem = () => {
    onDelete(id)
  }

  return (
    <li className="password-item">
      <div className="left-section">
        <div className="avatar">{firstLetter}</div>

        <div className="details">
          <p className="website">{website}</p>
          <p className="username">{username}</p>

          {isShowPasswords ? (
            <p className="password">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          )}
        </div>
      </div>

      <button
        data-testid="delete"
        className="delete-btn"
        onClick={onDeleteItem}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
