import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'

import { MaterialModule } from '../../material.module'
import { SnackBarService } from '../../messaging/services/snack-bar/snack-bar.service'
import { MockSnackBarService } from '../../messaging/services/snack-bar/snack-bar.service.fake'
import { PipeModule } from '../../pipes/pipe.module'
import { EmployeesService } from '../../services/employees/employees.service'
import { MockEmployeesService } from '../../services/employees/employees.service.fake'
import { SkillCategoriesService } from '../../services/skill-categories/skill-categories.service'
import { MockSkillCategoriesService } from '../../services/skill-categories/skill-categories.service.fake'
import { SkillsService } from '../../services/skills/skills.service'
import { MockSkillsService } from '../../services/skills/skills.service.fake'
import { PrimarySkillService } from '../services/primary-skill/primary-skill.service'
import { StateService } from '../services/state/state.service'
import { MockStateService } from '../services/state/state.service.fake'
import { BioFormComponent } from './bio-form/bio-form.component'
import { AddressFormComponent } from './contact-form/address-form/address-form.component'
import { ContactFormComponent } from './contact-form/contact-form.component'
import { EmployeeFormComponent } from './employee-form.component'
import { ReviewComponent } from './review/review.component'
import { SkillDetailComponent } from './skills-form/skill-detail/skill-detail.component'
import { SkillsFormComponent } from './skills-form/skills-form.component'

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent
  let fixture: ComponentFixture<EmployeeFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeFormComponent,
        BioFormComponent,
        ContactFormComponent,
        AddressFormComponent,
        SkillsFormComponent,
        SkillDetailComponent,
        ReviewComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        NoopAnimationsModule,
        PipeModule,
        RouterTestingModule,
      ],
      providers: [
        PrimarySkillService,
        { provide: EmployeesService, useClass: MockEmployeesService },
        { provide: SkillsService, useClass: MockSkillsService },
        { provide: SkillCategoriesService, useClass: MockSkillCategoriesService },
        { provide: StateService, useClass: MockStateService },
        { provide: SnackBarService, useClass: MockSnackBarService }
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
