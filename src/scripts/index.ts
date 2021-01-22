import '../styles/style.scss'
// import delay from './includes/delay.ts'
//
// (async () => {
//     await delay(3000)
//     console.log('Hello world')
// })()

// import '@material/mwc-icon/mwc-icon-font'
import '@material/mwc-top-app-bar'
import '@material/mwc-icon-button'
import '@material/mwc-dialog'
import '@material/mwc-button'
import '@material/mwc-list/mwc-check-list-item.js';
import '@material/mwc-list/mwc-list.js';
import {Dialog} from "@material/mwc-dialog/mwc-dialog";
import {List} from "@material/mwc-list/mwc-list";
import {CheckListItem} from "@material/mwc-list/mwc-check-list-item";

const navbarInfoButton: HTMLButtonElement = document.querySelector('mwc-icon-button#info')
const dialog: Dialog = document.querySelector('mwc-dialog#dialog')
navbarInfoButton.onclick = () => dialog.show()

const lists = document.querySelectorAll<List>('mwc-list')
// const listItems = document.querySelectorAll<CheckListItem>('mwc-check-list-item')
// document.body.addEventListener('request-selected', e => console.log(e))

interface IListItem {
  title: string,
  selected: boolean
}

const listItems: Array<IListItem> = [
  {
    title: 'Несколько апельсинов',
    selected: false
  },
  {
    title: 'Дыня',
    selected: false
  },
  {
    title: 'Ананас',
    selected: false
  },
  {
    title: 'Абрикосы',
    selected: false
  },
  {
    title: 'Поп корн',
    selected: false
  },
  {
    title: 'Финики',
    selected: true
  },
  {
    title: 'Папайя',
    selected: true
  }
]

document.body.addEventListener('action', (e: CustomEvent) => {
  const {index} = e.detail
  const list = e.target as List
  const items = list.querySelectorAll<CheckListItem>('mwc-check-list-item')
  const current = items[index]
  list.removeChild(current)
  if (current.selected) {
    document.querySelector('#selected').insertBefore(current, document.querySelector('#selected').firstChild)
  } else {
    document.querySelector('#not-selected').insertBefore(current, document.querySelector('#not-selected').firstChild)
  }
})

class ListOfItems {
  private readonly defaultList: List = document.querySelector('#default-list')
  private readonly selectedItemsList: List = document.querySelector('#selected-items-list')
  private state: Array<IListItem> = listItems

  renderLists() {
    this.state.forEach(({selected, title}) => {
      const template: string =
        `<mwc-check-list-item ${selected ?? 'selected'}>${title}</mwc-check-list-item>`

      if (selected) {
        this.selectedItemsList.insertAdjacentHTML('beforebegin', template)
        return
      }

      this.defaultList.insertAdjacentHTML('beforebegin', template)
    })
  }
}

const listOfItems = new ListOfItems()
listOfItems.renderLists()