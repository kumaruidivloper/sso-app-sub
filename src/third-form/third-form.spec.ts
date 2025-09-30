import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdForm } from './third-form';

describe('ThirdForm', () => {
  let component: ThirdForm;
  let fixture: ComponentFixture<ThirdForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
