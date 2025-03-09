import { CommonModule } from '@angular/common';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-custom-text-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-text-field.component.html',
  styleUrls: ['./custom-text-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomTextFieldComponent,
      multi: true
    }
  ]
})
export class CustomTextFieldComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() validationMessage: string = 'This field is required';
  @Input() maxLength: number | null = null;
  @Input() allowOnlyNumbers: boolean = false;
  @Input() pattern: string = '';

  value: string = '';
  onChange = (_: any) => {};
  onTouched = () => {};

  public ngControl: NgControl | null = null;

  constructor(private injector: Injector) { }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null, { optional: true });
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (this.allowOnlyNumbers) {
      const charCode = event.charCode;
      if (charCode !== 0 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
      }
    }
  }
}
