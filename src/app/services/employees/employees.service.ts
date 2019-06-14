import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'

import { ETHNICITY, GENDER, IEmployee } from '../../models/employee.interface'
import { PROFICIENCY } from '../../models/skill.interface'
import { dummySkills } from '../skills/skills.service'

const dummyEmployees: IEmployee[] = [
  {
    id: 1,
    bio: {
      firstName: 'John',
      middleInitial: 'T',
      lastName: 'Winchester',
      birthDate: new Date(),
      gender: GENDER.MALE,
      ethnicity: ETHNICITY.CAUCASIAN,
      usCitizen: true,
    },
    contact: {
      email: 'jon.doe@gmail.com',
      phoneNumber: '(123)456-7890',
      address: {
        line1: '2300 Wilson Blvd',
        line2: null,
        city: 'Arlington',
        stateCode: 'VA',
        zipCode: '22201',
      },
    },
    skills: [
      {
        id: 1,
        skill: dummySkills.find(s => s.name === 'Java'),
        proficiency: PROFICIENCY.HIGH,
        primary: true,
      },
      {
        id: 2,
        skill: dummySkills.find(s => s.name === 'JavaScript'),
        proficiency: PROFICIENCY.MID,
        primary: false,
      },
      {
        id: 3,
        skill: dummySkills.find(s => s.name === 'Jenkins'),
        proficiency: PROFICIENCY.MID,
        primary: false,
      },
      {
        id: 4,
        skill: dummySkills.find(s => s.name === 'Business Analysis'),
        proficiency: PROFICIENCY.LOW,
        primary: false,
      },
    ],
  },
]

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  readonly list = new BehaviorSubject<IEmployee[]>([])

  constructor() {}

  fetch(): void {
    this.list.next(dummyEmployees)
  }

  getById(id: number): Observable<IEmployee> {
    return of(dummyEmployees.find(e => e.id === id))
  }

  getByEmail(email: string): Observable<IEmployee> {
    if (this.list.value.length === 0) {
      this.fetch()
    }
    return of(this.list.value.find(e => e.contact.email === email))
  }

  addEmployee(employee: IEmployee) {
    const newList = this.list.value
    employee.id = this.list.value.length
    newList.push(employee)
    this.list.next(newList)
  }

  updateEmployee(employee: IEmployee) {
    this.deleteEmployee(employee.id)
    const newList = this.list.value
    newList.push(employee)
    this.list.next(newList)
  }

  deleteEmployee(id: number) {
    this.list.next(this.list.value.filter(e => e.id !== id))
  }
}
