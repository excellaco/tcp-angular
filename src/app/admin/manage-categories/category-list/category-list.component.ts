import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

import { ICategory } from '../../../models/skill.interface'
import { SkillCategoriesService } from '../../../services/skill-categories/skill-categories.service'
import { SkillsService } from '../../../services/skills/skills.service'
import { stringCompare } from '../../../utils/functions'

export interface ICategoryData extends ICategory {
  skillCount: number
}

@Component({
  selector: 'tcp-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  @Output() editCategory = new EventEmitter<number>()
  @Output() deleteCategory = new EventEmitter<number>()

  displayedColumns: string[] = ['edit', 'name', 'skillCount', 'delete']
  dataSource: MatTableDataSource<ICategory>

  constructor(
    public categoryService: SkillCategoriesService,
    public skillService: SkillsService
  ) {
    this.dataSource = new MatTableDataSource<ICategoryData>([])
    combineLatest([this.categoryService.list, this.skillService.list])
      .pipe(
        map(([categories, skills]) => {
          return [...categories]
            .sort((a, b) => stringCompare(a.name, b.name))
            .map(category => {
              return {
                ...category,
                skillCount: skills.filter(s => s.category.id === category.id).length,
              } as ICategoryData
            })
        })
      )
      .subscribe((categoryData: ICategoryData[]) => (this.dataSource.data = categoryData))
  }

  ngOnInit() {}

  applyTableFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
