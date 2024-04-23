import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Update1Component } from './update1.component';

describe('Update1Component', () => {
  let component: Update1Component;
  let fixture: ComponentFixture<Update1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Update1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Update1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
