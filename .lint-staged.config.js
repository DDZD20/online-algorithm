module.exports = {
    // 对 TypeScript 和 JavaScript 文件运行 ESLint
    '**/*.(ts|tsx|js|jsx)': (filenames) => [
      `eslint --fix ${filenames.join(' ')}`,
      `prettier --write ${filenames.join(' ')}`,
    ],
    // 对 CSS 文件运行 Stylelint
    '**/*.(css|scss)': (filenames) => [
      `stylelint --fix ${filenames.join(' ')}`,
      `prettier --write ${filenames.join(' ')}`,
    ],
    // 对其他文件运行 Prettier
    '**/*.(md|json)': (filenames) => `prettier --write ${filenames.join(' ')}`,
};