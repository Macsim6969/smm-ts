declare module 'joint' {
  export namespace dia {
    class Graph {
      constructor();
      // Add other necessary methods and properties as needed
    }

    class Paper {
      constructor(options: {
        el: HTMLElement;
        model: Graph;
        width: number;
        height: number;
        gridSize?: number;
      });
      // Add other necessary methods and properties as needed
    }
  }

  // Export the whole joint object
  const joint: {
    dia: typeof dia;
    // Add other namespaces and properties as needed
  };

  export default joint;
}
