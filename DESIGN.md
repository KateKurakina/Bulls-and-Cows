# Bulls and Cows — Design Document

## 1. Data Structures

The project uses simple data structures to represent game data and keep the game logic predictable.

### Secret and Guess

The secret number and player's guess are represented as strings.

Example:

- Secret: `"1234"`
- Guess: `"1243"`

Strings are used because they preserve leading zeros and allow working with digits in different number systems (binary, octal, decimal, and hexadecimal).

### Game Result

The `evaluateGuess` function returns an object containing the number of bulls and cows:

```ts
{
  bulls: number;
  cows: number;
}
```

- **Bulls** — digits that are correct and in the correct positions.
- **Cows** — digits that are correct but in different positions.

### Used Data Structures

- **Array** — stores digits and allows iteration using methods such as `map`, `filter`, `reduce`, and `every`.
- **Set** — checks whether a guess contains duplicate digits.
- **Map** — stores calculated values for memoization in `countPossibleSecrets`.

---

## 2. Algorithms and Time Complexity

### `generateSecret(length, base)`

Generates a secret number with the requested length and number base.

The function creates an array of available digits, randomly selects a digit, adds it to the secret, and removes it from the available digits. This guarantees that all digits in the secret are unique.

The function allows zero as the first digit.

**Time Complexity:** O(base × length)

**Space Complexity:** O(base + length)

### `evaluateGuess(secret, guess)`

Compares the secret number with the player's guess.

The function uses:

- `reduce()` to count bulls.
- `filter()` and `includes()` to count cows.

**Time Complexity:** O(n²), where n is the length of the guess, because `includes()` is called inside an array iteration.

**Space Complexity:** O(n) for the arrays created from the strings.

### `isValidGuess(guess, length, base)`

Checks whether the player's guess meets the game requirements.

The function verifies:

- The guess has the required length.
- All digits are allowed in the selected number base.
- All digits are unique.

**Time Complexity:** O(n × base), where n is the length of the guess.

**Space Complexity:** O(base + n) for the arrays and Set.

### `countPossibleSecrets(length, base)`

Calculates the number of possible secret combinations using recursion and memoization.

The function counts permutations of unique digits:

\[
P(base, length) = \frac{base!}{(base-length)!}
\]

The recursive calculation decreases both the remaining length and the available number of digits.

A `Map` stores calculated results to avoid recalculating the same state.

The function uses recursion to calculate the number of possible secrets. A Map is used to store calculated results and return cached values if the same state is requested again.

**Time Complexity:** O(length)

**Space Complexity:** O(length) for the recursion stack and memoization cache.

---

## 3. Clean Code Principles

The project follows these Clean Code principles:

### Single Responsibility Principle

Each function has one clearly defined responsibility:

- `generateSecret` generates the secret number.
- `evaluateGuess` calculates bulls and cows.
- `isValidGuess` validates the player's guess.
- `createDigitValidator` checks whether a digit is valid for a given number base.
- `countPossibleSecrets` calculates the number of possible secrets.

### Meaningful Names

Functions and variables have descriptive names that explain their purpose, such as `generateSecret`, `remainingLength`, `remainingBase`, and `selectedDigit`.

### Pure Functions

Core game logic functions do not modify external state or interact with the DOM. They return results based only on their input arguments.

### Immutability

The project avoids unnecessary mutation of data. Array methods such as `filter`, `map`, `reduce`, and `every` are used to process data and create new results.

### Reusability

`createDigitValidator(base)` uses currying to create a reusable digit-validation function for a specific number base.

### Testability

The core logic is separated from the user interface. Each function can be tested independently using Vitest.

`generateSecret` accepts an injectable random function, making its behavior easier to test with predictable values.

---

## 4. Testing

The project uses **Vitest** for unit testing.

Tests cover:

- Correct generation of secret numbers.
- Correct calculation of bulls and cows.
- Validation of guesses.
- Digit validation for different number bases.
- Calculation of possible secret combinations.

The development process follows Test-Driven Development (TDD): tests are written before the implementation.
