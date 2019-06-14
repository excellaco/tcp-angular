import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { StateService } from 'src/app/employee/services/state/state.service'
import { MockStateService } from 'src/app/employee/services/state/state.service.fake'
import { MaterialModule } from 'src/app/material.module'
import { PipeModule } from 'src/app/pipes/pipe.module'

import { AddressFormComponent } from './address-form.component'

describe('AddressFormComponent', () => {
  let component: AddressFormComponent
  let fixture: ComponentFixture<AddressFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressFormComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        MaterialModule,
        PipeModule,
      ],
      providers: [{ provide: StateService, useClass: MockStateService }],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should compile', () => {
    expect(component).toBeTruthy()
  })
})
