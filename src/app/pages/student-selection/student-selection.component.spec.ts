import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentSelectionComponent} from './student-selection.component';

describe('StudentSelectionComponent', () => {
    let component: StudentSelectionComponent;
    let fixture: ComponentFixture<StudentSelectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StudentSelectionComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StudentSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
