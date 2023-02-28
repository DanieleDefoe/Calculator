const input = document.getElementById('result');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');

const printChar = (e) => {
    if (e.key === 'c') input.value = '';
    if (e.key === 'Delete') deleteChar(e);
    if (e.target.className === 'operation') {
        e.target.blur();    
    }
    e.stopPropagation();
    let character = e.target.getAttribute('accesskey');
    if (!character) {
        character = e.key;
    }
    if (!/\d|[*\-+=\/\.]|Enter/.test(character)) return;
    if (input.value === '0' && character !== '.' && !/\W/.test(character)) input.value = '';
    if (character === '.' && input.value.includes('.')) return;
    if (input.value === '' && /\W/.test(character)) return;
    if (/\W/.test(character) && /\W/.test(input.value[input.value.length - 1])) return;
    if (/[*+\-\/\.]/.test(input.value[input.value.length - 1]) && (character === 'Enter' || character === '=')) return;
    if (character === '=' || character === 'Enter') {
        if (input.value === '') return;
        try {
            eval(input.value);
        } catch (e) {
            return;
        }
        input.value = eval(input.value);
        return;
    }
    if (e.target.name !== 'result') input.value += character;  
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
