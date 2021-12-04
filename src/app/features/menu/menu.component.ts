import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Food, menuLinks } from './helpers/menu';
import { MenuFacadeService } from './services/menu-facade.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('menuDialog') menuDialog: TemplateRef<any> | undefined;

  date = new Date();
  restaurants = this.facade.restaurants;

  constructor(
    private facade: MenuFacadeService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.facade.fetchData();
  }

  openMenu(menu: Food[]) {
    this.dialog.open(this.menuDialog as TemplateRef<any>, {
      data: menu
    });
  }

}
