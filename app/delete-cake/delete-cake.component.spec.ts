import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCakeComponent } from './delete-cake.component';

describe('DeleteCakeComponent', () => {
  let component: DeleteCakeComponent;
  let fixture: ComponentFixture<DeleteCakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCakeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteCakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
