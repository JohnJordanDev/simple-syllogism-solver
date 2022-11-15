/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
const figureSwitch = {
  "SWITCH-FIRST": {
    target: "first"
  },
  "SWITCH-SECOND": {
    target: "second"
  },
  "SWITCH-THIRD": {
    target: "third"
  },
  "SWITCH-FOURTH": {
    target: "fourth"
  }
};

const middleTermMajorTerm = {
  subject: {
    label: "Middle Term"
  },
  predicate: {
    label: "Major Term"
  }
};

const minorTermMiddleTerm = {
  subject: {
    label: "Minor Term"
  },
  predicate: {
    label: "Middle Term"
  }
};

const majorTermMiddleTerm = {
  subject: {
    label: "Major Term"
  },
  predicate: {
    label: "Middle Term"
  }
};

const middleTermMinorTerm = {
  subject: {
    label: "Middle Term"
  },
  predicate: {
    label: "Minor Term"
  }
};
/**
 * 
 * @param {Object} subjectPredicateMajor subject and predicate for major premise
 * @param {Object} subjectPredicateMinor subject and predicate for minor premise
 * @returns {Object}
 */
const getPremises = function (subjectPredicateMajor, subjectPredicateMinor) {
  return {
    majorPremise: {
      initial: "A",
      states: {
        A: {
          states: { ...subjectPredicateMajor }
        },
        E: {
          states: { ...subjectPredicateMajor }
        },
        I: {
          states: { ...subjectPredicateMajor }
        },
        O: {
          states: { ...subjectPredicateMajor }
        }
      }
    },
    minorPremise: {
      initial: "A",
      states: {
        A: {
          states: { ...subjectPredicateMinor }
        },
        E: {
          states: { ...subjectPredicateMinor }
        },
        I: {
          states: { ...subjectPredicateMinor }
        },
        O: {
          states: { ...subjectPredicateMinor }
        }
      }
    }
  };
};

const syllogismDescription = {
  initial: "first",
  states: {
    first: {
      on: {
        "SWITCH-MAJOR": {
          target: "second"
        },
        "SWITCH-MINOR": {
          target: "third"
        },
        ...figureSwitch
      },
      states: {
        ...getPremises(middleTermMajorTerm, minorTermMiddleTerm)
      }
    }, 
    second: {
      on: {
        "SWITCH-MAJOR": {
          target: "first"
        },
        "SWITCH-MINOR": {
          target: "fourth"
        },
        ...figureSwitch
      },
      states: {
        ...getPremises(majorTermMiddleTerm, minorTermMiddleTerm)
      }

    },
    third: {
      on: {
        "SWITCH-MAJOR": {
          target: "fourth"
        },
        "SWITCH-MINOR": {
          target: "first"
        },
        ...figureSwitch
      },
      states: {
        ...getPremises(middleTermMajorTerm, middleTermMinorTerm)
      }

    }, 
    fourth: {
      on: {
        "SWITCH-MAJOR": {
          target: "third"
        },
        "SWITCH-MINOR": {
          target: "second"
        },
        ...figureSwitch
      },
      states: {
        ...getPremises(majorTermMiddleTerm, middleTermMinorTerm)
      }
    }
  }
 
};

window.syllogismDescription = syllogismDescription;
