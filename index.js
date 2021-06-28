#!/usr/bin/env node

const API = require('./api');

const WEATHER_API_ACCESS_KEY = process.env.WEATHER_API_ACCESS_KEY;
const ENTRY_POINT = process.env.ENTRY_POINT;

const api = new API({
  entryPoint: ENTRY_POINT,
  accessKey: WEATHER_API_ACCESS_KEY,
});

// ARGV
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

class WeatherApp {
  constructor() {
    this._cityName = argv._[0];
  }
  showTemperature(temperature) {
    console.log(`В городе "${this._cityName}" ${temperature} °C`);
  }
  init() {
    if (!this._cityName) {
      console.log('Ошибка: Нужно передать название города!');
      return;
    }

    api
      .getCurrent(this._cityName)
      .then((data) => this.showTemperature(data.current.temperature));
  }
}

const weatherApp = new WeatherApp();
weatherApp.init();
