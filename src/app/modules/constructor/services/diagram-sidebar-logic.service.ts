import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class DiagramSidebarLogicService {

  public createSidebarTitle(container: HTMLElement, renderer: Renderer2): void {
    
    if (container) {
      const titleDiv = document.createElement('div');
      titleDiv.classList.add('titleDiv');

      const titleElement = document.createElement('h2');
      titleElement.classList.add('titleDivTitle');
      titleElement.innerText = 'Add Process Attribute';

      const toggleButton = document.createElement('button');

      const img = document.createElement('img');
      img.src = '/assets/images/diagram/arrowLeft.svg';
      img.alt = 'arrow';

      toggleButton.appendChild(img);

      let isExpanded = false;

      toggleButton.addEventListener('click', () => {
        isExpanded = !isExpanded;
        isExpanded
          ? toggleButton.classList.add('active')
          : toggleButton.classList.remove('active');
        container.style.width = isExpanded ? '160px' : '100%';
      });

      titleDiv.appendChild(titleElement);
      titleDiv.appendChild(toggleButton);

      container.prepend(titleDiv);

      container.style.transition = 'width 0.5s easy';
      container.style.overflow = 'hidden';
    }
  }

}
