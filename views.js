const getDirectFigureNav = function () {
  return `<nav>
  <a href="#" id="select-first-figure" data-event="SWITCH-FIRST">I<div>first</div></a>
  <a href="#" id="select-second-figure" data-event="SWITCH-SECOND">II<div>second</div></a>
  <a href="#" id="select-third-figure" data-event="SWITCH-THIRD">III<div>third</div></a>
  <a href="#" id="select-fourth-figure" data-event="SWITCH-FOURTH">IV<div>fourth</div></a></nav>`;
};
/**
 *
 * @param {string} premiseType type of the premise (I or O)
 * @param {string} premiseName name of the premise (major or minor)
 * @returns {DOMString|string}
 */
const getQualityInput = function (premiseType, premiseName = "") {
  const isSelected = (optionValue) => (optionValue === premiseType ? "selected" : "");
  if (premiseType === "I" || premiseType === "O") {
    return `<select data-event="SELECT" id="quality-${premiseName}" value="${premiseType}">
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
  return `<button id="switch-terms-${termLabel}" data-event="SWITCH-${termLabel.toUpperCase()}">Switch</button>`;
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
/**
 *
 * @param {object} premiseState state object of a premise
 * @param {object} termWords words for syllogism terms (from user input)
 * @param {string} premiseName name of the premise (major or minor)
 * @returns {string} DOM string
 */
const getPremise = function (premiseState, termWords = null, premiseName = "") {
  const subject = premiseState.states.subject.label;
  const predicate = premiseState.states.predicate.label;
  const subjectWord = termWords && termWords[subject] ? termWords[subject] : "";
  const predicateWord = termWords && termWords[predicate] ? termWords[predicate] : "";
  const copula = getQualityInput(premiseState.label, premiseName);

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
      <section id="majorPremise">
        ${getQuantityInput(premiseStates.majorPremise, "major")} ${premiseStates.majorPremise.label}: ${getPremise(premiseStates.majorPremise, termWords, "major")} ${getSwitchButton("major")}
      </section>
      <section id="minorPremise">
        ${getQuantityInput(premiseStates.minorPremise, "minor")} ${premiseStates.minorPremise.label}: ${getPremise(premiseStates.minorPremise, termWords, "minor")} ${getSwitchButton("minor")}
      </section>
      <section id="conclusion">${getConclusion(premiseStates.conclusion, termWords)}</section>`;

  return response;
};

window.machineDOMTemplate = machineDOMTemplate;
