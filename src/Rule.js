const assert = require('assert');

function arrify(value) {
  if (value === null || value === undefined) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    return [value];
  }

  if (typeof value[Symbol.iterator] === 'function') {
    return [...value];
  }

  return [value];
}

class Rule {
  constructor({
    name, when, then, priority = 0, final = false, extend, activationGroup,
  }) {
    this.name = name;
    this.when = arrify(when);
    this.then = then;
    this.priority = priority;
    this.final = final;
    this.extend = arrify(extend);
    this.activationGroup = activationGroup;
    this.assert();
  }

  assert() {
    assert(
      this.name,
      '"name" is required',
    );
    assert(
      typeof this.name === 'string',
      '"name" must be a string',
    );
    assert(
      this.when.length,
      '"when" is required with at least one premise',
    );
    assert(
      this.when.reduce((acc, premise) => acc && typeof premise === 'function', true),
      '"when" must be a function or an array of functions',
    );
    assert(
      this.then,
      '"then" is required',
    );
    assert(
      typeof this.then === 'function',
      '"then" must be a function',
    );
    assert(
      typeof this.priority === 'number',
      '"priority" must be an integer',
    );
    assert(
      typeof this.final === 'boolean',
      '"final" must be a boolean',
    );
    assert(
      this.extend.reduce((acc, rule) => acc && (rule instanceof Rule), true),
      '"extend" must be a Rule or an array of Rules',
    );
    assert(
      !this.activationGroup || typeof this.activationGroup === 'string',
      '"activationGroup" must be a string',
    );
  }
}

module.exports = Rule;
