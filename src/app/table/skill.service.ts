import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from './table.model';

@Injectable()
export class SkillService {
  constructor(private http: HttpClient) {}

  getSkills(): Promise<Skill[]> {
    return this.http
      .get('assets/skills.json')
      .toPromise()
      .then((res: any) => res.data)
      .then((data: Skill[]) => data);
  }
}
