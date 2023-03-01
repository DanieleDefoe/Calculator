const input = document.getElementById('result');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');

const printChar = (e) => {
    e.stopPropagation();
    let character = e.target.getAttribute('accesskey');
    if (!character) {
        character = e.key;
    }
    if (/c/i.test(character)) {
        input.value = '';
        return;
    }
    if (character === 'Delete') {
        deleteChar(e);
        return;
    }
    if (input.value === '0' && character !== '.' && !/\W/.test(character)) {
        input.value = '';
    }
    if (e.target.className === 'operation') {
        e.target.blur();
    }
    if (input.value.includes('**')) {
        input.value = input.value.replace('**', '^');
    }
    if (character === '=' || character === 'Enter') {
        if (input.value === '') return;
        if (input.value.includes('^')) input.value = input.value.replace(/\^/g, '**');
        try {
            eval(input.value);
        } catch (e) {
            return;
        }
        input.value = eval(input.value);
        return;
    }
    if (e.target.name !== 'result') {
        input.value += character;
    }
};

const operations = document.querySelectorAll('.operation');
operations.forEach((operation) => {
    operation.addEventListener('click', printChar);
});

const clearInput = (e) => {
    input.value = '';
    e.target.blur();
};

const deleteChar = (e) => {
    input.value = input.value.substr(0, input.value.length - 1);
    e.target.blur();
}

clear.addEventListener('click', clearInput);
del.addEventListener('click', deleteChar);
input.addEventListener('keypress', printChar);
window.addEventListener('keypress', printChar);
