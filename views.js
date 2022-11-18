/* eslint-disable no-plusplus */
/* eslint-disable no-cond-assign */
/**
 *
 * @param {string} figure name of current syllogism figure
 * @returns {string|DOMString}
 */
const getDirectFigureNav = function (figure) {
  let radios = "";
  const figures = ["first", "second", "third", "fourth"];
  for (let i = 0, r; r = figures[i]; i++) {
    // eslint-disable-next-line no-use-before-define
    radios += getFigureRadioElem(r, figure);
  }
  return `<fieldset>
    <legend>Figure</legend>
    ${radios}
    </fieldset>`;
};

function getFigureRadioElem(figureType, currentFigure) {
  const checked = (figureType === currentFigure) ? "checked" : "";
  return `<label for="select-${figureType}-figure">
  ${figureType[0].toUpperCase() + figureType.slice(1)}
  <input type="radio" name="figure" id="select-${figureType}-figure" value="first" data-event="SWITCH-${figureType.toUpperCase()}" ${checked}>
</label>`;
}
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
  const premiseStates = machineState.states;

  const response = `<form id="simple-syllogism">
      ${getDirectFigureNav(machine.state.label)}
      <fieldset id="majorPremise">
      <legend>Major Premise</legend>
        ${getQuantityInput(premiseStates.majorPremise, "major")} ${premiseStates.majorPremise.label}: ${getPremise(premiseStates.majorPremise, termWords, "major")} ${getSwitchButton("major")}
      </fieldset>
      <fieldset id="minorPremise">
        <legend>Minor Premise</legend>
        ${getQuantityInput(premiseStates.minorPremise, "minor")} ${premiseStates.minorPremise.label}: ${getPremise(premiseStates.minorPremise, termWords, "minor")} ${getSwitchButton("minor")}
      </fieldset>
      </form>
      <output for="simple-syllogism" id="conclusion">${getConclusion(premiseStates.conclusion, termWords)}</output>`;

  return response;
};

window.machineDOMTemplate = machineDOMTemplate;
