try {
  const addHandlers = function addHandlers(widget) {

    const machineDomTarget = document.getElementById("machine-target");

    const renderMachineToDOM = function (machine, DOMTarget) {
      // eslint-disable-next-line no-param-reassign
      DOMTarget.innerHTML = (window.machineDOMTemplate(machine));
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
        processEventToStateMachine(eventType, widget);
      }
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
