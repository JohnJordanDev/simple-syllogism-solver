/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
const syllogismDescription = {
  initial: "loading",
  label: "rootState",
  states: {
    loading: {
      initial: "majorTerm",
      label: "loading",
      on: {
        LOAD: {
          target: "loaded"
        },
        ERROR: {
          target: "loadingFailed"
        }
      },
      states: {
        majorTerm: {
          initial: "subject",
          label: "majorTerm",
          states: {
            subject: {
              label: "subject"
            }
          }
        },
        minorTerm: {
          label: "minorTerm"
        },
        conclusion: {
          label: "conclusion"
        }
      }
    },
    loaded: {
      label: "loaded",
      initial: "clean",
      on: {
        ERROR: {
          target: "error"
        }
      },
      states: {
        clean: {
          label: "clean",
          on: {
            TOUCH: {
              target: "dirty"
            }
          }
        },
        dirty: {
          label: "dirty",
          on: {
            CLEAN: {
              target: "clean"
            }
          }
        }
      }
    },
    loadingFailed: {
      label: "loadingFailed",
      type: "final"
    },
    error: {
      label: "error",
      type: "final"
    }
  },
  validStates: [
    "loaded.clean",
    "loaded.dirty"
  ]
};

window.syllogismDescription = syllogismDescription;
