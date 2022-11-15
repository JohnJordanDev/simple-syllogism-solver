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
    label: "Predicate"
  }
};

const minorTermMiddleTerm = {
  subject: {
    label: "Subject"
  },
  predicate: {
    label: "Middle Term"
  }
};

const majorTermMiddleTerm = {
  subject: {
    label: "Predicate"
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
    label: "Subject"
  }
};

const subjectPredicateConclusion = {
  subject: {
    label: "Subject"
  },
  predicate: {
    label: "Predicate"
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
    },
    conclusion: {
      initial: "A",
      states: {
        A: {
          states: { ...subjectPredicateConclusion }
        },
        E: {
          states: { ...subjectPredicateConclusion }
        },
        I: {
          states: { ...subjectPredicateConclusion }
        },
        O: {
          states: { ...subjectPredicateConclusion }
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
