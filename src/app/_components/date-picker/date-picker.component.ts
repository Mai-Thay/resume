import {Component, OnInit, Injectable, forwardRef, Input} from '@angular/core';
import {NgbDateStruct, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DEL = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value && this.checkIsFormatValid(value)) {
      const date = value.split(this.DEL);
      return {
        day: parseInt(date[2], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[0], 10)
      };
    }
    return null;
  }

  checkIsFormatValid(date: string): boolean {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(regEx)) {
      return false;
    }
    const d = new Date(date);
    const dNum = d.getTime();
    if (!dNum && dNum !== 0) {
      return false;
    }
    return d.toISOString().slice(0, 10) === date;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ?
      date.year + this.DEL + (date.month < 10 ? '0' + date.month : date.month) + this.DEL + (date.day < 10 ? '0' + date.day : date.day) :
      null;
  }
}


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers:
    [
      {
        provide: NgbDateAdapter, useClass: CustomAdapter
      },
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatePickerComponent),
        multi: true,
      },
    ]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  private _model: NgbDateStruct;
  placement = 'bottom';
  onChange = (_: any) => {};
  onTouched = () => {};

  @Input()
  set model(value: NgbDateStruct) {
    this._model = value;
    this.onChange(this._model);
  }

  get model(): NgbDateStruct {
    return this._model;
  }

  constructor() { }

  writeValue(obj: any): void {
    this.model = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  ngOnInit(): void {
  }

}
