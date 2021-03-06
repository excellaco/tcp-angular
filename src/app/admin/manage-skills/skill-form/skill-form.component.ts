import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'

import { BaseForm } from '../../../abstracts/base-form.class'
import { ICategory, ISkill } from '../../../models/skill.interface'
import { SkillCategoriesService } from '../../../services/skill-categories/skill-categories.service'
import { hasChanged, stringCompare } from '../../../utils/functions'

@Component({
  selector: 'tcp-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss'],
})
export class SkillFormComponent extends BaseForm implements OnInit, OnChanges {
  @Input() skill: ISkill = {} as ISkill
  @Output() addSkill = new EventEmitter<ISkill>()
  categories$: Observable<ICategory[]>

  constructor(private fb: FormBuilder, private categoryService: SkillCategoriesService) {
    super()
    this.categories$ = this.categoryService.list.pipe(
      map(cats => [...cats].sort((a, b) => stringCompare(a.name, b.name)))
    )
    this.formGroup = this.buildForm()
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (hasChanged(changes.skill)) {
      if (this.skill) {
        const skill: ISkill = { ...changes.skill.currentValue }
        // take(1) auto-completes the observable, no need to unsubscribe
        this.categories$.pipe(take(1)).subscribe(categories => {
          skill.category = categories.find(c => c.id === skill.category.id)
          this.formGroup.patchValue(skill)
        })
      } else {
        this.formGroup.reset()
      }
    }
  }

  buildForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: [null, [Validators.required]],
    })
  }

  onSubmit() {
    const newSkill: ISkill = this.formGroup.value
    if (this.skill) {
      newSkill.id = this.skill.id
    }

    this.addSkill.emit(newSkill)
  }
}
