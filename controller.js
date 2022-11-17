try {
  const addHandlers = function addHandlers(widget) {
    const machineDomTarget = document.getElementById("machine-target");

    const renderMachineToDOM = function (machine, DOMTarget) {
      const activeE = document.activeElement;
      // eslint-disable-next-line no-param-reassign
      DOMTarget.innerHTML = (window.machineDOMTemplate(machine));
      if (activeE && activeE.tagName !== "BODY" && activeE.id) {
        document.getElementById(activeE.id).focus();
      }
    };

    const processEventToStateMachine = function (event, machine) {
      if (machine.sendEvent(event)) {
        renderMachineToDOM(machine, machineDomTarget);
      }
    };

    renderMachineToDOM(widget, machineDomTarget);

    document.addEventListener("click", (e) => {
      e.preventDefault();
      const elem = e.target;
      const eventType = elem.dataset && elem.dataset.event;
      if (eventType) {
        return processEventToStateMachine(eventType, widget);
      }
      const p = elem.parentNode;
      if (p.dataset && p.dataset.event) {
        return processEventToStateMachine(p.dataset.event, widget);
      }
      return false;
    });

    document.addEventListener("change", (e) => {
      const elem = e.target;

      const eventType = `${elem.dataset.event}-${elem.value}`;
      if (eventType) {
        const target = elem.parentNode.id;
        const type = eventType;
        processEventToStateMachine({ target, type }, widget);
      }
    });
  };
  const syllogismWidget = window.stateMachineFactory(window.syllogismDescription);
  syllogismWidget.initialize();
  window.widget = syllogismWidget;
  addHandlers(syllogismWidget);
} catch (error) {
  // eslint-disable-next-line no-console
  console.error("An error occured: ", error);
}
