import searchInNames from '../utils/searchInNames'
import getTldrNames from '../tldr/getTldrNames'

export default (
  { querry },
  context,
  messenger
) => {
  if (!querry) {
    return messenger.send(
      'tldr all',
      null,
      context
    )
  }
  const tldrsNames = getTldrNames()
  let tldrIndex = Number(querry) - 1
  if (Number.isNaN(tldrIndex)) {
    const {
      softhMatch,
      hardMatch,
    } = searchInNames(querry, tldrsNames)
    if (hardMatch.length === 1)
      tldrIndex = hardMatch[0].index
    else if (softhMatch.length === 1)
      tldrIndex = softhMatch[0].index
    else
      return messenger.send(
        'tldr not found',
        {
          querry,
          matchs: softhMatch,
        },
        context
      )
  }
  if (
    tldrIndex <= -1 ||
    tldrIndex > tldrsNames.length
  )
    return messenger.send(
      'tldr not exist',
      { index: tldrIndex, tldrsNames },
      context
    )
  return messenger.send(
    'tldr',
    tldrIndex,
    context
  )
}
