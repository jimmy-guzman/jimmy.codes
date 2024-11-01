module.exports = {
  extends: ["../.eslintrc.cjs"],
  globals: {
    assert: false,
    chai: false,
    cy: false,
    Cypress: false,
    expect: false,
  },
  rules: {
    "jest/expect-expect": "off",
  },
};
