export default function* RandomNumberGenerator(
  maxNumber
) {
  while (true) {
    yield Math.floor(
      Math.random() * maxNumber + 1
    )
  }
}
