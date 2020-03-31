import api from './api';
import Core from './core';
import Auth from './auth';

export default function createAPI(apiRoot) {
  const core = new Core(apiRoot);
  const API = api.bind(null, core);

  this.Auth = new Auth(core);
  this.Agenda = new API('agenda');
  this.Announcements = new API('announcements');
  this.Committees = new API('committees');
  this.Events = new API('events');
  this.Headcounts = new API('mentoring/headcounts');
  this.Lingo = new API('lingo');
  this.Links = new API('links');
  this.Memberships = new API('memberships');
  this.Scoreboard = new API('memberships/scoreboard');
  this.Mentors = new API('mentoring/mentors');
  this.Officers = new API('officers');
  this.Quotes = new API('qdb/quotes');
  this.Shifts = new API('mentoring/shifts');
  this.Specialties = new API('mentoring/specialties');
  this.Tags = new API('qdb/tags');
  this.Terms = new API('terms');
  this.Tips = new API('tips');
  this.Users = new API('users');
}
