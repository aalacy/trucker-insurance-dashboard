export function toUpper(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
}

export const ifMinMaxLength = (cond, lenMin=250, lenMax=500) => (val, vm) => {
  return !vm[cond] || val.length > lenMin && val.length < lenMax
}