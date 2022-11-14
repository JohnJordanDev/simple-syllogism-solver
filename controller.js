try {
  const addHandlers = function addHandlers(widget) {
    const machineDomTarget = document.getElementById("machine-target");

    const renderMachineToDOM = function (machineState, DOMTarget) {
      // eslint-disable-next-line no-param-reassign
      DOMTarget.innerHTML = (window.machineDOMTemplate(machineState));
    };

    const processEventToStateMachine = function (event, machine) {
      const initialState = widget.state;

      machine.sendEvent(event);

      if (initialState !== machine.state) {
        console.log("state has changed!");
        renderMachineToDOM(machine.state, machineDomTarget);
      }
    };

    renderMachineToDOM(widget.state, machineDomTarget);

    document.addEventListener("click", (e) => {
      e.preventDefault();
      const elem = e.target;
      const eventType = elem.dataset && elem.dataset.event;
      if (eventType) {
        processEventToStateMachine(eventType, widget);
      }
    });
    window.widget = widget;
  };

  addHandlers(window.stateMachineFactory(window.syllogismDescription));
} catch (error) {
  // eslint-disable-next-line no-console
  console.error("An error occured: ", error);
}
