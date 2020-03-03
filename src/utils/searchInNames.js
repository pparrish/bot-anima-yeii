export default (querry, names) => {
  const words = querry
    .replace(/\s[el|la|los|la|y|a]\s/, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^\s/g, ' ')
    .replace(/\s$/g, ' ')
    .split(' ')
  return names.reduce(
    (lastResults, name, index) => {
      if (
        name.toLowerCase() ===
        querry.toLowerCase()
      ) {
        lastResults.hardMatch.push({
          name,
          index,
        })
        return lastResults
      }
      words.map(word => {
        if (
          name
            .toLowerCase()
            .includes(word.toLowerCase())
        )
          lastResults.softhMatch.push({
            name,
            index,
          })
        return true
      })
      return lastResults
    },
    {
      hardMatch: [],
      softhMatch: [],
    }
  )
}
