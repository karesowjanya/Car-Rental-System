import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { CarserviceService } from '../carservice.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carService: CarserviceService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
      ]],
      phone: ['', [
        Validators.required,
        this.phoneValidator
      ]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // ✅ Custom phone validator
  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    if (!/^\d+$/.test(value)) {
      return { notNumeric: true };
    }

    if (value.length !== 10) {
      return { invalidLength: true };
    }

    if (!/^[7-9]/.test(value)) {
      return { startsWithInvalid: true };
    }

    return null;
  }

  // ✅ Password match validator
  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get phone() { return this.form.get('phone'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
  get address() { return this.form.get('address') }

  onSubmit() {
    if (this.form.valid) {
      const userData = {
        name: this.name?.value,
        email: this.email?.value,
        phone: this.phone?.value,
        password: this.password?.value,
        address: this.address?.value
      };

      this.carService.addUser(userData).subscribe(() => {
        console.log('User saved to db.json successfully!');
        this.router.navigate(['/login']);
      });
    }
  }
}