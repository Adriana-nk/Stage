import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcheteurPage } from './acheteur.page';

describe('AcheteurPage', () => {
  let component: AcheteurPage;
  let fixture: ComponentFixture<AcheteurPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AcheteurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
