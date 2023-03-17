import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class InputComponent {
  @Input('numbers')
  public numbers: number[] = [].constructor(26).fill(0).map((_: number, i: number) => i + 5).reverse();

  @Input('name')
  public name!: string;
}
