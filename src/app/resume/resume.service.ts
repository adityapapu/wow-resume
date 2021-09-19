import { Injectable } from '@angular/core';
import { Resume, Education, Skill, Experience } from './models/resume.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ResumeService {
  private _degrees: string[] = ['B.E.', 'M.E.', 'B Tech', 'M Tech','MCA','BCA'];
  // tslint:disable-next-line: max-line-length
  private _resume = new Resume(
        null, 'Priyanka Naidu', 'Lovely Proffessional University,Punjab', 9999999999, 'npriyanka783@gmail.com', 'NA', 'No Other details',
        [new Experience('Venturepact', 'Associate Software Developer', 'Solutions Architect', 'july', 10),
        new Experience('XYZ', 'Developer', 'Architect', 'march', 5)],
        [new Education('MCA.', 'Lovely Prfessional University', '2020', 98),
        new Education('BCA', 'CUO', '2017', 78)],
        [new Skill('Communication'),
        new Skill('Team Player'),
        new Skill('Fast-Learner'),
        new Skill('Motivated')]
  );

  resumeSub = new BehaviorSubject<Resume>(new Resume());

  constructor() { }

  get degrees(): string[] {
    return this._degrees.slice();
  }
  get resume(): Resume {
    const resume: Resume = this._resume;
    return resume;
  }
  getBase64(file, resume: Resume): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const updatedResume: Resume = {...resume};
      updatedResume.profilePic = (reader.result as string);
      this.resumeSub.next(updatedResume);
    };
    reader.onerror = (error) => {
      console.log('File could not be read! Code: ', error);
    };
  }
}
