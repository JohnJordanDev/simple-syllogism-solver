/* eslint-disable dot-notation */
/**
 * Notes
 * 1. Difference between 'jump' (using statePath; doesn't trigger entry/exit actions)
 *  and 'transition' (transition state; does trigger entry/exit actions)
 */
try {
  window.stateMachineFactory = (function () {
    const getID = (function () {
      let i = 0;
      return function () {
        const id = i;
        i += 1;
        return id;
      };
    })();
    const disallowedKeyNames = ["id", "initial", "label", "on", "onEntry", "onExit", "type"];
    const depthFirstLabelling = function (o) {
      const keys = Object.keys(o);
      let keyName;
      let keyValue;
      for (let i = 0; i < keys.length; i += 1) {
        keyName = keys[i];
        keyValue = o[keyName];

        // TODO Add list of excluded property names, e.g. ID, initial, type etc.
        if (disallowedKeyNames.indexOf(keyName) === -1) {
          if (keyName !== "states" && !keyValue.label) {
            keyValue.label = keyName;
            keyValue.id = getID();
          }
          depthFirstLabelling(keyValue);
        }
      }
      // eslint-disable-next-line consistent-return
    };
    /**
     *
     * @param {Object} machineDescription total description of all machine states
     * @returns {Object} initialState inital state of the machine
     */
    const getInitialState = function (machineDescription) {
      let initialState = {};

      const availableFigures = machineDescription.states;
      const initialFigure = availableFigures[machineDescription.initial];

      initialState = { ...initialFigure };

      let { majorPremise } = initialFigure.states;
      majorPremise = majorPremise.states[majorPremise.initial];

      let { minorPremise } = initialFigure.states;
      minorPremise = minorPremise.states[minorPremise.initial];

      initialState.states = { majorPremise, minorPremise };
      return initialState;
    };
    /**
     *
     * @param {Object} machineDescription total description of machine, to be decorated
     * @returns {Object} o2Dec decorated total description of machine
     */
    const getMachineDescription = function (machineDescription) {
      const o2Dec = JSON.parse(JSON.stringify(machineDescription));
      o2Dec.id = getID();
      o2Dec.label = "rootState";
      depthFirstLabelling(o2Dec);
      return o2Dec;
    };
    const Factory = function (stateMachineDescription) {
      // TODO: figure out how to decorate all objects with label after key
      const _machineDescription = getMachineDescription(stateMachineDescription);
      const _historyStates = [];
      let _state = getInitialState(_machineDescription);

      const _statePath = stateMachineDescription.initial;
      let _pseudoStates = [];

      const m = {
        __proto__: Factory.prototype,
        get pseudoStates() { return _pseudoStates; },
        get historyStates() { return _historyStates; },
        set pseudoStates(newState) {
          if (!Array.isArray(newState)) return this.disallowedAction("Pseudostate must be array");
          _pseudoStates = newState;
          return true;
        },
        get state() {
          return _state;
        },
        set state(newState) {
          _state = newState;
        },
        get statePath() { return _statePath; },
        set statePath(newPath) {

        },
        // TODO: replace this.states with this description of the machine itself.
        get machineDescription() {
          return _machineDescription;
        }
      };
      return m;
    };

    Factory.prototype.sendEvent = function (event) {
      if (this.state.on[event] && this.state.on[event].target) {
        this.transition(this.state, event);
      }
    };
    /**
     *
     * @param {Object} stateToTarget state object to direct Event at
     * @param {String} event event to trigger on state
     */
    Factory.prototype.transition = function (stateToTarget, event) {
      // this is assuming a SWITCH of figure ONLY, not other changes
      const nextStateLabel = stateToTarget.on[event].target;
      const nextState = { ...this.machineDescription.states[nextStateLabel] };
      if (event.split("-")[0] === "SWITCH") {
        const currentMajorType = this.state.states.majorPremise.label;
        const currentMinorType = this.state.states.minorPremise.label;

        const majorPremise = nextState.states.majorPremise.states[currentMajorType];
        const minorPremise = nextState.states.minorPremise.states[currentMinorType];

        nextState.states = { majorPremise, minorPremise };
      }

      this.state = nextState;
    };

    return Factory;
  }());
} catch (e) {
  console.error(e);
}
