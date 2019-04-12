export class Skill {
  skillName: string;
  percentage: number;
  result: number;

  constructor(skillName: string, percentage: number, result: number) {
    this.skillName = skillName;
    this.percentage = percentage;
    this.result = result;
  }
}
