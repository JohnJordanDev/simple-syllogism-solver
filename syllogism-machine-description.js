/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */

const majorTerm = "Major Term"; 
const middleTerm = "Middle Term";
const minorTerm = "Minor Term";

// the 19 traditional conclusions
const conclusions = {
  first: {
    AA: "A",
    EA: "E",
    AI: "I",
    EI: "O"
  },
  second: {
    EA: "E",
    AE: "E",
    EI: "O",
    AO: "O"
  }, 
  third: {
    AA: "I",
    IA: "I",
    AI: "I",
    EA: "O",
    OA: "O",
    EI: "O"
  },
  fourth: {
    AA: "I",
    AE: "E",
    IA: "I",
    EA: "O",
    EI: "O"
  }
};
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
    label: middleTerm
  },
  predicate: {
    label: majorTerm
  }
};

const minorTermMiddleTerm = {
  subject: {
    label: minorTerm
  },
  predicate: {
    label: middleTerm
  }
};

const majorTermMiddleTerm = {
  subject: {
    label: majorTerm
  },
  predicate: {
    label: middleTerm
  }
};

const middleTermMinorTerm = {
  subject: {
    label: middleTerm
  },
  predicate: {
    label: minorTerm
  }
};

const subjectPredicateConclusion = {
  subject: {
    label: minorTerm
  },
  predicate: {
    label: majorTerm
  }
};

const selectPremiseType = {
  "SELECT-A": {
    target: "A"
  },
  "SELECT-E": {
    target: "E"
  },
  "SELECT-I": {
    target: "I"
  },
  "SELECT-O": {
    target: "O"
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
      on: {
        ...selectPremiseType
      },
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
      on: {
        ...selectPremiseType
      },
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
  meta: { 
    conclusions: { ...conclusions },
    termWords: {
      [majorTerm]: "",
      [middleTerm]: "",
      [minorTerm]: ""
    } 
  },
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
