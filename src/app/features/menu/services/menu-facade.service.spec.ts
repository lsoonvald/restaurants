import { TestBed } from '@angular/core/testing';

import { MenuFacadeService } from './menu-facade.service';

describe('MenuFacadeService', () => {
  let service: MenuFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
