import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavetudiantComponent } from './navetudiant.component';

describe('NavetudiantComponent', () => {
  let component: NavetudiantComponent;
  let fixture: ComponentFixture<NavetudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavetudiantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavetudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
