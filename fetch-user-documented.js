/**
 * Pobiera dane użytkownika z API i zwraca wybrane pola.
 *
 * Wysyła GET na `https://api.example.com/users/{userId}`. Przy odpowiedzi
 * innej niż 2xx rzuca błąd HTTP. Z JSON-a bierze `name`, `email` oraz
 * `lastLoginTimestamp` (zamieniany na obiekt `Date`).
 *
 * Błąd sieci, HTTP albo parsowania JSON jest logowany przez `console.error`,
 * a funkcja zwraca wtedy `null` zamiast odrzucać obietnicę.
 *
 * @param {string|number} userId - Identyfikator użytkownika wstawiany do ścieżki URL.
 * @returns {Promise<{name: string, email: string, lastLogin: Date}|null>}
 * Obiekt z imieniem, adresem e-mail i datą ostatniego logowania albo `null`, gdy żądanie się nie powiedzie.
 */
function fetchUserData(userId) {
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return {
        name: data.name,
        email: data.email,
        lastLogin: new Date(data.lastLoginTimestamp)
      };
    })
    .catch(error => {
      console.error('Fetch error:', error);
      return null;
    });
}
