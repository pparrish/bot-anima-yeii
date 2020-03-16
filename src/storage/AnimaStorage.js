import FirebaseCrudWrapper from './FirebaseCrudWrapper'
import Life from '../anima/life'

/** Represents a persistend anima data
 * @param {string} discordId - Id of a discordUser
 */
export default class AnimaStorage {
  constructor(discordId) {
    this.discordId = discordId
    this._id = undefined
    this.crud = new FirebaseCrudWrapper()
  }

  get selectedSheet() {
    return this.getSelectedSheet()
  }

  async getSelectedSheet() {
    const userId = await this.id
    const selectedSheetName = await this
      .selectedSheetName
    let sheet = await this.crud.read(
      'sheets',
      userId,
      selectedSheetName
    )

    if (sheet === null) {
      sheet = {
        name: selectedSheetName,
        owner: userId,
      }
      this.crud.update(
        sheet,
        'sheets',
        userId,
        selectedSheetName
      )
    }
    if (!sheet.variables) sheet.variables = {}

    return sheet
  }

  async saveVariable(name, value) {
    const userID = await this.id
    const selectedSheetName = await this
      .selectedSheetName
    this.crud.update(
      value,
      'sheets',
      userID,
      `${selectedSheetName}/variables/${name}`
    )
    return { sheetName: selectedSheetName }
  }

  async deleteVariable(name) {
    let success = true
    const userID = await this.id
    const sheet = await this.getSelectedSheet()
    if (!sheet.variables[name]) success = false
    this.crud.update(
      null,
      'sheets',
      userID,
      `${sheet.name}/variables/${name}`
    )
    return { success, selectedSheet: sheet.name }
  }

  async getVariable(name) {
    const userID = await this.id
    const selectedSheetName = await this
      .selectedSheetName
    const value = await this.crud.read(
      'sheets',
      userID,
      `${selectedSheetName}/variables/${name}`
    )
    return {
      value,
      selectedSheet: selectedSheetName,
    }
  }

  async getVariables() {
    const selectedSheet = await this
      .selectedSheetName
    const sheet = await this.selectedSheet
    return {
      selectedSheet,
      variables: sheet.variables,
    }
  }

  get id() {
    return (async () => {
      if (this._id === undefined) {
        this._id = await this.crud.read(
          'discord-user',
          this.discordId,
          'user'
        )
      }
      if (this._id === null) {
        this._id = this.createNewUser(
          this.discordId
        )
      }
      return this._id
    })()
  }

  get selectedSheetName() {
    return (async () => {
      const id = await this.id
      if (this._selectedSheetName === undefined) {
        this._selectedSheetName = await this.crud.read(
          'user',
          id,
          'selected-sheet'
        )
        if (this._selectedSheetName === null) {
          this._selectedSheetName = 'default'
          this.crud.update(
            'default',
            'user',
            id,
            'selected-sheet'
          )
        }
      }
      return this._selectedSheetName
    })()
  }

  set selectedSheetName(newName) {
    this.setSelectedSheetName(newName)
  }

  async setSelectedSheetName(newName) {
    this.crud.update(
      newName,
      'user',
      await this.id,
      'selected-sheet'
    )
    this.crud.update(
      { name: newName, owner: await this.id },
      'sheets',
      await this.id,
      newName
    )
    this._selectedSheetName = newName
  }

  createNewUser(discordId) {
    const userId = this.crud.create(
      {
        'discord-user': discordId,
        'selected-sheet': 'default',
      },
      'user'
    )

    this.crud.update(
      userId,
      'discord-user',
      discordId,
      'user'
    )
    this.crud.update(userId, 'user', userId, 'id')
    this.crud.update(
      {
        name: 'default',
        owner: userId,
        variables: { yeii: 1 },
      },
      'sheets',
      userId,
      'default'
    )
    return userId
  }

  get sheetsList() {
    return this.getSheetsList()
  }

  async getSheetsList() {
    const id = await this.id
    const sheets = await this.crud.read(
      'sheets',
      id
    )
    return Object.keys(sheets).map(
      this.crud.recoverFrobidenCharacters
    )
  }

  /**
   * @param {string} url
   */
  set avatar(url) {
    this.setAvatar(url)
  }

  async setAvatar(url) {
    this._avatar = url
    const selected = await this.selectedSheetName
    this.crud.update(
      url,
      'sheets',
      await this.id,
      `${selected}/avatar`
    )
  }

  /**
   * @param {Object} newVariables
   */
  set variables(newVariables) {
    this.setVariables(newVariables)
  }

  async setVariables(variables) {
    this._variables = variables
    const newVariables = Object.entries(
      variables
    ).map(x => [
      this.crud.replaceFrobidenCharacters(x[0]),
      x[1],
    ])
    const selected = await this.selectedSheetName
    this.crud.update(
      Object.fromEntries(newVariables),
      'sheets',
      await this.id,
      `${selected}/variables`
    )
  }

  async deleteSheet(name) {
    this.crud.delete(
      'sheets',
      await this.id,
      name
    )
    if (name === 'default') {
      this.crud.update(
        {
          name: 'default',
          owner: await this.id,
        },
        'sheets',
        await this.id,
        'default'
      )
    }
    if ((await this.selectedSheetName) === name)
      this.crud.update(
        'default',
        'user',
        await this.id,
        'selected-sheet'
      )
  }

  get life() {
    return (async () => {
      if (this._life !== undefined)
        return this.life
      const id = await this.id
      const selectedSheetName = await this
        .selectedSheetName
      if (this._life === undefined) {
        const lifeValue = await this.crud.read(
          'sheets',
          id,
          `${selectedSheetName}/life`
        )
        this._life = new Life(lifeValue)
        return this._life
      }
      return this._life
    })()
  }

  set life(newLife) {
    ;(async () => {
      const id = await this.id
      const selectedSheetName = await this
        .selectedSheetName
      this.crud.update(
        newLife.value,
        'sheets',
        id,
        `${selectedSheetName}/life`
      )
    })()
    this._life = newLife
  }
}
