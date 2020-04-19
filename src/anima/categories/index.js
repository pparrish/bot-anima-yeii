import Category from './Category'
import categories from '../categories.json'

const cat = Object.entries(categories).reduce(
  (arr, entrie) => {
    arr.push(
      new Category(
        entrie[0],
        entrie[1].archetype,
        entrie[1].pv,
        entrie[1].turn,
        entrie[1]['martial knowledge'],
        entrie[1]['innate cv'],
        entrie[1].limits,
        entrie[1].costs,
        entrie[1].bonus
      )
    )
    return arr
  },
  []
)

export default cat
