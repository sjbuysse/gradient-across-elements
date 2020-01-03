import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as Multiple from 'multiple.js';

interface Day {
  stripes: boolean;
  requestID: string;
  color: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  days: Day[] = [{
    stripes: true,
    requestID: '789',
    color: '#D6A0DA'
  }, {
    stripes: false,
    requestID: '321',
    color: '#D6A0DA'
  }, {
    stripes: true,
    requestID: '123',
    color: '#6495ED'
  }, {
    stripes: true,
    requestID: '123',
    color: '#6495ED'
  }, {
    stripes: true,
    requestID: '123',
    color: '#6495ED'
  }, {
    stripes: true,
    requestID: '123',
    color: '#6495ED'
  }, {
    stripes: false,
    requestID: '321',
    color: '#1BB123'
  }, {
    stripes: false,
    requestID: '321',
    color: '#1BB123'
  }, {
    stripes: false,
    requestID: '321',
    color: '#1BB123'
  }, {
    stripes: true,
    requestID: '567',
    color: '#1BB123'
  }, {
    stripes: true,
    requestID: '567',
    color: '#1BB123'
  }];
  groupedDays = getDayGroups(this.days);

  ngAfterViewInit(): void {
    this.createOverlappingGradient();
  }

  getDayClass(day: Day): string {
    return day.stripes ? `day stripes-${day.requestID}` : 'day';
  }

  createOverlappingGradient() {
    this.groupedDays.forEach(group => {
      if (group[0].stripes) {
        const multiple = new Multiple({
          selector: `.stripes-${group[0].requestID}`,
          background: `repeating-linear-gradient(
              -45deg,
              ${group[0].color},
              ${group[0].color} 10px,
              white 10px,
              white 20px
          )`
        });
      }
    });
  }
}


function getDayGroups(days: Day[]): Array<Day[]> {
  return days.reduce((acc: Array<Day[]>, curr) => enrichGroupsWithDay(curr, acc), []);
}

// return array with day in last group or with new group
const enrichGroupsWithDay = (day: Day, groups: Array<Day[]>): Array<Day[]> =>
  (groups.length !== 0 && doesDayFitInGroup(day, groups[groups.length - 1]))
    ? addDayToLastGroup(day, groups)
    : addNewGroupWithDay(day, groups);

function doesDayFitInGroup(day: Day, group: Day[]): boolean {
  return group.length === 0 || group[0].stripes === day.stripes;
}

function addDayToLastGroup(day: Day, groups: Array<Day[]>) {
  const lastGroup: Day[] = groups[groups.length - 1];
  const groupsExceptsLast: Array<Day[]> = groups.slice(0, groups.length - 1);
  return [...groupsExceptsLast, [...lastGroup, day]];
}

function addNewGroupWithDay(day: Day, groups: Array<Day[]>) {
  return [...groups, [day]];
}
