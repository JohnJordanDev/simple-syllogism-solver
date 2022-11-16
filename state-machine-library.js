/* eslint-disable dot-notation */
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
    const disallowedKeyNames = ["id", "initial", "label", "meta", "on", "onEntry", "onExit", "type"];
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
      const _machineDescription = getMachineDescription(stateMachineDescription);
      let _state = {};

      const m = {
        __proto__: Factory.prototype,
        get state() {
          return _state;
        },
        set state(newState) {
          _state = newState;
          console.log("state has changed!");
        },
        get machineDescription() {
          return _machineDescription;
        }
      };
      return m;
    };

    Factory.prototype.getMetaDetails = function (details) {
      const { meta } = this.machineDescription;
      if (meta[details]) return meta[details];
      return meta;
    };

    Factory.prototype.changePremiseType = function (premise, newType) {
      const figureDescription = this.machineDescription.states[this.state.label];
      // change the premise of current state, to that of record from machine description
      this.state.states[premise] = figureDescription.states[premise].states[newType];
      // eslint-disable-next-line no-self-assign
      this.state = this.state; // to trigger central state change function
      return true;
    };

    Factory.prototype.initialize = function () {
      const intialFigure = this.machineDescription.initial;
      this.state = this.moveToFigure(intialFigure, true);
    };

    /**
     *
     * @param {string} figureLabel name of figure to move to
     * @param {boolean} initial true if initializing machine, false otherwise
     * @returns {object} nextState next state object
     */
    Factory.prototype.moveToFigure = function (figureLabel, initial = false) {
      let currentMajorType;
      let currentMinorType;
      if (initial) {
        currentMajorType = this.machineDescription.states[figureLabel].states.majorPremise.initial;
        currentMinorType = this.machineDescription.states[figureLabel].states.minorPremise.initial;
      } else {
        currentMajorType = this.state.states.majorPremise.label;
        currentMinorType = this.state.states.minorPremise.label;
      }
      const nextState = { ...this.machineDescription.states[figureLabel] };

      const majorPremise = nextState.states.majorPremise.states[currentMajorType];
      const minorPremise = nextState.states.minorPremise.states[currentMinorType];
      // will need to get this
      const conclusion = nextState.states.conclusion.states["A"];

      nextState.states = { majorPremise, minorPremise, conclusion };
      return nextState;
    };

    Factory.prototype.sendEvent = function (eventIn) {
      const event = eventIn;
      const currentFigure = this.state.label;
      if (typeof event === "object" && event.type && event.target) {
        const premises = this.machineDescription.states[currentFigure].states;
        const majorPremTarget = premises.majorPremise.on[event.type].target;
        const minorPremTarget = premises.minorPremise.on[event.type].target;
        if (majorPremTarget || minorPremTarget) {
          return this.transition(this.state, event);
        }
      }
      if (typeof event === "string") {
        if (this.state.on[event] && this.state.on[event].target) {
          // assume directed at current state
          return this.transition(this.state, event);
        }
      }
      return false;
    };
    /**
     *
     * @param {string} metaProp name of meta property to change
     * @param {object} newDetails object with updated meta details
     * @returns
     */
    Factory.prototype.setMetaDetails = function (metaProp, newDetails) {
      const { meta } = this.machineDescription;
      const propToChange = meta[metaProp];
      if (propToChange) {
        const newProp = { ...propToChange, ...newDetails };
        this.machineDescription.meta[metaProp] = newProp;
        return true;
      }
      return false;
    };
    /**
     *
     * @param {Object} stateToTarget state object to direct Event at
     * @param {String} event event to trigger on state
     */
    Factory.prototype.transition = function (stateToTarget, event) {
      if (!event.type && event.split("-")[0] === "SWITCH") {
        const nextFigureLabel = stateToTarget.on[event].target;
        this.state = this.moveToFigure(nextFigureLabel);
        return true;
      }
      if (event.type && event.type.split("-")[0] === "SELECT") {
        const newPremiseType = event.type.split("-")[1];
        return this.changePremiseType(event.target, newPremiseType);
      }
      return false;
    };

    return Factory;
  }());
} catch (e) {
  console.error(e);
}
