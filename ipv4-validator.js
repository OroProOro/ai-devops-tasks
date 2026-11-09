
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;

/**
 * Sprawdza poprawność adresu IPv4.
 *
 * @param {string} ip - Adres IPv4 do sprawdzenia.
 * @returns {boolean} - True, jeśli adres jest poprawny.
 */
function isValidIPv4(ip) {
    if (typeof ip !== "string") {
        return false;
    }

    return ipv4Regex.test(ip);
}

module.exports = isValidIPv4;

// Przykładowe testy
const testAddresses = [
    "192.168.1.1",
    "10.0.0.1",
    "255.255.255.255",
    "0.0.0.0",
    "256.168.1.1",
    "192.168.1",
    "192.168.1.999",
    "192.168.1.1.1",
    "abc.def.ghi.jkl",
    "192.168.01.1"
];

testAddresses.forEach(ip => {
    console.log(`${ip}: ${isValidIPv4(ip)}`);
});
