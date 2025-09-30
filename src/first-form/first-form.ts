import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../app/services/shared-service';
@Component({
  selector: 'app-first-form',
  imports: [ ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,],
  templateUrl: './first-form.html',
  styleUrl: './first-form.scss'
})
export class FirstForm {
   firstForm: FormGroup;

   constructor(private fb: FormBuilder, public sharedService: SharedService) {
    this.firstForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.firstForm.valid) {
      console.log(this.firstForm.value); 
      this.sharedService.sendMessageToApp1(this.firstForm.value);

    } 
  }

}
