import { Injectable } from "@angular/core";


@Injectable()

export class DiagramSidebarLogicService{

  public createSidebarTitle(container: HTMLElement): void {
    if (container) {
      const titleDiv = document.createElement('div');
      titleDiv.classList.add('titleDiv');

      const titleElement = document.createElement('h2');
      titleElement.classList.add('titleDivTitle');
      titleElement.innerText = 'Add Process Attribute';

      const toggleButton = document.createElement('button');
      toggleButton.classList.add('titleDivBtn');
      toggleButton.innerText = 'Toggle Width';

      let isExpanded = false;

      toggleButton.addEventListener('click', () => {
        isExpanded = !isExpanded;
        container.style.width = isExpanded ? '120px' : '100%';
      });

      titleDiv.appendChild(titleElement);
      titleDiv.appendChild(toggleButton);

      container.prepend(titleDiv);

      container.style.transition = 'width 0.5s';
      container.style.overflow = 'hidden';
    }
  }

}