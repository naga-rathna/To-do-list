
    const stringForm = document.getElementById('string-form');
    const inputString = document.getElementById('input-string');
    const reversedStringElement = document.getElementById('reversed-string');
    const vowelCountElement = document.getElementById('vowel-count');
    const consonantCountElement = document.getElementById('consonant-count');

    stringForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const str = inputString.value.trim();
        if (str === '') {
            alert('Please enter a string.');
            return;
        }

        const reversedString = reverseString(str);
        const vowelCount = countVowels(str);
        const consonantCount = countConsonants(str);

        reversedStringElement.textContent = reversedString;
        vowelCountElement.textContent = vowelCount;
        consonantCountElement.textContent = consonantCount;
    });

    function reverseString(str) {
        return str.split('').reverse().join('');
    }

    function countVowels(str) {
        const vowels = 'aeiouAEIOU';
        let count = 0;
        for (let char of str) {
            if (vowels.includes(char)) {
                count++;
            }
        }
        return count;
    }

    function countConsonants(str) {
        const vowels = 'aeiouAEIOU';
        let count = 0;
        for (let char of str) {
            if (!vowels.includes(char) && /[a-zA-Z]/.test(char)) {
                count++;
            }
        }
        return count;
    }