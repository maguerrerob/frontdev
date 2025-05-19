import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritodosComponent } from './carritodos.component';

describe('CarritodosComponent', () => {
  let component: CarritodosComponent;
  let fixture: ComponentFixture<CarritodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritodosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
