class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElementId = document.getElementById(hostElementId);
    } else {
      this.hostElementId = document.body;
    }

    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
    }
  }

  attach() {
    this.hostElementId.insertAdjacentElement(this.insertBefore ? "afterbegin" : "beforeend", this.element);
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction) {
    super();
    this.closeNotifier = closeNotifierFunction;
    this.create();
  }

  closeTooltip() {
    this.detach();
    this.closeNotifier();
  }

  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent = "DUMMY";
    tooltipElement.addEventListener("click", this.closeTooltip.bind(this));
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(_id, updateProjectListsFunction, type) {
    this.id = _id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const tooltip = new Tooltip(() => (this.hasActiveTooltip = false));
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    let moreInfoBtn = projectItemElement.querySelector("button:first-of-type");
    moreInfoBtn.addEventListener("click", this.showMoreInfoHandler);
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let swithcBtn = projectItemElement.querySelector("button:last-of-type");
    swithcBtn = DOMHelper.clearEventListeners(swithcBtn);
    swithcBtn.textContent = type === "active" ? "Finish" : "Activate";
    swithcBtn.addEventListener("click", this.updateProjectListsHandler.bind(null, this.id));
  }

  update(updateProjectListsFunction, type) {
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectSwitchButton(type);
  }
}

class ProjectListClass {
  projects = [];

  // we have active and finish projects
  constructor(type) {
    this.type = type;
    // pozeram kde su active and finished
    const projectItems = document.querySelectorAll(`#${type}-projects li`); //css selector
    for (const entry of projectItems) {
      this.projects.push(new ProjectItem(entry.id, this.switchProject.bind(this), this.type));
    }

    console.log(this.projects);
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projectIndex,1);
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectListClass("active");
    const finishedProjectsList = new ProjectListClass("finished");
    activeProjectsList.setSwitchHandlerFunction(finishedProjectsList.addProject.bind(finishedProjectsList));
    finishedProjectsList.setSwitchHandlerFunction(activeProjectsList.addProject.bind(activeProjectsList));
  }
}

App.init();
