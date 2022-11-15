const getDirectFigureNav = function () {
  return `<nav>
  <a href="#" data-event="SWITCH-FIRST">I</a>
  <a href="#" data-event="SWITCH-SECOND">II</a>
  <a href="#" data-event="SWITCH-THIRD">III</a>
  <a href="#" data-event="SWITCH-FOURTH">IV</a></nav>`;
};
const getSwitchButton = function (termLabel) {
  return `<button data-event="SWITCH-${termLabel.toUpperCase()}">Switch</button>`;
};

const getTerm = function (premiseState) {
  console.log("premiseState is ", premiseState);
  const subject = premiseState.states.subject.label;
  const predicate = premiseState.states.predicate.label;
  return `${subject} -- ${predicate}`;
};

const machineDOMTemplate = (machineState) => {
  const { label } = machineState;
  console.log(machineState.states.majorPremise);

  const response = `<section>
      ${getDirectFigureNav()}
        <p>Machine is in the "${label}" figure</p>
      </section>
      <section id="majorTerm">${getTerm(machineState.states.majorPremise)} ${getSwitchButton("major")}</section>
      <section id="minorTerm">${getTerm(machineState.states.minorPremise)} ${getSwitchButton("minor")}</section>
      <section id="conclusion">${getTerm(machineState.states.conclusion)}</section>`;

  return response;
};

window.machineDOMTemplate = machineDOMTemplate;
