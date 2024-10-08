import { Component } from '@angular/core';

interface Block {
  id: string;
  name: string;
  x: number;
  y: number;
  selected?: boolean; // Свойство для отслеживания выбора
}

interface Connection {
  from: Block;
  to: Block;
}

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss'],
})
export class ConstructorComponent {
  nodes = [
    { id: '1', label: 'Node 1' },
    { id: '2', label: 'Node 2' },
    { id: '3', label: 'Node 3' },
  ];

  createdBlocks: Block[] = [];
  links: Connection[] = [];
  blockCounter = 0;

  // Переменные для перемещения блоков
  currentBlock: Block | null = null;
  offsetX = 0;
  offsetY = 0;

  onDragStart(event: DragEvent, node: { id: string; label: string }) {
    event.dataTransfer?.setData('text/plain', node.id);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Разрешить сброс
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const id = event.dataTransfer?.getData('text/plain');
    const droppedNode = this.nodes.find((node) => node.id === id);
    
    if (droppedNode) {
      const newBlock: Block = {
        id: (this.blockCounter++).toString(),
        name: droppedNode.label,
        x: event.offsetX, // Позиция по X
        y: event.offsetY, // Позиция по Y
      };
      this.createdBlocks.push(newBlock);

      // Выводим весь массив графика в консоль после добавления нового блока
      this.logGraphData();
    }
  }

  // Функции для перемещения блоков
  onMouseDown(event: MouseEvent, block: Block) {
    this.currentBlock = block;
    this.offsetX = event.clientX - block.x;
    this.offsetY = event.clientY - block.y;

    // Добавляем обработчики для перемещения
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseMove(event: MouseEvent) {
    if (this.currentBlock) {
      this.currentBlock.x = event.clientX - this.offsetX;
      this.currentBlock.y = event.clientY - this.offsetY;

      // Обновляем линии
      this.updateLinks();
    }
  }

  onMouseUp() {
    this.currentBlock = null;
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }

  // Выбор блока для соединения
  selectBlock(block: Block) {
    block.selected = !block.selected; // Переключаем состояние выбора
    this.updateLinks(); // Обновляем связи
  }

  // Обновление линий на основе выбранных блоков
  updateLinks() {
    const selectedBlocks = this.createdBlocks.filter(block => block.selected);

    // Соединяем только два выбранных блока
    if (selectedBlocks.length === 2) {
      this.links.push({
        from: selectedBlocks[0],
        to: selectedBlocks[1]
      });

      // Сбрасываем выбор
      selectedBlocks.forEach(block => block.selected = false);

      // Выводим массив данных графика после обновления соединений
      this.logGraphData();
    }
  }

  // Метод для вывода в консоль текущего состояния графика (блоков и связей)
  logGraphData() {
    console.log('График блоков:', this.createdBlocks);
    console.log('Соединения:', this.links);
  }

  // Получение максимальной ширины для SVG
  getMaxWidth(): number {
    return Math.max(500, ...this.createdBlocks.map(block => block.x + 100));
  }

  // Получение максимальной высоты для SVG
  getMaxHeight(): number {
    return Math.max(500, ...this.createdBlocks.map(block => block.y + 50));
  }
}
