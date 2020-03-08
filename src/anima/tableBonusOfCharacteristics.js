export default {
  heathers: ['characteristic', 'bonus'],
  values: {
    characteristic: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
    ],
    bonus: [
      -30,
      -20,
      -10,
      -5,
      0,
      5,
      5,
      10,
      10,
      15,
      20,
      20,
      25,
      25,
      30,
      35,
      35,
      40,
      40,
      45,
    ],
  },
  getBonus(value) {
    const index = this.values.characteristic.indexOf(
      value
    )
    if (index === -1)
      throw new Error('Value not exist')
    return this.values.bonus[index]
  },
}
