export interface SettingsDialog{
  id: string;
  stepType: string;
  nameProcess: string;
  from: string;
  to: string;
  nextStep: string;
  role: string;
  connection: [
    from: string,
    to: string[]
  ];
}