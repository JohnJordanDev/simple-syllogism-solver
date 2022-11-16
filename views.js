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

const getTerm = function (premiseState, termLabels = null) {
  const subject = premiseState.states.subject.label;
  const predicate = premiseState.states.predicate.label;
  const subjectLabel = termLabels && termLabels[subject] ? termLabels[subject] : "";
  const predicateLabel = termLabels && termLabels[predicate] ? termLabels[predicate] : "";

  return `${subjectLabel} (${subject}) -- ${predicateLabel} (${predicate})`;
};

const machineDOMTemplate = (machine) => {
  const machineState = machine.state;
  const termLabels = machine.getMetaDetails("termLabels");
  const { label } = machineState;
  const premiseStates = machineState.states;

  const response = `<section>
      ${getDirectFigureNav()}
        <p>Machine is in the "${label}" figure</p>
      </section>
      <section id="majorPremise">${getQuantityQualityInput(premiseStates.majorPremise)} ${premiseStates.majorPremise.label}: ${getTerm(premiseStates.majorPremise, termLabels)} ${getSwitchButton("major")}</section>
      <section id="minorPremise">${getQuantityQualityInput(premiseStates.minorPremise)} ${premiseStates.minorPremise.label}: ${getTerm(premiseStates.minorPremise, termLabels)} ${getSwitchButton("minor")}</section>
      <section id="conclusion">${getTerm(premiseStates.conclusion, termLabels)}</section>`;

  return response;
};

window.machineDOMTemplate = machineDOMTemplate;
