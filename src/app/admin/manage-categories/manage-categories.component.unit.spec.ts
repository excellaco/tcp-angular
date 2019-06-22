import { MatDialog } from '@angular/material'
import { DialogService } from 'src/app/messaging/services/dialog/dialog.service'
import { MockDialogService } from 'src/app/messaging/services/dialog/dialog.service.fake'
import { ICategory } from 'src/app/models/skill.interface'
import { SkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service'
import {
  MockSkillCategoriesService,
  dummySkillCategories,
} from 'src/app/services/skill-categories/skill-categories.service.fake'
import { SkillsService } from 'src/app/services/skills/skills.service'
import { MockSkillsService } from 'src/app/services/skills/skills.service.fake'

import { ManageCategoriesComponent } from './manage-categories.component'

describe('ManageCategories (Unit)', () => {
  let categoryService: MockSkillCategoriesService
  let skillService: MockSkillsService
  let dialogService: MockDialogService
  let component: ManageCategoriesComponent

  beforeEach(() => {
    categoryService = new MockSkillCategoriesService()
    categoryService.fetch()
    skillService = new MockSkillsService()
    skillService.fetch()
    dialogService = new MockDialogService()
    component = new ManageCategoriesComponent(
      categoryService as SkillCategoriesService,
      skillService as SkillsService,
      dialogService as DialogService
    )
  })

  describe('#onEditCategory()', () => {
    it('should set categoryToEdit to the hydrated category', () => {
      expect(component.categoryToEdit).toBeNull()
      component.onEditCategory(1)
      expect(component.categoryToEdit).toEqual(dummySkillCategories.find(c => c.id === 1))
    })
  })

  describe('#onDeleteCategory()', () => {
    it('should require confirmation when Category has Skills', () => {
      spyOn(dialogService, 'confirm').and.callThrough()
      component.onDeleteCategory(1)
      expect(dialogService.confirm).toHaveBeenCalled()
    })
    xit('should call SkillCategoriesService.deleteCategory()', () => {
      spyOn(categoryService, 'deleteCategory').and.callThrough()
      component.onDeleteCategory(1)
      expect(categoryService.deleteCategory).toHaveBeenCalledWith(1)
    })
  })

  describe('#onAddCategory()', () => {
    let newCategory: ICategory
    beforeEach(() => {
      newCategory = {
        id: null,
        name: 'New Category',
      }
    })
    it('should call SkillCategoriesService.addCategory()', () => {
      spyOn(categoryService, 'addCategory').and.callThrough()
      component.onAddCategory(newCategory)
      expect(categoryService.addCategory).toHaveBeenCalledWith(newCategory)
    })
    it('should null categoryToEdit to the form resets', () => {
      component.categoryToEdit = newCategory
      component.onAddCategory(newCategory)
      expect(component.categoryToEdit).toBeNull()
    })
  })
})
