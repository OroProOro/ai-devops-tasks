
function findPairs(arr, targetSum) {
    const pairs = [];
    const seen = new Map();
  
    for (const num of arr) {
      const complement = targetSum - num;
  
      // Sprawdź, ile razy wystąpiła liczba dopełniająca
      const count = seen.get(complement) || 0;
  
      // Zachowaj wszystkie pary, również z powtarzającymi się wartościami
      for (let i = 0; i < count; i++) {
        pairs.push([complement, num]);
      }
  
      // Zapisz wystąpienie aktualnej liczby
      seen.set(num, (seen.get(num) || 0) + 1);
    }
  
    return pairs;
  }
  
  module.exports = findPairs;
  