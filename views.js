const getDirectFigureNav = function () {
  return `<nav>
  <a href="#" data-event="SWITCH-FIRST">I</a>
  <a href="#" data-event="SWITCH-SECOND">II</a>
  <a href="#" data-event="SWITCH-THIRD">III</a>
  <a href="#" data-event="SWITCH-FOURTH">IV</a></nav>`;
};
const getQuantityQualityInput = function (premise) {
  const isSelected = (optionValue) => (optionValue === premise.label ? "selected" : "");
  return `<select data-event="SELECT" value="${premise.label}">
    <option value="A" ${isSelected("A")}>All are</option>
    <option value="E" ${isSelected("E")}>None are</option>
    <option value="I" ${isSelected("I")}>Some are</option>
    <option value="O" ${isSelected("O")}>Some are not</option>
  </select>`;
};
const getSwitchButton = function (termLabel) {
  return `<button data-event="SWITCH-${termLabel.toUpperCase()}">Switch</button>`;
};

const getTerm = function (premiseState) {
  const subject = premiseState.states.subject.label;
  const predicate = premiseState.states.predicate.label;
  return `${subject} -- ${predicate}`;
};

const machineDOMTemplate = (machineState) => {
  const { label } = machineState;

  const response = `<section>
      ${getDirectFigureNav()}
        <p>Machine is in the "${label}" figure</p>
      </section>
      <section id="majorPremise">${getQuantityQualityInput(machineState.states.majorPremise)} ${machineState.states.majorPremise.label}: ${getTerm(machineState.states.majorPremise)} ${getSwitchButton("major")}</section>
      <section id="minorPremise">${getQuantityQualityInput(machineState.states.minorPremise)} ${machineState.states.minorPremise.label}: ${getTerm(machineState.states.minorPremise)} ${getSwitchButton("minor")}</section>
      <section id="conclusion">${getTerm(machineState.states.conclusion)}</section>`;

  return response;
};

window.machineDOMTemplate = machineDOMTemplate;
