import { hello } from '../src/index'
import './index.css'

const el = document.createElement('p')
el.textContent = hello('world')

document.body.appendChild(el)
