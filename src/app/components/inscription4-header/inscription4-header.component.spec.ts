import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Inscription4HeaderComponent } from './inscription4-header.component';

describe('Inscription4HeaderComponent', () => {
  let component: Inscription4HeaderComponent;
  let fixture: ComponentFixture<Inscription4HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Inscription4HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription4HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
