import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmeleComponent } from './amele.component';

describe('AmeleComponent', () => {
  let component: AmeleComponent;
  let fixture: ComponentFixture<AmeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmeleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
