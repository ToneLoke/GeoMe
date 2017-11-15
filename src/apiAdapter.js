// change this to the API of your chosing
const baseURL = 'https://small-project-api.herokuapp.com'

// Auth settings go here i.e. Tokens, Cookies, Content
const headers = () => {
  const JWT = localStorage.getItem('jwt')
  return {
    'Content-Type': 'application/json',
    'x-access-token': JWT
  }
}

// Generates your dynamic API request given 3 ARGs Address, Name
class API {
// Make your function a class level request
  static request (url, method, data) {
  // Create the promise object to properly .catch() the promise reject error when being called. Some api's do not setup their backend to correctly give errors.
    const promise = new Promise((resolve, reject) => {
    // Checks for proper data types
      if (!(typeof url === 'string') || !(typeof url === 'string')) return reject(new Error('url and method must be type string'))
      // Gernerate the https request type and attach headers from line 5.
      let params = {
        method: method,
        headers: headers()
      }
      // makes params object or sends error for object
      if (data) {
        if (typeof data === 'object') {
          params = {...params, body: JSON.stringify(data)}
        } else {
          return reject(new Error('params must be correct data type'))
        }
      }
      console.log('before the fetch', params)
      return fetch(`${baseURL}/${url}`, params)
              .then(res => res.json())
              .then(s => {
                // this is to handle the incorrect error handling from server i.e. 400 and 401 do not hit JS .catch  else skip the step
                if (s.reason) return reject(s)
                return resolve(s)
              })
              .catch(e => {
                reject(new Error(e))
              })
    })
    return promise
  }
}

// Common Auth calls can be altered for naming purposes
export class Auth extends API {
  static login (params) {
    return super.request('access-tokens', 'POST', params)
  }
  static signUp (params) {
    return super.request('users', 'POST', params)
  }
  static user () {
    return super.request('me', 'GET')
  }
  static refresh (params) {
    return super.request('access-tokens/refresh', 'POST', params)
  }
}

export class Ideas extends API {
  static get URL () {
    return 'ideas'
  }
  static get () {
    return super.request(Ideas.URL, 'GET')
  }
  static create (params) {
    return super.request(Ideas.URL, 'POST', params)
  }
  static delete (id) {
    return super.request(`${Ideas.URL}/${id}`, 'DELETE')
  }
  static update (id, params) {
    return super.request(`${Ideas.URL}/${id}`, 'PUT', params)
  }

}

import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './styles.css'

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={1000}
    classNames='fade'
  >
    {children}
  </CSSTransition>
)

class TodoList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { items: ['hello', 'world', 'click', 'me'] }
  }
  handleAdd () {
    this.setState({
      items: [
        ...this.state.items,
        prompt('Enter some text')
      ]
    })
  }
  handleRemove (i) {
    let newItems = this.state.items.slice()
    newItems.splice(i, 1)
    this.setState({ items: newItems })
  }
  render () {
    return (
      <div className='container'>
        <TransitionGroup className='todo-list'>
          {this.state.items.map((item, i) => (
            <Fade key={item}>
              <div>
                {`${item} `}
                <button onClick={() => this.handleRemove(i)}>
                  &times;
                </button>
              </div>
            </Fade>
          ))}
        </TransitionGroup>
        <button onClick={() => this.handleAdd()}>Add Item</button>
      </div>
    )
  }
}

ReactDOM.render(<TodoList />, document.getElementById('root'))
