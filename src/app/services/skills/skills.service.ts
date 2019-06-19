import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { ISkill } from '../../models/skill.interface'
import { dummySkills } from './skills.service.fake'
import { MatSnackBar } from '@angular/material'

export interface ISkillsService {
  readonly list: BehaviorSubject<ISkill[]>
  fetch(): void
  addSkill(skill: ISkill): void
  updateSkill(skill: ISkill): void
  deleteSkill(id: number): void
}

@Injectable()
export class SkillsService implements ISkillsService {
  readonly list = new BehaviorSubject<ISkill[]>([])

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  fetch(): void {
    this.list.next(dummySkills)
  }

  addSkill(skill: ISkill) {
    const newList = this.list.value
    skill.id = newList.length
    newList.push(skill)
    this.list.next(newList)
    this.openSnackBar('Skill Added')
  }

  updateSkill(skill: ISkill) {
    this.deleteSkill(skill.id)
    const newList = this.list.value
    newList.push(skill)
    this.list.next(newList)
    this.openSnackBar('Skill Updated')
  }

  deleteSkill(id: number) {
    this.list.next(this.list.value.filter(s => s.id !== id))
    this.openSnackBar('Skill Deleted')
  }

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }
}
