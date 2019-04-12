import { Component, OnInit } from '@angular/core';
import { Skill } from './table.model';
import { SkillService } from './skill.service';

@Component({
  selector: 'rsg-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  skills: Skill[];
  constructor(private skillService: SkillService) {}

  async ngOnInit() {
    this.skills = await this.skillService.getSkills();
  }

  calulate() {
    this.skills.forEach(skill => {
      const rdm: number = Math.random();
      console.log(
        'skill: ',
        skill.skillName,
        '| percentage: ',
        skill.percentage / 100,
        '| random number: ',
        rdm,
        '| result: ',
        (skill.result = rdm > skill.percentage / 100 ? 1 : 0)
      );
      skill.result = rdm > skill.percentage / 100 ? 1 : 0;
    });
  }
}
