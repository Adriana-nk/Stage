import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Inscription4FooterComponent } from './inscription4-footer.component';

describe('Inscription4FooterComponent', () => {
  let component: Inscription4FooterComponent;
  let fixture: ComponentFixture<Inscription4FooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Inscription4FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription4FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
