import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererproductComponent } from './gererproduct.component';

describe('GererproductComponent', () => {
  let component: GererproductComponent;
  let fixture: ComponentFixture<GererproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GererproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
