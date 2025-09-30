import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../app/services/shared-service';


@Component({
  selector: 'app-second-form',
    imports: [ ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,],
  templateUrl: './second-form.html',
  styleUrl: './second-form.scss'
})
export class SecondForm {
   secondForm: FormGroup;

   constructor(private fb: FormBuilder, public sharedService: SharedService) {
    this.secondForm = this.fb.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.secondForm.valid) {
      console.log(this.secondForm.value); 
      this.sharedService.sendMessageToApp1(this.secondForm.value);
    } 
  }
}
