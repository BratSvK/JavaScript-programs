class DOMHelper {
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }

  static clearEventListeners(element) {
    // mozeme to spravit cez cloneNOve
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
}

// kontrolovanie DOM casti
class Component {
  constructor(hostElementId, insertBefore = false) {
    if(hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }
  attach() {
    this.hostElement.insertAdjacentElement(this.insertBefore ? "afterbegin" : "beforeend",this.element);
  }

  dettach() {
    if (this.element) {
      this.element.remove();
    }
  }
}

class Tooltip extends Component {
  constructor(closeNOtifierFunction, textTooltip) {
    super(null, true);
    this.closeNotifier = closeNOtifierFunction;
    this.text = textTooltip;
    this.create();
  }

  closeTooltip() {
    this.dettach();
    this.closeNotifier();
  }

  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent =  this.text;
    tooltipElement.addEventListener("click", this.closeTooltip.bind(this));
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, switchHandlerFunction, type) {
    this.switchHandlerFunction = switchHandlerFunction;
    this.id = id;
    this.connectSwitchButton(type);
    this.connetMoreInfoButton();
  }

  showMoreInfo() {
    if (this.hasActiveTooltip) {
      return;
    }
    // chceme dostat DOMNode 
    const projectElement = document.getElementById(this.id);
    // ako sa dostaneme do dataset Objektu data-extra-info
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    }, tooltipText);
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  connetMoreInfoButton() {
    const projectElement = document.getElementById(this.id);
    const moreInfoBtn = projectElement.querySelector("button:first-of-type");
    moreInfoBtn.addEventListener("click", this.showMoreInfo.bind(this));
  }

  connectSwitchButton(type) {
    const projectElement = document.getElementById(this.id);
    let switchBtn = projectElement.querySelector("button:last-of-type");
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === "active" ? "Finished" : "Activate";
    switchBtn.addEventListener("click", this.switchHandlerFunction.bind(null, this.id));
  }

  update(updateProjectListFunction, type) {
    this.switchHandlerFunction = updateProjectListFunction;
    // aby sa pridal eventListener ale stary treba zmazat
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    this.getProjects();
  }

  getProjects() {
    const listEntries = document.querySelectorAll(`#${this.type}-projects li`);
    for (const project of listEntries) {
      this.projects.push(new ProjectItem(project.id, this.switchProject.bind(this), this.type));
    }
  }

  //ked chceme set metodu inej instancie
  setSwitchHandler(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  //we have to call it in another instance callback fuction
  addProject(project) {
    this.projects.push(project); // add from array A to array B
    // move DOMNode create class for that
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    // treba premazat listenerry pretoze je na inej instancii
    project.update(this.switchProject.bind(this), this.type);
  }

  // we wanna switch project, remove from active to finished
  switchProject(id) {
    // remove from projects
    // const deleteEntryIndex = this.projects.findIndex(p => p.id === id);
    // this.projects.splice(deleteEntryIndex, 1);

    //better option filter
    this.switchHandler(this.projects.find((p) => p.id === id)); // zavola sa nam metoda add na inej instancii
    this.projects = this.projects.filter((p) => p.id !== id); // a spravi sa remove from array
  }
}

class App {
  static init() {
    console.log("App is running....");
    const projectActive = new ProjectList("active");
    const projectFinished = new ProjectList("finished");
    projectActive.setSwitchHandler(projectFinished.addProject.bind(projectFinished));
    projectFinished.setSwitchHandler(projectActive.addProject.bind(projectActive));
  }
}

App.init();
