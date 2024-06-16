import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavEnseignantComponent } from './nav-enseignant.component';

describe('NavEnseignantComponent', () => {
  let component: NavEnseignantComponent;
  let fixture: ComponentFixture<NavEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavEnseignantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
