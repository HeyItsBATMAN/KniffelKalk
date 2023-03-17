import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, filter, map } from 'rxjs';
import { Player } from 'src/app/services/state.service';

const sum = (acc: number, val: number) => acc + val;
const positive = (value: number) => value >= 0;

type Score = {
  isTopComplete: boolean;
  isBottomComplete: boolean;
  topWithBonus: number;
  topSum: number;
  bottomSum: number;
  combinedSum: number;
};

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements AfterViewInit {
  public group = new FormGroup({
    ones: new FormControl('-1', { nonNullable: true }),
    twos: new FormControl('-1', { nonNullable: true }),
    threes: new FormControl('-1', { nonNullable: true }),
    fours: new FormControl('-1', { nonNullable: true }),
    fives: new FormControl('-1', { nonNullable: true }),
    sixths: new FormControl('-1', { nonNullable: true }),
    triple: new FormControl('-1', { nonNullable: true }),
    quadruple: new FormControl('-1', { nonNullable: true }),
    fullHouse: new FormControl('-1', { nonNullable: true }),
    smallStraight: new FormControl('-1', { nonNullable: true }),
    largeStraight: new FormControl('-1', { nonNullable: true }),
    fifths: new FormControl('-1', { nonNullable: true }),
    chance: new FormControl('-1', { nonNullable: true }),
  });

  @Input() set player(player: Player) {
    this.player$.next(player);
  }

  public player$ = new BehaviorSubject<Player | undefined>(undefined);
  public score$ = new BehaviorSubject<Score>({
    isTopComplete: false,
    isBottomComplete: false,
    topWithBonus: -1,
    topSum: -1,
    bottomSum: -1,
    combinedSum: -1,
  });

  constructor() {
    this.group.valueChanges.subscribe(group => {
      const {
        ones,
        twos,
        threes,
        fours,
        fives,
        sixths,
        triple,
        quadruple,
        fullHouse,
        smallStraight,
        largeStraight,
        fifths,
        chance,
      } = group;
      const top = [ones, twos, threes, fours, fives, sixths].map(v => +v!);
      const bottom = [
        triple,
        quadruple,
        fullHouse,
        smallStraight,
        largeStraight,
        fifths,
        chance,
      ].map(v => +v!);
      console.log(top, bottom);
      const isTopComplete = top.every(positive);
      const isBottomComplete = bottom.every(positive);
      const topSum = top.filter(positive).reduce(sum, 0);
      const bottomSum = bottom.filter(positive).reduce(sum, 0);
      const topWithBonus = isTopComplete ? (topSum >= 63 ? topSum + 35 : topSum) : -1;
      const combinedSum = isTopComplete && isBottomComplete ? topWithBonus + bottomSum : -1;
      this.score$.next({
        isTopComplete,
        isBottomComplete,
        topWithBonus,
        topSum,
        bottomSum,
        combinedSum,
      });
    });
  }

  ngAfterViewInit() {
    this.group.reset();
  }
}
