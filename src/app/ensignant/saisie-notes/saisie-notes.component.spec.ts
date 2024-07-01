import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieNotesComponent } from './saisie-notes.component';

describe('SaisieNotesComponent', () => {
  let component: SaisieNotesComponent;
  let fixture: ComponentFixture<SaisieNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaisieNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaisieNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
