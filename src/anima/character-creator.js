import Characteristics from './characteristics/characteristics'
import RollsGenerator from './rolls-generator'
import CharacteristicsSelector from './sheet-selectors/characteristics-selector'
import GenerateRolls from './sheet-selectors/GenerateRolls'
import PointsShop from './shop/PointsShop'
import ValuesShop from './shop/ValuesShop'
import D10 from '../dices/d10'
import PhysicalAttibutesSelector from './sheet-selectors/physical-attributes-selector'
import Shop from './shop/Shop'
import SecondaryCharacteristics from './secondary-characteristics/SecondaryCharacteristics'
import PhysicalCapacities from './physical-capacities/PhysicalCapacities'
import RulesHandler from './rulesHandler/RulesHandler'
import categories from './categories/'
import CategorySelector from './sheet-selectors/category-selector'

const d10 = new D10()
const DEFAULT_POINTS_TO_GENERATE = 60

export default class CharacterCreator {
  constructor() {
    this.data = {
      generatedRolls: {
        type: undefined,
        mode: undefined,
        points: undefined,
        generated: {},
      },
      pointsShop: {
        values: new ValuesShop(),
        points: new PointsShop(),
      },
      characteristics: new Characteristics(),
      body: {
        randomAppearance: d10.roll(),
        height: undefined,
        weight: undefined,
        type: undefined,
      },
      developmentPointsShop: new Shop(),
      basicInfo: {},
      secondaryCharacteristics: new SecondaryCharacteristics(),
      physicalCapacities: new PhysicalCapacities(),
      CombatAbilities: {},
      SupernaturalAbilities: {},
      SecondaryAbilities: {},
      rules: new RulesHandler(),
      selectedCategory: {
        name: null,
        archetype: null,
        limits: null,
        abilitiesCosts: null,
      },
    }
    this.categories = categories

    // Generate rolls to characteristics

    this.rollsGenerator = new RollsGenerator(
      8, // Number of characteristics
      DEFAULT_POINTS_TO_GENERATE
    )

    this.generateRolls = new GenerateRolls(
      this.data.generatedRolls,
      this.rollsGenerator
    )

    this.generateRolls.rules.add(
      'Actualice the points shops',
      'selected',
      ({ result }) => {
        const { mode, points } = result
        this.data.pointsShop[mode].mergeCatalog(
          points
        )
        this.characteristicsSelection.shop = this.data.pointsShop[
          mode
        ]
      }
    )

    // Slect characteristics

    this.characteristicsSelection = new CharacteristicsSelector(
      this.data.characteristics,
      this.data.pointsShop.values
    )
    this.physicalAttibutesSelector = new PhysicalAttibutesSelector(
      this.data.body,
      this.data.physicalCapacities,
      this.data.secondaryCharacteristics,
      this.data.pointsShop,
      this.data.generatedRolls,
      this.data.characteristics,
      this.characteristicsSelection.rules
    )
    // Select category
    this.categoryselector = new CategorySelector(
      this.data.selectedcategory,
      this.categories
    )

    this.categoryselector.rules.add(
      'update de development points shop',
      'category/selected',
      ({ category }) => {
        this.data.developmentpointsshop.mergecatalog(
          category.abilitiescosts
        )
      }
    )
  }
}
