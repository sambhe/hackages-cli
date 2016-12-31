/**
* CLI tools: Command line tool
**/
import program = require('commander');
import path = require('path');
import fs = require('fs');
import { Observable } from 'rxjs';

export function build(){}

export function interval() {
    return Observable.interval(1000).take(5);
}

program
  .version('0.10.1')
  .option('-b, --build', 'Build your javascript project', ()=> interval().subscribe())
  .parse(process.argv);

