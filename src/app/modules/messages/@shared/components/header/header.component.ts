import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDown = false;
  startX = 0;
  scrollLeft = 0;
  slider: HTMLElement | null = null;

  constructor() { }

  ngOnInit(): void {

  }

  public createNewChat() { }

  public onMouseDown(event: MouseEvent) {
    this.slider = event.currentTarget as HTMLElement;
    this.isDown = true;
    this.slider.classList.add('active');
    this.startX = event.pageX - this.slider.offsetLeft;
    this.scrollLeft = this.slider.scrollLeft;
  }

  public onMouseUp() {
    this.isDown = false;
    if (this.slider) {
      this.slider.classList.remove('active');
    }
    this.slider = null;
  }

  public onMouseMove(event: MouseEvent) {
    if (!this.isDown) return;

    event.preventDefault();
    const x = event.pageX - (this.slider?.offsetLeft || 0);
    const walk = (x - this.startX) * 1.5; // Регулируем скорость

    if (this.slider) {
      this.slider.scrollLeft = this.scrollLeft - walk;
    }
  }

  ngOnDestroy(): void {

  }
}