module.exports = {
  extends: ["../.eslintrc.cjs"],
  globals: {
    cy: false,
    Cypress: false,
    expect: false,
    assert: false,
    chai: false,
  },
  rules: {
    "jest/expect-expect": "off",
  },
};
