import { Subscription } from 'apollo-angular';
import { Injectable } from '@angular/core';

import { SUBSCRIBE_TO_WEEKEND_INFO } from 'graphql/queries/iracing';
import { WeekendInfo } from 'models/iracing/weekend-info';

interface Response {
  iracing: {
    WeekendInfo: WeekendInfo
    SessionTime: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class IracingDataGQLWeekendInfo extends Subscription<Response> {
  document = SUBSCRIBE_TO_WEEKEND_INFO
}
