import categories from '../../categories'
import CategorySelector from '../selectors/CategorySelector'

export default class CharacterCreator {
  constructor() {
    // TODO Get this categories in another method
    this.categories = categories

    this.categorySelector = new CategorySelector(
      this.data.selectedCategory,
      this.categories
    )

    this.categorySelector.rules.add(
      'Update de development points shop',
      'category/selected',
      ({ category }) => {
        this.data.developmentPointsShop.mergeCatalog(
          category.abilitiesCosts
        )
      }
    )
  }
}
