export interface SettingsDialog {
  id: string;
  stepType: string;
  nameProcess: string;
  from: string;
  to: string;
  nextStep: string;
  role: string;
  connection: [from: string, to: string[]];
}

export interface IElementData {
  id: string;
  fill: string;
  stroke: string | any;
  strokeWidth: number;
  label: string;
  connection?: {
    from: string;
    to: string[];
  };
}
