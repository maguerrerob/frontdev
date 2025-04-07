import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductosComponent } from './search-productos.component';

describe('SearchProductosComponent', () => {
  let component: SearchProductosComponent;
  let fixture: ComponentFixture<SearchProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
