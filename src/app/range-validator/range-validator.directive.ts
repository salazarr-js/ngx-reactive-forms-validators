import { Directive, Input, forwardRef, OnChanges, SimpleChange, SimpleChanges, OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl, Validators, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

/** */
export interface RangeValidatorInterface {
  'range': {
    value: number;
    requiredValue: Array<number>;
  };
}


// export function isPresent(obj: any): boolean {
//   return obj !== undefined && obj !== null;
// }

/**
 *
 */
export function rangeValidator(range: Array<number>): ValidatorFn {
  return (control: AbstractControl): RangeValidatorInterface | null => {
    const value = control.value;

    const inRange = value >= range[0] && value <= range[1];
    return !inRange ? { range: { value, requiredValue: range }} : null;
  };
}

@Directive({
  selector: '[range]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: RangeValidatorDirective,
    multi: true
  }]
})
export class RangeValidatorDirective implements Validator, OnInit, OnChanges {
  /** */
  @Input() range: Array<number>;
  /** */
  private validator: ValidatorFn;
  /** */
  private onChange: () => void;

  constructor() {}

  /**  */
  ngOnInit() {
    this.validator = rangeValidator(this.range);
  }

  /**  */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.range ) {
      this.validator = rangeValidator(changes.range.currentValue);
      if ( this.onChange ) {
        this.onChange();
      }
    }
  }

  /** */
  validate(control: AbstractControl): ValidationErrors | null {
    // return this.range ? rangeValidator(this.range)(control) : null;
    return this.validator(control);
  }

  /**
   * BLACK MAGIC THANKS
   * https://github.com/yuyang041060120/ng2-validation/blob/master/src/range/directive.ts
   */
  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}

