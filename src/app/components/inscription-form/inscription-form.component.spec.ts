import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InscriptionFormComponent } from './inscription-form.component';

describe('InscriptionFormComponent', () => {
  let component: InscriptionFormComponent;
  let fixture: ComponentFixture<InscriptionFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [InscriptionFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
