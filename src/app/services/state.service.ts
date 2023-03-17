import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export type Player = {
  name: string;
  top: [number, number, number, number, number, number];
  bottom: [number, number, number, number, number, number, number];
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public players$ = new BehaviorSubject<Player[]>([]);

  constructor() {
    this.addPlayer('Angela');
    this.addPlayer('Kai');
  }

  public addPlayer(name: string) {
    this.players$.next(
      this.players$.getValue().concat({
        name,
        top: [-1, -1, -1, -1, -1, -1],
        bottom: [-1, -1, -1, -1, -1, -1, -1],
      }),
    );
  }
}
