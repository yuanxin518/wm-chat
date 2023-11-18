// 把单词的第一个字符大写
const toUpperCaseFirst = (str) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

module.exports = toUpperCaseFirst;
