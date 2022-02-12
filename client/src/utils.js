/**
 * Higher-order function for async/await error handling
 * @param {function} fn An async function
 * @returns {function}
 */
export const catchErrors = fn => {
  return function (...args) {
    return fn(...args).catch((err) => {
      console.error(err);
    })
  }
}