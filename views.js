const getDirectFigureNav = function () {
  return `<nav>
  <a href="#" data-event="SWITCH-FIRST">I</a>
  <a href="#" data-event="SWITCH-SECOND">II</a>
  <a href="#" data-event="SWITCH-THIRD">III</a>
  <a href="#" data-event="SWITCH-FOURTH">IV</a></nav>`;
};
const getQualityInput = function (premiseLabel) {
  const isSelected = (optionValue) => (optionValue === premiseLabel ? "selected" : "");
  if (premiseLabel === "I" || premiseLabel === "O") {
    return `<select data-event="SELECT" value="${premiseLabel}">
    <option value="I" ${isSelected("I")}>are</option>
    <option value="O" ${isSelected("O")}>are not</option>
  </select>`;
  }

  return "are";
};

const getQuantityInput = function (premiseState, premiseName) {
  const isSelected = (optionValue) => (optionValue === premiseState.label ? "selected" : "");
  return `<select data-event="SELECT" id="quantity-${premiseName}"value="${premiseState.label}">
    <option value="A" ${isSelected("A")}>All</option>
    <option value="E" ${isSelected("E")}>None</option>
    <option value="I" ${isSelected("I") || isSelected("O")}>Some</option>
  </select>`;
};
const getSwitchButton = function (termLabel) {
  return `<button data-event="SWITCH-${termLabel.toUpperCase()}">Switch</button>`;
};

const getConclusion = function (premiseState, termWords = null) {
  if (!premiseState) return "We cannot draw a conclusion";
  const subject = premiseState.states.subject.label;
  const predicate = premiseState.states.predicate.label;
  const subjectWord = termWords && termWords[subject] ? termWords[subject] : "";
  const predicateWord = termWords && termWords[predicate] ? termWords[predicate] : "";
  const copula = premiseState.label === "O" ? "are not" : "are";
  const quantityWords = { A: "All", E: "No" };
  const quantity = quantityWords[premiseState.label] || "Some";
  return `∴ ${premiseState.label}: ${quantity} ${subjectWord} (${subject}) ${copula} ${predicateWord} (${predicate})`;
};

const getPremise = function (premiseState, termWords = null) {
  const subject = premiseState.states.subject.label;
  const predicate = premiseState.states.predicate.label;
  const subjectWord = termWords && termWords[subject] ? termWords[subject] : "";
  const predicateWord = termWords && termWords[predicate] ? termWords[predicate] : "";
  const copula = getQualityInput(premiseState.label);

  return `${subjectWord} (${subject}) ${copula} ${predicateWord} (${predicate})`;
};

const machineDOMTemplate = (machine) => {
  const machineState = machine.state;
  const termWords = machine.getMetaDetails("termWords");
  const { label } = machineState;
  const premiseStates = machineState.states;

  const response = `<section>
      ${getDirectFigureNav()}
        <p>Machine is in the "${label}" figure</p>
      </section>
      <section id="majorPremise">${getQuantityInput(premiseStates.majorPremise, "major")} ${premiseStates.majorPremise.label}: ${getPremise(premiseStates.majorPremise, termWords)} ${getSwitchButton("major")}</section>
      <section id="minorPremise">${getQuantityInput(premiseStates.minorPremise, "minor")} ${premiseStates.minorPremise.label}: ${getPremise(premiseStates.minorPremise, termWords)} ${getSwitchButton("minor")}</section>
      <section id="conclusion">${getConclusion(premiseStates.conclusion, termWords)}</section>`;

  return response;
};

window.machineDOMTemplate = machineDOMTemplate;
