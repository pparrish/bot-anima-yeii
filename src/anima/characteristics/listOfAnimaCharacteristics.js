import createList from '../utils/createList'
import Characteristic from './characteristic'

const list = [
  {
    name: 'strength',
    category: 'physical',
    CREATOR: Characteristic,
  },
  {
    name: 'dexterity',
    category: 'physical',
    CREATOR: Characteristic,
  },
  {
    name: 'agility',
    category: 'physical',
    CREATOR: Characteristic,
  },
  {
    name: 'physique',
    category: 'physical',
    CREATOR: Characteristic,
  },
  {
    name: 'inteligence',
    category: 'psychic',
    CREATOR: Characteristic,
  },
  {
    name: 'power',
    category: 'psychic',
    CREATOR: Characteristic,
  },
  {
    name: 'will',
    category: 'psychic',
    CREATOR: Characteristic,
  },
  {
    name: 'perception',
    category: 'psychic',
    CREATOR: Characteristic,
  },
]
export default createList(list)
