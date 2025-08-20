import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Inscription1Page } from './inscription1.page';

describe('Inscription1Page', () => {
  let component: Inscription1Page;
  let fixture: ComponentFixture<Inscription1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Inscription1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
